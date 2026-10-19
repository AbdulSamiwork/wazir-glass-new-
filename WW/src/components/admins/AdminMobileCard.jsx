import React from 'react';
import { Shield, Loader, Save, Edit3, Trash2 } from 'lucide-react';

export default function AdminMobileCard({
  admin,
  editingAdmin,
  editForm,
  setEditForm,
  isSaving,
  handleSaveEdit,
  handleCancelEdit,
  handleEditClick,
  handleDelete
}) {
  const isEditing = editingAdmin === admin.id;

  return (
    <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {admin.id === 1 ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold">
              <Shield className="w-3.5 h-3.5" /> Super Admin
            </span>
          ) : (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-mono font-bold">
              ID #{admin.id}
            </span>
          )}
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          {new Date(admin.created_at).toLocaleDateString()}
        </span>
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-2.5 pt-1">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Username</label>
            <input
              type="text"
              value={editForm.username}
              onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white outline-none focus:border-sky-500"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">New Password</label>
            <input
              type="password"
              value={editForm.password}
              onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white outline-none focus:border-sky-500 font-mono"
              placeholder="Leave blank to keep current"
            />
          </div>
          <div className="flex gap-2 justify-end mt-1">
            <button
              onClick={handleSaveEdit}
              disabled={isSaving}
              className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save</span>
            </button>
            <button
              onClick={handleCancelEdit}
              className="py-2 px-4 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Username</span>
            <span className="text-base font-bold text-slate-900">{admin.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEditClick(admin)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-sky-600 hover:bg-sky-50 transition-colors"
              title="Edit Admin"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            {admin.id !== 1 && (
              <button
                onClick={() => handleDelete(admin.id)}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-red-500 hover:bg-red-50 transition-colors"
                title="Delete Admin"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
