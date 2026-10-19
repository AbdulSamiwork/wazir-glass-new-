import React, { useState, useEffect, useMemo, useCallback } from 'react';
import BillPreview from './BillPreview';
import UpdatePaymentDialog from './UpdatePaymentDialog';
import BillHeader from './bills/BillHeader';
import BillSummaryCards from './bills/BillSummaryCards';
import BillFilterPills from './bills/BillFilterPills';
import BillListContainer from './bills/BillListContainer';
import PaginationControls from './common/PaginationControls';

export default function BillsList({ API_BASE_URL, onBillUpdate, defaultFilter = 'all', companyContact }) {
  const [bills, setBills] = useState([]);
  const [allBills, setAllBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(defaultFilter);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Server-side pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedBill, setSelectedBill] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [paymentUpdateBill, setPaymentUpdateBill] = useState(null);

  const fetchAllBills = useCallback(async () => {
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const res = await fetch(`${API_BASE_URL}?action=get_bills&token=${token}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setAllBills(data);
      else if (data && data.data && Array.isArray(data.data)) setAllBills(data.data);
    } catch {
      // Ignore background summary load error
    }
  }, [API_BASE_URL]);

  const fetchBills = useCallback(async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter !== 'all' && statusFilter !== 'dues') params.append('status', statusFilter);
      if (statusFilter === 'dues') params.append('dues_only', '1');
      params.append('page', String(currentPage));
      params.append('limit', String(pageSize));

      const response = await fetch(`${API_BASE_URL}?action=get_bills&token=${token}&${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to load bills.');
      const data = await response.json();
      if (Array.isArray(data)) {
        setBills(data);
        setTotalRecords(data.length);
        setTotalPages(1);
      } else if (data && data.data && Array.isArray(data.data)) {
        setBills(data.data);
        if (data.pagination) {
          setTotalRecords(data.pagination.total || 0);
          setTotalPages(data.pagination.totalPages || 1);
        }
      } else {
        throw new Error('Malformed server response.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Could not load bills.');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, searchTerm, statusFilter, currentPage, pageSize]);

  // Reset page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  useEffect(() => {
    fetchAllBills();
  }, [fetchAllBills]);

  const refreshAll = () => {
    fetchBills();
    fetchAllBills();
  };

  const summary = useMemo(() => {
    const totalRevenue = allBills.reduce((s, b) => s + (parseFloat(b.total) || 0), 0);
    const totalCollected = allBills.reduce((s, b) => s + (parseFloat(b.amountReceived) || 0), 0);
    const totalRemaining = allBills.reduce((s, b) => s + (parseFloat(b.remainingAmount) || 0), 0);
    const pendingCount = allBills.filter((b) => b.status === 'pending').length;
    const advancedCount = allBills.filter((b) => b.status === 'advanced').length;
    const paidCount = allBills.filter((b) => b.status === 'paid').length;
    return { totalRevenue, totalCollected, totalRemaining, pendingCount, advancedCount, paidCount };
  }, [allBills]);

  const handleMarkAsPaid = async (id, totalAmount) => {
    if (!await window.customConfirm('Are you sure you want to mark this bill as fully paid?')) return;
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const response = await fetch(`${API_BASE_URL}?action=update_bill&id=${id}&token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amountReceived: parseFloat(totalAmount), status: 'paid', token })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setBills((prev) =>
          prev.map((b) => (b.id === id ? { ...b, amountReceived: totalAmount, remainingAmount: 0, status: 'paid' } : b))
        );
        fetchAllBills();
        if (onBillUpdate) onBillUpdate();
      } else {
        alert(result.error || 'Failed to settle bill.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!await window.customConfirm('Are you sure you want to delete this bill invoice record? This is permanent.')) return;
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const response = await fetch(`${API_BASE_URL}?action=delete_bill&id=${id}&token=${token}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setBills((prev) => prev.filter((b) => b.id !== id));
        fetchAllBills();
        if (onBillUpdate) onBillUpdate();
      } else {
        alert(result.error || 'Failed to delete bill.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server.');
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const response = await fetch(`${API_BASE_URL}?action=update_bill&id=${id}&token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus, token })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setBills((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
        fetchAllBills();
        if (onBillUpdate) onBillUpdate();
      } else {
        alert(result.error || 'Failed to update tracking status.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server.');
    }
  };

  const fmt = (n) => parseFloat(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0 });

  return (
    <div className="flex flex-col gap-6 text-left">
      <BillHeader onRefresh={refreshAll} />
      <BillSummaryCards summary={summary} totalCount={allBills.length} fmt={fmt} />
      <BillFilterPills
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        allBillsCount={allBills.length}
        summary={summary}
      />

      <BillListContainer
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        error={error}
        loading={loading}
        bills={bills}
        fmt={fmt}
        handleUpdateStatus={handleUpdateStatus}
        setPaymentUpdateBill={setPaymentUpdateBill}
        handleMarkAsPaid={handleMarkAsPaid}
        setSelectedBill={setSelectedBill}
        setShowPreview={setShowPreview}
        handleDelete={handleDelete}
      />

      {!loading && bills.length > 0 && (
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

      {selectedBill && (
        <BillPreview
          bill={selectedBill}
          open={showPreview}
          companyContact={companyContact}
          onClose={() => { setSelectedBill(null); setShowPreview(false); }}
        />
      )}

      <UpdatePaymentDialog
        bill={paymentUpdateBill}
        open={!!paymentUpdateBill}
        onClose={() => setPaymentUpdateBill(null)}
        onUpdateSuccess={refreshAll}
        API_BASE_URL={API_BASE_URL}
      />
    </div>
  );
}
