import React from 'react';
import { User, Plus, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

export default function NewAdminFormSection({
  newAdminForm,
  setNewAdminForm,
  newAdminStatus,
  isAddingAdmin,
  handleAddAdmin
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
      <div className="border-b border-slate-200/80 pb-4">
        <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-sky-500" /> Add New Admin Account
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Create a new sub-admin account to give someone access to this dashboard.
        </p>
      </div>

      {newAdminStatus.message && (
        <div
          className={`p-4 rounded-xl text-xs flex gap-3 text-left border ${
            newAdminStatus.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {newAdminStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          )}
          <span>{newAdminStatus.message}</span>
        </div>
      )}

      <form onSubmit={handleAddAdmin} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              New Username
            </label>
            <input
              type="text"
              required
              placeholder="e.g. manager"
              value={newAdminForm.username}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={newAdminForm.password}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:border-sky-500 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={newAdminForm.confirmPassword}
              onChange={(e) => setNewAdminForm({ ...newAdminForm, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:bg-white focus:border-sky-500 outline-none font-mono"
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isAddingAdmin}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-sky-700 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
          >
            {isAddingAdmin ? <Loader className="w-4 h-4 animate-spin text-sky-600" /> : <Plus className="w-4 h-4" />}
            Create Admin
          </button>
        </div>
      </form>
    </div>
  );
}
