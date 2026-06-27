import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CollegeTranslation } from '../data/collegeContent';

interface NavigationProps {
  lang: "EN" | "BN" | "AR";
  t: CollegeTranslation;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ lang, t, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null);

  // Define the hierarchy based on NDC
  const menuItems = [
    { id: "home", label: t.navHome || (lang === "EN" ? "Home" : "হোম") },
    {
      id: "about_college",
      label: lang === "EN" ? "About College" : "কলেজ সম্পর্কে",
      dropdown: [
        { id: "at_a_glance", label: lang === "EN" ? "At a Glance" : "এক নজরে" },
        { id: "history", label: lang === "EN" ? "History" : "ইতিহাস" },
        { id: "why_study", label: lang === "EN" ? "Why Study at HJSWC" : "কেন এখানে পড়বেন" },
        { id: "campus-map", label: lang === "EN" ? "Infrastructure" : "অবকাঠামো" },
        { id: "achievements", label: lang === "EN" ? "Achievements" : "অর্জনসমূহ" },
        { id: "news_events", label: lang === "EN" ? "News & Events" : "খবর ও ইভেন্ট" },
      ]
    },
    {
      id: "administration",
      label: lang === "EN" ? "Administration" : "প্রশাসন",
      dropdown: [
        { id: "about", label: lang === "EN" ? "Governing Body" : "গভর্নিং বডি" },
        { id: "msg_president", label: lang === "EN" ? "Message President" : "সভাপতির বাণী" },
        { id: "msg_principal", label: lang === "EN" ? "Message Principal" : "অধ্যক্ষের বাণী" },
        { id: "faculty_staff", label: lang === "EN" ? "Faculty & Staff Info" : "শিক্ষক ও কর্মচারী তথ্য" },
      ]
    },
    {
      id: "academic",
      label: lang === "EN" ? "Academic" : "একাডেমিক",
      dropdown: [
        { id: "programs", label: lang === "EN" ? "Academic Programs" : "একাডেমিক প্রোগ্রাম" },
        { id: "results", label: lang === "EN" ? "Exam Results" : "পরীক্ষার ফলাফল" },
        { id: "code_conducts", label: lang === "EN" ? "Code of Conducts" : "আচরণবিধি" },
        { id: "guideline_parents", label: lang === "EN" ? "Guideline for Parents" : "অভিভাবকদের জন্য নির্দেশিকা" },
        { id: "dress_code", label: lang === "EN" ? "Dress Code" : "ড্রেস কোড" },
      ]
    },
    {
      id: "admission_menu",
      label: lang === "EN" ? "Admission" : "ভর্তি",
      dropdown: [
        { id: "admission", label: lang === "EN" ? "Apply Now" : "এখনই আবেদন করুন" },
        { id: "fees_payment", label: lang === "EN" ? "Fees & Payment" : "ফিস ও পেমেন্ট" },
        { id: "scholarships", label: lang === "EN" ? "Scholarships" : "বৃত্তি" },
        { id: "transfer_procedures", label: lang === "EN" ? "Transfer Procedures" : "ট্রান্সফার পদ্ধতি" },
      ]
    },
    {
      id: "portals",
      label: lang === "EN" ? "Portals & Blog" : "পোর্টাল ও ব্লগ",
      dropdown: [
        { id: "dashboard", label: lang === "EN" ? "Admin Dashboard" : "অ্যাডমিন ড্যাশবোর্ড" },
        { id: "student_portal", label: lang === "EN" ? "Student Portal" : "স্টুডেন্ট পোর্টাল" },
        { id: "teacher_portal", label: lang === "EN" ? "Teacher Portal" : "শিক্ষক পোর্টাল" },
        { id: "blog", label: lang === "EN" ? "Educational Blog" : "শিক্ষামূলক ব্লগ" },
      ]
    },
    {
      id: "gallery_menu",
      label: lang === "EN" ? "Gallery" : "গ্যালারি",
      dropdown: [
        { id: "gallery", label: lang === "EN" ? "Photos" : "ছবি" },
        { id: "videos", label: lang === "EN" ? "Videos" : "ভিডিও" },
      ]
    },
    { id: "notices", label: t.navNotices || (lang === "EN" ? "Notice" : "নোটিশ") },
    { id: "contact", label: t.navContact || (lang === "EN" ? "Contact" : "যোগাযোগ") },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-t border-slate-100 mt-4 relative z-40">
      <div className="max-w-7xl mx-auto px-4">

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex justify-between items-center py-2">
          <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{lang === "EN" ? "Main Menu" : "মূল মেনু"}</span>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-row flex-wrap justify-start gap-x-2 py-1 relative">
          {menuItems.map((item) => (
            <div 
              key={item.id} 
              className="relative group"
              onMouseEnter={() => setHoverDropdown(item.id)}
              onMouseLeave={() => setHoverDropdown(null)}
            >
              {item.dropdown ? (
                <button
                  className={`flex items-center gap-1 px-3 py-3 text-[13px] font-semibold rounded-t-lg transition-all cursor-pointer ${
                    activeTab === item.id || hoverDropdown === item.id
                      ? "text-rose-600 bg-rose-50/50 dark:bg-slate-800"
                      : "text-slate-700 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50/30 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${hoverDropdown === item.id ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-3 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === item.id
                      ? "bg-rose-50 dark:bg-slate-800 text-rose-700 border-b-2 border-rose-600"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-rose-600"
                  }`}
                >
                  {item.label}
                </button>
              )}

              {/* Desktop Dropdown Content */}
              {item.dropdown && hoverDropdown === item.id && (
                <div className="absolute left-0 top-full min-w-[220px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl rounded-b-lg rounded-tr-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {item.dropdown.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => handleTabClick(subItem.id)}
                      className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        activeTab === subItem.id
                          ? "bg-rose-50 dark:bg-slate-700 text-rose-700 dark:text-rose-400 font-bold border-l-2 border-rose-500 dark:border-rose-400"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-rose-600 dark:hover:text-rose-400"
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu (Accordion) */}
        <div className={`${isMobileMenuOpen ? "flex" : "hidden"} lg:hidden flex-col gap-1 py-2 max-h-[75vh] overflow-y-auto`}>
          {menuItems.map((item) => (
            <div key={item.id} className="w-full">
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                    className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {openDropdown === item.id && (
                    <div className="pl-4 pr-2 py-1 flex flex-col gap-1 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg ml-2 border-l-2 border-slate-200 dark:border-slate-700 mt-1">
                      {item.dropdown.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() => handleTabClick(subItem.id)}
                          className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors ${
                            activeTab === subItem.id
                              ? "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 font-bold"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-rose-600"
                          }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-lg transition-all ${
                    activeTab === item.id
                      ? "bg-rose-50 dark:bg-slate-800 text-rose-700 border-l-4 border-rose-600"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-rose-600"
                  }`}
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </nav>
  );
};
