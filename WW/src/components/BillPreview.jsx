import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import BillToolbar from './bill/BillToolbar';
import BillDocumentBody from './bill/BillDocumentBody';
import BillPrintStyles from './bill/BillPrintStyles';
import { openPrintWindow, captureElementToPdf, shareOrSendWhatsApp } from '../utils/documentExportUtils';

export default function BillPreview({ bill, open = true, onClose, companyContact }) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!open || !bill) return null;

  const contact = companyContact || bill.companyContact || {};
  const companyName = contact.companyName || 'Wazir Glass & Aluminium Centre';

  const handlePrint = () => {
    openPrintWindow({
      contentId: 'bill-content',
      stylesId: 'bill-print-styles',
      title: `Invoice ${bill.billNumber}`
    });
  };

  const generatePdf = async () => {
    setIsGenerating(true);
    try {
      return await captureElementToPdf({
        elementId: 'bill-content',
        actionsId: 'bill-preview-actions'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    const pdf = await generatePdf();
    if (!pdf) return;
    try {
      pdf.save(`Invoice-${bill.billNumber}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Failed to save PDF download.');
    }
  };

  const handleSendToWhatsApp = async () => {
    const phone = bill.customerPhone || bill.phone;
    if (!phone) {
      alert('No customer phone number found.');
      return;
    }

    const customerName = bill.customerName || 'Valued Customer';
    const message = `Assalam-O-Alikum ${customerName},
Please find your final bill invoice from ${companyName} attached.
-----------------------------------
Invoice No: ${bill.billNumber}
Total Amount: PKR ${parseFloat(bill.total || 0).toFixed(2)}
Remaining Due: PKR ${parseFloat(bill.remainingAmount || 0).toFixed(2)}
-----------------------------------
Thank you!`;

    const pdf = await generatePdf();
    if (!pdf) return;

    await shareOrSendWhatsApp({
      pdf,
      fileName: `Invoice-${bill.billNumber}.pdf`,
      title: `Invoice ${bill.billNumber}`,
      message,
      phone
    });
  };

  const discountAmount = parseFloat(bill.discountAmount) || 0;
  const taxAmount = parseFloat(bill.taxAmount) || 0;
  const amountReceived = parseFloat(bill.amountReceived) || 0;
  const formattedDate = bill.date ? new Date(bill.date).toLocaleDateString('en-GB') : '';

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-slate-950/50 backdrop-blur-sm px-1.5 py-2 sm:px-3 sm:py-3 overflow-y-auto">
      <div className="w-full max-w-[98vw] sm:max-w-[96vw] lg:max-w-5xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl relative flex flex-col max-h-[96vh] sm:max-h-[94vh] my-1 sm:my-2 text-left">
        <BillToolbar
          onClose={onClose}
          onPrint={handlePrint}
          onDownload={handleDownload}
          onWhatsApp={handleSendToWhatsApp}
        />

        {/* Capturable Document Area */}
        <div className="flex-1 min-h-0 overflow-auto rounded-xl sm:rounded-2xl bg-slate-100/70 border border-slate-200 shadow-inner p-1.5 sm:p-6 mx-2 sm:mx-5 mb-3 sm:mb-5">
          <div className="w-full flex justify-center">
            <BillDocumentBody
              bill={bill}
              formattedDate={formattedDate}
              discountAmount={discountAmount}
              taxAmount={taxAmount}
              amountReceived={amountReceived}
              companyContact={contact}
            />
          </div>
        </div>

        {/* Global Loading overlay */}
        {isGenerating && (
          <div className="absolute inset-0 z-40 bg-white/70 backdrop-blur-xs flex items-center justify-center rounded-3xl">
            <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-3 text-xs text-sky-600 font-mono shadow-2xl">
              <div className="w-4.5 h-4.5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
              <span>GENERATING INVOICE LAYOUT...</span>
            </div>
          </div>
        )}
      </div>

      <BillPrintStyles />
    </div>,
    document.body
  );
}
