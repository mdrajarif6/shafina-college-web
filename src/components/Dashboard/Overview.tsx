import { Users, FileText, Bell, ArrowUpRight } from 'lucide-react';

export function Overview({ lang }: { lang: "EN" | "BN" | "AR" }) {
  const stats = [
    { 
      title: lang === 'EN' ? 'Total Students' : 'মোট শিক্ষার্থী', 
      value: '1,250', 
      icon: Users, 
      trend: '+12%', 
      color: 'bg-indigo-500' 
    },
    { 
      title: lang === 'EN' ? 'New Applications' : 'নতুন আবেদন', 
      value: '342', 
      icon: FileText, 
      trend: '+5%', 
      color: 'bg-emerald-500' 
    },
    { 
      title: lang === 'EN' ? 'Active Notices' : 'সক্রিয় নোটিশ', 
      value: '14', 
      icon: Bell, 
      trend: '+2', 
      color: 'bg-rose-500' 
    },
    { 
      title: lang === 'EN' ? 'Total Teachers' : 'মোট শিক্ষক', 
      value: '45', 
      icon: Users, 
      trend: '+2', 
      color: 'bg-blue-500' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl text-white ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                {stat.trend} <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-black text-slate-800 dark:text-slate-200">{stat.value}</h3>
              <p className="text-sm font-semibold text-slate-500 mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder Chart / Activity Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 min-h-[300px]">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">
            {lang === 'EN' ? 'Admission Trends' : 'ভর্তির প্রবণতা'}
          </h3>
          <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50 dark:bg-slate-800">
            <p className="text-slate-400 text-sm font-medium">Chart Visualization Coming Soon</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">
            {lang === 'EN' ? 'Recent Activity' : 'সাম্প্রতিক কার্যকলাপ'}
          </h3>
          <ul className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-rose-500 shrink-0" />
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-tight">
                    {lang === 'EN' ? 'New application received from ID #2049' : 'আইডি #2049 থেকে নতুন আবেদন'}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">2 hours ago</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
