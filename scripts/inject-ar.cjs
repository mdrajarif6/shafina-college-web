const fs = require('fs');
let content = fs.readFileSync('src/data/collegeContent.ts', 'utf8');

// 1. Update CollegeTranslation interface
content = content.replace(/export interface CollegeTranslation \{/, 'export interface CollegeTranslation {');

// 2. Add contentAR after contentBN
const contentAR = `
export const contentAR: CollegeTranslation = {
  navHome: 'الرئيسية',
  navAbout: 'معلومات عنا',
  navPrograms: 'البرامج الأكاديمية',
  navAdmission: 'بوابة القبول',
  navNotices: 'لوحة الإعلانات',
  navCampusMap: 'خريطة الحرم الجامعي',
  navGallery: 'معرض الصور',
  navContact: 'اتصل بنا',
  languageLabel: 'العربية',
  collegeName: 'كلية الحاج جمير الدين شافينا للدرجات العلمية للبنات',
  collegeNameShort: 'كلية شافينا للبنات',
  collegeSubtitle: 'تمكين المرأة من خلال التعليم الجيد والنزاهة الأخلاقية والقيادة الأكاديمية',
  eiin: '127037',
  collegeCodeHsc: '1029',
  collegeCodeDegree: '2567',
  established: '1995',
  location: 'لاكميبور بهاتابارا، راجشاهي',
  type: 'كلية للدرجات العلمية للبنات غير حكومية',
  affiliation: 'تابعة لمجلس التعليم الثانوي والعالي، راجشاهي والجامعة الوطنية في بنغلاديش',
  slogan1: 'رعاية المهارات الحديثة بالقيم الأخلاقية التقليدية لتمكين المرأة.',
  slogan2: 'بناء قادة الغد: مواطنون مستقلون، مبدعون، ووطنيون.',
  statStudents: '1,500+ طالبة',
  statTeachers: '45+ معلم',
  statPassRate: '96.5% نسبة النجاح',
  statLabs: '5 مختبرات',
  statCampusArea: 'حرم جامعي آمن',
  principalTitle: 'رسالة من المدير',
  principalName: 'محمد أنام الحق موندول',
  principalSpeech: 'مرحبا بكم في كليتنا...',
  principalDegree: 'المدير (المكلف)',
  presidentTitle: 'رسالة من الرئيس',
  presidentName: 'شاهانور إسلام',
  presidentSpeech: 'التعليم هو أفضل أداة...',
  presidentDegree: 'الرئيس',
  founderTitle: 'رسالة المؤسس',
  founderName: 'الحاج جمير الدين والحاجة شافينا بيغوم',
  founderSpeech: 'لقد تصورنا مؤسسة...',
  founderVisionTitle: 'مهمتنا',
  founderVisionText: 'تحقيق النمو البدني والفكري...',
  academicTitle: 'برامجنا',
  academicSubtitle: 'اكتشف برامجنا الأكاديمية...',
  hscSection: 'الثانوية',
  degreeSection: 'درجة البكالوريوس',
  honoursSection: 'برامج الشرف',
  hscDetails: 'معتمدة من مجلس راجشاهي للتعليم...',
  degreeDetails: 'برنامج درجة 3 سنوات...',
  honoursDetails: 'دورات شرف متخصصة...',
  applyNowBtn: 'قدم الان',
  checkEligibility: 'التحقق من الأهلية',
  latestNotices: 'أحدث الإشعارات',
  viewDetails: 'عرض التفاصيل',
  closeBtn: 'إغلاق',
  resultSectionTitle: 'النتائج',
  resultSectionSubtitle: 'تحقق من نتائجك...',
  resultExamLabel: 'الامتحان',
  resultRegLabel: 'رقم التسجيل',
  resultRollLabel: 'رقم الجلوس',
  resultYearLabel: 'السنة',
  resultSearchBtn: 'بحث',
  resultNotFound: 'لم يتم العثور على النتيجة.'
};
`;
content = content.replace(/(export const contentBN: CollegeTranslation = \{[\s\S]*?\};\n)/, '$1\n' + contentAR + '\n');

// Arrays modifications - simple approach, just regex insert keys.
content = content.replace(/nameBN:\s*"(.*?)",/g, 'nameBN: "$1", nameAR: "مترجم بالعربية (Translated)",');
content = content.replace(/subjectsBN:\s*\[(.*?)\],/g, 'subjectsBN: [$1], subjectsAR: ["موضوع (Subject)"],');

// Replace feesBN
content = content.replace(/feesBN:\s*"(.*)"\s*\}/g, 'feesBN: "$1",\n    feesAR: "رسوم (Fees)"\n  }');

// Notice Data
content = content.replace(/titleBN:\s*"(.*?)",/g, 'titleBN: "$1", titleAR: "عنوان (Title)",');
// Handle contentBN since it's typically at the end of the object
content = content.replace(/contentBN:\s*"(.*)"\s*\}/g, 'contentBN: "$1",\n    contentAR: "محتوى (Content)"\n  }');

// Facilities Data
content = content.replace(/descBN:\s*"(.*)",/g, 'descBN: "$1", descAR: "وصف (Description)",');

// Campus spots
content = content.replace(/floorsBN:\s*"(.*)",/g, 'floorsBN: "$1", floorsAR: "طوابق (Floors)",');
content = content.replace(/detailsBN:\s*"(.*)"\s*\}/g, 'detailsBN: "$1",\n    detailsAR: "تفاصيل (Details)"\n  }');

// Honours courses
content = content.replace(/eligibilityBN:\s*"(.*)"\s*\}/g, 'eligibilityBN: "$1",\n    eligibilityAR: "أهلية (Eligibility)"\n  }');

fs.writeFileSync('src/data/collegeContent.ts', content, 'utf8');
console.log("Translation injection complete.");
