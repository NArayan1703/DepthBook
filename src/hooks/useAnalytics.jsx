import { useMemo, useEffect, useState } from 'react';
import { useMarketData } from './useMarketData';

export const useAnalytics = () => {
  const { depth, trades } = useMarketData();
  const [alerts, setAlerts] = useState([]);

  // Liquidity Wall Detector
  const walls = useMemo(() => {
    if (!depth.bids.length || !depth.asks.length) return { bidWalls: [], askWalls: [] };

    const avgBidSize = depth.bids.reduce((acc, b) => acc + parseFloat(b[1]), 0) / depth.bids.length;
    const avgAskSize = depth.asks.reduce((acc, a) => acc + parseFloat(a[1]), 0) / depth.asks.length;

    const bidWalls = depth.bids
      .filter(b => parseFloat(b[1]) > avgBidSize * 3)
      .map(b => ({ price: b[0], size: b[1], strength: parseFloat(b[1]) / avgBidSize }));

    const askWalls = depth.asks
      .filter(a => parseFloat(a[1]) > avgAskSize * 3)
      .map(a => ({ price: a[0], size: a[1], strength: parseFloat(a[1]) / avgAskSize }));

    return { bidWalls, askWalls };
  }, [depth]);

  // Large Trade Detection & Alert Generation
  useEffect(() => {
    if (trades.length === 0) return;

    const latestTrade = trades[0];
    const value = parseFloat(latestTrade.price) * parseFloat(latestTrade.quantity);

    if (value > 100000) { // Whale alert for > $100k
      const newAlert = {
        id: Date.now(),
        type: 'whale',
        message: `Whale ${latestTrade.isBuyerMaker ? 'Sell' : 'Buy'} detected: $${(value / 1000).toFixed(0)}k at ${latestTrade.price}`,
        timestamp: Date.now(),
        severity: 'high',
      };
      setAlerts(prev => [newAlert, ...prev].slice(0, 20));
    }
  }, [trades]);

  // Wall Detection Alerts
  useEffect(() => {
    if (walls.bidWalls.length > 0) {
      const topWall = walls.bidWalls[0];
      if (topWall.strength > 5) {
        const newAlert = {
            id: `wall-bid-${topWall.price}`,
            type: 'wall',
            message: `Large Bid Wall at ${topWall.price} (${topWall.strength.toFixed(1)}x avg)`,
            timestamp: Date.now(),
            severity: 'medium',
        };
        // Avoid duplicate alerts for the same wall in a short period
        setAlerts(prev => {
            if (prev.find(a => a.id === newAlert.id)) return prev;
            return [newAlert, ...prev].slice(0, 20);
        });
      }
    }
  }, [walls]);

  return { walls, alerts };
};
