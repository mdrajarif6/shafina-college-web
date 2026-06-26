import React from 'react';
import { Search, Plus, Trash2, Fingerprint, Clock, Calendar } from 'lucide-react';

export interface AttendanceRecord {
  id: number;
  student_id: string;
  date: string;
  time_in: string;
  time_out: string;
  status: string;
  device_id: string;
}

interface AttendanceProps {
  lang: "EN" | "BN" | "AR";
  attendance: AttendanceRecord[];
  setAttendance: (records: AttendanceRecord[]) => void;
}

export function Attendance({ lang, attendance, setAttendance }: AttendanceProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Manual Entry Form State
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [studentId, setStudentId] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [timeIn, setTimeIn] = React.useState('08:00 AM');
  const [timeOut, setTimeOut] = React.useState('04:00 PM');
  
  const handleAddAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord = {
      student_id: studentId,
      date: date,
      time_in: timeIn,
      time_out: timeOut,
      status: 'Present',
      device_id: 'Manual Entry'
    };

    fetch('api/attendance.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord)
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        // Refresh records
        fetch('api/attendance.php')
          .then(r => r.json())
          .then(data => setAttendance(data));
        
        setShowAddForm(false);
        setStudentId('');
      } else {
        alert("Failed to add attendance.");
      }
    })
    .catch(err => console.error(err));
  };

  const handleDelete = (id: number) => {
    if(!window.confirm(lang === 'EN' ? "Delete this record?" : "এই রেকর্ডটি মুছে ফেলতে চান?")) return;
    
    fetch(`api/attendance.php?id=${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setAttendance(attendance.filter(a => a.id !== id));
      }
    })
    .catch(err => console.error(err));
  };

  const filteredRecords = attendance.filter(a => 
    a.student_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.date.includes(searchTerm)
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden font-sans">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Fingerprint className="w-6 h-6 text-indigo-500" />
            {lang === 'EN' ? 'Biometric Attendance' : 'বায়োমেট্রিক উপস্থিতি'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {lang === 'EN' ? 'View automated attendance logs from biometric devices.' : 'বায়োমেট্রিক ডিভাইস থেকে স্বয়ংক্রিয় উপস্থিতির লগ দেখুন।'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={lang === 'EN' ? "Search ID or Date (YYYY-MM-DD)..." : "আইডি বা তারিখ খুঁজুন..."}
              className="pl-9 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'EN' ? 'Manual Entry' : 'ম্যানুয়াল এন্ট্রি'}</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-indigo-50/50">
          <form onSubmit={handleAddAttendance} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'EN' ? 'Student ID' : 'স্টুডেন্ট আইডি'}</label>
              <input type="text" required value={studentId} onChange={e => setStudentId(e.target.value)} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm" placeholder="STU-2026-001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'EN' ? 'Date' : 'তারিখ'}</label>
              <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'EN' ? 'Time In' : 'প্রবেশের সময়'}</label>
              <input type="text" value={timeIn} onChange={e => setTimeIn(e.target.value)} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm" placeholder="08:00 AM" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{lang === 'EN' ? 'Time Out' : 'প্রস্থানের সময়'}</label>
              <input type="text" value={timeOut} onChange={e => setTimeOut(e.target.value)} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm" placeholder="04:00 PM" />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                {lang === 'EN' ? 'Save' : 'সংরক্ষণ'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Date' : 'তারিখ'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Student ID' : 'স্টুডেন্ট আইডি'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Time In' : 'প্রবেশের সময়'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Time Out' : 'প্রস্থানের সময়'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Device/Method' : 'ডিভাইস'}</th>
              <th className="p-4 font-semibold text-right">{lang === 'EN' ? 'Actions' : 'পদক্ষেপ'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  {lang === 'EN' ? 'No attendance records found.' : 'কোন উপস্থিতির রেকর্ড পাওয়া যায়নি।'}
                </td>
              </tr>
            ) : (
              filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 dark:bg-slate-800/80 transition-colors">
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {record.date}
                  </td>
                  <td className="p-4 font-bold text-indigo-600 font-mono text-sm">{record.student_id}</td>
                  <td className="p-4 text-sm font-medium text-emerald-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {record.time_in || '--:--'}
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {record.time_out || '--:--'}
                  </td>
                  <td className="p-4 text-sm text-slate-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800">
                      {record.device_id}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(record.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors tooltip"
                      title={lang === 'EN' ? 'Delete' : 'মুছে ফেলুন'}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
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
