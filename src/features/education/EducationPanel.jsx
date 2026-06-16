import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp, IoBookOutline } from 'react-icons/io5';

const EducationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const concepts = [
    { title: 'Order Book', content: 'A list of buy (bids) and sell (asks) orders for a specific asset, organized by price level.' },
    { title: 'Bid/Ask Spread', content: 'The difference between the highest price a buyer is willing to pay and the lowest price a seller is willing to accept.' },
    { title: 'Market Depth', content: 'The markets ability to sustain relatively large market orders without impacting the price.' },
    { title: 'Imbalance', content: 'A situation where buy orders significantly outweigh sell orders (or vice versa), often predicting short-term price movement.' },
    { title: 'Liquidity Wall', content: 'A very large resting order at a specific price level that can act as a psychological support or resistance.' },
    { title: 'Order Flow', content: 'The stream of buy and sell orders currently being executed or resting in the book.' },
  ];

  return (
    <div className="flex flex-col border border-muted/10 rounded bg-panel overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 flex justify-between items-center hover:bg-muted/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <IoBookOutline className="text-primary" />
          <h3 className="text-xs font-bold uppercase tracking-wider">Education & Terminology</h3>
        </div>
        {isOpen ? <IoChevronUp size={14} /> : <IoChevronDown size={14} />}
      </button>

      {isOpen && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-muted/10 max-h-[400px] overflow-auto custom-scrollbar">
          {concepts.map((concept, i) => (
            <div key={i} className="flex flex-col gap-1">
              <h4 className="text-[11px] font-bold text-primary underline underline-offset-4 decoration-primary/30">{concept.title}</h4>
              <p className="text-[10px] text-muted leading-relaxed">{concept.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationPanel;
