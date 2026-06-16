import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { useMarketData } from '../../hooks/useMarketData';

const TradeRow = ({ index, style, data }) => {
  const trade = data[index];
  const value = parseFloat(trade.price) * parseFloat(trade.quantity);
  const isLarge = value > 50000;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(undefined, { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div 
      style={style}
      className={`flex justify-between text-[11px] font-mono py-[2px] px-2 hover:bg-muted/5 border-l-2 ${trade.isBuyerMaker ? 'border-negative/30' : 'border-positive/30'} ${isLarge ? 'bg-primary/5' : ''}`}
    >
      <span className="w-1/4 text-muted">{formatTime(trade.time)}</span>
      <span className={`w-1/4 text-right font-bold ${trade.isBuyerMaker ? 'text-negative' : 'text-positive'}`}>
        {parseFloat(trade.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className="w-1/4 text-right text-text">
        {parseFloat(trade.quantity).toFixed(4)}
      </span>
      <span className={`w-1/4 text-right ${isLarge ? 'text-primary font-bold' : 'text-muted'}`}>
        {value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value.toFixed(0)}
      </span>
    </div>
  );
};

const TradeTape = () => {
  const { trades } = useMarketData();

  return (
    <div className="flex flex-col h-full overflow-hidden select-none">
      <div className="flex justify-between px-2 py-1 text-[10px] uppercase font-bold text-muted border-b border-muted/10 shrink-0">
        <span className="w-1/4">Time</span>
        <span className="w-1/4 text-right">Price</span>
        <span className="w-1/4 text-right">Size</span>
        <span className="w-1/4 text-right">Value</span>
      </div>

      <div className="flex-1 min-h-0">
        <List
          height={400} // This will be handled by ParentSize or simple flex
          itemCount={trades.length}
          itemSize={20}
          width="100%"
          itemData={trades}
          className="custom-scrollbar"
        >
          {TradeRow}
        </List>
      </div>
    </div>
  );
};

export default TradeTape;
