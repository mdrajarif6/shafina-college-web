import React, { useState } from 'react';
import { LogIn, User, Phone, ArrowLeft, BookOpen, Clock, Award, Calendar } from 'lucide-react';

interface StudentPortalProps {
  lang: 'EN' | 'BN';
  onBack: () => void;
}

export function StudentPortal({ lang, onBack }: StudentPortalProps) {
  const [studentId, setStudentId] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [studentData, setStudentData] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    fetch('api/student_login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: studentId, phone })
    })
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      if (data.status === 'success') {
        setStudentData(data);
      } else {
        setError(data.error || 'Login failed');
      }
    })
    .catch(_err => {
      setLoading(false);
      setError('Network error occurred.');
    });
  };

  if (studentData) {
    const student = studentData.student;
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
              <User className="w-8 h-8 text-indigo-600" />
              {lang === 'EN' ? 'Student Portal' : 'স্টুডেন্ট পোর্টাল'}
            </h1>
            <button onClick={() => setStudentData(null)} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> {lang === 'EN' ? 'Logout' : 'লগআউট'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                <User className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">{student.student_id}</p>
              <div className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold w-full">
                {student.program}
              </div>
              <div className="mt-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold w-full">
                Status: {student.status}
              </div>
            </div>

            {/* Attendance & Results Summary */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Recent Results */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                  <Award className="w-5 h-5 text-rose-500" />
                  <h3 className="font-bold text-slate-800">{lang === 'EN' ? 'Academic Results' : 'একাডেমিক ফলাফল'}</h3>
                </div>
                <div className="p-0">
                  {studentData.results && studentData.results.length > 0 ? (
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50/50 text-slate-500">
                        <tr>
                          <th className="p-4 font-semibold">{lang === 'EN' ? 'Exam' : 'পরীক্ষা'}</th>
                          <th className="p-4 font-semibold">{lang === 'EN' ? 'GPA' : 'জিপিএ'}</th>
                          <th className="p-4 font-semibold">{lang === 'EN' ? 'Grade' : 'গ্রেড'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {studentData.results.map((r: any, idx: number) => (
                          <tr key={idx}>
                            <td className="p-4 font-medium text-slate-700">{r.exam_name}</td>
                            <td className="p-4 font-bold text-indigo-600">{r.gpa}</td>
                            <td className="p-4 font-bold text-emerald-600">{r.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="p-6 text-center text-slate-500 text-sm">No results published yet.</p>
                  )}
                </div>
              </div>

              {/* Recent Attendance */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-bold text-slate-800">{lang === 'EN' ? 'Recent Attendance Logs' : 'সাম্প্রতিক উপস্থিতি'}</h3>
                </div>
                <div className="p-0">
                  {studentData.attendance && studentData.attendance.length > 0 ? (
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50/50 text-slate-500">
                        <tr>
                          <th className="p-4 font-semibold">{lang === 'EN' ? 'Date' : 'তারিখ'}</th>
                          <th className="p-4 font-semibold">{lang === 'EN' ? 'Time In' : 'প্রবেশ'}</th>
                          <th className="p-4 font-semibold">{lang === 'EN' ? 'Status' : 'স্ট্যাটাস'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {studentData.attendance.map((a: any, idx: number) => (
                          <tr key={idx}>
                            <td className="p-4 font-medium text-slate-700 flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" /> {a.date}
                            </td>
                            <td className="p-4 font-medium text-slate-600">{a.time_in || '--:--'}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${a.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                {a.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="p-6 text-center text-slate-500 text-sm">No attendance records found.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-12 px-4 font-sans relative overflow-hidden">
      
      <button onClick={onBack} className="absolute top-8 left-8 text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 font-medium bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
        <ArrowLeft className="w-4 h-4" /> {lang === 'EN' ? 'Back to Home' : 'হোমপেজে ফিরে যান'}
      </button>

      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-slate-100 relative z-10">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-extrabold text-center text-slate-800 mb-2">
          {lang === 'EN' ? 'Student Portal' : 'স্টুডেন্ট পোর্টাল'}
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8 font-medium">
          {lang === 'EN' ? 'Login with your credentials' : 'আপনার তথ্য দিয়ে প্রবেশ করুন'}
        </p>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-medium mb-6 flex items-center gap-2 border border-rose-100">
            <span className="shrink-0">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              {lang === 'EN' ? 'Student ID' : 'স্টুডেন্ট আইডি'}
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                placeholder="e.g. STU-2026-001"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 font-medium transition-shadow"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              {lang === 'EN' ? 'Phone Number (Registered)' : 'নিবন্ধিত মোবাইল নম্বর'}
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="01711-XXXXXX"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700 font-medium transition-shadow"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (lang === 'EN' ? 'Verifying...' : 'যাচাই করা হচ্ছে...') : (
              <>
                <LogIn className="w-5 h-5" />
                {lang === 'EN' ? 'Secure Login' : 'লগইন করুন'}
              </>
            )}
          </button>
        </form>
      </div>

    </div>
  );
}
