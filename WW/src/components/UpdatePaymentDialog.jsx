import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { X, CheckSquare, Save } from 'lucide-react';

export default function UpdatePaymentDialog({ bill, open, onClose, onUpdateSuccess, API_BASE_URL }) {
  const [newAmount, setNewAmount] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  React.useEffect(() => {
    if (bill) {
      setNewAmount(bill.amountReceived || 0);
    }
  }, [bill]);

  if (!open || !bill) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedReceived = parseFloat(newAmount) || 0;
    if (updatedReceived < 0) {
      alert('Please enter a valid non-negative payment amount.');
      return;
    }

    setIsUpdating(true);
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const response = await fetch(`${API_BASE_URL}?action=update_bill&id=${bill.id}&token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amountReceived: updatedReceived,
          token
        })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        onUpdateSuccess();
        onClose();
        setNewAmount('');
      } else {
        alert(result.error || 'Failed to update payment.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkAsPaid = async () => {
    if (!await window.customConfirm("Are you sure you want to mark this bill as fully settled?")) return;
    setIsUpdating(true);
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const response = await fetch(`${API_BASE_URL}?action=update_bill&id=${bill.id}&token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amountReceived: parseFloat(bill.total),
          status: 'paid'
        })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        onUpdateSuccess();
        onClose();
        setNewAmount('');
      } else {
        alert(result.error || 'Failed to settle bill.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server.');
    } finally {
      setIsUpdating(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-3 sm:p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl relative text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 mb-4 sm:mb-5">
          <div>
            <h3 className="text-base font-extrabold text-slate-800">Update Bill Payment</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Register collection payments for Invoice #{bill.billNumber}</p>
          </div>
          <button 
            onClick={onClose}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200 sm:border-0"
            title="Close Dialog"
            aria-label="Close Dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Financial metrics */}
        <div className="flex flex-col gap-2.5 sm:gap-3.5 mb-5 sm:mb-6 text-xs font-mono">
          <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-slate-100">
            <span className="text-slate-500 font-sans">Total Amount</span>
            <span className="text-slate-800 font-bold">PKR {parseFloat(bill.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-slate-100">
            <span className="text-slate-500 font-sans">Already Received</span>
            <span className="text-emerald-600 font-bold">PKR {parseFloat(bill.amountReceived).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between items-center py-2.5 text-xs sm:text-sm bg-red-50 px-3.5 rounded-xl border border-red-100">
            <span className="text-red-700 font-bold uppercase tracking-wider font-sans">Remaining Balance</span>
            <span className="text-red-700 font-black">PKR {parseFloat(bill.remainingAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          <div>
            <label htmlFor="newAmount" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              New Amount Received (PKR)
            </label>
            <input
              type="number"
              id="newAmount"
              min="0"
              step="0.01"
              required
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="e.g. 25000"
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none font-mono shadow-sm transition-all"
            />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 border-t border-slate-200 pt-4 sm:pt-5 mt-1">
            <button
              type="button"
              onClick={handleMarkAsPaid}
              disabled={isUpdating}
              className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-[11px] font-bold text-emerald-700 tracking-wide uppercase transition-all disabled:opacity-50"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Settle In Full</span>
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-[11px] tracking-wide uppercase transition-all shadow-md shadow-sky-500/10 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Update Payment</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
