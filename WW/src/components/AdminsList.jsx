import React, { useState, useEffect } from 'react';
import { Loader, AlertTriangle, Shield } from 'lucide-react';
import AdminTableRow from './admins/AdminTableRow';
import AdminMobileCard from './admins/AdminMobileCard';

export default function AdminsList({ API_BASE_URL }) {
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', password: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('wazir_admin_token');
      const response = await fetch(`${API_BASE_URL}?action=get_admins&token=${token}`);
      const data = await response.json();

      if (response.ok && !data.error) {
        setAdmins(data);
      } else {
        setError(data.error || 'Failed to fetch admins.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error while fetching admins.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (admin) => {
    setEditingAdmin(admin.id);
    setEditForm({ username: admin.username, password: '' });
  };

  const handleCancelEdit = () => {
    setEditingAdmin(null);
    setEditForm({ username: '', password: '' });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editForm.username && !editForm.password) return;

    setIsSaving(true);
    try {
      const token = localStorage.getItem('wazir_admin_token');
      const response = await fetch(`${API_BASE_URL}?action=update_admin_by_super&token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin_id: editingAdmin,
          username: editForm.username,
          password: editForm.password
        })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        fetchAdmins();
        handleCancelEdit();
      } else {
        alert(result.error || 'Update failed');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (id === 1) {
      alert('Cannot delete the primary Super Admin.');
      return;
    }
    if (!await window.customConfirm('Are you sure you want to delete this admin account?')) return;

    try {
      const token = localStorage.getItem('wazir_admin_token');
      const response = await fetch(`${API_BASE_URL}?action=delete_admin&id=${id}&token=${token}`);
      const result = await response.json();
      if (response.ok && result.success) {
        fetchAdmins();
      } else {
        alert(result.error || 'Failed to delete');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center min-h-[200px]">
        <Loader className="w-8 h-8 animate-spin text-sky-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-2xl border border-red-200 shadow-sm flex items-center gap-3">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <span className="text-red-800 text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
      <div className="border-b border-slate-200/80 pb-4">
        <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-500" />
          Super Admin: Manage Admins
        </h3>
        <p className="text-xs text-slate-500 mt-1">View, update, or delete all sub-admin accounts.</p>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200 text-xs uppercase tracking-wider text-slate-500">
              <th className="p-4 font-bold rounded-tl-xl">ID</th>
              <th className="p-4 font-bold">Username</th>
              <th className="p-4 font-bold">Created At</th>
              <th className="p-4 font-bold text-right rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
            {admins.map((admin) => (
              <AdminTableRow
                key={admin.id}
                admin={admin}
                editingAdmin={editingAdmin}
                editForm={editForm}
                setEditForm={setEditForm}
                isSaving={isSaving}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
                handleEditClick={handleEditClick}
                handleDelete={handleDelete}
              />
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-500 text-sm">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-3.5">
        {admins.map((admin) => (
          <AdminMobileCard
            key={admin.id}
            admin={admin}
            editingAdmin={editingAdmin}
            editForm={editForm}
            setEditForm={setEditForm}
            isSaving={isSaving}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
        ))}
        {admins.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-sm">No admins found.</div>
        )}
      </div>
    </div>
  );
}
