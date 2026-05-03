import { type ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Utensils,
  Fuel,
  Home,
  MoreHorizontal,
  ChevronDown,
  Calendar as CalendarIcon,
  CheckCircle2,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { addTransaction } from '../../api/firestore';
import './AddTransactionForm.css';

type TransactionType = 'expense' | 'income';

export function AddTransactionForm(): ReactElement {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('0.00');
  const [category, setCategory] = useState('jedzenie');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [account, setAccount] = useState('mBank');
  const [note, setNote] = useState('');
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const quickCategories = [
    { id: 'Zakupy', value: 'zakupy', icon: <ShoppingBag size={16} /> },
    { id: 'Jedzenie', value: 'jedzenie', icon: <Utensils size={16} /> },
    { id: 'Paliwo', value: 'paliwo', icon: <Fuel size={16} /> },
    { id: 'Czynsz', value: 'czynsz', icon: <Home size={16} /> },
    { id: 'Inne', value: 'inne', icon: <MoreHorizontal size={16} /> },
  ];

  const isValid = category !== '' && date !== '' && parseFloat(amount) > 0;

  const handleSave = async () => {
    if (!isValid) return;

    setIsSaving(true);

    try {
      const amountValue = parseFloat(amount) * (type === 'expense' ? -1 : 1);
      const now = new Date();
      const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

      if (!user) throw new Error('User not authenticated');

      await addTransaction(user.uid, {
        date,
        time,
        title: note || (type === 'expense' ? 'Wydatek' : 'Dochód'),
        category: category.charAt(0).toUpperCase() + category.slice(1),
        categoryIcon: category, // Simplified mapping
        method: account,
        methodIcon: 'credit-card', // Simplified mapping
        amount: amountValue
      });

      showNotification(
        'Transakcja została zapisana pomyślnie!',
        'success',
        5000,
        { label: 'Pokaż historię', to: '/transactions' }
      );

      navigate(-1);
    } catch (error) {
      console.error('[AddTransaction] Failed to save:', error);
      showNotification('Błąd podczas zapisywania transakcji', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="add-transaction-container">
      <div className="add-transaction-card">
        {/* Type Toggle */}
        <div className="transaction-type-toggle">
          <button
            className={`toggle-btn ${type === 'expense' ? 'active' : ''}`}
            onClick={() => setType('expense')}
          >
            <ArrowUpRight size={18} />
            Wydatek
          </button>
          <button
            className={`toggle-btn ${type === 'income' ? 'active' : ''}`}
            onClick={() => setType('income')}
          >
            <ArrowDownLeft size={18} />
            Dochód
          </button>
        </div>

        {/* Amount Section */}
        <div className="amount-section">
          <span className="amount-label">Kwota</span>
          <div className="amount-input-wrapper">
            <span className="amount-currency">PLN</span>
            <input
              type="text"
              className="amount-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Quick Categories */}
        <div className="quick-categories-section">
          <span className="quick-categories-title">Szybka Kategoria</span>
          <div className="quick-categories-list">
            {quickCategories.map((cat) => (
              <button
                key={cat.id}
                className={`quick-cat-btn ${category === cat.value ? 'active' : ''}`}
                onClick={() => setCategory(cat.value)}
              >
                {cat.icon}
                {cat.id}
              </button>
            ))}
          </div>
        </div>

        {/* Form Grid */}
        <div className="form-grid">
          <div className="form-group">
            <label>Kategoria</label>
            <div className="select-wrapper">
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Wybierz kategorię</option>
                {quickCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.id}
                  </option>
                ))}
                <option value="rozrywka">Rozrywka</option>
              </select>
              <ChevronDown className="select-icon" size={18} />
            </div>
          </div>

          <div className="form-group">
            <label>Data</label>
            <div className="select-wrapper">
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <CalendarIcon className="select-icon" size={18} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Konto / Metoda płatności</label>
          <div className="select-wrapper">
            <select
              className="form-control"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            >
              <option>Główne Konto (mBank)</option>
              <option>Karta Kredytowa</option>
              <option>Gotówka</option>
            </select>
            <Wallet className="select-icon" size={18} />
          </div>
        </div>

        <div className="form-group">
          <label>Notatka (opcjonalnie)</label>
          <textarea
            className="form-control"
            placeholder="Dodaj opis transakcji..."
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ resize: 'none' }}
          />
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={isSaving || !isValid}
          >
            {isSaving ? (
              <>
                <Loader2 size={24} className="spinner" />
                Zapisywanie...
              </>
            ) : (
              <>
                <CheckCircle2 size={24} />
                Zapisz transakcję
              </>
            )}
          </button>
          <button className="cancel-link" onClick={() => navigate(-1)} disabled={isSaving}>
            Anuluj i wróć
          </button>
        </div>
      </div>
    </div>
  );
}
