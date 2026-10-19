import React from 'react';

export default function QuotationPrintStyles() {
  return (
    <style id="print-styles">
      {`
        @media print {
          @page {
            size: A4;
            margin: 0.4in;
          }
          body {
            font-family: Arial, sans-serif !important;
            background-color: #ffffff;
            color: #000000;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            font-size: 10pt;
          }
          #quotation-content {
            padding: 0 !important;
            border: 0 !important;
          }
          header { text-align: center; border-bottom: 2px solid #0284c7 !important; padding-bottom: 0.5rem !important; margin-bottom: 1rem !important; }
          h1 { color: #0284c7 !important; font-size: 20pt !important; margin: 0 !important; font-weight: 700 !important; }
          h3 { font-size: 10pt !important; font-weight: 700 !important; }
          p { font-size: 9pt !important; margin: 0; }
          .grid { display: grid !important; }
          .grid-cols-2, .print-party-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .print-totals-grid { display: grid !important; grid-template-columns: 3fr 2fr !important; gap: 1.5rem !important; }
          .gap-6 { gap: 1.5rem !important; }
          .bg-slate-50 { background-color: #f8fafc !important; border: 1px solid #f1f5f9 !important; padding: 0.75rem !important; border-radius: 0.5rem !important; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem !important; table-layout: fixed !important; }
          th { background-color: #0284c7 !important; color: #ffffff !important; font-size: 9pt !important; padding: 0.5rem !important; text-transform: uppercase !important; font-weight: 700 !important; }
          td { font-size: 9pt !important; padding: 0.5rem !important; border-bottom: 1px solid #e2e8f0 !important; vertical-align: top; }
          table thead th:nth-child(1), table tbody td:nth-child(1) { width: 7%; }
          table thead th:nth-child(2), table tbody td:nth-child(2) { width: 43%; text-align: left !important; }
          table thead th:nth-child(3), table tbody td:nth-child(3) { width: 12%; text-align: center !important; }
          table thead th:nth-child(4), table tbody td:nth-child(4) { width: 10%; text-align: center !important; }
          table thead th:nth-child(5), table tbody td:nth-child(5) { width: 14%; text-align: right !important; }
          table thead th:nth-child(6), table tbody td:nth-child(6) { width: 14%; text-align: right !important; }
          .text-right { text-align: right !important; }
          .font-mono { font-family: monospace !important; }
          .font-bold { font-weight: 700 !important; }
          .font-semibold { font-weight: 600 !important; }
          .bg-sky-50 { background-color: #f0f9ff !important; padding: 0.5rem 0.75rem !important; border-radius: 0.375rem !important; }
          .text-sky-850 { color: #0369a1 !important; }
          footer { border-top: 1px solid #e2e8f0 !important; padding-top: 1rem !important; text-align: center !important; font-size: 8pt !important; color: #94a3b8 !important; }
        }
      `}
    </style>
  );
}
