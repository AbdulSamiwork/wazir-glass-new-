import React, { useState, useEffect } from 'react';
import { Save, ArrowLeft, CheckCircle } from 'lucide-react';
import InspectionList from './inspection/InspectionList';
import InspectionClientFields from './inspection/InspectionClientFields';
import InspectionItemsTable from './inspection/InspectionItemsTable';

export default function SiteInspectionSheet({ onConvertToQuotation, API_BASE_URL }) {
  const [view, setView] = useState('list');
  const [inspections, setInspections] = useState([]);
  const [message, setMessage] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [inspectionDate, setInspectionDate] = useState(new Date().toISOString().slice(0, 10));
  const [technicianName, setTechnicianName] = useState('Engineer Wazir');
  const [items, setItems] = useState([
    { id: 1, type: 'glazing', description: 'Main Front Shopfront', width: '12', height: '10', quantity: '120', unit: 'sft', specification: '12mm Clear Tempered Safety Glass', profileOrNotes: 'Frameless Patch Fitting' }
  ]);
  const [generalNotes, setGeneralNotes] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wazir_site_inspections');
      if (saved) {
        setInspections(JSON.parse(saved));
      } else {
        const sample = [{
          id: Date.now(), clientName: 'Malik Tariq Sahib', clientPhone: '0300-9876543',
          siteAddress: 'Plaza 42, Block H, DHA Phase 6, Lahore', inspectionDate: new Date().toISOString().slice(0, 10),
          technicianName: 'Master Karigar Arshad',
          items: [
            { id: 1, type: 'glazing', description: 'Ground Floor Entrance Door', width: '8', height: '8', quantity: '64', unit: 'sft', specification: '12mm Clear Tempered Safety Glass', profileOrNotes: 'Frameless Patch System' },
            { id: 2, type: 'glazing', description: 'First Floor Windows', width: '20', height: '6', quantity: '120', unit: 'sft', specification: '8mm Tinted Grey Glass', profileOrNotes: 'Chawla Sliding Profile' },
            { id: 3, type: 'hardware', description: 'Floor Spring Hinge Machine', width: '', height: '', quantity: '2', unit: 'set', specification: 'Dorma Brand 150kg', profileOrNotes: 'Floor cutout required' }
          ],
          generalNotes: 'Customer requested quick delivery within 7 working days.'
        }];
        setInspections(sample);
        localStorage.setItem('wazir_site_inspections', JSON.stringify(sample));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveToStorage = (updated) => {
    setInspections(updated);
    localStorage.setItem('wazir_site_inspections', JSON.stringify(updated));
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 4000);
  };

  const handleCreateNew = () => {
    setCurrentId(null); setClientName(''); setClientPhone(''); setSiteAddress('');
    setInspectionDate(new Date().toISOString().slice(0, 10)); setTechnicianName('Engineer Wazir');
    setItems([{ id: Date.now(), type: 'glazing', description: '', width: '', height: '', quantity: '0', unit: 'sft', specification: '12mm Tempered Safety Glass', profileOrNotes: '' }]);
    setGeneralNotes(''); setView('form');
  };

  const handleEdit = (insp) => {
    setCurrentId(insp.id); setClientName(insp.clientName || ''); setClientPhone(insp.clientPhone || '');
    setSiteAddress(insp.siteAddress || ''); setInspectionDate(insp.inspectionDate || new Date().toISOString().slice(0, 10));
    setTechnicianName(insp.technicianName || ''); setItems(insp.items || []); setGeneralNotes(insp.generalNotes || '');
    setView('form');
  };

  const handleDelete = async (id) => {
    if (!await window.customConfirm('Are you sure you want to delete this site measurement & hardware schedule?')) return;
    const filtered = inspections.filter(x => x.id !== id);
    saveToStorage(filtered);
    showMessage('🗑️ Site inspection sheet deleted successfully!');
  };

  const handleAddItem = (type = 'glazing') => {
    setItems([...items, {
      id: Date.now(), type, description: '', width: '', height: '',
      quantity: type === 'glazing' ? '0' : '1', unit: type === 'glazing' ? 'sft' : 'pcs',
      specification: type === 'glazing' ? '12mm Tempered Glass' : '304 Grade Stainless Steel', profileOrNotes: ''
    }]);
  };

  const handleRemoveItem = (idx) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleItemChange = (idx, field, value) => {
    const list = [...items];
    list[idx][field] = value;
    if (field === 'type') {
      list[idx].unit = value === 'glazing' ? 'sft' : 'pcs';
      list[idx].specification = value === 'glazing' ? '12mm Tempered Glass' : '304 Stainless Steel / Heavy Duty';
    }
    if ((field === 'width' || field === 'height') && list[idx].type === 'glazing') {
      const w = parseFloat(list[idx].width) || 0;
      const h = parseFloat(list[idx].height) || 0;
      if (w > 0 && h > 0) list[idx].quantity = (w * h).toFixed(1);
    }
    setItems(list);
  };

  const handleSaveSheet = (e) => {
    e.preventDefault();
    if (!clientName.trim()) return alert('Please enter client name');
    const sheetData = {
      id: currentId || Date.now(), clientName, clientPhone, siteAddress,
      inspectionDate, technicianName, items, generalNotes, updatedAt: new Date().toISOString()
    };
    const updated = currentId ? inspections.map(x => x.id === currentId ? sheetData : x) : [sheetData, ...inspections];
    saveToStorage(updated);
    showMessage('✅ Site Measurement & Hardware Sheet saved successfully!');
    setView('list');
  };

  const triggerConvertToQuote = (insp) => {
    if (!onConvertToQuotation) return alert('Quotation module not linked.');
    const quoteItems = (insp.items || []).map((it, idx) => {
      const isHw = it.type === 'hardware' || ['pcs', 'set', 'pair', 'box'].includes(it.unit);
      const desc = isHw
        ? `[Hardware / Fitting] ${it.description} (${it.specification || 'Standard'}) ${it.profileOrNotes ? '• Notes: ' + it.profileOrNotes : ''}`
        : `[Glazing / Profile] ${it.description} ${it.width && it.height ? `(${it.width}x${it.height} ${it.unit})` : ''} - ${it.specification} ${it.profileOrNotes ? 'with ' + it.profileOrNotes : ''}`;
      const qty = parseFloat(it.quantity) || 1;
      const rate = isHw ? 4500 : 850;
      return { id: Date.now() + idx, description: desc, quantity: qty, unit: it.unit || (isHw ? 'pcs' : 'sft'), rate, amount: qty * rate };
    });
    onConvertToQuotation({
      name: insp.clientName, phone: insp.clientPhone, location: insp.siteAddress,
      service_type: 'Glazing & Hardware Project',
      project_details: `Converted from Site Schedule #${insp.id}.\nInspector: ${insp.technicianName}\nNotes: ${insp.generalNotes || 'N/A'}`
    });
  };

  const getTotalGlazingArea = (list) => list.filter(i => i.type === 'glazing' || ['sft', 'rft'].includes(i.unit)).reduce((s, i) => s + (parseFloat(i.quantity) || 0), 0).toFixed(1);
  const getTotalHardwareCount = (list) => list.filter(i => i.type === 'hardware' || (!['sft', 'rft'].includes(i.unit) && i.type !== 'glazing')).reduce((s, i) => s + (parseFloat(i.quantity) || 0), 0);

  return (
    <div className="flex flex-col gap-6 text-left">
      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 font-semibold shadow-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {view === 'list' ? (
        <InspectionList
          inspections={inspections} handleCreateNew={handleCreateNew} handleEdit={handleEdit}
          handleDelete={handleDelete} triggerConvertToQuote={triggerConvertToQuote}
          getTotalGlazingArea={getTotalGlazingArea} getTotalHardwareCount={getTotalHardwareCount}
        />
      ) : (
        <div className="flex flex-col gap-6">
          <div className="border-b border-slate-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-800">{currentId ? 'Edit Site Measurement Sheet' : 'Record New Site Measurement Sheet'}</h3>
              <p className="text-xs text-slate-500 mt-1">Enter precise glazing dimensions AND hardware/fitting accessories measured at site.</p>
            </div>
            <button onClick={() => setView('list')} className="min-h-[40px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0">
              <ArrowLeft className="w-4 h-4" /> <span>Back to List</span>
            </button>
          </div>

          <form onSubmit={handleSaveSheet} className="flex flex-col gap-6">
            <InspectionClientFields
              inspectionDate={inspectionDate} setInspectionDate={setInspectionDate}
              technicianName={technicianName} setTechnicianName={setTechnicianName}
              clientName={clientName} setClientName={setClientName}
              clientPhone={clientPhone} setClientPhone={setClientPhone}
              siteAddress={siteAddress} setSiteAddress={setSiteAddress}
            />
            <InspectionItemsTable
              items={items} handleAddItem={handleAddItem} handleItemChange={handleItemChange}
              handleRemoveItem={handleRemoveItem} getTotalGlazingArea={getTotalGlazingArea}
              getTotalHardwareCount={getTotalHardwareCount}
            />
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 flex flex-col gap-5 shadow-sm">
              <h4 className="text-sm font-bold text-sky-600 uppercase tracking-wider border-b border-slate-100 pb-3">4. Site Observations & Notes</h4>
              <textarea rows="3" placeholder="Write any site observations, floor leveling issues, power availability, or special instructions..." value={generalNotes} onChange={(e) => setGeneralNotes(e.target.value)} className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-sm shadow-sm focus:border-sky-500 outline-none" />
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button type="button" onClick={() => setView('list')} className="min-h-[48px] px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors">Cancel</button>
              <button type="submit" className="min-h-[48px] px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-sky-500/20 transition-transform active:scale-95">
                <Save className="w-4 h-4" /> <span>Save Measurement Sheet</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
