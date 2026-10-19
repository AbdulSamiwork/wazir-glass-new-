import React from 'react';
import HeroEditor from '../sections/HeroEditor';
import AboutEditor from '../sections/AboutEditor';
import CategoriesEditor from '../sections/CategoriesEditor';
import FeaturedProductsEditor from '../sections/FeaturedProductsEditor';
import ServicesEditor from '../sections/ServicesEditor';
import WhyChooseUsEditor from '../sections/WhyChooseUsEditor';
import BeforeAfterEditor from '../sections/BeforeAfterEditor';
import GalleryEditor from '../sections/GalleryEditor';
import TimelineEditor from '../sections/TimelineEditor';
import TestimonialsEditor from '../sections/TestimonialsEditor';
import ContactEditor from '../sections/ContactEditor';
import FooterEditor from '../sections/FooterEditor';
import SecurityEditor from '../sections/SecurityEditor';
import PrivacyPolicyEditor from '../../PrivacyPolicyEditor';
import TermsEditor from '../../TermsEditor';
import AnalyticsDashboard from '../../AnalyticsDashboard';
import QuoteRequestsList from '../../QuoteRequestsList';
import QuotationsList from '../../QuotationsList';
import QuotationCreate from '../../QuotationCreate';
import BillsList from '../../BillsList';
import BillCreate from '../../BillCreate';
import EstimateCalculator from '../../EstimateCalculator';
import PortfolioGenerator from '../../PortfolioGenerator';
import SiteInspectionSheet from '../../SiteInspectionSheet';

export default function AdminTabContent({
  activeTab,
  setActiveTab,
  localData,
  setLocalData,
  handleSave,
  editorProps,
  API_BASE_URL,
  isSuperAdmin,
  prefillQuotation,
  setPrefillQuotation,
  prefillBill,
  setPrefillBill
}) {
  if (activeTab === 'hero') return <HeroEditor {...editorProps} />;
  if (activeTab === 'about') return <AboutEditor {...editorProps} />;
  if (activeTab === 'categories') return <CategoriesEditor {...editorProps} />;
  if (activeTab === 'featuredProducts') return <FeaturedProductsEditor {...editorProps} />;
  if (activeTab === 'services') return <ServicesEditor {...editorProps} />;
  if (activeTab === 'whyChooseUs') return <WhyChooseUsEditor {...editorProps} />;
  if (activeTab === 'beforeAfter') return <BeforeAfterEditor {...editorProps} />;
  if (activeTab === 'gallery') return <GalleryEditor {...editorProps} />;
  if (activeTab === 'timeline') return <TimelineEditor localData={localData} updateField={editorProps.updateField} />;
  if (activeTab === 'testimonials') return <TestimonialsEditor {...editorProps} />;
  if (activeTab === 'contact') return <ContactEditor localData={localData} updateField={editorProps.updateField} />;
  if (activeTab === 'footer') return <FooterEditor localData={localData} updateField={editorProps.updateField} />;
  if (activeTab === 'privacyPolicy') return <PrivacyPolicyEditor data={localData.privacyPolicy} onUpdate={(p) => setLocalData(prev => ({ ...prev, privacyPolicy: p }))} onSave={handleSave} />;
  if (activeTab === 'termsAndConditions') return <TermsEditor data={localData.termsAndConditions} onUpdate={(t) => setLocalData(prev => ({ ...prev, termsAndConditions: t }))} onSave={handleSave} />;
  if (activeTab === 'analytics') return <AnalyticsDashboard API_BASE_URL={API_BASE_URL} onConvertToQuotation={(r) => { setPrefillQuotation(r); setActiveTab('quotationCreate'); }} />;
  if (activeTab === 'quoteRequests') return <QuoteRequestsList API_BASE_URL={API_BASE_URL} onConvertToQuotation={(r) => { setPrefillQuotation(r); setActiveTab('quotationCreate'); }} />;
  if (activeTab === 'estimateCalculator') return <EstimateCalculator />;
  if (activeTab === 'portfolioGenerator') return <PortfolioGenerator siteData={localData} />;
  if (activeTab === 'siteInspection') return <SiteInspectionSheet API_BASE_URL={API_BASE_URL} onConvertToQuotation={(d) => { setPrefillQuotation(d); setActiveTab('quotationCreate'); }} />;
  if (activeTab === 'quotationsList') return <QuotationsList API_BASE_URL={API_BASE_URL} companyContact={localData?.contact} onConvertToBill={(q) => { setPrefillBill(q); setActiveTab('billCreate'); }} />;
  if (activeTab === 'quotationCreate') return <QuotationCreate API_BASE_URL={API_BASE_URL} companyContact={localData?.contact} prefillData={prefillQuotation} onSaveSuccess={() => { setPrefillQuotation(null); setActiveTab('quotationsList'); }} />;
  if (activeTab === 'billsList') return <BillsList API_BASE_URL={API_BASE_URL} companyContact={localData?.contact} />;
  if (activeTab === 'remainingDues') return <BillsList API_BASE_URL={API_BASE_URL} companyContact={localData?.contact} defaultFilter="dues" />;
  if (activeTab === 'billCreate') return <BillCreate API_BASE_URL={API_BASE_URL} companyContact={localData?.contact} prefillQuotation={prefillBill} onSaveSuccess={() => { setPrefillBill(null); setActiveTab('billsList'); }} />;
  if (activeTab === 'security') return <SecurityEditor API_BASE_URL={API_BASE_URL} isSuperAdmin={isSuperAdmin} />;
  return null;
}
