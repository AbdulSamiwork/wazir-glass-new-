import React from 'react';
import { ShieldCheck, Save, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

export default function UpdateCredentialsFormSection({
  secForm,
  setSecForm,
  secStatus,
  isUpdatingSec,
  handleUpdateSecurity
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
      <div className="border-b border-slate-200/80 pb-4">
        <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" /> Update My Credentials
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Change username or password for your currently logged in account.
        </p>
      </div>

      {secStatus.message && (
        <div
          className={`p-4 rounded-xl text-xs flex gap-3 text-left border ${
            secStatus.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {secStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          )}
          <span>{secStatus.message}</span>
        </div>
      )}

      <form onSubmit={handleUpdateSecurity} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              New Username (Optional)
            </label>
            <input
              type="text"
              placeholder="Leave blank to keep current"
              value={secForm.newUsername}
              onChange={(e) => setSecForm({ ...secForm, newUsername: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:border-emerald-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Current Password (Required)
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={secForm.currentPassword}
              onChange={(e) => setSecForm({ ...secForm, currentPassword: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:border-emerald-500 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              New Password (Optional)
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={secForm.newPassword}
              onChange={(e) => setSecForm({ ...secForm, newPassword: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:border-emerald-500 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={secForm.confirmPassword}
              onChange={(e) => setSecForm({ ...secForm, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:border-emerald-500 outline-none font-mono"
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isUpdatingSec}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
          >
            {isUpdatingSec ? <Loader className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4" />}
            Update My Credentials
          </button>
        </div>
      </form>
    </div>
  );
}
