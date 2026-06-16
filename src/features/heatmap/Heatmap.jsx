import React, { useEffect, useRef, useState } from 'react';
import { useMarketData } from '../../hooks/useMarketData';

const Heatmap = () => {
  const { depth, metrics } = useMarketData();
  const canvasRef = useRef(null);
  const [history, setHistory] = useState([]);
  const maxHistory = 100;

  useEffect(() => {
    if (!depth.bids.length || !depth.asks.length) return;

    setHistory(prev => {
      const newSnapshot = {
        timestamp: Date.now(),
        bids: [...depth.bids.slice(0, 10)],
        asks: [...depth.asks.slice(0, 10)],
      };
      return [...prev, newSnapshot].slice(-maxHistory);
    });
  }, [depth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Calculate price range
    const allPrices = history.flatMap(s => [
      ...s.bids.map(b => parseFloat(b[0])),
      ...s.asks.map(a => parseFloat(a[0]))
    ]);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const priceRange = maxPrice - minPrice;

    if (priceRange === 0) return;

    const cellWidth = width / maxHistory;
    
    history.forEach((snapshot, xIndex) => {
      const x = xIndex * cellWidth;

      // Draw Bids
      snapshot.bids.forEach(([priceStr, sizeStr]) => {
        const price = parseFloat(priceStr);
        const size = parseFloat(sizeStr);
        const y = height - ((price - minPrice) / priceRange) * height;
        
        const intensity = Math.min(size / 5, 1); // Normalize intensity
        ctx.fillStyle = `rgba(34, 197, 94, ${intensity})`;
        ctx.fillRect(x, y, cellWidth, 2);
      });

      // Draw Asks
      snapshot.asks.forEach(([priceStr, sizeStr]) => {
        const price = parseFloat(priceStr);
        const size = parseFloat(sizeStr);
        const y = height - ((price - minPrice) / priceRange) * height;
        
        const intensity = Math.min(size / 5, 1); // Normalize intensity
        ctx.fillStyle = `rgba(239, 68, 68, ${intensity})`;
        ctx.fillRect(x, y, cellWidth, 2);
      });
    });

    // Draw current price line
    if (metrics?.midPrice) {
        const currentY = height - ((metrics.midPrice - minPrice) / priceRange) * height;
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, currentY);
        ctx.lineTo(width, currentY);
        ctx.stroke();
        ctx.setLineDash([]);
    }

  }, [history, metrics]);

  return (
    <div className="flex-1 w-full h-full relative overflow-hidden bg-background/50">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        width={800}
        height={400}
      />
      <div className="absolute top-1 right-2 text-[8px] text-muted uppercase font-bold pointer-events-none">
        Historical Liquidity Intensity
      </div>
    </div>
  );
};

export default Heatmap;
