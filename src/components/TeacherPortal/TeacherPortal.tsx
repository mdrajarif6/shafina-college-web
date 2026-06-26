import React, { useState } from 'react';
import { LogIn, User, ArrowLeft, KeyRound, BookOpen, Users, Clock } from 'lucide-react';
import { SmartAttendance } from '../SmartAttendance';

interface TeacherPortalProps {
  lang: "EN" | "BN" | "AR";
  onBack: () => void;
}

export function TeacherPortal({ lang, onBack }: TeacherPortalProps) {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [teacherData, setTeacherData] = useState<any>(null);
  const [showSmartAttendance, setShowSmartAttendance] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [mpoIndex, setMpoIndex] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    fetch('api/teachers.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', mobile, pin })
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

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    fetch('api/teachers.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'signup', name, mpo_index: mpoIndex, mobile, pin, department: 'Teacher' })
    })
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      if (data.status === 'success') {
        alert(data.message);
        setIsLogin(true);
      } else {
        setError(data.error || 'Signup failed');
      }
    })
    .catch(_err => {
      setLoading(false);
      setError('Network error occurred.');
    });
  };

  if (teacherData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-800 py-12 px-4 font-sans">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-3">
              <Users className="w-8 h-8 text-rose-600" />
              {lang === 'EN' ? 'Teacher Portal' : 'শিক্ষক পোর্টাল'}
            </h1>
            <button onClick={() => setTeacherData(null)} className="text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> {lang === 'EN' ? 'Logout' : 'লগআউট'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4">
                <User className="w-12 h-12" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">{teacherData.name}</h2>
              <p className="text-sm text-slate-500 font-medium mt-1">{teacherData.teacher_id}</p>
              <div className="mt-4 px-4 py-2 bg-rose-50 text-rose-700 rounded-lg text-sm font-bold w-full">
                {teacherData.department}
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Attendance Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-bold text-slate-800 dark:text-slate-200">{lang === 'EN' ? 'Daily Attendance' : 'দৈনন্দিন উপস্থিতি'}</h3>
                  </div>
                  <button 
                    onClick={() => setShowSmartAttendance(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors"
                  >
                    {lang === 'EN' ? 'Check In Now' : 'চেক-ইন করুন'}
                  </button>
                </div>
                <div className="p-6 text-center text-slate-500">
                  <p className="text-sm">
                    {lang === 'EN' 
                      ? 'Mark your daily attendance easily by tapping the Check In button above.' 
                      : 'উপরের চেক ইন বোতামে ট্যাপ করে সহজেই আপনার দৈনিক উপস্থিতি দিন।'}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center justify-center min-h-[200px]">
                <BookOpen className="w-12 h-12 text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {lang === 'EN' ? 'Welcome to your dashboard!' : 'আপনার ড্যাশবোর্ডে স্বাগতম!'}
                </h3>
                <p className="text-slate-500 max-w-md text-sm">
                  {lang === 'EN' 
                    ? 'Future updates will allow you to manage classes, upload results, and communicate with students directly from here.' 
                    : 'ভবিষ্যতের আপডেটে আপনি এখান থেকে ক্লাস পরিচালনা করতে, ফলাফল আপলোড করতে এবং সরাসরি শিক্ষার্থীদের সাথে যোগাযোগ করতে পারবেন।'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {showSmartAttendance && (
          <SmartAttendance 
            userId={teacherData.teacher_id} 
            userType="teacher" 
            lang={lang} 
            onClose={() => setShowSmartAttendance(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 flex flex-col items-center justify-center py-12 px-4 font-sans relative overflow-hidden">
      
      <button onClick={onBack} className="absolute top-8 left-8 text-slate-500 hover:text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-2 font-medium bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <ArrowLeft className="w-4 h-4" /> {lang === 'EN' ? 'Back to Home' : 'হোমপেজে ফিরে যান'}
      </button>

      <div className="bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-3xl shadow-xl border border-slate-100 relative z-10">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-extrabold text-center text-slate-800 dark:text-slate-200 mb-2">
          {lang === 'EN' ? 'Teacher Portal' : 'শিক্ষক পোর্টাল'}
        </h2>
        <p className="text-center text-slate-500 text-sm mb-8 font-medium">
          {isLogin 
            ? (lang === 'EN' ? 'Login with your Staff ID and PIN' : 'আপনার স্টাফ আইডি এবং পিন দিয়ে প্রবেশ করুন')
            : (lang === 'EN' ? 'Register with MPO Index & Mobile' : 'এমপিও ইনডেক্স এবং মোবাইল নম্বর দিয়ে নিবন্ধন করুন')}
        </p>

        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-medium mb-6 flex items-center gap-2 border border-rose-100">
            <span className="shrink-0">⚠️</span> {error}
          </div>
        )}

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${isLogin ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-300'}`}
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            {lang === 'EN' ? 'Login' : 'লগইন'}
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${!isLogin ? 'bg-white dark:bg-slate-900 text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-300'}`}
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            {lang === 'EN' ? 'Sign Up' : 'নিবন্ধন'}
          </button>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-5">
          {isLogin ? (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'EN' ? 'Mobile Number' : 'মোবাইল নম্বর'}
                </label>
                <div className="relative">
                  <Clock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    placeholder="e.g. 01712XXXXXX"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-rose-500 outline-none text-slate-700 dark:text-slate-300 font-medium transition-shadow"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'EN' ? 'Full Name' : 'পূর্ণ নাম'}
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Abul Kalam"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-rose-500 outline-none text-slate-700 dark:text-slate-300 font-medium transition-shadow"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'EN' ? 'MPO Index Number' : 'এমপিও ইনডেক্স নম্বর'}
                </label>
                <div className="relative">
                  <BookOpen className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={mpoIndex}
                    onChange={e => setMpoIndex(e.target.value)}
                    placeholder="e.g. 1234567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-rose-500 outline-none text-slate-700 dark:text-slate-300 font-medium transition-shadow"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {lang === 'EN' ? 'Mobile Number' : 'মোবাইল নম্বর'}
                </label>
                <div className="relative">
                  <Clock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    placeholder="e.g. 01712XXXXXX"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-rose-500 outline-none text-slate-700 dark:text-slate-300 font-medium transition-shadow"
                  />
                </div>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">
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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-rose-500 outline-none text-slate-700 dark:text-slate-300 font-medium transition-shadow"
              />
            </div>
            {isLogin && (
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => alert(lang === 'EN' ? "Please contact college administration to recover your ID or PIN.\nPhone: 01309127037" : "আপনার আইডি বা পিন পুনরুদ্ধার করতে কলেজ প্রশাসনের সাথে যোগাযোগ করুন।\nফোন: 01309127037")}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold transition-colors"
                >
                  {lang === 'EN' ? 'Forgot ID or PIN?' : 'আইডি বা পিন ভুলে গেছেন?'}
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (lang === 'EN' ? 'Processing...' : 'প্রক্রিয়া করা হচ্ছে...') : (
              <>
                <LogIn className="w-5 h-5" />
                {isLogin 
                  ? (lang === 'EN' ? 'Secure Login' : 'লগইন করুন') 
                  : (lang === 'EN' ? 'Sign Up Now' : 'এখনই নিবন্ধন করুন')}
              </>
            )}
          </button>
        </form>
      </div>

    </div>
  );
}
