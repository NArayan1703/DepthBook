import React from 'react';
import { useMarketData } from '../../hooks/useMarketData';

const RiskDashboard = () => {
  const { metrics, ticker } = useMarketData();

  const getVolatility = () => {
    if (!ticker) return 0;
    return Math.abs(parseFloat(ticker.priceChangePercent));
  };

  const getRiskLevel = () => {
    const vol = getVolatility();
    if (vol > 5) return { label: 'HIGH', color: 'text-negative' };
    if (vol > 2) return { label: 'MEDIUM', color: 'text-warning' };
    return { label: 'LOW', color: 'text-positive' };
  };

  const risk = getRiskLevel();

  return (
    <div className="flex flex-col gap-3 p-3 text-[11px]">
      <div className="flex justify-between items-center">
        <span className="text-muted uppercase font-bold tracking-tighter">Market Volatility</span>
        <span className="font-bold">{getVolatility().toFixed(2)}%</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-muted uppercase font-bold tracking-tighter">Liquidity Risk</span>
        <span className={`font-bold ${metrics?.spreadPercent > 0.05 ? 'text-warning' : 'text-positive'}`}>
            {metrics?.spreadPercent > 0.05 ? 'ELEVATED' : 'STABLE'}
        </span>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <span className="text-muted uppercase font-bold tracking-tighter text-[10px]">Overall Risk Meter</span>
        <div className="h-2 w-full bg-muted/10 rounded-full overflow-hidden flex">
            <div className={`h-full ${risk.label === 'LOW' ? 'bg-positive w-1/3' : risk.label === 'MEDIUM' ? 'bg-warning w-2/3' : 'bg-negative w-full'}`}></div>
        </div>
        <div className="flex justify-between items-center">
            <span className={`font-black tracking-widest text-[12px] ${risk.color}`}>{risk.label}</span>
            <span className="text-[9px] text-muted italic">Based on real-time spread & vol</span>
        </div>
      </div>
    </div>
  );
};

export default RiskDashboard;
