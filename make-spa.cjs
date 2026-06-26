const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Helper to add condition to a section
function hideSection(id, condition) {
    const regex = new RegExp(`<section id="${id}" className="(.*?)"`, 'g');
    code = code.replace(regex, (match, classes) => {
        // If it already has a template literal, we assume it's done
        if (classes.includes('${')) return match;
        return `<section id="${id}" className={\`${classes} \${${condition} ? 'block' : 'hidden'}\`}`;
    });
}

function hideSectionByContent(searchStr, condition) {
    const regex = new RegExp(`<section className="([^"]*?)">\\s*<div className="max-w-7xl mx-auto px-4[\\s\\S]*?${searchStr}`, 'g');
    code = code.replace(regex, (match, classes) => {
        if (classes.includes('${')) return match;
        return match.replace(`className="${classes}"`, `className={\`${classes} \${${condition} ? 'block' : 'hidden'}\`}`);
    });
}

// Stats grid (no ID)
code = code.replace(
    /<section className="bg-white border-y border-slate-200 shadow-sm relative z-10">/g,
    '<section className={`bg-white border-y border-slate-200 shadow-sm relative z-10 ${activeTab === \'home\' ? \'block\' : \'hidden\'}`}>'
);

hideSection('home-section', 'activeTab === "home"');
hideSection('programs-section', 'activeTab === "programs"');
hideSection('admission-section', 'activeTab === "admission"');
hideSection('results-section', 'activeTab === "home" || activeTab === "results"');
hideSection('notices-section', 'activeTab === "notices"');
hideSection('campus-map-section', 'activeTab === "campus-map"');
hideSection('gallery-section', 'activeTab === "gallery"');
hideSection('contact-section', 'activeTab === "contact"');

// FAQ section
hideSectionByContent('FAQ', 'activeTab === "home" || activeTab === "contact"');

// Campus infrastructure
hideSectionByContent('Campus Infrastructure', 'activeTab === "home" || activeTab === "campus-map" || activeTab === "about"');

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('App.tsx transformed into a true SPA successfully');
