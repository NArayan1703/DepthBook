import React from 'react';
import MarketMetrics from '../components/MarketMetrics';
import OrderBook from '../features/orderbook/OrderBook';
import TradeTape from '../features/trades/TradeTape';
import DepthChart from '../features/depthchart/DepthChart';
import Heatmap from '../features/heatmap/Heatmap';
import AlertSystem from '../features/alerts/AlertSystem';
import MarketStructure from '../features/analytics/MarketStructure';
import RiskDashboard from '../features/analytics/RiskDashboard';
import EducationPanel from '../features/education/EducationPanel';
import ArbitrageScanner from '../features/analytics/ArbitrageScanner';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 h-full max-w-[1800px] mx-auto w-full">
      {/* Top Metrics Bar */}
      <MarketMetrics />

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 overflow-hidden">
        
        {/* Left Column: Order Book & Arbitrage */}
        <div className="col-span-12 xl:col-span-3 lg:col-span-4 flex flex-col gap-4 overflow-hidden">
          <div className="flex-[3] bg-panel border border-muted/10 rounded flex flex-col overflow-hidden shadow-xl">
            <div className="p-2.5 border-b border-muted/10 flex justify-between items-center shrink-0 bg-panel/50">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80">Order Book</h3>
              <span className="text-[9px] text-muted font-black bg-muted/5 px-1.5 py-0.5 rounded">L2 DEPTH</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <OrderBook />
            </div>
          </div>
          <div className="flex-[2] bg-panel border border-muted/10 rounded flex flex-col overflow-hidden shadow-xl">
            <div className="p-2.5 border-b border-muted/10 shrink-0 bg-panel/50">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80">Arbitrage Scanner</h3>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
              <ArbitrageScanner />
            </div>
          </div>
        </div>

        {/* Middle Column: Depth Chart, Heatmap & Analysis */}
        <div className="col-span-12 xl:col-span-6 lg:col-span-8 flex flex-col gap-4 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-[2] min-h-0">
            <div className="bg-panel border border-muted/10 rounded flex flex-col overflow-hidden shadow-xl">
              <div className="p-2.5 border-b border-muted/10 shrink-0 bg-panel/50">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary/80">Depth Chart</h3>
              </div>
              <div className="flex-1 min-h-0">
                <DepthChart />
              </div>
            </div>
            <div className="bg-panel border border-muted/10 rounded flex flex-col overflow-hidden shadow-xl">
              <div className="p-2.5 border-b border-muted/10 shrink-0 bg-panel/50">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary/80">Liquidity Heatmap</h3>
              </div>
              <div className="flex-1 min-h-0">
                <Heatmap />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
            <div className="bg-panel border border-muted/10 rounded flex flex-col overflow-hidden shadow-xl">
              <div className="p-2.5 border-b border-muted/10 shrink-0 bg-panel/50">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary/80">Market Structure</h3>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                <MarketStructure />
              </div>
            </div>
            <div className="bg-panel border border-muted/10 rounded flex flex-col overflow-hidden shadow-xl">
              <div className="p-2.5 border-b border-muted/10 shrink-0 bg-panel/50">
                <h3 className="text-xs font-black uppercase tracking-widest text-primary/80">Risk Analytics</h3>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                <RiskDashboard />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Trades & Alerts */}
        <div className="col-span-12 xl:col-span-3 lg:col-span-12 flex flex-col gap-4 overflow-hidden">
          <div className="flex-[2] bg-panel border border-muted/10 rounded flex flex-col overflow-hidden shadow-xl">
            <div className="p-2.5 border-b border-muted/10 shrink-0 bg-panel/50">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80">Trade Tape</h3>
            </div>
            <div className="flex-1 overflow-hidden">
              <TradeTape />
            </div>
          </div>
          <div className="flex-1 bg-panel border border-muted/10 rounded flex flex-col overflow-hidden shadow-xl">
            <div className="p-2.5 border-b border-muted/10 shrink-0 bg-panel/50">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary/80">Terminal Alerts</h3>
            </div>
            <div className="flex-1 overflow-hidden">
              <AlertSystem />
            </div>
          </div>
        </div>

      </div>

      {/* Footer Educational Panel */}
      <div className="shrink-0">
        <EducationPanel />
      </div>
    </div>
  );
};

export default Dashboard;
