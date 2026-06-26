const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replacements = [
  { search: /bg-white(?! dark:bg-slate-900)/g, replace: "bg-white dark:bg-slate-900" },
  { search: /bg-slate-50(?! dark:bg-slate-800)/g, replace: "bg-slate-50 dark:bg-slate-800" },
  { search: /bg-slate-100(?! dark:bg-slate-800)/g, replace: "bg-slate-100 dark:bg-slate-800" },
  { search: /text-slate-900(?! dark:text-slate-100)/g, replace: "text-slate-900 dark:text-slate-100" },
  { search: /text-slate-800(?! dark:text-slate-200)/g, replace: "text-slate-800 dark:text-slate-200" },
  { search: /text-slate-700(?! dark:text-slate-300)/g, replace: "text-slate-700 dark:text-slate-300" },
  { search: /border-slate-200(?! dark:border-slate-700)/g, replace: "border-slate-200 dark:border-slate-700" },
  { search: /border-slate-300(?! dark:border-slate-600)/g, replace: "border-slate-300 dark:border-slate-600" }
];

walk('src', (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const {search, replace} of replacements) {
      content = content.replace(search, replace);
    }
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
