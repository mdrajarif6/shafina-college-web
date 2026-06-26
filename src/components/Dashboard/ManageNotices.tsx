import React, { useState } from 'react';
import { PlusCircle, Check, Trash2, Calendar } from 'lucide-react';

export function ManageNotices({ lang, notices, setNotices }: { lang: 'EN' | 'BN', notices: any[], setNotices: (n: any[]) => void }) {
  const [adminNoticeTitleEN, setAdminNoticeTitleEN] = useState("");
  const [adminNoticeTitleBN, setAdminNoticeTitleBN] = useState("");
  const [adminNoticeContentEN, setAdminNoticeContentEN] = useState("");
  const [adminNoticeContentBN, setAdminNoticeContentBN] = useState("");
  const [adminNoticeCategory, setAdminNoticeCategory] = useState("general");
  const [adminSuccessMsg, setAdminSuccessMsg] = useState("");

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminNoticeTitleEN || !adminNoticeTitleBN || !adminNoticeContentEN || !adminNoticeContentBN) return;

    const notice_id = "HJSWC-" + Math.floor(Math.random() * 90000);
    const date = new Date().toISOString().split("T")[0];

    const newNotice = {
      notice_id,
      title_en: adminNoticeTitleEN,
      title_bn: adminNoticeTitleBN,
      date,
      category: adminNoticeCategory,
      content_en: adminNoticeContentEN,
      content_bn: adminNoticeContentBN,
    };

    fetch('api/notices.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNotice)
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setNotices([{ 
          id: Date.now(),
          notice_id, 
          titleEN: adminNoticeTitleEN, 
          titleBN: adminNoticeTitleBN, 
          date, 
          category: adminNoticeCategory, 
          contentEN: adminNoticeContentEN, 
          contentBN: adminNoticeContentBN 
        }, ...notices]);
        setAdminSuccessMsg(lang === "EN" ? "Notice published successfully!" : "নোটিশ সফলভাবে প্রকাশিত হয়েছে!");
        
        // Reset form
        setAdminNoticeTitleEN("");
        setAdminNoticeTitleBN("");
        setAdminNoticeContentEN("");
        setAdminNoticeContentBN("");
        setAdminNoticeCategory("general");

        setTimeout(() => setAdminSuccessMsg(""), 4000);
      } else {
        alert("Failed to publish notice to database.");
      }
    })
    .catch(err => console.error(err));
  };

  const handleDelete = (id: number, notice_id: string) => {
    fetch(`api/notices.php?id=${notice_id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setNotices(notices.filter(n => n.id !== id));
      } else {
        alert("Failed to delete notice from database.");
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="space-y-8">
      {/* Create Notice Form */}
      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-800">
              {lang === "EN" ? "Publish New Notice" : "নতুন নোটিশ প্রকাশ করুন"}
            </h3>
            <p className="text-sm text-slate-500">
              {lang === "EN" ? "Instantly update the college notice board." : "কলেজের নোটিশ বোর্ড আপডেট করুন।"}
            </p>
          </div>
        </div>

        {adminSuccessMsg && (
          <div className="mb-6 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 p-4 rounded-r-lg flex items-center gap-3 shadow-sm">
            <Check className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-sm">{adminSuccessMsg}</span>
          </div>
        )}

        <form onSubmit={handleAddNotice} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Notice Title (English) *</label>
              <input
                type="text"
                required
                placeholder="e.g. Distribution of HSC Admit Cards 2026"
                value={adminNoticeTitleEN}
                onChange={(e) => setAdminNoticeTitleEN(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">নোটিশ শিরোনাম (বাংলায়) *</label>
              <input
                type="text"
                required
                placeholder="যেমন: ২০২৬ সালের এইচএসসি পরীক্ষার প্রবেশপত্র বিতরণ"
                value={adminNoticeTitleBN}
                onChange={(e) => setAdminNoticeTitleBN(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Detailed Content (English) *</label>
              <textarea
                required
                rows={4}
                placeholder="Write full detailed english text here..."
                value={adminNoticeContentEN}
                onChange={(e) => setAdminNoticeContentEN(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">বিস্তারিত বার্তা (বাংলায়) *</label>
              <textarea
                required
                rows={4}
                placeholder="নোটিশের বিস্তারিত বিবরণ বাংলায় লিখুন..."
                value={adminNoticeContentBN}
                onChange={(e) => setAdminNoticeContentBN(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <label className="font-bold text-slate-700 text-sm">Category:</label>
              <div className="flex flex-wrap gap-2">
                {["general", "exam", "admission", "holiday"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setAdminNoticeCategory(cat)}
                    className={`px-4 py-2 rounded-lg border text-xs font-bold capitalize cursor-pointer transition-all ${
                      adminNoticeCategory === cat 
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md" 
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg shadow-rose-500/30"
            >
              <PlusCircle className="w-5 h-5" />
              <span>{lang === 'EN' ? 'Publish Notice' : 'প্রকাশ করুন'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Existing Notices Table */}
      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-extrabold text-lg text-slate-800">
            {lang === "EN" ? "Active Notices" : "সক্রিয় নোটিশ সমূহ"}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-slate-100 text-slate-500">
                <th className="py-3 font-semibold w-24">Date</th>
                <th className="py-3 font-semibold">Title</th>
                <th className="py-3 font-semibold w-28">Category</th>
                <th className="py-3 font-semibold text-right w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notices.map((notice) => (
                <tr key={notice.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      {notice.date}
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-slate-800">
                    {lang === 'EN' ? notice.titleEN : notice.titleBN}
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                      notice.category === "exam" ? "bg-amber-100 text-amber-800" : 
                      notice.category === "admission" ? "bg-rose-100 text-rose-800" : 
                      notice.category === "holiday" ? "bg-violet-100 text-violet-800" : 
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {notice.category}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => handleDelete(notice.id, notice.notice_id)}
                      className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
