import React, { useMemo } from 'react';
import { useMarketData } from '../../hooks/useMarketData';
import { useFlash } from '../../hooks/useFlash';

const OrderBookRow = ({ price, size, total, maxTotal, type }) => {
  const percentage = (total / maxTotal) * 100;
  const flashClass = useFlash(size);
  
  return (
    <div className={`relative flex justify-between text-[11px] font-mono py-1.5 px-3 hover:bg-white/5 group overflow-hidden transition-all duration-300 h-[26px] items-center ${flashClass}`}>
      <div 
        className={`absolute top-0 bottom-0 ${type === 'bid' ? 'right-0 bg-positive/10' : 'left-0 bg-negative/10'}`}
        style={{ width: `${percentage}%` }}
      />
      
      <span className={`z-10 w-[35%] font-bold tracking-tight ${type === 'bid' ? 'text-positive' : 'text-negative'}`}>
        {parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className="z-10 w-[30%] text-right text-text font-medium">
        {parseFloat(size).toFixed(4)}
      </span>
      <span className="z-10 w-[35%] text-right text-muted/80 group-hover:text-text tabular-nums">
        {total.toFixed(2)}
      </span>
    </div>
  );
};

const OrderBook = () => {
  const { depth, metrics } = useMarketData();

  const { bids, asks, maxTotal } = useMemo(() => {
    if (!depth?.bids || !depth?.asks) return { bids: [], asks: [], maxTotal: 0 };
    
    let currentTotal = 0;
    const processedBids = depth.bids.slice(0, 12).map(([price, size]) => {
      currentTotal += parseFloat(size);
      return { price, size, total: currentTotal };
    });

    currentTotal = 0;
    const processedAsks = depth.asks.slice(0, 12).map(([price, size]) => {
      currentTotal += parseFloat(size);
      return { price, size, total: currentTotal };
    }).reverse();

    const maxBidTotal = processedBids.length > 0 ? processedBids[processedBids.length - 1].total : 0;
    const maxAskTotal = processedAsks.length > 0 ? processedAsks[0].total : 0;

    return { 
      bids: processedBids, 
      asks: processedAsks, 
      maxTotal: Math.max(maxBidTotal, maxAskTotal) 
    };
  }, [depth]);

  return (
    <div className="flex flex-col h-full overflow-hidden select-none bg-[#0b0f1a]">
      <div className="flex justify-between px-3 py-2 text-[10px] uppercase font-bold text-muted/50 border-b border-white/5 shrink-0">
        <span className="w-[35%]">Price</span>
        <span className="w-[30%] text-right">Size</span>
        <span className="w-[35%] text-right">Total</span>
      </div>

      <div className="flex-1 flex flex-col justify-end overflow-hidden">
        {asks.map((ask) => (
          <OrderBookRow key={`ask-${ask.price}`} {...ask} maxTotal={maxTotal} type="ask" />
        ))}
      </div>

      <div className="my-1 bg-[#161d2f] py-2.5 px-4 border-y border-white/10 flex justify-between items-center shrink-0 mx-1 rounded-sm shadow-lg">
        <div className="flex flex-col">
            <span className={`text-base font-black font-mono tracking-tighter leading-none ${metrics?.imbalance > 0 ? 'text-positive' : 'text-negative'}`}>
                {metrics?.midPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '---'}
            </span>
            <span className="text-[8px] text-muted font-black tracking-widest mt-1">MARKET PRICE</span>
        </div>
        <div className="text-right">
            <span className="text-xs font-bold text-text/90 block leading-none tabular-nums">
                {metrics?.spread?.toFixed(2) || '---'}
            </span>
            <span className="text-[8px] text-muted/60 font-bold uppercase mt-1">Spread</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {bids.map((bid) => (
          <OrderBookRow key={`bid-${bid.price}`} {...bid} maxTotal={maxTotal} type="bid" />
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
