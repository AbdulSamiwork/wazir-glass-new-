import React, { useState } from 'react';
import { Share2, Plus, Sparkles } from 'lucide-react';
import SocialLinkCard from './footer/SocialLinkCard';
import { DEFAULT_SOCIALS } from '../../../utils/apiConfig';

export default function FooterEditor({ localData, updateField }) {
  const footer = localData?.footer || {};
  const socials = Array.isArray(footer.socials) ? footer.socials : DEFAULT_SOCIALS;

  const [newPlatformName, setNewPlatformName] = useState('');
  const [newPlatformUrl, setNewPlatformUrl] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleToggle = (index) => {
    const updated = socials.map((s, idx) => {
      if (idx === index) {
        return { ...s, enabled: s.enabled === false ? true : false };
      }
      return s;
    });
    updateField('footer', 'socials', updated);
  };

  const handleUrlChange = (index, value) => {
    const updated = socials.map((s, idx) => {
      if (idx === index) {
        return { ...s, url: value };
      }
      return s;
    });
    updateField('footer', 'socials', updated);
  };

  const handleRemove = (index) => {
    const updated = socials.filter((_, idx) => idx !== index);
    updateField('footer', 'socials', updated);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!newPlatformName.trim()) return;
    const id = newPlatformName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const newItem = {
      id: id || `custom_${Date.now()}`,
      name: newPlatformName.trim(),
      url: newPlatformUrl.trim(),
      enabled: true,
      isCustom: true
    };
    updateField('footer', 'socials', [...socials, newItem]);
    setNewPlatformName('');
    setNewPlatformUrl('');
    setShowAddForm(false);
  };

  const defaultIds = DEFAULT_SOCIALS.map(d => d.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="p-2 bg-sky-50 rounded-xl"><Share2 className="w-5 h-5 text-sky-500" /></div>
          <h3 className="text-xl font-extrabold text-slate-800">Footer &amp; Social Media Links</h3>
        </div>
        <p className="text-xs text-slate-500 pl-10">
          Manage footer brand tagline, copyright, and social media icons with show/hide toggles.
        </p>
      </div>

      {/* Brand & Copyright Settings */}
      <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
        <h4 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-2">
          Footer Text &amp; Copyright
        </h4>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Brand Tagline / Summary</label>
          <textarea
            rows="2"
            value={footer.tagline || ''}
            onChange={(e) => updateField('footer', 'tagline', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none leading-relaxed"
            placeholder="Wazir Glass & Aluminium Centre..."
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Copyright Notice</label>
          <input
            type="text"
            value={footer.copyright || ''}
            onChange={(e) => updateField('footer', 'copyright', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none"
            placeholder="© 2026 Wazir Glass & Aluminium Centre. All Rights Reserved."
          />
        </div>
      </div>

      {/* Social Media Profiles Management */}
      <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-sm font-extrabold text-slate-800">Social Media Profiles</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Toggle 'Show' or 'Hide' to control footer visibility. Enter target URL for each profile.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddForm(p => !p)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Social</span>
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleAddCustom} className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 flex flex-col gap-3">
            <span className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" /> Add Custom Platform
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Platform Name (e.g. Threads, Telegram)"
                value={newPlatformName}
                onChange={(e) => setNewPlatformName(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 outline-none"
                required
              />
              <input
                type="url"
                placeholder="Profile URL (e.g. https://t.me/yourchannel)"
                value={newPlatformUrl}
                onChange={(e) => setNewPlatformUrl(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200/60"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-sky-500 text-white hover:bg-sky-600"
              >
                Save Channel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {socials.map((item, index) => (
            <SocialLinkCard
              key={item.id || index}
              item={item}
              index={index}
              onToggle={handleToggle}
              onUrlChange={handleUrlChange}
              onRemove={handleRemove}
              isCustom={!defaultIds.includes(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
