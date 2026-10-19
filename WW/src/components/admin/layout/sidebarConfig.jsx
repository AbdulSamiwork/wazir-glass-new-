import React from 'react';
import { 
  Globe, BookOpen, LayoutGrid, Layers, Settings, ShieldCheck, 
  Sliders, Image, ClipboardList, Heart, Phone, FileText, 
  CreditCard, Wallet, Plus, Calculator, FileImage, ClipboardCheck,
  Share2
} from 'lucide-react';

export const tabs = [
  { id: 'hero', name: 'Hero Banner', icon: <Globe className="w-4 h-4" /> },
  { id: 'about', name: 'About Wazir', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'categories', name: 'Product Categories', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'featuredProducts', name: 'Flagship Products', icon: <Layers className="w-4 h-4" /> },
  { id: 'services', name: 'Our Services', icon: <Settings className="w-4 h-4" /> },
  { id: 'whyChooseUs', name: 'Why Partner', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'beforeAfter', name: 'Before/After Slider', icon: <Sliders className="w-4 h-4" /> },
  { id: 'gallery', name: 'Project Gallery', icon: <Image className="w-4 h-4" /> },
  { id: 'timeline', name: 'Process Timeline', icon: <ClipboardList className="w-4 h-4" /> },
  { id: 'testimonials', name: 'Reviews / Feedback', icon: <Heart className="w-4 h-4" /> },
  { id: 'contact', name: 'Company Details', icon: <Phone className="w-4 h-4" /> },
  { id: 'footer', name: 'Footer & Socials', icon: <Share2 className="w-4 h-4" /> },
  { id: 'privacyPolicy', name: 'Privacy Policy', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'termsAndConditions', name: 'Terms of Service', icon: <FileText className="w-4 h-4" /> }
];

export const legalTabs = [
  { id: 'termsAndConditions', name: 'Terms of Service', icon: <FileText className="w-4 h-4" /> },
  { id: 'privacyPolicy', name: 'Privacy Policy', icon: <ShieldCheck className="w-4 h-4" /> }
];

export const billingTabs = [
  { id: 'quoteRequests', name: 'Inquiries & Leads', icon: <ClipboardList className="w-4 h-4" /> },
  { id: 'quotationsList', name: 'Quotations List', icon: <FileText className="w-4 h-4" /> },
  { id: 'quotationCreate', name: 'New Quotation', icon: <Plus className="w-4 h-4" /> },
  { id: 'billsList', name: 'Bills & Invoices', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'remainingDues', name: 'Remaining Dues', icon: <Wallet className="w-4 h-4" /> },
  { id: 'billCreate', name: 'New Bill / Invoice', icon: <Plus className="w-4 h-4" /> }
];

export const toolsTabs = [
  { id: 'estimateCalculator', name: 'Estimate Calculator', icon: <Calculator className="w-4 h-4" /> },
  { id: 'portfolioGenerator', name: 'Portfolio Generator', icon: <FileImage className="w-4 h-4" /> },
  { id: 'siteInspection', name: 'Site Inspection Sheet', icon: <ClipboardCheck className="w-4 h-4" /> }
];
