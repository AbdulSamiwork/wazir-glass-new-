import React from 'react';
import { Phone } from 'lucide-react';
import AdditionalNumbersEditor from './contact/AdditionalNumbersEditor';

export default function ContactEditor({ localData, updateField }) {
  const contact = localData.contact || {};
  const additionalNumbers = contact.additionalNumbers || [];

  const handleNumChange = (idx, field, value) => {
    const list = [...additionalNumbers];
    list[idx] = { ...list[idx], [field]: value };
    updateField('contact', 'additionalNumbers', list);
  };

  const addNumber = () => {
    updateField('contact', 'additionalNumbers', [...additionalNumbers, { name: '', phone: '', phoneCall: '' }]);
  };

  const removeNumber = (idx) => {
    updateField('contact', 'additionalNumbers', additionalNumbers.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="p-2 bg-sky-50 rounded-xl"><Phone className="w-5 h-5 text-sky-500" /></div>
          <h3 className="text-xl font-extrabold text-slate-800">Company Information &amp; Contacts</h3>
        </div>
        <p className="text-xs text-slate-500 pl-10">Manage address, phones, email, hours, and map location coordinates.</p>
      </div>

      {/* Slogan & Badges */}
      <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
        <h4 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-2">Section Slogan &amp; Badges</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Contact Section Badge</label>
            <input
              type="text"
              value={contact.badge || ''}
              onChange={(e) => updateField('contact', 'badge', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Contact Slogan</label>
            <input
              type="text"
              value={contact.title || ''}
              onChange={(e) => updateField('contact', 'title', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Contact Description</label>
            <textarea
              rows="2"
              value={contact.description || ''}
              onChange={(e) => updateField('contact', 'description', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none resize-none"
            />
          </div>
        </div>
      </div>

      {/* Primary Contacts */}
      <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
        <h4 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-2">Primary Company Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company Display Name</label>
            <input
              type="text"
              value={contact.companyName || ''}
              onChange={(e) => updateField('contact', 'companyName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Business Hours</label>
            <input
              type="text"
              value={contact.businessHours || ''}
              onChange={(e) => updateField('contact', 'businessHours', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone Display (Text)</label>
            <input
              type="text"
              value={contact.phone || ''}
              onChange={(e) => updateField('contact', 'phone', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none font-semibold text-sky-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone Link URL (tel:...)</label>
            <input
              type="text"
              value={contact.phoneCall || ''}
              onChange={(e) => updateField('contact', 'phoneCall', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Correspondence</label>
            <input
              type="email"
              value={contact.email || ''}
              onChange={(e) => updateField('contact', 'email', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">WhatsApp Number</label>
            <input
              type="text"
              value={contact.whatsappNumber || ''}
              onChange={(e) => updateField('contact', 'whatsappNumber', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none font-semibold text-emerald-600"
            />
          </div>
        </div>

        <AdditionalNumbersEditor
          additionalNumbers={additionalNumbers}
          handleNumChange={handleNumChange}
          addNumber={addNumber}
          removeNumber={removeNumber}
        />
      </div>

      {/* Address & Google Maps */}
      <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
        <h4 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-2">Location &amp; Google Maps Embed</h4>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Office Address</label>
            <input
              type="text"
              value={contact.address || ''}
              onChange={(e) => updateField('contact', 'address', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Google Maps Embed URL (iframe src)</label>
            <textarea
              rows="2"
              value={contact.mapEmbedUrl || ''}
              onChange={(e) => {
                let val = e.target.value;
                if (val.includes('<iframe')) {
                  const m = val.match(/src=["']([^"']+)["']/i);
                  if (m) val = m[1];
                }
                if (val.includes('"')) {
                  val = val.split('"')[0];
                }
                updateField('contact', 'mapEmbedUrl', val.trim());
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:border-sky-500 outline-none resize-none font-mono"
              placeholder="Paste Google Maps embed URL or iframe code..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
