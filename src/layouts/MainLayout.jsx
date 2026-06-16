import React from 'react';
import { useMarketData } from '../hooks/useMarketData';

const MainLayout = ({ children }) => {
  const { symbol, setSymbol, status } = useMarketData();

  return (
    <div className="h-screen flex flex-col bg-background text-text overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-muted/20 flex items-center px-4 bg-panel shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-primary/20 shrink-0">DB</div>
          <div className="flex flex-col">
            <h1 className="font-black text-sm tracking-tight leading-none">DepthBook</h1>
            <span className="text-[9px] font-bold text-muted uppercase tracking-widest hidden sm:block">Microstructure Terminal</span>
          </div>
        </div>
        
        <div className="ml-4 sm:ml-12 flex items-center gap-2">
            <select 
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="bg-background border border-muted/20 text-xs font-bold px-3 py-1 rounded outline-none focus:border-primary transition-colors cursor-pointer"
            >
                <option value="BTCUSDT">BTC/USDT</option>
                <option value="ETHUSDT">ETH/USDT</option>
                <option value="SOLUSDT">SOL/USDT</option>
                <option value="BNBUSDT">BNB/USDT</option>
            </select>
            <div className={`px-2 py-1 rounded text-[10px] font-black tracking-widest ${status === 'connected' ? 'bg-positive/10 text-positive' : 'bg-negative/10 text-negative'}`}>
                {status.toUpperCase()}
            </div>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-6">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">Server Time (UTC)</span>
            <span className="text-xs font-mono font-bold">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-muted/10 border border-muted/20 flex items-center justify-center cursor-pointer hover:bg-muted/20 transition-colors">
            <div className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-positive animate-pulse' : 'bg-negative'}`}></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:overflow-hidden p-2 sm:p-4 custom-scrollbar">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
