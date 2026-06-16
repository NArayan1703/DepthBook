import React from 'react';
import { useMarketData } from '../../hooks/useMarketData';
import { useAnalytics } from '../../hooks/useAnalytics';

const MarketStructure = () => {
  const { metrics, ticker } = useMarketData();
  const { walls } = useAnalytics();

  const getTrend = () => {
    if (!ticker?.priceChangePercent) return 'Neutral';
    const change = parseFloat(ticker.priceChangePercent);
    if (change > 2) return 'Strong Bullish';
    if (change > 0.5) return 'Bullish';
    if (change < -2) return 'Strong Bearish';
    if (change < -0.5) return 'Bearish';
    return 'Range Bound';
  };

  const getLiquidityState = () => {
    if (!metrics) return 'Stable';
    if (metrics.spreadPercent > 0.05) return 'Low / Fragmented';
    return 'High / Deep';
  };

  return (
    <div className="flex flex-col gap-3 p-3 text-[11px]">
      <div className="flex justify-between items-center">
        <span className="text-muted uppercase font-bold tracking-tighter">Current Trend</span>
        <span className={`font-bold ${getTrend().includes('Bullish') ? 'text-positive' : getTrend().includes('Bearish') ? 'text-negative' : 'text-text'}`}>
          {getTrend()}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-muted uppercase font-bold tracking-tighter">Liquidity State</span>
        <span className="font-bold text-primary">{getLiquidityState()}</span>
      </div>

      <div className="border-t border-muted/10 pt-2 flex flex-col gap-1">
        <span className="text-muted uppercase font-bold tracking-tighter mb-1">Detected Support/Resistance</span>
        <div className="flex flex-col gap-1">
          {walls?.bidWalls?.slice(0, 2).map((wall, i) => (
            <div key={i} className="flex justify-between items-center bg-positive/5 px-2 py-1 rounded">
              <span className="text-positive font-bold">SUPP: {parseFloat(wall.price).toLocaleString()}</span>
              <span className="text-[9px] text-muted">{wall.strength.toFixed(1)}x depth</span>
            </div>
          ))}
          {walls?.askWalls?.slice(0, 2).map((wall, i) => (
            <div key={i} className="flex justify-between items-center bg-negative/5 px-2 py-1 rounded">
              <span className="text-negative font-bold">RES: {parseFloat(wall.price).toLocaleString()}</span>
              <span className="text-[9px] text-muted">{wall.strength.toFixed(1)}x depth</span>
            </div>
          ))}
          {(!walls?.bidWalls?.length && !walls?.askWalls?.length) && (
              <span className="text-[9px] text-muted italic p-2 text-center">Scanning depth...</span>
          )}
        </div>
      </div>

      <div className="border-t border-muted/10 pt-2">
        <span className="text-muted uppercase font-bold tracking-tighter mb-1 block">Commentary</span>
        <p className="text-[10px] text-text/80 leading-relaxed italic">
          {metrics?.imbalance > 0.2 
            ? "Strong bid liquidity remains concentrated while aggressive buyers continue lifting offers." 
            : metrics?.imbalance < -0.2 
              ? "Sell-side pressure mounting as asks thicken and buyers become passive."
              : "Market currently in a balanced state with thin spread and localized liquidity pockets."}
        </p>
      </div>
    </div>
  );
};

export default MarketStructure;
