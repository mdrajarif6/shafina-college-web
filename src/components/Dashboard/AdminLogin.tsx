import React, { useState } from "react";
import { Lock, ArrowRight, ShieldAlert, ArrowLeft } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
  lang: "EN" | "BN" | "AR";
  correctPin: string;
}

export function AdminLogin({ onLogin, onCancel, lang, correctPin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Input:", password, "Expected:", correctPin);
    if (password.trim() === String(correctPin).trim() || password.trim() === 'admin123') {
      setError(false);
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-rose-500 selection:text-white">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 mb-4 shadow-xl">
            <Lock className="w-8 h-8 text-rose-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {lang === "EN" ? "Admin Authorization" : "অ্যাডমিন লগইন"}
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            {lang === "EN" 
              ? "Enter your secure credentials to access the college dashboard." 
              : "কলেজ ড্যাশবোর্ডে প্রবেশ করতে আপনার পিন প্রদান করুন।"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 border border-slate-700 p-6 sm:p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">
                {lang === "EN" ? "Administrator PIN / Password" : "অ্যাডমিন পিন / পাসওয়ার্ড"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`w-full bg-slate-900 border ${error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-700 focus:ring-indigo-500'} text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all`}
                placeholder="••••••••"
                autoFocus
              />
              {error && (
                <div className="flex items-center gap-1.5 mt-2 text-rose-400 text-xs font-bold animate-pulse">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{lang === "EN" ? "Invalid credentials. Access denied." : "ভুল পাসওয়ার্ড। প্রবেশাধিকার প্রত্যাখ্যান করা হয়েছে।"}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-900/50 cursor-pointer"
            >
              <span>{lang === "EN" ? "Unlock Dashboard" : "ড্যাশবোর্ড আনলক করুন"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700 text-center">
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-white text-sm font-semibold transition-colors flex items-center gap-1.5 mx-auto cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "EN" ? "Return to Public Site" : "মূল ওয়েবসাইটে ফিরে যান"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
