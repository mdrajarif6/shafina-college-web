import React, { useState } from 'react';
import { LogIn, User, ArrowLeft, KeyRound, BookOpen, Users } from 'lucide-react';

interface TeacherPortalProps {
  lang: 'EN' | 'BN';
  onBack: () => void;
}

export function TeacherPortal({ lang, onBack }: TeacherPortalProps) {
  const [teacherId, setTeacherId] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [teacherData, setTeacherData] = useState<any>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    fetch('api/teachers.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', teacher_id: teacherId, pin })
    })
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      if (data.status === 'success') {
        setTeacherData(data.teacher);
      } else {
        setError(data.error || 'Login failed');
      }
    })
    .catch(_err => {
      setLoading(false);
      setError('Network error occurred.');
    });
  };

  if (teacherData) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
              <Users className="w-8 h-8 text-rose-600" />
              {lang === 'EN' ? 'Teacher Portal' : 'শিক্ষক পোর্টাল'}
            </h1>
            <button onClick={() => setTeacherData(null)} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> {lang === 'EN' ? 'Logout' : 'লগআউট'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4">
                <User className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">{teacherData.name}</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">{teacherData.teacher_id}</p>
              <div className="mt-4 px-4 py-2 bg-rose-50 text-rose-700 rounded-lg text-sm font-bold w-full">
                {teacherData.department}
              </div>
            </div>

            {/* Dashboard Content Placeholder */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                <BookOpen className="w-16 h-16 text-slate-200 mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">
                  {lang === 'EN' ? 'Welcome to your dashboard!' : 'আপনার ড্যাশবোর্ডে স্বাগতম!'}
                </h3>
                <p className="text-slate-500 max-w-md">
                  {lang === 'EN' 
                    ? 'Future updates will allow you to manage classes, upload results, and communicate with students directly from here.' 
                    : 'ভবিষ্যতের আপডেটে আপনি এখান থেকে ক্লাস পরিচালনা করতে, ফলাফল আপলোড করতে এবং সরাসরি শিক্ষার্থীদের সাথে যোগাযোগ করতে পারবেন।'}
                </p>
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
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-extrabold text-center text-slate-800 mb-2">
          {lang === 'EN' ? 'Teacher Portal' : 'শিক্ষক পোর্টাল'}
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8 font-medium">
          {lang === 'EN' ? 'Login with your Staff ID and PIN' : 'আপনার স্টাফ আইডি এবং পিন দিয়ে প্রবেশ করুন'}
        </p>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-medium mb-6 flex items-center gap-2 border border-rose-100">
            <span className="shrink-0">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              {lang === 'EN' ? 'Teacher ID' : 'শিক্ষক আইডি'}
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={teacherId}
                onChange={e => setTeacherId(e.target.value)}
                placeholder="e.g. TCH-2026-001"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 outline-none text-slate-700 font-medium transition-shadow"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              {lang === 'EN' ? 'Secret PIN' : 'গোপন পিন'}
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={pin}
                onChange={e => setPin(e.target.value)}
                placeholder="****"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 outline-none text-slate-700 font-medium transition-shadow"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
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
