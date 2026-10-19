import React, { useState, useEffect } from 'react';
import { Eye, Save } from 'lucide-react';
import BillPreview from './BillPreview';
import CustomerInfoFields from './billing/shared/CustomerInfoFields';
import ItemLineRows from './billing/shared/ItemLineRows';
import CalculationSummary from './billing/shared/CalculationSummary';
import StandardTermsSelector, { buildFullNotes } from './billing/shared/StandardTermsSelector';

const cleanPhone = (val) => {
  if (!val) return '';
  let cleaned = String(val).replace(/\D/g, '');
  if (cleaned.startsWith('92') && cleaned.length >= 12) {
    cleaned = '0' + cleaned.slice(2);
  }
  return cleaned.slice(0, 11);
};

export default function BillCreate({ API_BASE_URL, prefillQuotation, onSaveSuccess, companyContact }) {
  const [billNumber, setBillNumber] = useState(`INV-${Date.now()}`);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState('');
  const [selectedTerms, setSelectedTerms] = useState([]);
  const [customTerm, setCustomTerm] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [amountReceived, setAmountReceived] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (prefillQuotation) {
      setCustomerName(prefillQuotation.customerName || '');
      setCustomerPhone(cleanPhone(prefillQuotation.customerPhone || ''));
      setCustomerAddress(prefillQuotation.customerAddress || '');
      setNotes(`Generated from Quotation #${prefillQuotation.quotationNumber}\n\n${prefillQuotation.notes || ''}`);
      if (Array.isArray(prefillQuotation.items)) {
        setItems(prefillQuotation.items.map(item => ({
          id: `item-${Date.now()}-${Math.random()}`,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          rate: item.rate,
          amount: item.amount
        })));
      }
      const discAmt = parseFloat(prefillQuotation.discountAmount) || 0;
      const discPercent = parseFloat(prefillQuotation.discount) || 0;
      if (discPercent > 0) {
        setDiscountType('percentage');
        setDiscountValue(discPercent);
      } else if (discAmt > 0) {
        setDiscountType('amount');
        setDiscountValue(discAmt);
      } else {
        setDiscountValue(0);
      }
    } else {
      setBillNumber(`INV-${Date.now()}`);
      setDate(new Date().toISOString().split('T')[0]);
      setCustomerName(''); setCustomerPhone(''); setCustomerAddress('');
      setItems([]); setNotes(''); setSelectedTerms([]); setCustomTerm('');
      setDiscountValue(0); setTaxRate(0); setAmountReceived(0);
    }
  }, [prefillQuotation]);

  useEffect(() => {
    const calcSubtotal = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const discVal = parseFloat(discountValue) || 0;
    const calcDiscAmt = discountType === 'percentage' ? (calcSubtotal * discVal) / 100 : discVal;
    const afterDiscount = calcSubtotal - calcDiscAmt;
    const taxPercent = parseFloat(taxRate) || 0;
    const calcTaxAmt = (afterDiscount * taxPercent) / 100;
    const calcTotal = afterDiscount + calcTaxAmt;
    const recAmt = parseFloat(amountReceived) || 0;

    setSubtotal(calcSubtotal);
    setDiscountAmount(calcDiscAmt);
    setTaxAmount(calcTaxAmt);
    setTotal(Math.max(0, calcTotal));
    setRemainingAmount(calcTotal - recAmt);
  }, [items, discountType, discountValue, taxRate, amountReceived]);

  const handleSave = async () => {
    if (!customerName.trim()) return alert('Please enter Customer Name.');
    if (!customerPhone) return alert('Please enter Customer Phone Number.');
    if (!customerPhone.startsWith('0')) return alert('Phone number must start with 0 (e.g. 03001234567).');
    if (customerPhone.length !== 11) return alert(`Phone number must be exactly 11 digits (currently ${customerPhone.length} digits).`);
    if (items.length === 0) return alert('Please add at least one item line.');
    for (const item of items) {
      if (!item.description || !item.quantity || !item.rate) return alert('Please complete all item lines.');
    }

    setIsSaving(true);
    const token = localStorage.getItem('wazir_admin_token');
    const payload = {
      billNumber, date, customerName, customerPhone, customerAddress,
      items: items.map(({ id, ...rest }) => rest),
      subtotal, discount: discountType === 'percentage' ? parseFloat(discountValue) : 0,
      discountAmount, taxRate: parseFloat(taxRate) || 0, taxAmount, total,
      amountReceived: parseFloat(amountReceived) || 0,
      notes: buildFullNotes(selectedTerms, customTerm, notes),
      quotationId: prefillQuotation ? prefillQuotation.id : null
    };

    try {
      const response = await fetch(`${API_BASE_URL}?action=create_bill&token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Bill invoice created and saved successfully!');
        if (onSaveSuccess) onSaveSuccess();
      } else {
        alert(result.error || 'Failed to save bill.');
      }
    } catch (err) {
      alert('Failed to connect to API server.');
    } finally {
      setIsSaving(false);
    }
  };

  const getBillObject = () => ({
    billNumber, date, customerName, customerPhone, customerAddress, items,
    subtotal, discount: discountType === 'percentage' ? parseFloat(discountValue) : 0,
    discountAmount, taxRate: parseFloat(taxRate) || 0, taxAmount, total,
    amountReceived: parseFloat(amountReceived) || 0, remainingAmount,
    notes: buildFullNotes(selectedTerms, customTerm, notes),
    status: amountReceived >= total ? 'paid' : (amountReceived > 0 ? 'advanced' : 'pending'),
    companyContact
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200/80 pb-4">
        <h3 className="text-xl font-extrabold text-slate-800">Create Official Bill / Invoice</h3>
        <p className="text-xs text-slate-500 mt-1">Generate receipts, tax invoices, and final project billing statements for customers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <CustomerInfoFields
            docNumber={billNumber} setDocNumber={setBillNumber} docNumberLabel="Invoice Number *"
            date={date} setDate={setDate} dateLabel="Invoice Date *" headerSectionTitle="1. Invoice details"
            customerName={customerName} setCustomerName={setCustomerName}
            customerPhone={customerPhone} setCustomerPhone={setCustomerPhone}
            customerAddress={customerAddress} setCustomerAddress={setCustomerAddress}
          />
          <ItemLineRows items={items} setItems={setItems} />
        </div>

        <div className="flex flex-col gap-5">
          <CalculationSummary
            subtotal={subtotal} discountType={discountType} setDiscountType={setDiscountType}
            discountValue={discountValue} setDiscountValue={setDiscountValue} discountAmount={discountAmount}
            total={total} isInvoice={true} taxRate={taxRate} setTaxRate={setTaxRate} taxAmount={taxAmount}
            amountReceived={amountReceived} setAmountReceived={setAmountReceived} remainingAmount={remainingAmount}
          />
          <StandardTermsSelector
            selectedTerms={selectedTerms} setSelectedTerms={setSelectedTerms}
            customTerm={customTerm} setCustomTerm={setCustomTerm} notes={notes} setNotes={setNotes}
          />
          <div className="flex flex-col gap-3">
            <button
              type="button" onClick={() => setShowPreview(true)}
              className="w-full py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Eye className="w-4 h-4 text-sky-500" /> Preview Bill / Invoice
            </button>
            <button
              type="button" onClick={handleSave} disabled={isSaving}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {isSaving ? 'Saving Invoice...' : 'Save & Issue Bill'}
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <BillPreview
          bill={getBillObject()}
          open={showPreview}
          companyContact={companyContact}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
