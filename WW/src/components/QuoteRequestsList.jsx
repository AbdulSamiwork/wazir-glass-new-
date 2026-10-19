import React, { useState, useEffect } from 'react';
import { Trash2, Phone, Mail, MapPin, Clipboard, FilePlus, RefreshCw, AlertCircle, Search } from 'lucide-react';
import PaginationControls from './common/PaginationControls';

export default function QuoteRequestsList({ API_BASE_URL, onConvertToQuotation }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Server-side pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      params.append('page', String(currentPage));
      params.append('limit', String(pageSize));

      const response = await fetch(`${API_BASE_URL}?action=get_quote_requests&token=${token}&${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to load inquiries.');
      const data = await response.json();
      if (Array.isArray(data)) {
        setRequests(data);
        setTotalRecords(data.length);
        setTotalPages(1);
      } else if (data && data.data && Array.isArray(data.data)) {
        setRequests(data.data);
        if (data.pagination) {
          setTotalRecords(data.pagination.total || 0);
          setTotalPages(data.pagination.totalPages || 1);
        }
      } else {
        throw new Error('Malformed server response.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not load inquiries. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    fetchRequests();
  }, [searchTerm, currentPage, pageSize]);

  const handleDelete = async (id) => {
    if (!await window.customConfirm("Are you sure you want to delete this customer inquiry?")) return;
    setDeletingId(id);
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const response = await fetch(`${API_BASE_URL}?action=delete_quote_request&id=${id}&token=${token}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setRequests(prev => prev.filter(r => r.id !== id));
        setTotalRecords(prev => Math.max(0, prev - 1));
      } else {
        alert(result.error || 'Failed to delete inquiry.');
      }
    } catch (err) {
      console.error(err);
      alert('Network failure. Failed to delete inquiry.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mb-3" />
        <span className="font-mono text-xs uppercase tracking-wider">Loading Customer Inquiries...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-slate-800">Homepage Quote Inquiries</h3>
          <p className="text-xs text-slate-500 mt-1">Manage and respond to quote inquiries submitted by visitors on your website.</p>
        </div>
        <button 
          onClick={fetchRequests}
          className="self-start sm:self-auto p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-650 hover:text-slate-800 transition-colors shadow-sm flex items-center gap-2 text-xs font-bold"
          title="Refresh List"
        >
          <RefreshCw className="w-4 h-4 text-sky-500" />
          <span className="sm:hidden">Refresh Inquiries</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by customer name, phone, email, or service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs outline-none shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all text-left"
        />
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex gap-3 text-left">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {requests.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-200 rounded-3xl text-slate-400 bg-white shadow-sm p-4">
          <Clipboard className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <p className="font-bold text-sm text-slate-600">No inquiries found</p>
          <p className="text-xs mt-1">When customers submit the homepage quote request form, they will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((req) => (
            <div 
              key={req.id} 
              className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors text-left shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4 border-b border-slate-100 pb-4">
                <div className="min-w-0">
                  <h4 className="text-base font-extrabold text-slate-800 truncate">{req.name}</h4>
                  <span className="text-[10px] text-sky-600 font-mono font-bold uppercase tracking-wider block mt-0.5">
                    Requested: {req.service_type}
                  </span>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100/70">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(req.created_at).toLocaleString('en-GB')}
                  </span>
                  {req.location && (
                    <span className="text-xs text-slate-600 flex items-center gap-1.5 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[200px]">{req.location}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="flex flex-col gap-2.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Contact Details</span>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                    <a href={`tel:${req.phone}`} className="text-slate-800 hover:text-sky-600 transition-colors font-semibold font-mono">{req.phone}</a>
                  </div>
                  {req.email && (
                    <div className="flex items-center gap-2 min-w-0">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <a href={`mailto:${req.email}`} className="text-slate-700 hover:text-sky-600 transition-colors font-semibold font-mono truncate">{req.email}</a>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Project Requirements</span>
                  <p className="text-slate-700 bg-slate-50/70 p-3.5 sm:p-4 rounded-xl border border-slate-100/80 whitespace-pre-wrap leading-relaxed text-xs break-words">
                    {req.project_details}
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 border-t border-slate-100 pt-4 mt-1">
                <button
                  onClick={() => handleDelete(req.id)}
                  disabled={deletingId === req.id}
                  className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2.5 min-h-[42px] sm:min-h-0 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 text-xs font-bold text-red-500 transition-all disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Inquiry</span>
                </button>
                <button
                  onClick={() => onConvertToQuotation(req)}
                  className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-5 py-2.5 min-h-[42px] sm:min-h-0 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-sky-500/10 active:scale-[0.98]"
                >
                  <FilePlus className="w-4 h-4" />
                  <span>Convert to Quotation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && requests.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
}
