const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix about-section (currently missing activeTab condition)
code = code.replace(
    /<section id="about-section" className="py-16 bg-slate-50">/g,
    '<section id="about-section" className={`py-16 bg-slate-50 ${activeTab === "about" ? \'block\' : \'hidden\'}`}>'
);

// 2. Fix results-section
code = code.replace(
    /<section id="results-section" className={`py-16 bg-slate-50 border-t border-slate-200 \${activeTab === "home" \|\| activeTab === "results" \? 'block' : 'hidden'}`}/g,
    '<section id="results-section" className={`py-16 bg-slate-50 border-t border-slate-200 ${activeTab === "admission" ? \'block\' : \'hidden\'}`}'
);

// 3. Fix Campus Life / Facilities (it's the first `bg-slate-50` without ID after results)
code = code.replace(
    /{\/\* --- CAMPUS LIFE \/ FACILITIES SECTION --- \*\/}\s*<section className={`py-16 bg-slate-50 border-t border-slate-200 \${activeTab === "home" \|\| activeTab === "contact" \? 'block' : 'hidden'}`}/g,
    '{/* --- CAMPUS LIFE / FACILITIES SECTION --- */}\n        <section className={`py-16 bg-slate-50 border-t border-slate-200 ${activeTab === "campus-map" ? \'block\' : \'hidden\'}`}'
);

// 4. Fix FAQ Section (it's the `bg-white` without ID after campus-map)
code = code.replace(
    /{\/\* --- AUTOMATED HELP DESK CHAT INTERFACE & FAQ SECTION --- \*\/}\s*<section className={`py-16 bg-white border-t border-slate-200 \${activeTab === "home" \|\| activeTab === "contact" \? 'block' : 'hidden'}`}/g,
    '{/* --- AUTOMATED HELP DESK CHAT INTERFACE & FAQ SECTION --- */}\n        <section className={`py-16 bg-white border-t border-slate-200 ${activeTab === "contact" ? \'block\' : \'hidden\'}`}'
);

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Fixed SPA bindings in App.tsx');
