import React, { useState, useEffect, useMemo } from 'react';
import { Search, AlertCircle, ClipboardList } from 'lucide-react';
import QuotationPreview from './QuotationPreview';
import QuotationHeader from './quotations/QuotationHeader';
import QuotationSummaryCards from './quotations/QuotationSummaryCards';
import QuotationFilterPills from './quotations/QuotationFilterPills';
import QuotationListItem from './quotations/QuotationListItem';
import PaginationControls from './common/PaginationControls';

export default function QuotationsList({ API_BASE_URL, onConvertToBill, onQuotationsUpdate, companyContact }) {
  const [quotations, setQuotations] = useState([]);
  const [allQuotations, setAllQuotations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Server-side pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const fetchQuotations = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('wazir_admin_token');
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      params.append('page', String(currentPage));
      params.append('limit', String(pageSize));

      const response = await fetch(`${API_BASE_URL}?action=get_quotations&token=${token}&${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to load quotations.');
      const data = await response.json();
      if (Array.isArray(data)) {
        setQuotations(data);
        setTotalRecords(data.length);
        setTotalPages(1);
      } else if (data && data.data && Array.isArray(data.data)) {
        setQuotations(data.data);
        if (data.pagination) {
          setTotalRecords(data.pagination.total || 0);
          setTotalPages(data.pagination.totalPages || 1);
        }
      } else {
        throw new Error('Malformed server response.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not connect to API server.');
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    fetchQuotations();
  }, [searchTerm, statusFilter, currentPage, pageSize]);

  // Fetch all quotations (unfiltered) for summary cards
  useEffect(() => {
    const token = localStorage.getItem('wazir_admin_token') || '';
    fetch(`${API_BASE_URL}?action=get_quotations&token=${token}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setAllQuotations(d);
      })
      .catch(() => {});
  }, [quotations]);

  const summary = useMemo(() => {
    const totalEstimateValue = allQuotations.reduce((s, q) => s + (parseFloat(q.total) || 0), 0);
    const pendingCount = allQuotations.filter((q) => q.status === 'pending').length;
    const acceptedCount = allQuotations.filter((q) => q.status === 'accepted').length;
    const convertedCount = allQuotations.filter((q) => q.status === 'converted').length;
    const rejectedCount = allQuotations.filter((q) => q.status === 'rejected').length;
    return { totalEstimateValue, pendingCount, acceptedCount, convertedCount, rejectedCount };
  }, [allQuotations]);

  const handleUpdateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const response = await fetch(`${API_BASE_URL}?action=update_quotation&id=${id}&token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus, token })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setQuotations((prev) => prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q)));
        if (onQuotationsUpdate) onQuotationsUpdate();
      } else {
        alert(result.error || 'Failed to update quotation status.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server.');
    }
  };

  const handleDelete = async (id) => {
    if (!await window.customConfirm('Are you sure you want to delete this quotation estimate? This action is permanent.')) return;
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const response = await fetch(`${API_BASE_URL}?action=delete_quotation&id=${id}&token=${token}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setQuotations((prev) => prev.filter((q) => q.id !== id));
        if (onQuotationsUpdate) onQuotationsUpdate();
      } else {
        alert(result.error || 'Failed to delete quotation.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete quotation.');
    }
  };

  const fmt = (n) => parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0 });

  return (
    <div className="flex flex-col gap-6 text-left">
      <QuotationHeader onRefresh={fetchQuotations} />
      <QuotationSummaryCards summary={summary} allQuotationsCount={allQuotations.length} fmt={fmt} />
      <QuotationFilterPills
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        allQuotationsCount={allQuotations.length}
        summary={summary}
      />

      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by quote number, customer name, or phone..."
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
          <span className="font-mono text-xs uppercase tracking-wider">Retrieving Quotations...</span>
        </div>
      ) : quotations.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-200 rounded-3xl text-slate-400 bg-white shadow-sm p-4">
          <ClipboardList className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <p className="font-bold text-sm text-slate-600">No quotations found</p>
          <p className="text-xs mt-1">Try refining your search terms or create a new quotation.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {quotations.map((q) => (
            <QuotationListItem
              key={q.id}
              q={q}
              fmt={fmt}
              handleUpdateStatus={handleUpdateStatus}
              onConvertToBill={onConvertToBill}
              setSelectedQuotation={setSelectedQuotation}
              setShowPreview={setShowPreview}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {!loading && quotations.length > 0 && (
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

      {selectedQuotation && (
        <QuotationPreview
          quotation={selectedQuotation}
          open={showPreview}
          companyContact={companyContact}
          onClose={() => {
            setSelectedQuotation(null);
            setShowPreview(false);
          }}
        />
      )}
    </div>
  );
}
