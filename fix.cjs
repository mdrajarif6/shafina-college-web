const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the Portals Dropdown Button
code = code.replace(
  /<button className="w-full md:w-auto justify-between px-4 md:px-3 py-3 md:py-2 text-sm font-semibold\s+rounded-lg transition-all cursor-pointer text-slate-600 hover:bg-slate-50 hover:text-indigo-600 flex items-center\s+gap-1 border border-slate-200 md:border-none">/g,
  '<button onClick={() => setIsPortalsOpen(!isPortalsOpen)} className="w-full md:w-auto justify-between px-4 md:px-3 py-3 md:py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer text-slate-600 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-1 border border-slate-200 md:border-none">'
);

// Replace the Dropdown Container CSS
code = code.replace(
  /<div className="absolute top-full right-0 left-0 md:left-0 mt-1 w-full md:w-48 bg-white rounded-xl\s+shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible\s+focus-within:opacity-100 focus-within:visible transition-all z-50 overflow-hidden">/g,
  '<div className={`md:absolute static top-full right-0 left-0 md:left-0 mt-1 w-full md:w-48 bg-white md:rounded-xl md:shadow-xl md:border border-slate-100 transition-all z-50 overflow-hidden ${isPortalsOpen ? "block" : "hidden md:opacity-0 md:invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible"}`}>'
);

// Make sure the dropdown closes when a portal is selected (Student)
code = code.replace(
  /setActiveTab\("student_portal"\);\s+setIsMobileMenuOpen\(false\);/g,
  'setActiveTab("student_portal"); setIsMobileMenuOpen(false); setIsPortalsOpen(false);'
);

// Make sure the dropdown closes when a portal is selected (Teacher)
code = code.replace(
  /setActiveTab\("teacher_portal"\);\s+setIsMobileMenuOpen\(false\);/g,
  'setActiveTab("teacher_portal"); setIsMobileMenuOpen(false); setIsPortalsOpen(false);'
);

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('App.tsx updated successfully');
