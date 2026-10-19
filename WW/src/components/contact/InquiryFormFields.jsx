import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, ChevronDown } from 'lucide-react';

export default function InquiryFormFields({
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
  submitted,
  errorMsg,
  servicesList
}) {
  return (
    <div className="lg:col-span-7">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden text-left border border-slate-200 shadow-xl">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-5"
            >
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-slate-900 text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="03001234567"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-slate-900 text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Required Service
                </label>
                <div className="relative">
                  <select
                    name="service"
                    id="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-slate-900 text-sm transition-colors appearance-none cursor-pointer"
                  >
                    {servicesList.map((item, idx) => (
                      <option key={idx} value={item} className="bg-white text-slate-900">
                        {item}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-slate-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Message / Dimensions
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your project, approx. measurements or styling preference..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-slate-900 text-sm transition-colors resize-none"
                />
              </div>

              {errorMsg && (
                <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 hover:scale-101 transition-all duration-300 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="w-4.5 h-4.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4.5 h-4.5" />
                  )}
                  {isSubmitting ? 'Registering In-progress...' : 'Get a Free Quote for Your Glass & Aluminium Project'}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">Inquiry Sent Successfully</h4>
              <p className="text-xs text-slate-600 mt-2 max-w-sm leading-relaxed">
                Thank you! Your inquiry was successfully registered. Our manager will contact you on your phone number shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
