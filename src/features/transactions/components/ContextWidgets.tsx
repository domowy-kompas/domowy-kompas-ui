import { type ReactElement } from 'react';
import { Info, Receipt, AlertTriangle } from 'lucide-react';
import './ContextWidgets.css';

export function ContextWidgets(): ReactElement {
  return (
    <div className="context-widgets">
      {/* Budget Widget */}
      <div className="context-widget">
        <div className="widget-header">
          <Info size={16} color="#006d5b" />
          <span className="widget-title">Budżet na żywność</span>
        </div>
        <div className="widget-info">
          <span className="widget-value">840.00 PLN <span className="widget-subvalue">z 1200.00</span></span>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: '70%' }}></div>
        </div>
      </div>

      {/* Last Transaction Widget */}
      <div className="context-widget">
        <div className="widget-header">
          <Receipt size={16} color="#3b82f6" />
          <span className="widget-title" style={{ color: '#3b82f6' }}>Ostatnia transakcja</span>
        </div>
        <div className="widget-info">
          <span className="widget-value">Piekarnia u Jacka</span>
          <span className="widget-subvalue" style={{ color: '#ef4444' }}>-12.50 PLN</span>
        </div>
      </div>

      {/* Warning Widget */}
      <div className="context-widget widget-warning">
        <div className="widget-header">
          <AlertTriangle size={16} />
          <span className="widget-title">Uwaga</span>
        </div>
        <p className="widget-desc">
          Jesteś blisko limitu w kategorii 'Rozrywka'. Rozważ mniejsze wydatki.
        </p>
      </div>
    </div>
  );
}
