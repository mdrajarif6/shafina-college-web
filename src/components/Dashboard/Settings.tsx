import React, { useState } from 'react';
import { Save, Lock, Phone, Mail, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

type SettingsProps = {
  lang: "EN" | "BN" | "AR";
  settings: any;
  setSettings: (s: any) => void;
};

export function Settings({ lang, settings, setSettings }: SettingsProps) {
  const [formData, setFormData] = useState({
    admin_pin: settings.admin_pin || '',
    contact_phone: settings.contact_phone || '',
    contact_email: settings.contact_email || '',
    contact_address: settings.contact_address || '',
    maintenance_mode: settings.maintenance_mode || 'false'
  });
  
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');

    fetch('api/settings.php', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setSettings(formData);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    })
    .catch(err => {
      console.error(err);
      setSaveStatus('error');
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-extrabold text-2xl text-slate-800 dark:text-slate-200">
            {lang === "EN" ? "System Settings" : "সিস্টেম সেটিংস"}
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            {lang === "EN" ? "Manage global college configurations." : "কলেজের গ্লোবাল কনফিগারেশন পরিচালনা করুন।"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Security Settings */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b">
            <Lock className="text-indigo-600 w-5 h-5" />
            <h4 className="font-bold text-slate-700 dark:text-slate-300">Security Settings</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Admin Dashboard PIN</label>
              <input 
                type="text" 
                name="admin_pin"
                required 
                value={formData.admin_pin} 
                onChange={handleChange} 
                className="w-full border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
              />
              <p className="text-xs text-slate-400 mt-1">This PIN is required to unlock the Admin Dashboard.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Maintenance Mode</label>
              <select 
                name="maintenance_mode"
                value={formData.maintenance_mode} 
                onChange={handleChange} 
                className="w-full border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-white dark:bg-slate-900"
              >
                <option value="false">Disabled (Live)</option>
                <option value="true">Enabled (Offline)</option>
              </select>
              <p className="text-xs text-slate-400 mt-1">If enabled, students cannot access the site.</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b">
            <Phone className="text-indigo-600 w-5 h-5" />
            <h4 className="font-bold text-slate-700 dark:text-slate-300">College Contact Info</h4>
          </div>
          <p className="text-xs text-slate-500 mb-4">Updating these fields will automatically change the contact information displayed on the public website header and footer.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Official Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  name="contact_phone"
                  required 
                  value={formData.contact_phone} 
                  onChange={handleChange} 
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Official Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  name="contact_email"
                  required 
                  value={formData.contact_email} 
                  onChange={handleChange} 
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-600 mb-1">College Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  name="contact_address"
                  required 
                  value={formData.contact_address} 
                  onChange={handleChange} 
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          {saveStatus === 'success' && (
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-sm">
              <CheckCircle className="w-4 h-4" /> Settings Saved!
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="flex items-center gap-1.5 text-rose-600 font-semibold text-sm">
              <AlertTriangle className="w-4 h-4" /> Failed to save
            </span>
          )}
          
          <button 
            type="submit" 
            disabled={saveStatus === 'saving'}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-indigo-200"
          >
            <Save className="w-5 h-5" />
            {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

      </form>
    </div>
  );
}
