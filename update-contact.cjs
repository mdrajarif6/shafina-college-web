const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Email replacements
code = code.replace(/info@shafinacollege\.online/g, 'hjshafinamohila_college@yahoo.com');

// Phone replacements
code = code.replace(/\+880 721 772567, \+8801712-345678/g, '01827824789');
code = code.replace(/\+880 721 772567/g, '01827824789');
code = code.replace(/<span className="text-slate-500 block">\+8801712-345678, \+8801913-987654<\/span>/g, '');
code = code.replace(/01711-223344/g, '01827824789');

// Address replacements
code = code.replace(/Luxmipur Vatapara, GPO-6000, Rajpara Thana, Rajshahi, Bangladesh/g, 'Laxmipur Vhatapara, Court Station Road, Rajpara, Rajshahi');
code = code.replace(/Luxmipur Vatapara, Rajpara, Rajshahi/g, 'Laxmipur Vhatapara, Court Station Road, Rajpara, Rajshahi');
code = code.replace(/123 College Road, Dhaka/g, 'Laxmipur Vhatapara, Court Station Road, Rajpara, Rajshahi');

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log('Contact info updated in App.tsx');
