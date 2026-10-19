import React, { useState, useEffect } from 'react';
import { Eye, Save } from 'lucide-react';
import QuotationPreview from './QuotationPreview';
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

export default function QuotationCreate({ API_BASE_URL, prefillData, onSaveSuccess, companyContact }) {
  const [quotationNumber, setQuotationNumber] = useState(`QTN-${Date.now()}`);
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
  const [subtotal, setSubtotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (prefillData) {
      setCustomerName(prefillData.name || prefillData.customerName || '');
      setCustomerPhone(cleanPhone(prefillData.phone || prefillData.customerPhone || ''));
      setCustomerAddress(prefillData.customerAddress || prefillData.location || prefillData.address || '');
      setNotes(`Converted from Inquiry ID #${prefillData.id || ''}\nService Category: ${prefillData.service_type || 'Custom Glass & Glazing'}\nInquiry Details: ${prefillData.project_details || ''}`);
      setItems([{
        id: `item-${Date.now()}`,
        description: prefillData.service_type || 'Glass fabrication work',
        quantity: 1,
        unit: 'pcs',
        rate: 0,
        amount: 0
      }]);
    } else {
      setQuotationNumber(`QTN-${Date.now()}`);
      setDate(new Date().toISOString().split('T')[0]);
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
      setItems([]);
      setNotes('');
      setSelectedTerms([]);
      setCustomTerm('');
      setDiscountValue(0);
    }
  }, [prefillData]);

  useEffect(() => {
    const calcSubtotal = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const discVal = parseFloat(discountValue) || 0;
    const calcDiscAmt = discountType === 'percentage' ? (calcSubtotal * discVal) / 100 : discVal;
    setSubtotal(calcSubtotal);
    setDiscountAmount(calcDiscAmt);
    setTotal(Math.max(0, calcSubtotal - calcDiscAmt));
  }, [items, discountType, discountValue]);

  const handleSave = async () => {
    if (!customerName.trim()) return alert('Please enter customer full name.');
    if (!customerPhone.startsWith('0')) return alert('Phone number must start with 0 (e.g. 03001234567).');
    if (customerPhone.length !== 11) return alert(`Phone number must be exactly 11 digits (currently ${customerPhone.length} digits).`);
    if (items.length === 0) return alert('Please add at least one item line.');
    for (const item of items) {
      if (!item.description || !item.quantity || !item.rate) {
        return alert('Please complete all item lines: Description, Quantity, and Rate are required.');
      }
    }

    setIsSaving(true);
    const token = localStorage.getItem('wazir_admin_token');
    const payload = {
      quotationNumber,
      date,
      customerName,
      customerPhone,
      customerAddress,
      items: items.map(({ id, ...rest }) => rest),
      subtotal,
      discount: discountType === 'percentage' ? parseFloat(discountValue) : 0,
      discountAmount,
      total,
      notes: buildFullNotes(selectedTerms, customTerm, notes)
    };

    try {
      const response = await fetch(`${API_BASE_URL}?action=create_quotation&token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Quotation saved successfully!');
        if (onSaveSuccess) onSaveSuccess();
      } else {
        alert(result.error || 'Failed to save quotation.');
      }
    } catch (err) {
      alert('Could not save. Server connection issue.');
    } finally {
      setIsSaving(false);
    }
  };

  const getQuotationObject = () => ({
    quotationNumber, date, customerName, customerPhone, customerAddress, items,
    subtotal, discount: discountType === 'percentage' ? parseFloat(discountValue) : 0,
    discountAmount, total, notes: buildFullNotes(selectedTerms, customTerm, notes),
    companyContact
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200/80 pb-4">
        <h3 className="text-xl font-extrabold text-slate-800">Create New Quotation</h3>
        <p className="text-xs text-slate-500 mt-1">Generate official structural estimates and glass design quotes for clients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <CustomerInfoFields
            docNumber={quotationNumber} setDocNumber={setQuotationNumber} docNumberLabel="Quotation Number *"
            date={date} setDate={setDate} dateLabel="Quotation Date *" headerSectionTitle="1. Estimation Header"
            customerName={customerName} setCustomerName={setCustomerName}
            customerPhone={customerPhone} setCustomerPhone={setCustomerPhone}
            customerAddress={customerAddress} setCustomerAddress={setCustomerAddress}
          />
          <ItemLineRows items={items} setItems={setItems} />
        </div>

        <div className="flex flex-col gap-5">
          <CalculationSummary
            subtotal={subtotal} discountType={discountType} setDiscountType={setDiscountType}
            discountValue={discountValue} setDiscountValue={setDiscountValue} discountAmount={discountAmount} total={total}
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
              <Eye className="w-4 h-4 text-sky-500" /> Preview Quotation
            </button>
            <button
              type="button" onClick={handleSave} disabled={isSaving}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {isSaving ? 'Saving Estimate...' : 'Save & Issue Quotation'}
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <QuotationPreview
          quotation={getQuotationObject()}
          open={showPreview}
          companyContact={companyContact}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
