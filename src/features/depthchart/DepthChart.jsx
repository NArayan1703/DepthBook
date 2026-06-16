import React, { useMemo, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useMarketData } from '../../hooks/useMarketData';

const DepthChart = () => {
  const { depth, metrics } = useMarketData();

  const data = useMemo(() => {
    if (!depth?.bids?.length || !depth?.asks?.length) return [];

    try {
        const bids = [...depth.bids].reverse().map(([price, size]) => ({
        price: parseFloat(price),
        bidSize: parseFloat(size),
        askSize: 0,
        }));

        let bidCumulative = 0;
        const bidData = bids.map(item => {
        bidCumulative += item.bidSize;
        return { ...item, bidTotal: bidCumulative };
        });

        const asks = [...depth.asks].map(([price, size]) => ({
        price: parseFloat(price),
        bidSize: 0,
        askSize: parseFloat(size),
        }));

        let askCumulative = 0;
        const askData = asks.map(item => {
        askCumulative += item.askSize;
        return { ...item, askTotal: askCumulative };
        });

        return [...bidData, ...askData];
    } catch (err) {
        console.error("DepthChart Processing Error:", err);
        return [];
    }
  }, [depth]);

  if (!data.length) return <div className="flex-1 flex items-center justify-center text-muted text-xs italic">Awaiting Market Depth...</div>;

  return (
    <div className="flex-1 w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAsk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="price" 
            hide 
            type="number" 
            domain={['dataMin', 'dataMax']} 
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111827', border: '1px solid #94a3b833', borderRadius: '4px' }}
            itemStyle={{ fontSize: '10px', color: '#f8fafc' }}
            labelStyle={{ fontSize: '10px', color: '#94a3b8' }}
            formatter={(value) => [value.toFixed(4), 'Total Volume']}
            labelFormatter={(label) => `Price: ${label?.toLocaleString()}`}
          />
          <Area 
            type="stepAfter" 
            dataKey="bidTotal" 
            stroke="#22c55e" 
            fillOpacity={1} 
            fill="url(#colorBid)" 
            isAnimationActive={false}
          />
          <Area 
            type="stepAfter" 
            dataKey="askTotal" 
            stroke="#ef4444" 
            fillOpacity={1} 
            fill="url(#colorAsk)" 
            isAnimationActive={false}
          />
          {metrics?.midPrice && <ReferenceLine x={metrics.midPrice} stroke="#94a3b8" strokeDasharray="3 3" />}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepthChart;
