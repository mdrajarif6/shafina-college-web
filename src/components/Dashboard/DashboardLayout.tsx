import React from 'react';

import { Overview } from './Overview';
import { ManageNotices } from './ManageNotices';
import { Applications, Application } from './Applications';
import { Students, Student } from './Students';
import { Teachers, Teacher } from './Teachers';
import { Settings } from './Settings';
import { Results, Result } from './Results';
import { Attendance, AttendanceRecord } from './Attendance';
import { LayoutDashboard, Bell, Users, FileText, Settings as SettingsIcon, LogOut, ChevronRight, Award, Fingerprint } from 'lucide-react';

type DashboardLayoutProps = {
  lang: "EN" | "BN" | "AR";
  notices: any[];
  setNotices: (notices: any[]) => void;
  applications: Application[];
  setApplications: (apps: Application[]) => void;
  students: Student[];
  setStudents: (students: Student[]) => void;
  teachers: Teacher[];
  setTeachers: (teachers: Teacher[]) => void;
  results: Result[];
  setResults: (results: Result[]) => void;
  attendance: AttendanceRecord[];
  setAttendance: (records: AttendanceRecord[]) => void;
  settings: any;
  setSettings: (settings: any) => void;
  onLogout: () => void;
};

export function DashboardLayout({ lang, notices, setNotices, applications, setApplications, students, setStudents, teachers, setTeachers, results, setResults, attendance, setAttendance, settings, setSettings, onLogout }: DashboardLayoutProps) {
  const [currentView, setCurrentView] = React.useState('overview');

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, labelEN: 'Overview', labelBN: 'ওভারভিউ' },
    { id: 'notices', icon: Bell, labelEN: 'Manage Notices', labelBN: 'নোটিশ পরিচালনা' },
    { id: 'applications', icon: FileText, labelEN: 'Applications', labelBN: 'আবেদনসমূহ' },
    { id: 'students', icon: Users, labelEN: 'Students', labelBN: 'শিক্ষার্থী' },
    { id: 'teachers', icon: Users, labelEN: 'Teachers', labelBN: 'শিক্ষক' },
    { id: 'attendance', icon: Fingerprint, labelEN: 'Attendance', labelBN: 'উপস্থিতি' },
    { id: 'results', icon: Award, labelEN: 'Manage Results', labelBN: 'ফলাফল পরিচালনা' },
    { id: 'settings', icon: SettingsIcon, labelEN: 'Settings', labelBN: 'সেটিংস' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-800 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-950 text-white flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-rose-500 tracking-wider">
            {lang === 'EN' ? 'HJSWC Admin' : 'শাফিনা কলেজ অ্যাডমিন'}
          </h2>
        </div>
        <div className="flex-1 py-6 space-y-2 px-4 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm cursor-pointer ${currentView === item.id
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-white dark:bg-slate-900/10 hover:text-white'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{lang === 'EN' ? item.labelEN : item.labelBN}</span>
              {currentView === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-900/5 hover:bg-rose-600 rounded-xl transition-all text-sm font-bold text-slate-300 hover:text-white cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{lang === 'EN' ? 'Logout & Exit' : 'লগআউট করুন'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between shadow-sm z-0">
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            {menuItems.find((m) => m.id === currentView)?.[lang === 'EN' ? 'labelEN' : 'labelBN']}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-600 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              Admin User
            </span>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-6xl mx-auto space-y-6">
            {currentView === 'overview' && <Overview lang={lang} />}
            {currentView === 'notices' && <ManageNotices lang={lang} notices={notices} setNotices={setNotices} />}
            {currentView === 'applications' && <Applications lang={lang} applications={applications} setApplications={setApplications} />}
            { currentView === 'students' && <Students lang={lang} students={students} setStudents={setStudents} />}
            { currentView === 'teachers' && <Teachers lang={lang} teachers={teachers} setTeachers={setTeachers} />}
            { currentView === 'attendance' && <Attendance lang={lang} attendance={attendance} setAttendance={setAttendance} />}
            { currentView === 'results' && <Results lang={lang} results={results} setResults={setResults} />}
            {currentView === 'settings' && <Settings lang={lang} settings={settings} setSettings={setSettings} />}
          </div>
        </main>
      </div>
    </div>
  );
}
