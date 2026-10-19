import React from 'react';
import { Shield, Loader, Save, X, Edit3, Trash2 } from 'lucide-react';

export default function AdminTableRow({
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
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="p-4">
        {admin.id === 1 ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-bold">
            <Shield className="w-3 h-3" /> 1 (Super)
          </span>
        ) : (
          admin.id
        )}
      </td>
      <td className="p-4">
        {isEditing ? (
          <input
            type="text"
            value={editForm.username}
            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs w-full outline-none focus:border-sky-500"
            placeholder="Username"
          />
        ) : (
          <span className="font-semibold text-slate-800">{admin.username}</span>
        )}
      </td>
      <td className="p-4">
        {isEditing ? (
          <input
            type="password"
            value={editForm.password}
            onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs w-full outline-none focus:border-sky-500"
            placeholder="New Password (Optional)"
          />
        ) : (
          <span className="text-xs text-slate-500">
            {new Date(admin.created_at).toLocaleString()}
          </span>
        )}
      </td>
      <td className="p-4 text-right">
        {isEditing ? (
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSaveEdit}
              disabled={isSaving}
              className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200"
            >
              {isSaving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => handleEditClick(admin)}
              className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors border border-slate-200"
              title="Edit Admin"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            {admin.id !== 1 && (
              <button
                onClick={() => handleDelete(admin.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-slate-200"
                title="Delete Admin"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}
