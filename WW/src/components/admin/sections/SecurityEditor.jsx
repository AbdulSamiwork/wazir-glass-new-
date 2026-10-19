import React, { useState } from 'react';
import AdminsList from '../../AdminsList';
import NewAdminFormSection from './security/NewAdminFormSection';
import UpdateCredentialsFormSection from './security/UpdateCredentialsFormSection';

export default function SecurityEditor({ API_BASE_URL, isSuperAdmin }) {
  const [newAdminForm, setNewAdminForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [newAdminStatus, setNewAdminStatus] = useState({ type: '', message: '' });
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  const [secForm, setSecForm] = useState({ newUsername: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  const [secStatus, setSecStatus] = useState({ type: '', message: '' });
  const [isUpdatingSec, setIsUpdatingSec] = useState(false);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setNewAdminStatus({ type: '', message: '' });
    if (newAdminForm.password !== newAdminForm.confirmPassword) {
      setNewAdminStatus({ type: 'error', message: 'Passwords do not match' });
      return;
    }
    if (!newAdminForm.username || !newAdminForm.password) {
      setNewAdminStatus({ type: 'error', message: 'Please provide both username and password.' });
      return;
    }

    setIsAddingAdmin(true);
    const token = localStorage.getItem('wazir_admin_token');
    try {
      const response = await fetch(`${API_BASE_URL}?action=add_admin&token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newUsername: newAdminForm.username, newPassword: newAdminForm.password })
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setNewAdminStatus({ type: 'success', message: 'New admin account created successfully!' });
        setNewAdminForm({ username: '', password: '', confirmPassword: '' });
      } else {
        setNewAdminStatus({ type: 'error', message: result.error || 'Failed to create new admin.' });
      }
    } catch (err) {
      console.error(err);
      setNewAdminStatus({ type: 'error', message: 'Failed to connect to API server.' });
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const handleUpdateSecurity = async (e) => {
    e.preventDefault();
    setSecStatus({ type: '', message: '' });
    if (secForm.newPassword && secForm.newPassword !== secForm.confirmPassword) {
      setSecStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }
    if (!secForm.newUsername && !secForm.newPassword) {
      setSecStatus({ type: 'error', message: 'Please provide a new username or password to change.' });
      return;
    }

    setIsUpdatingSec(true);
    const token = localStorage.getItem('wazir_admin_token');
    try {
      const response = await fetch(`${API_BASE_URL}?action=update_credentials&token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(secForm)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSecStatus({ type: 'success', message: 'Credentials updated successfully!' });
        setSecForm({ newUsername: '', currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setSecStatus({ type: 'error', message: result.error || 'Failed to update credentials.' });
      }
    } catch (err) {
      console.error(err);
      setSecStatus({ type: 'error', message: 'Failed to connect to API server.' });
    } finally {
      setIsUpdatingSec(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {isSuperAdmin && <AdminsList API_BASE_URL={API_BASE_URL} />}

      <NewAdminFormSection
        newAdminForm={newAdminForm}
        setNewAdminForm={setNewAdminForm}
        newAdminStatus={newAdminStatus}
        isAddingAdmin={isAddingAdmin}
        handleAddAdmin={handleAddAdmin}
      />

      <UpdateCredentialsFormSection
        secForm={secForm}
        setSecForm={setSecForm}
        secStatus={secStatus}
        isUpdatingSec={isUpdatingSec}
        handleUpdateSecurity={handleUpdateSecurity}
      />
    </div>
  );
}
