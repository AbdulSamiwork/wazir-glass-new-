import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import AdminHeader from './admin/layout/AdminHeader';
import AdminSidebar from './admin/layout/AdminSidebar';
import AdminLogin from './admin/layout/AdminLogin';
import AdminTabContent from './admin/layout/AdminTabContent';
import { useAdminListEditor } from '../hooks/useAdminListEditor';
import { API_BASE_URL, normalizeSiteData } from '../utils/apiConfig';

export default function AdminPanel({ onSaveSuccess }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [localData, setLocalData] = useState(null);
  const [activeTab, setActiveTab] = useState('analytics');
  const [siteInfoExpanded, setSiteInfoExpanded] = useState(true);
  const [legalExpanded, setLegalExpanded] = useState(true);
  const [billingExpanded, setBillingExpanded] = useState(false);
  const [toolsExpanded, setToolsExpanded] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [prefillQuotation, setPrefillQuotation] = useState(null);
  const [prefillBill, setPrefillBill] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
  const [isUploading, setIsUploading] = useState(false);

  const listEditor = useAdminListEditor(setLocalData);

  useEffect(() => {
    const token = localStorage.getItem('wazir_admin_token');
    if (token) {
      setIsLoggedIn(true);
      setIsSuperAdmin(localStorage.getItem('wazir_admin_is_super') === 'true');
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && !localData) {
      const token = localStorage.getItem('wazir_admin_token');
      fetch(`${API_BASE_URL}?action=get`, {
        cache: 'no-store',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      })
        .then(res => res.json())
        .then(data => { if (data && !data.error) setLocalData(normalizeSiteData(data)); })
        .catch(err => console.error("Error fetching admin data:", err));
    }
  }, [isLoggedIn, localData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await fetch(`${API_BASE_URL}?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        localStorage.setItem('wazir_admin_token', result.token);
        localStorage.setItem('wazir_admin_is_super', result.is_superadmin);
        setIsSuperAdmin(result.is_superadmin);
        setIsLoggedIn(true);
      } else {
        setLoginError(result.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      setLoginError(isLocal
        ? 'Could not connect to PHP server. Make sure Apache & MySQL are running in XAMPP.'
        : `Could not connect to backend server (${API_BASE_URL}). Please verify backend files and database connection.`
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    const token = localStorage.getItem('wazir_admin_token');
    if (token) fetch(`${API_BASE_URL}?action=logout&token=${token}`, { method: 'POST' }).catch(() => {});
    localStorage.removeItem('wazir_admin_token');
    localStorage.removeItem('wazir_admin_is_super');
    sessionStorage.removeItem('wazir_secret_portal_unlocked');
    setIsLoggedIn(false);
    setIsSuperAdmin(false);
    setLocalData(null);
    window.location.hash = '#home';
  };

  const updateField = (sec, fld, val) => setLocalData(p => ({ ...p, [sec]: { ...p[sec], [fld]: val } }));

  const updateArrayField = (sec, idx, fld, val) => {
    setLocalData(p => { const copy = JSON.parse(JSON.stringify(p)); copy[sec][idx][fld] = val; return copy; });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus({ type: '', message: '' });
    try {
      const res = await fetch(`${API_BASE_URL}?action=save&token=${localStorage.getItem('wazir_admin_token')}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localData)
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSaveStatus({ type: 'success', message: 'All website contents saved successfully!' });
        if (onSaveSuccess) onSaveSuccess();
      } else {
        setSaveStatus({ type: 'error', message: result.error || 'Failed to save changes.' });
      }
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Network connection failure. Failed to save.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 5000);
    }
  };

  const handleFileUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    setSaveStatus({ type: 'info', message: 'Uploading image to Cloudinary CDN...' });
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API_BASE_URL}?action=upload&token=${localStorage.getItem('wazir_admin_token')}`, {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      if (res.ok && result.success) {
        callback(result.url);
        setSaveStatus({ type: 'success', message: 'Uploaded to Cloudinary CDN! Remember to save changes.' });
      } else {
        setSaveStatus({ type: 'error', message: result.error || 'Cloudinary upload failed.' });
      }
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Failed to upload image. Server connection error.' });
    } finally {
      setIsUploading(false);
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 5000);
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin username={username} setUsername={setUsername} password={password} setPassword={setPassword} loginError={loginError} isLoggingIn={isLoggingIn} onSubmit={handleLogin} />;
  }

  const editorProps = {
    localData, ...localData,
    updateField, onChange: updateField,
    updateArrayField, onArrayChange: updateArrayField,
    ...listEditor, handleFileUpload, onFileUpload: handleFileUpload
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-outfit text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      <AdminHeader onToggleSidebar={() => setMobileSidebarOpen(p => !p)} saveStatus={saveStatus} onSave={handleSave} isSaving={isSaving} isUploading={isUploading} onLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden relative">
        <AdminSidebar activeTab={activeTab} onSelectTab={setActiveTab} mobileSidebarOpen={mobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} siteInfoExpanded={siteInfoExpanded} setSiteInfoExpanded={setSiteInfoExpanded} legalExpanded={legalExpanded} setLegalExpanded={setLegalExpanded} billingExpanded={billingExpanded} setBillingExpanded={setBillingExpanded} toolsExpanded={toolsExpanded} setToolsExpanded={setToolsExpanded} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-50/50">
          <div className="max-w-5xl mx-auto space-y-6">
            {!localData && <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2"><Loader className="w-5 h-5 animate-spin text-sky-500" /> Loading website contents...</div>}
            {localData && (
              <AdminTabContent
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                localData={localData}
                setLocalData={setLocalData}
                handleSave={handleSave}
                editorProps={editorProps}
                API_BASE_URL={API_BASE_URL}
                isSuperAdmin={isSuperAdmin}
                prefillQuotation={prefillQuotation}
                setPrefillQuotation={setPrefillQuotation}
                prefillBill={prefillBill}
                setPrefillBill={setPrefillBill}
              />
            )}
          </div>
        </main>
      </div>
      {isUploading && (
        <div className="fixed bottom-6 left-6 z-50 px-4 py-3 bg-white border border-sky-200 text-sky-600 rounded-2xl flex items-center gap-3 text-xs shadow-xl shadow-slate-200/50 font-mono">
          <Loader className="w-4.5 h-4.5 animate-spin text-sky-500" />
          <span>UPLOADING IMAGE FILE TO SERVER...</span>
        </div>
      )}
    </div>
  );
}
