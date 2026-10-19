import React, { useState, useEffect, useMemo } from 'react';
import { MessageSquare, AlertCircle } from 'lucide-react';
import AnalyticsHeader from './analytics/AnalyticsHeader';
import AnalyticsKpiCards from './analytics/AnalyticsKpiCards';
import AnalyticsDistributionChart from './analytics/AnalyticsDistributionChart';
import AnalyticsFilterBar from './analytics/AnalyticsFilterBar';
import LeadCardItem from './analytics/LeadCardItem';
import { exportLeadsCsv } from './analytics/exportLeadsCsv';

export default function AnalyticsDashboard({ API_BASE_URL, onConvertToQuotation }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setErrorMsg('');
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const res = await fetch(`${API_BASE_URL}?action=get_quote_requests&token=${token}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to load CRM leads.');
      const data = await res.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      } else {
        throw new Error('Invalid server response.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Could not load leads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const res = await fetch(`${API_BASE_URL}?action=update_quote_request_status&token=${token}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${id}&status=${encodeURIComponent(newStatus)}&token=${encodeURIComponent(token)}`
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setInquiries(prev => prev.map(item => (item.id === id ? { ...item, status: newStatus } : item)));
      } else {
        alert(result.error || 'Failed to update status.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while updating status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!await window.customConfirm('Are you sure you want to delete this lead?')) return;
    const token = localStorage.getItem('wazir_admin_token') || '';
    try {
      const res = await fetch(`${API_BASE_URL}?action=delete_quote_request&id=${id}&token=${token}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setInquiries(prev => prev.filter(item => item.id !== id));
      } else {
        alert(result.error || 'Failed to delete lead.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete lead.');
    }
  };

  const stats = useMemo(() => {
    const total = inquiries.length;
    const newCount = inquiries.filter(i => !i.status || i.status === 'New').length;
    const contactedCount = inquiries.filter(i => i.status === 'Contacted').length;
    const quotedCount = inquiries.filter(i => i.status === 'Quoted').length;
    const wonCount = inquiries.filter(i => i.status === 'Converted (Won)').length;

    const categories = {};
    inquiries.forEach(i => {
      const type = i.service_type || 'General Glazing';
      categories[type] = (categories[type] || 0) + 1;
    });

    let topCategory = 'None';
    let maxCount = 0;
    Object.entries(categories).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = cat;
      }
    });

    const estimatedValue = total * 85000;
    return { total, newCount, contactedCount, quotedCount, wonCount, categories, topCategory, estimatedValue };
  }, [inquiries]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(item => {
      const matchesSearch =
        !searchQuery ||
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.phone && item.phone.includes(searchQuery)) ||
        (item.service_type && item.service_type.toLowerCase().includes(searchQuery.toLowerCase()));

      const itemStatus = item.status || 'New';
      const matchesStatus = statusFilter === 'ALL' || itemStatus === statusFilter;
      const matchesService = serviceFilter === 'ALL' || item.service_type === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [inquiries, searchQuery, statusFilter, serviceFilter]);

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-3 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-mono text-xs uppercase tracking-widest font-bold">Loading CRM Analytics & Leads...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <AnalyticsHeader
        onRefresh={fetchInquiries}
        onExport={() => exportLeadsCsv(inquiries)}
      />

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <AnalyticsKpiCards stats={stats} />
      <AnalyticsDistributionChart stats={stats} />

      <AnalyticsFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        inquiriesLength={inquiries.length}
        stats={stats}
      />

      {filteredInquiries.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-200 rounded-3xl text-slate-400 bg-white shadow-sm p-4">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <p className="font-bold text-sm text-slate-600">No matching leads found</p>
          <p className="text-xs mt-1">Try resetting your search filters or check back later for new website inquiries.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredInquiries.map((lead) => (
            <LeadCardItem
              key={lead.id}
              lead={lead}
              updatingId={updatingId}
              handleStatusChange={handleStatusChange}
              handleDelete={handleDelete}
              onConvertToQuotation={onConvertToQuotation}
            />
          ))}
        </div>
      )}
    </div>
  );
}
