import React, { useState } from 'react';
import { User, LogIn, Loader, AlertTriangle, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin({
  username,
  setUsername,
  password,
  setPassword,
  loginError,
  isLoggingIn,
  onSubmit
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden select-none p-4 sm:p-6 font-outfit">
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-sky-500/10 blur-[100px] sm:blur-[150px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-cyan-500/10 blur-[100px] sm:blur-[150px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white border border-slate-200/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500" />
          
          <div className="flex flex-col items-center mb-8 mt-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-500 to-cyan-500 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-sky-500/20 mb-4 transition-transform hover:scale-105 duration-300">
              W
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-outfit">
              Wazir Executive Portal
            </h2>
            <p className="text-[10px] font-bold text-sky-600 mt-1.5 font-mono uppercase tracking-[0.2em]">
              Command & Control Center
            </p>
          </div>

          {loginError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex gap-3 text-left mb-6 leading-relaxed shadow-sm backdrop-blur-md">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="flex flex-col gap-5 text-left">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em] mb-2 font-mono">
                Executive Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin identifier"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-slate-900 text-sm transition-all font-mono shadow-inner placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em] mb-2 font-mono">
                Security Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none text-slate-900 text-sm transition-all font-mono shadow-inner placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  tabIndex={-1}
                  className="absolute right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5 text-slate-500" />
                  ) : (
                    <Eye className="w-4.5 h-4.5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-sky-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <Loader className="w-4.5 h-4.5 animate-spin text-white" />
                ) : (
                  <LogIn className="w-4.5 h-4.5 text-white" />
                )}
                Authenticate Dashboard
              </button>
            </div>
          </form>

          <button
            onClick={() => {
              window.location.href = '/#home';
            }}
            className="mt-6 flex items-center justify-center gap-2 w-full text-xs font-bold text-slate-500 hover:text-sky-600 transition-colors uppercase tracking-widest font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Website
          </button>
        </div>
      </div>
    </div>
  );
}
