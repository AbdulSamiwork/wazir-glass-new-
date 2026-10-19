import React from 'react';
import { 
  Globe, LayoutGrid, Scale, ClipboardList, 
  Calculator, User, ArrowLeft, ChevronRight 
} from 'lucide-react';
import { tabs, legalTabs, billingTabs, toolsTabs } from './sidebarConfig';

export default function AdminSidebar({
  activeTab,
  onSelectTab,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  siteInfoExpanded,
  setSiteInfoExpanded,
  legalExpanded,
  setLegalExpanded,
  billingExpanded,
  setBillingExpanded,
  toolsExpanded,
  setToolsExpanded
}) {
  const handleTabClick = (tabId) => {
    onSelectTab(tabId);
    setMobileSidebarOpen(false);
  };

  const renderSubmenu = (tabList) => (
    tabList.map(tab => {
      const isActive = activeTab === tab.id;
      return (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`group wazir-subtab-btn flex items-center gap-2.5 w-full py-2.5 text-[12px] font-semibold transition-all ${
            isActive
              ? 'bg-sky-50/50 text-sky-600 font-bold border-l-2 border-sky-500'
              : 'text-slate-500 hover:text-sky-600 hover:bg-slate-50/30'
          }`}
        >
          {React.cloneElement(tab.icon, { 
            className: `w-3.5 h-3.5 transition-colors ${isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-sky-500'}` 
          })}
          <span>{tab.name}</span>
        </button>
      );
    })
  );

  return (
    <>
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-[40] lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      <aside className={`wazir-admin-sidebar bg-white border-r border-slate-200/90 fixed top-0 left-0 h-full z-[50] lg:relative lg:top-auto lg:left-auto lg:h-auto lg:z-auto w-[280px] sm:w-72 max-w-[85vw] flex flex-col gap-2 overflow-y-auto flex-shrink-0 transition-transform duration-300 ease-in-out ${
        mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-slate-200 flex-shrink-0 bg-white">
          <span className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">Navigation</span>
          <button onClick={() => setMobileSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-2 p-5 md:p-6 overflow-y-auto flex-1">
          <span className="block px-2 text-[10px] font-extrabold text-sky-600 uppercase tracking-[0.2em] mb-1.5 font-mono">CRM & Analytics</span>
          
          <button
            onClick={() => handleTabClick('analytics')}
            className={`wazir-parent-tab flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-4 h-4" />
              <span>📊 Analytics Dashboard</span>
            </div>
          </button>

          <span className="block px-2 text-[10px] font-extrabold text-sky-600 uppercase tracking-[0.2em] mt-5 mb-1.5 font-mono">Website Sections</span>
        
          {/* Site Info Collapsible */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setSiteInfoExpanded(prev => !prev);
                if (!tabs.some(t => t.id === activeTab)) onSelectTab('hero');
              }}
              className={`wazir-parent-tab flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[13px] font-semibold transition-all ${
                tabs.some(t => t.id === activeTab) ? 'bg-sky-50 text-sky-600 border border-sky-100/50 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3"><Globe className="w-4 h-4" /><span>Site Info</span></div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-350 ${siteInfoExpanded ? 'rotate-90' : ''} ${tabs.some(t => t.id === activeTab) ? 'text-sky-600' : 'text-slate-400'}`} />
            </button>
            <div className={`wazir-admin-submenu-container ml-3 pl-3 border-l border-slate-200/60 flex flex-col gap-0.5 ${siteInfoExpanded ? 'expanded' : ''}`}>
              {renderSubmenu(tabs)}
            </div>
          </div>

          {/* Legal & Policies Collapsible */}
          <div className="flex flex-col gap-1 mt-1">
            <button
              onClick={() => {
                setLegalExpanded(prev => !prev);
                if (!legalTabs.some(t => t.id === activeTab)) onSelectTab('termsAndConditions');
              }}
              className={`wazir-parent-tab flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[13px] font-semibold transition-all ${
                legalTabs.some(t => t.id === activeTab) ? 'bg-sky-50 text-sky-600 border border-sky-100/50 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3"><Scale className="w-4 h-4" /><span>Legal & Policies</span></div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-350 ${legalExpanded ? 'rotate-90' : ''} ${legalTabs.some(t => t.id === activeTab) ? 'text-sky-600' : 'text-slate-400'}`} />
            </button>
            <div className={`wazir-admin-submenu-container ml-3 pl-3 border-l border-slate-200/60 flex flex-col gap-0.5 ${legalExpanded ? 'expanded' : ''}`}>
              {renderSubmenu(legalTabs)}
            </div>
          </div>

          {/* Lead & Billing Collapsible */}
          <div className="flex flex-col gap-1 mt-1">
            <button
              onClick={() => {
                setBillingExpanded(prev => !prev);
                if (!billingTabs.some(t => t.id === activeTab)) onSelectTab('quoteRequests');
              }}
              className={`wazir-parent-tab flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[13px] font-semibold transition-all ${
                billingTabs.some(t => t.id === activeTab) ? 'bg-sky-50 text-sky-600 border border-sky-100/50 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3"><ClipboardList className="w-4 h-4" /><span>Lead & Billing System</span></div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-350 ${billingExpanded ? 'rotate-90' : ''} ${billingTabs.some(t => t.id === activeTab) ? 'text-sky-600' : 'text-slate-400'}`} />
            </button>
            <div className={`wazir-admin-submenu-container ml-3 pl-3 border-l border-slate-200/60 flex flex-col gap-0.5 ${billingExpanded ? 'expanded' : ''}`}>
              {renderSubmenu(billingTabs)}
            </div>
          </div>

          {/* Business Tools Collapsible */}
          <div className="flex flex-col gap-1 mt-1">
            <button
              onClick={() => {
                setToolsExpanded(prev => !prev);
                if (!toolsTabs.some(t => t.id === activeTab)) onSelectTab('estimateCalculator');
              }}
              className={`wazir-parent-tab flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[13px] font-semibold transition-all ${
                toolsTabs.some(t => t.id === activeTab) ? 'bg-sky-50 text-sky-600 border border-sky-100/50 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3"><Calculator className="w-4 h-4" /><span>Business Tools</span></div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-350 ${toolsExpanded ? 'rotate-90' : ''} ${toolsTabs.some(t => t.id === activeTab) ? 'text-sky-600' : 'text-slate-400'}`} />
            </button>
            <div className={`wazir-admin-submenu-container ml-3 pl-3 border-l border-slate-200/60 flex flex-col gap-0.5 ${toolsExpanded ? 'expanded' : ''}`}>
              {renderSubmenu(toolsTabs)}
            </div>
          </div>

          <div className="h-px bg-slate-200 my-3" />

          {/* Admin Account Button */}
          <button
            onClick={() => handleTabClick('security')}
            className={`wazir-parent-tab flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === 'security' ? 'bg-sky-50 text-sky-600 border border-sky-100/50 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Admin Account</span>
          </button>

          {/* Mobile Back Button */}
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileSidebarOpen(false);
                window.location.href = '/#home';
              }}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-sky-600 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-sky-500" />
              <span>Return to Live Website</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
