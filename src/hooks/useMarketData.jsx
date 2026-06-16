import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { binanceService } from '../services/BinanceService';

const MarketDataContext = createContext();

export const MarketDataProvider = ({ children }) => {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [depth, setDepth] = useState({ bids: [], asks: [] });
  const [trades, setTrades] = useState([]);
  const [ticker, setTicker] = useState(null);
  const [status, setStatus] = useState('disconnected');

  const handleDepth = useCallback((data) => {
    setDepth(data);
  }, []);

  const handleTrades = useCallback((trade) => {
    setTrades((prev) => [trade, ...prev].slice(0, 50));
  }, []);

  const handleTicker = useCallback((data) => {
    setTicker(data);
  }, []);

  const handleStatus = useCallback((s) => {
    setStatus(s);
  }, []);

  useEffect(() => {
    binanceService.connect(symbol, {
      depth: handleDepth,
      trades: handleTrades,
      ticker: handleTicker,
      status: handleStatus,
    });

    return () => binanceService.disconnect();
  }, [symbol, handleDepth, handleTrades, handleTicker, handleStatus]);

  // Derived Metrics
  const metrics = useMemo(() => {
    if (!depth.bids.length || !depth.asks.length) return null;

    const bestBid = parseFloat(depth.bids[0][0]);
    const bestAsk = parseFloat(depth.asks[0][0]);
    const spread = bestAsk - bestBid;
    const spreadPercent = (spread / bestBid) * 100;
    const midPrice = (bestBid + bestAsk) / 2;

    const bidVol = depth.bids.reduce((acc, b) => acc + parseFloat(b[1]), 0);
    const askVol = depth.asks.reduce((acc, a) => acc + parseFloat(a[1]), 0);
    const imbalance = (bidVol - askVol) / (bidVol + askVol);

    return {
      bestBid,
      bestAsk,
      spread,
      spreadPercent,
      midPrice,
      bidVol,
      askVol,
      imbalance,
    };
  }, [depth]);

  const value = {
    symbol,
    setSymbol,
    depth,
    trades,
    ticker,
    status,
    metrics,
  };

  return (
    <MarketDataContext.Provider value={value}>
      {children}
    </MarketDataContext.Provider>
  );
};

export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error('useMarketData must be used within a MarketDataProvider');
  }
  return context;
};
