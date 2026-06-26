import React from 'react';
import { Search, CheckCircle, XCircle, Clock, Filter, FileText } from 'lucide-react';

export interface Application {
  applicationID: string;
  applicantName: string;
  applicantPhone: string;
  selectedProgram: string;
  applicantGpa: string;
  dateSubmitted: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface ApplicationsProps {
  lang: 'EN' | 'BN';
  applications: Application[];
  setApplications: (apps: Application[]) => void;
}

export function Applications({ lang, applications, setApplications }: ApplicationsProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const updateStatus = (id: string, newStatus: 'Pending' | 'Approved' | 'Rejected') => {
    fetch('api/applications.php', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ application_id: id, status: newStatus })
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setApplications(
          applications.map(app => (app.applicationID === id ? { ...app, status: newStatus } : app))
        );
      } else {
        alert("Failed to update status in database.");
      }
    })
    .catch(err => console.error(err));
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.applicationID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.applicantPhone.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-sans">
      {/* Header and Controls */}
      <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            {lang === 'EN' ? 'Student Applications' : 'শিক্ষার্থীর আবেদনসমূহ'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {lang === 'EN' ? 'Manage and review online admission requests.' : 'অনলাইন ভর্তির আবেদনসমূহ পর্যালোচনা ও পরিচালনা করুন।'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={lang === 'EN' ? "Search ID or Name..." : "আইডি বা নাম খুঁজুন..."}
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              className="pl-9 pr-8 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
            >
              <option value="All">{lang === 'EN' ? 'All Status' : 'সকল অবস্থা'}</option>
              <option value="Pending">{lang === 'EN' ? 'Pending' : 'অপেক্ষমাণ'}</option>
              <option value="Approved">{lang === 'EN' ? 'Approved' : 'অনুমোদিত'}</option>
              <option value="Rejected">{lang === 'EN' ? 'Rejected' : 'বাতিল'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Applicant' : 'আবেদনকারী'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Program' : 'প্রোগ্রাম'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'GPA' : 'জিপিএ'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Date' : 'তারিখ'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Status' : 'অবস্থা'}</th>
              <th className="p-4 font-semibold text-right">{lang === 'EN' ? 'Actions' : 'পদক্ষেপ'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  {lang === 'EN' ? 'No applications found matching your criteria.' : 'আপনার অনুসন্ধানের সাথে মিলিয়ে কোন আবেদন পাওয়া যায়নি।'}
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app.applicationID} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{app.applicantName}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{app.applicationID}</span>
                      <span>•</span>
                      <span>{app.applicantPhone}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-700">
                    {app.selectedProgram}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {app.applicantGpa}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600 whitespace-nowrap">
                    {app.dateSubmitted}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {app.status === 'Approved' && <CheckCircle className="w-3.5 h-3.5" />}
                      {app.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
                      {app.status === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                      {app.status === 'Approved' ? (lang === 'EN' ? 'Approved' : 'অনুমোদিত') : 
                       app.status === 'Rejected' ? (lang === 'EN' ? 'Rejected' : 'বাতিল') : 
                       (lang === 'EN' ? 'Pending' : 'অপেক্ষমাণ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {app.status === 'Pending' && (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateStatus(app.applicationID, 'Approved')}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors tooltip"
                          title={lang === 'EN' ? "Approve" : "অনুমোদন করুন"}
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => updateStatus(app.applicationID, 'Rejected')}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors tooltip"
                          title={lang === 'EN' ? "Reject" : "বাতিল করুন"}
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    {app.status !== 'Pending' && (
                      <button 
                        onClick={() => updateStatus(app.applicationID, 'Pending')}
                        className="text-xs text-slate-400 hover:text-indigo-600 font-medium underline transition-colors"
                      >
                        {lang === 'EN' ? 'Reset Status' : 'রিসেট করুন'}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
