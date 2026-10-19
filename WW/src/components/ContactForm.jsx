import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ContactInfoCard from './contact/ContactInfoCard';
import InquiryFormFields from './contact/InquiryFormFields';
import { API_BASE_URL } from '../utils/apiConfig';

export default function ContactForm({ data }) {
  const badge = data?.badge || "Estimate Pricing";
  const sectionTitle = data?.title || "Get a Free Project Quote";
  const sectionDesc = data?.description || "Fill out the inquiry form below, and our fabrication manager will review your dimensions and get in touch within 24 hours.";

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Aluminium Windows',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesList = [
    "Aluminium Windows",
    "Aluminium Doors",
    "Glass Doors",
    "Glass Partitions",
    "Shop Front Glass",
    "Office Glass Cabins",
    "Mirrors",
    "Shower Glass",
    "Sliding Windows",
    "Aluminium Frames",
    "Glass Railing",
    "Custom Glass Work"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const response = await fetch(`${API_BASE_URL}?action=submit_quote_request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitted(true);
        if (window.fbq) {
          window.fbq('track', 'Lead', { content_name: formData.service, content_category: 'Quote Request' });
        }
        setFormData({ name: '', phone: '', service: 'Aluminium Windows', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setErrorMsg(result.error || 'Failed to submit quote request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Could not connect to database server. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-200 relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-sm font-bold text-sky-400 uppercase tracking-widest">
            {badge}
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 metallic-text">
            {sectionTitle}
          </h3>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed">
            {sectionDesc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <ContactInfoCard data={data} />
          <InquiryFormFields
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitted={submitted}
            errorMsg={errorMsg}
            servicesList={servicesList}
          />
        </div>
      </div>
    </section>
  );
}
