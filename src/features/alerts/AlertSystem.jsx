import React from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { IoAlertCircle, IoWater, IoArrowForward } from 'react-icons/io5';

const AlertSystem = () => {
  const { alerts } = useAnalytics();

  if (alerts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-[10px] text-muted p-4 text-center">
        Monitoring market microstructure for signals...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto custom-scrollbar flex flex-col gap-1 p-2">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className={`p-2 rounded border border-muted/10 flex gap-2 items-start transition-all animate-in fade-in slide-in-from-right-2 duration-300 ${alert.severity === 'high' ? 'bg-negative/5 border-negative/20' : 'bg-primary/5 border-primary/20'}`}
        >
          <div className={`mt-0.5 ${alert.severity === 'high' ? 'text-negative' : 'text-primary'}`}>
            {alert.type === 'whale' ? <IoWater size={14} /> : <IoAlertCircle size={14} />}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] leading-tight text-text font-medium">{alert.message}</span>
            <span className="text-[9px] text-muted font-mono">{new Date(alert.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertSystem;
