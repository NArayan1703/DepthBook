import React from 'react';
import { useMarketData } from '../hooks/useMarketData';

const MarketMetrics = () => {
  const { ticker, metrics } = useMarketData();

  const formatPrice = (val) => val ? parseFloat(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '---';
  const formatVol = (val) => val ? (parseFloat(val) / 1000000).toFixed(2) + 'M' : '---';

  const items = [
    { label: 'Mid Price', value: formatPrice(metrics?.midPrice), highlight: null },
    { label: 'Spread', value: metrics ? `${metrics.spread.toFixed(2)} (${metrics.spreadPercent.toFixed(3)}%)` : '---', highlight: metrics?.spreadPercent > 0.1 ? 'warning' : 'muted' },
    { label: 'Imbalance', value: metrics ? `${(metrics.imbalance * 100).toFixed(1)}%` : '---', highlight: metrics?.imbalance > 0.2 ? 'positive' : metrics?.imbalance < -0.2 ? 'negative' : 'muted' },
    { label: '24h High', value: formatPrice(ticker?.highPrice), highlight: 'muted' },
    { label: '24h Low', value: formatPrice(ticker?.lowPrice), highlight: 'muted' },
    { label: '24h Volume', value: ticker ? `$${formatVol(ticker.quoteVolume)}` : '---', highlight: 'muted' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {items.map((item, i) => (
        <div key={i} className="bg-panel border border-muted/10 p-3 rounded flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-muted tracking-wider">{item.label}</span>
          <span className="text-sm font-mono font-bold leading-none">{item.value}</span>
          {item.highlight && (
            <div className={`h-1 w-full rounded-full mt-1 bg-muted/10 overflow-hidden`}>
               <div className={`h-full ${item.highlight === 'positive' ? 'bg-positive' : item.highlight === 'negative' ? 'bg-negative' : item.highlight === 'warning' ? 'bg-warning' : 'bg-muted/30'} w-full opacity-50`}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MarketMetrics;
