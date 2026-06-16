import React from 'react';
import { IoSwapHorizontal } from 'react-icons/io5';

const ArbitrageScanner = () => {
  const exchanges = [
    { name: 'Binance', price: 102450.50, fee: '0.1%', status: 'Primary' },
    { name: 'Coinbase', price: 102462.10, fee: '0.4%', status: 'Active' },
    { name: 'Kraken', price: 102448.90, fee: '0.26%', status: 'Active' },
    { name: 'Bybit', price: 102455.00, fee: '0.1%', status: 'Active' },
  ];

  const opportunities = [
    { from: 'Kraken', to: 'Coinbase', spread: 13.20, pct: '0.013%', rating: 'Low' },
  ];

  return (
    <div className="flex flex-col gap-3 p-3 text-[11px] h-full">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-muted font-bold uppercase tracking-wider mb-1">Cross-Exchange Comparison</span>
        {exchanges.map((ex, i) => (
          <div key={i} className="flex justify-between items-center bg-muted/5 px-2 py-1 rounded border border-muted/5">
            <span className="font-bold">{ex.name}</span>
            <div className="flex gap-4">
              <span className="font-mono text-muted">{ex.fee}</span>
              <span className="font-mono font-bold">${ex.price.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-muted/10 pt-2 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-warning">
          <IoSwapHorizontal size={14} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Potential Arbitrage</span>
        </div>
        
        {opportunities.map((op, i) => (
          <div key={i} className="bg-warning/5 border border-warning/20 p-2 rounded flex flex-col gap-1">
            <div className="flex justify-between font-bold">
              <span>{op.from} → {op.to}</span>
              <span className="text-warning">${op.spread.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[9px] text-muted uppercase font-bold">
              <span>Opportunity Rating: {op.rating}</span>
              <span>Spread: {op.pct}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto text-[9px] text-muted italic text-center p-2 bg-muted/5 rounded">
        V2 Integration: Live API relay required for multi-exchange execution.
      </div>
    </div>
  );
};

export default ArbitrageScanner;
