import React from 'react';
import { Search, AlertCircle, ClipboardList } from 'lucide-react';
import BillListItem from './BillListItem';

export default function BillListContainer({
  searchTerm,
  setSearchTerm,
  error,
  loading,
  bills,
  fmt,
  handleUpdateStatus,
  setPaymentUpdateBill,
  handleMarkAsPaid,
  setSelectedBill,
  setShowPreview,
  handleDelete
}) {
  return (
    <>
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by invoice number, customer name, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs outline-none shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
        />
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex gap-3 text-left">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-500">
          <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-3" />
          <span className="font-mono text-xs uppercase tracking-wider">Retrieving Invoices...</span>
        </div>
      ) : bills.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-200 rounded-3xl text-slate-400 bg-white shadow-sm p-4">
          <ClipboardList className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <p className="font-bold text-sm text-slate-600">No bills found</p>
          <p className="text-xs mt-1">Try refining your search terms or create a new bill.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bills.map((b) => (
            <BillListItem
              key={b.id}
              b={b}
              fmt={fmt}
              handleUpdateStatus={handleUpdateStatus}
              setPaymentUpdateBill={setPaymentUpdateBill}
              handleMarkAsPaid={handleMarkAsPaid}
              setSelectedBill={setSelectedBill}
              setShowPreview={setShowPreview}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}
