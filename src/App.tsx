import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Clock,
  Phone,
  Mail,
  MapPin,
  Award,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Search,
  Volume2,
  ChevronRight,
  Send,
  HelpCircle,
  ShieldCheck,
  Building2,
  Image as ImageIcon,
  Check,
  Printer,
  Sparkles,
  ArrowRight,
  BookMarked,
  BookOpen,
  Menu,
  X
} from "lucide-react";

import {
  contentEN,
  contentBN,
  hscGroups,
  degreeGroups,
  honoursCourses,
  facilitiesData,
  galleryData,
  campusSpots,
  CollegeTranslation
} from "./data/collegeContent";
import { DashboardLayout } from "./components/Dashboard/DashboardLayout";
import { AdminLogin } from "./components/Dashboard/AdminLogin";
import { Application } from "./components/Dashboard/Applications";
import { Student } from "./components/Dashboard/Students";
import { AttendanceRecord } from "./components/Dashboard/Attendance";
import { StudentPortal } from "./components/StudentPortal/StudentPortal";
import { TeacherPortal } from "./components/TeacherPortal/TeacherPortal";
export default function App() {
  // Language State
  const [lang, setLang] = useState<"EN" | "BN">("BN"); // Default to BN (Bengali) for authentic feel, can toggle to EN
  const t: CollegeTranslation = lang === "EN" ? contentEN : contentBN;

  // Data States
  const [notices, setNotices] = useState<any[]>([]);
  const [applicationsList, setApplicationsList] = useState<Application[]>([]);
  const [studentsList, setStudentsList] = useState<Student[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [settings, setSettings] = useState<any>({
    admin_pin: 'admin123',
    contact_phone: '01711-223344',
    contact_email: 'info@shafinacollege.online',
    contact_address: '123 College Road, Dhaka',
    maintenance_mode: 'false'
  });

  // Fetch data on mount
  React.useEffect(() => {
    // Fetch notices
    fetch('api/notices.php')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setNotices(data);
      })
      .catch(err => console.error("Error fetching notices:", err));

    // Fetch applications
    fetch('api/applications.php')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setApplicationsList(data);
      })
      .catch(err => console.error("Error fetching applications:", err));

    // Fetch students
    fetch('api/students.php')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setStudentsList(data);
      })
      .catch(err => console.error("Error fetching students:", err));

    // Fetch results
    fetch('api/results.php')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setResults(data);
      })
      .catch(err => console.error("Error fetching results:", err));

    // Fetch attendance
    fetch('api/attendance.php')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setAttendance(data);
      })
      .catch(err => console.error("Error fetching attendance:", err));

    // Fetch settings
    fetch('api/settings.php')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSettings(data);
      })
      .catch(err => console.error("Error fetching settings:", err));
  }, []);

  // Authentication State for Dashboard
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');

  // Navigation Active Section State
  const [activeTab, setActiveTab] = useState<string>(() => localStorage.getItem('activeTab') || 'home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  React.useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // Notices State (so we can add custom ones in the admin simulation!)
  const [searchNotice, setSearchNotice] = useState("");
  const [selectedNoticeCategory, setSelectedNoticeCategory] = useState("all");
  const [viewingNotice, setViewingNotice] = useState<any | null>(null);

  // Admin Custom Notice Form


  // Eligibility Checker State
  const [eligibilityLevel, setEligibilityLevel] = useState<"hsc" | "degree">("hsc");
  const [sscGpaInput, setSscGpaInput] = useState<string>("3.80");
  const [hscGpaInput, setHscGpaInput] = useState<string>("3.50");
  const [targetGroup, setTargetGroup] = useState<string>("science");
  const [eligibilityResult, setEligibilityResult] = useState<{
    eligible: boolean;
    msgEN: string;
    msgBN: string;
    detailsEN?: string;
    detailsBN?: string;
  } | null>(null);

  // Admission Online Application Simulator State
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [sscRoll, setSscRoll] = useState("");
  const [sscBoard, setSscBoard] = useState("Rajshahi");
  const [sscYear, setSscYear] = useState("2025");
  const [applicantGpa, setApplicantGpa] = useState("4.20");
  const [selectedProgram, setSelectedProgram] = useState("HSC Science");
  const [chosenAvatar, setChosenAvatar] = useState("👩🏽‍🎓");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Result Search Form State
  const [resultExam, setResultExam] = useState("Degree");
  const [resultReg, setResultReg] = useState("");
  const [resultRoll, setResultRoll] = useState("");
  const [resultYear, setResultYear] = useState("2023");
  const [resultLoading, setResultLoading] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const [resultError, setResultError] = useState("");

  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultReg || !resultRoll) return;
    
    setResultLoading(true);
    setResultError("");
    setResultData(null);

    // Mock API Call until real API is provided
    setTimeout(() => {
      setResultLoading(false);
      // We will show a mock result or prompt them to provide API details.
      setResultData({
        name: "Mock Student",
        cgpa: "3.25",
        status: "Pass",
        message: "This is mock data. Please provide the actual NU API details to see real results!"
      });
    }, 1500);
  };

  // Interactive Spot Map State
  const [selectedSpotId, setSelectedSpotId] = useState<string>("admin");

  // Gallery Lightbox State
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string } | null>(null);
  const [galleryFilter, setGalleryFilter] = useState("all");

  // Automated Chat / Help Desk State
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    {
      sender: "bot",
      text: lang === "EN" 
        ? "Hello! Welcome to Haji Jamir Uddin Shafina Women's Degree College Help Desk. Ask me anything about 'admission', 'courses', 'location', 'hostel', or 'scholarship'!"
        : "আসসালামু আলাইকুম! হাজী জমির উদ্দীন শাফিনা মহিলা ডিগ্রি কলেজের তথ্য সহায়তা কেন্দ্রে আপনাকে স্বাগতম। ভর্তি, কোর্সসমূহ, কলেজ হোস্টেল, বৃত্তির সুযোগ অথবা লোকেশন জানতে এখানে প্রশ্ন করুন।"
    }
  ]);

  // Contact Form Query State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [submittedQueries, setSubmittedQueries] = useState<Array<{ name: string; msg: string; date: string }>>([]);

  // Language toggle helper
  const toggleLanguage = () => {
    setLang((prev) => (prev === "EN" ? "BN" : "EN"));
  };

  // Eligibility Checker Action
  const calculateEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    const sscGpa = parseFloat(sscGpaInput) || 0;
    const hscGpa = parseFloat(hscGpaInput) || 0;

    if (sscGpa < 0 || sscGpa > 5.0 || hscGpa < 0 || hscGpa > 5.0) {
      setEligibilityResult({
        eligible: false,
        msgEN: "Invalid GPA values. Please enter a GPA between 0.00 and 5.00.",
        msgBN: "ভুল জিপিএ তথ্য! অনুগ্রহ করে ০.০০ থেকে ৫.০০ এর মধ্যে জিপিএ প্রদান করুন।"
      });
      return;
    }

    if (eligibilityLevel === "hsc") {
      if (targetGroup === "science") {
        if (sscGpa >= 3.5) {
          setEligibilityResult({
            eligible: true,
            msgEN: "Congratulations! You meet the qualification requirements for the Science Group.",
            msgBN: "অভিনন্দন! আপনি বিজ্ঞান বিভাগে ভর্তির জন্য প্রয়োজনীয় জিপিএ যোগ্যতা অর্জন করেছেন।",
            detailsEN: `Required: SSC GPA 3.50+ | Your Input: ${sscGpa.toFixed(2)}. Space limit: 150 seats available.`,
            detailsBN: `প্রয়োজনীয় জিপিএ: ৩.৫০ | আপনার জিপিএ: ${sscGpa.toFixed(2)}। বিজ্ঞান শাখায় মোট আসন ১৫০টি।`
          });
        } else {
          setEligibilityResult({
            eligible: false,
            msgEN: "Sorry, you do not meet the minimum GPA requirement for the Science Group.",
            msgBN: "দুঃখিত, আপনি বিজ্ঞান বিভাগের জন্য ন্যূনতম জিপিএ যোগ্যতা (৩.৫০) অর্জন করতে পারেননি।",
            detailsEN: "You can easily apply for our Humanities or Business Studies group which requires a minimum SSC GPA of 2.50.",
            detailsBN: "তবে আপনি আমাদের মানবিক বা ব্যবসায় শিক্ষা বিভাগে আবেদন করতে পারেন, যেখানে ন্যূনতম ২.৫০ জিপিএ প্রয়োজন।"
          });
        }
      } else {
        // Humanities and Business Studies
        if (sscGpa >= 2.5) {
          setEligibilityResult({
            eligible: true,
            msgEN: "Excellent! You are highly eligible for the Humanities & Business Studies groups.",
            msgBN: "চমৎকার! আপনি মানবিক ও ব্যবসায় শিক্ষা বিভাগে ভর্তির জন্য সম্পূর্ণ যোগ্য।",
            detailsEN: `Required: SSC GPA 2.50+ | Your Input: ${sscGpa.toFixed(2)}. Plenty of seat capacity.`,
            detailsBN: `প্রয়োজনীয় জিপিএ: ২.৫০ | আপনার জিপিএ: ${sscGpa.toFixed(2)}। মানবিক শাখায় ৩০০টি ও ব্যবসায় শিক্ষায় ২০০টি আসন রয়েছে।`
          });
        } else {
          setEligibilityResult({
            eligible: false,
            msgEN: "GPA is too low for HSC Level regular courses.",
            msgBN: "উচ্চ মাধ্যমিক কোর্সে আবেদনের জন্য আপনার জিপিএ ন্যূনতম প্রয়োজনীয় মানের চেয়ে কম।",
            detailsEN: "Minimum required GPA is 2.50. Please consult the college admission helpline in campus room 102.",
            detailsBN: "সর্বনিম্ন প্রয়োজনীয় জিপিএ হলো ২.৫০। বিস্তারিত তথ্যের জন্য অনুগ্রহ করে কলেজের ১০২ নম্বর কক্ষে যোগাযোগ করুন।"
          });
        }
      }
    } else {
      // Degree Level
      if (sscGpa >= 2.0 && hscGpa >= 2.0) {
        setEligibilityResult({
          eligible: true,
          msgEN: "Congratulations! You are eligible for BA, BSS, and BBS Pass degree courses.",
          msgBN: "অভিনন্দন! আপনি বিএ, বিএসএস এবং বিবিএস ডিগ্রী পাস কোর্সে আবেদনের জন্য সম্পূর্ণ যোগ্য।",
          detailsEN: `Required: SSC 2.0 & HSC 2.0 | Yours: SSC ${sscGpa.toFixed(2)}, HSC ${hscGpa.toFixed(2)}.`,
          detailsBN: `প্রয়োজনীয় জিপিএ: এসএসসি ২.০ এবং এইচএসসি ২.০ | আপনার এসএসসি: ${sscGpa.toFixed(2)}, এইচএসসি: ${hscGpa.toFixed(2)}।`
        });
      } else {
        setEligibilityResult({
          eligible: false,
          msgEN: "Minimum criteria for National University Degree Pass courses not met.",
          msgBN: "জাতীয় বিশ্ববিদ্যালয়ের ডিগ্রি পাস কোর্সের জন্য ন্যূনতম ভর্তির যোগ্যতা পূরণ হয়নি।",
          detailsEN: "National University requires at least GPA 2.00 in both SSC and HSC levels.",
          detailsBN: "জাতীয় বিশ্ববিদ্যালয়ের নির্দেশনানুযায়ী এসএসসি এবং এইচএসসি উভয় স্তরেই ন্যূনতম জিপিএ ২.০০ থাকতে হবে।"
        });
      }
    }
  };

  // Submit Admission application Simulator
  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone || !sscRoll) {
      alert(lang === "EN" ? "Please fill in all mandatory fields!" : "অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন!");
      return;
    }

    const applicationID = "HJS-" + Math.floor(100000 + Math.random() * 900000);
    const dateSubmitted = new Date().toLocaleDateString();

    const data = {
      applicationID,
      applicantName,
      applicantPhone,
      fatherName,
      motherName,
      sscRoll,
      sscBoard,
      sscYear,
      applicantGpa,
      selectedProgram,
      chosenAvatar,
      dateSubmitted
    };

    // Save to Database via API
    fetch('api/applications.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        application_id: applicationID,
        applicant_name: applicantName,
        applicant_phone: applicantPhone,
        selected_program: selectedProgram,
        applicant_gpa: applicantGpa,
        date_submitted: dateSubmitted,
        status: 'Pending'
      }),
    })
    .then(res => res.json())
    .then(response => {
      if (!response.error) {
        // Update local state to reflect instantly
        setApplicationsList(prev => [
          {
            applicationID,
            applicantName,
            applicantPhone,
            selectedProgram,
            applicantGpa,
            dateSubmitted,
            status: "Pending" as const
          },
          ...prev
        ]);
        setSubmittedData(data);
        setIsSubmitted(true);
      } else {
        alert("Failed to submit application to database.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error submitting application.");
    });
  };

  // Reset Application form
  const resetApplicationForm = () => {
    setApplicantName("");
    setApplicantPhone("");
    setFatherName("");
    setMotherName("");
    setSscRoll("");
    setApplicantGpa("4.00");
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  // Chat Assistance Logic
  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    const updatedMessages = [...chatMessages, { sender: "user" as const, text: userMsg }];
    setChatMessages(updatedMessages);
    setChatInput("");

    // Simple automated response rules based on keywords
    setTimeout(() => {
      let botResponse = "";
      const textLower = userMsg.toLowerCase();

      if (lang === "EN") {
        if (textLower.includes("admission") || textLower.includes("apply") || textLower.includes("gpa") || textLower.includes("eligibility")) {
          botResponse = "To apply online, you can use our dynamic Admission Portal right here on the website! We have HSC (Science, Humanities, Business Studies), Degree (BA, BSS, BBS), and Honours programs (Bangla, Social Work, Economics, Management). Minimum GPA for HSC is 2.50 (Humanities/Business) and 3.50 (Science).";
        } else if (textLower.includes("hostel") || textLower.includes("stay") || textLower.includes("accommodation")) {
          botResponse = "Yes! The college provides a highly secure on-campus Girls' Hostel (Begum Rokeya Student Hostel) with complete security, hygienic cooking, and caring superintendents. Fees are very affordable.";
        } else if (textLower.includes("location") || textLower.includes("address") || textLower.includes("where") || textLower.includes("map")) {
          botResponse = "We are located at Luxmipur Vatapara, GPO-6000, Rajpara Thana, Rajshahi, Bangladesh. It is behind the DC Office/medical area, very safe and easy to reach by local transport.";
        } else if (textLower.includes("scholarship") || textLower.includes("free") || textLower.includes("fee") || textLower.includes("stipend") || textLower.includes("trust")) {
          botResponse = "We offer Haji Jamir Uddin Shafina Trust Fund scholarships and textbook assistance programs for brilliant but underprivileged female students. Monthly stipends are also provided based on attendance and exam results.";
        } else if (textLower.includes("phone") || textLower.includes("contact") || textLower.includes("email")) {
          botResponse = "You can contact our office desk at +880 721 772567 or email us at info@shafinacollege.online. We are open from 9:00 AM to 4:00 PM (except Fridays & holidays).";
        } else {
          botResponse = "Thank you for reaching out! Haji Jamir Uddin Shafina Women's College offers premium education in Rajshahi. You are welcome to visit our campus during office hours for a personal consultation.";
        }
      } else {
        // Bengali Response rules
        if (textLower.includes("ভর্তি") || textLower.includes("আবেদন") || textLower.includes("জিপিএ") || textLower.includes("যোগ্যতা")) {
          botResponse = "অনলাইনে আবেদন করার জন্য আমাদের ওয়েবসাইটের 'ভর্তি পোর্টাল' ট্যাবটি ব্যবহার করুন। এখানে এইচএসসি (বিজ্ঞান, মানবিক, ব্যবসায় শিক্ষা), ডিগ্রি (পাস) এবং অনার্স কোর্সসমূহের তথ্য রয়েছে। বিজ্ঞানের জন্য ন্যূনতম জিপিএ ৩.৫০ এবং মানবিক/ব্যবসায়ের জন্য ২.৫০ আবশ্যক।";
        } else if (textLower.includes("হোস্টেল") || textLower.includes("থাকা") || textLower.includes("মেস") || textLower.includes("আবাসন")) {
          botResponse = "হ্যাঁ! দূরবর্তী ছাত্রীদের জন্য কলেজের ভেতরেই সম্পূর্ণ নিরাপদ 'বেগম রোকেয়া ছাত্রী নিবাস' (অন-ক্যাম্পাস হোস্টেল) রয়েছে। এতে স্বাস্থ্যকর খাবার, নিরাপত্তা প্রহরী এবং সার্বক্ষণিক বিদ্যুৎ সুবিধা রয়েছে।";
        } else if (textLower.includes("ঠিকানা") || textLower.includes("কোথায়") || textLower.includes("অবস্থান") || textLower.includes("ম্যাপ") || textLower.includes("লোকেশন")) {
          botResponse = "আমাদের কলেজটি রাজশাহী মহানগরের রাজপাড়া থানার লক্ষ্মীপুর ভাটাপাড়ায় অবস্থিত। এটি ডিসি অফিসের পেছনে অবস্থিত যা ছাত্রীদের যাতায়াতের জন্য অত্যন্ত সহজ ও নিরাপদ এলাকা।";
        } else if (textLower.includes("উপবৃত্তি") || textLower.includes("ফ্রি") || textLower.includes("খরচ") || textLower.includes("টাকা") || textLower.includes("বৃত্তি") || textLower.includes("সহায়তা")) {
          botResponse = "অসচ্ছল ও মেধাবী ছাত্রীদের জন্য হাজী জমির উদ্দীন শাফিনা ট্রাস্ট ফান্ডের মাধ্যমে বিনামূল্যে পাঠ্যপুস্তক সরবরাহ ও মাসিক উপবৃত্তি প্রদান করা হয়। প্রতি বছর বিপুল সংখ্যক ছাত্রী এই সুবিধা লাভ করছে।";
        } else if (textLower.includes("ফোন") || textLower.includes("যোগাযোগ") || textLower.includes("মোবাইল") || textLower.includes("ইমেইল")) {
          botResponse = "আমাদের সাধারণ শাখায় ফোন করতে পারেন: +৮৮০ ৭২১ ৭৭২৫৬৭ অথবা ইমেইল করুন: info@shafinacollege.online। শুক্রবার ও সরকারি ছুটির দিন ব্যতীত প্রতিদিন সকাল ৯:০০ টা থেকে বিকেল ৪:০০ টা পর্যন্ত কলেজ কার্যালয় খোলা থাকে।";
        } else {
          botResponse = "আপনার বার্তার জন্য ধন্যবাদ! হাজী জমির উদ্দীন শাফিনা মহিলা ডিগ্রী কলেজ রাজশাহীর নারী শিক্ষায় অনন্য অবদান রাখছে। যেকোনো তথ্যের জন্য সরাসরি আমাদের হেল্প ডেস্কে চলে আসার আমন্ত্রণ রইলো।";
        }
      }

      setChatMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 850);
  };



  // Filter & Search Notice computation
  const filteredNotices = useMemo(() => {
    return notices.filter((item) => {
      const matchCategory = selectedNoticeCategory === "all" || item.category === selectedNoticeCategory;
      const textToSearch = (item.titleEN + " " + item.titleBN + " " + item.contentEN + " " + item.contentBN).toLowerCase();
      const matchSearch = textToSearch.includes(searchNotice.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [notices, selectedNoticeCategory, searchNotice]);

  // Gallery Filter computation
  const filteredGallery = useMemo(() => {
    if (galleryFilter === "all") return galleryData;
    return galleryData.filter((item) => item.category === galleryFilter);
  }, [galleryFilter]);

  // Handle Contact Query Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) {
      alert(lang === "EN" ? "Please fill in Name and Message!" : "অনুগ্রহ করে নাম এবং বার্তা পূরণ করুন!");
      return;
    }

    const newQuery = {
      name: contactName,
      msg: contactMessage,
      date: new Date().toLocaleString()
    };

    setSubmittedQueries([newQuery, ...submittedQueries]);
    setContactSubmitted(true);
    setContactName("");
    setContactEmail("");
    setContactMessage("");

    setTimeout(() => {
      setContactSubmitted(false);
    }, 5000);
  };

  // Print simulator for application slip
  const handlePrintSlip = () => {
    window.print();
  };

  if (activeTab === "student_portal") {
    return <StudentPortal lang={lang} onBack={() => setActiveTab("home")} />;
  }

  if (activeTab === "teacher_portal") {
    return <TeacherPortal lang={lang} onBack={() => setActiveTab("home")} />;
  }

  if (activeTab === "dashboard") {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          lang={lang}
          correctPin={settings.admin_pin || 'admin123'}
          onLogin={() => setIsAuthenticated(true)}
          onCancel={() => setActiveTab("home")}
        />
      );
    }

    return (
      <DashboardLayout
        lang={lang}
        notices={notices}
        setNotices={setNotices}
        applications={applicationsList}
        setApplications={setApplicationsList}
        students={studentsList}
        setStudents={setStudentsList}
        results={results}
        setResults={setResults}
        attendance={attendance}
        setAttendance={setAttendance}
        settings={settings}
        setSettings={setSettings}
        onLogout={() => {
          setIsAuthenticated(false);
          setActiveTab("home");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-bilingual flex flex-col selection:bg-rose-600 selection:text-white">
      
      {/* TOP SCROLLING TICKER */}
      <div className="bg-rose-950 text-white py-2 text-xs md:text-sm border-b border-rose-900/50 relative overflow-hidden z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 shrink-0 bg-rose-700 text-white font-bold px-3 py-1 rounded text-[11px] uppercase tracking-wider animate-pulse">
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === "EN" ? "Urgent Notice:" : "জরুরি নোটিশ:"}</span>
            <span className="sm:hidden">{lang === "EN" ? "Alert:" : "সতর্কতা:"}</span>
          </div>
          <div className="flex-1 overflow-hidden mx-4 relative h-5">
            <span className="absolute whitespace-nowrap animate-marquee font-medium text-rose-100">
              {lang === "EN" 
                ? `★ [March 2026] HSC Practical Exams will take place from March 18th to March 24th. ★ National University Degree 1st Year Exam postponed to April 5th, 2026. ★ Admission open for Session 2026-27!`
                : `★ [মার্চ ২০২৬] উচ্চ মাধ্যমিক ব্যবহারিক পরীক্ষা আগামী ১৮ই মার্চ থেকে ২৪শে মার্চ পর্যন্ত অনুষ্ঠিত হবে। ★ জাতীয় বিশ্ববিদ্যালয় ডিগ্রী ১ম বর্ষ পরীক্ষা স্থগিত করা হয়েছে, সংশোধিত সূচি অনুযায়ী আগামী ৫ই এপ্রিল থেকে পরীক্ষা অনুষ্ঠিত হবে। ★ নতুন সেশনে ভর্তি চলছে!`}
            </span>
          </div>
          <div className="shrink-0 text-[11px] font-semibold text-rose-300">
            EIIN: 127037 | Code: 1029, 2567
          </div>
        </div>
      </div>

      {/* TOP EMERGENCY INFO BAR & SOCIALS */}
      <header className="bg-slate-900 text-slate-300 py-2.5 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left justify-center">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-rose-500" />
              <span>+880 721 772567, +8801712-345678</span>
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-rose-500" />
              <span>info@shafinacollege.online</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-500" />
              <span>Luxmipur Vatapara, Rajpara, Rajshahi</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden lg:inline-block text-slate-400">
              {lang === "EN" ? "Established: 1995" : "স্থাপিত: ১৯৯৫ খ্রিষ্টাব্দ"}
            </span>
            
            {/* MULTILINGUAL LANGUAGE BUTTON */}
            <button
              onClick={toggleLanguage}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1 rounded flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105"
              title={lang === "EN" ? "বাংলায় দেখুন" : "View in English"}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span className="text-xs">{t.languageLabel}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LOGO HEADER AND HERO BRAND */}
      <div className="bg-white border-b border-slate-200 py-5 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center gap-3.5 text-center lg:text-left">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-rose-700 via-pink-600 to-rose-900 p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center text-rose-800 relative overflow-hidden">
                <GraduationCap className="w-8 h-8 text-rose-700 mb-[-2px]" />
                <span className="text-[10px] font-extrabold uppercase tracking-tighter text-rose-900 leading-none">HJSWC</span>
                <span className="text-[7px] text-slate-500 uppercase">Est: 1995</span>
              </div>
            </div>
            
            <div>
              <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
                <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                  {lang === "EN" ? "NU Affiliated" : "জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত"}
                </span>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                  {lang === "EN" ? "EIIN: 127037" : "ইআইআইএন: ১২৭০৩৭"}
                </span>
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                  {lang === "EN" ? "College Code: 1029 / 2567" : "কলেজ কোড: ১০২৯ / ২৫৬৭"}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight mt-1">
                {t.collegeName}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5 max-w-2xl">
                {t.collegeSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Contact & Info Card */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveTab("dashboard");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-slate-900 hover:bg-black text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 border-2 border-slate-700 animate-pulse"
            >
              <Users className="w-4 h-4 text-rose-400" />
              <span>{lang === "EN" ? "Admin Dashboard" : "ড্যাশবোর্ড"}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("admission");
                document.getElementById("admission-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-rose-100 transition-all cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-rose-200" />
              <span>{t.applyNowBtn}</span>
            </button>
          </div>
        </div>

        {/* NAVIGATION LINKS CONTAINER */}
        <nav className="bg-white border-t border-slate-100 mt-4 relative z-40">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex justify-between items-center py-2">
              <span className="text-sm font-bold text-slate-600">{lang === "EN" ? "Main Menu" : "মূল মেনু"}</span>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            <div className={`${isMobileMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row flex-wrap justify-center md:justify-start gap-1 py-2 md:py-1`}>
              {[
                { id: "home", label: t.navHome },
                { id: "about", label: t.navAbout },
                { id: "programs", label: t.navPrograms },
                { id: "admission", label: t.navAdmission },
                { id: "notices", label: t.navNotices },
                { id: "campus-map", label: t.navCampusMap },
                { id: "gallery", label: t.navGallery },
                { id: "contact", label: t.navContact },
                { id: "dashboard", label: lang === "EN" ? "Dashboard" : "ড্যাশবোর্ড" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                    document.getElementById(`${tab.id}-section`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full md:w-auto text-left md:text-center px-4 md:px-3 py-3 md:py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-rose-50 text-rose-700 border-l-4 md:border-l-0 md:border-b-2 border-rose-600"
                      : tab.id === "dashboard"
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-sm mt-2 md:mt-0"
                      : "text-slate-600 hover:bg-slate-50 hover:text-rose-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              {/* Portals Dropdown */}
              <div className="relative group ml-0 md:ml-1 mt-2 md:mt-0 w-full md:w-auto">
                <button className="w-full md:w-auto justify-between px-4 md:px-3 py-3 md:py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer text-slate-600 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-1 border border-slate-200 md:border-none">
                  {lang === "EN" ? "Portals" : "পোর্টাল"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute top-full right-0 left-0 md:left-0 mt-1 w-full md:w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      setActiveTab("student_portal");
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 border-b border-slate-50 flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" /> {lang === "EN" ? "Student Portal" : "স্টুডেন্ট পোর্টাল"}
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("teacher_portal");
                      setIsMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-700 flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" /> {lang === "EN" ? "Teacher Portal" : "শিক্ষক পোর্টাল"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* --- HERO SLIDER / MAIN BANNER --- */}
      <section id="home-section" className="relative bg-gradient-to-br from-slate-900 to-rose-950 text-white py-12 md:py-20 overflow-hidden">
        
        {/* Background Decorative Graphic */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-rose-500 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-rose-300 animate-spin" />
                <span>{lang === "EN" ? "Empowering Women Since 1995" : "১৯৯৫ খ্রিষ্টাব্দ থেকে নারী শিক্ষায় অনবদ্য অবদান"}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {lang === "EN" 
                  ? "Build Your Future with Moral Integrity & Modern Skills" 
                  : "নৈতিক মূল্যবোধ ও আধুনিক দক্ষতায় গড়ুন আপনার ভবিষ্যৎ"}
              </h2>

              <p className="text-slate-300 text-sm md:text-lg max-w-xl font-light leading-relaxed">
                {lang === "EN" ? t.slogan1 : t.slogan2}
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-sm max-w-xl">
                <CheckCircle2 className="w-10 h-10 text-rose-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {lang === "EN" ? "Free Textbook & Stipend Support" : "বিনামূল্যে পাঠ্যপুস্তক ও উপবৃত্তি সহায়তা"}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {lang === "EN" 
                      ? "Provided through Haji Jamir Uddin Shafina Trust Fund to outstanding and needy female candidates."
                      : "হাজী জমির উদ্দীন শাফিনা ট্রাস্ট ফান্ডের পক্ষ থেকে মেধাবী ও অসচ্ছল ছাত্রীদের জন্য বিশেষ আর্থিক বৃত্তি।"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    setActiveTab("admission");
                    document.getElementById("admission-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <span>{lang === "EN" ? "Admission Registration" : "অনলাইন ভর্তি আবেদন"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => {
                    setActiveTab("programs");
                    document.getElementById("programs-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
                >
                  {lang === "EN" ? "Explore Courses" : "কোর্সসমূহ দেখুন"}
                </button>

                <button
                  onClick={() => {
                    setActiveTab("notices");
                    document.getElementById("notices-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-rose-950/40 hover:bg-rose-950/60 border border-rose-800/40 text-rose-200 font-semibold text-sm px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === "EN" ? "Notice Feed" : "নোটিশ সমূহ"}</span>
                </button>
              </div>
            </div>

            {/* Right Graphic Slide/Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                
                {/* Background colored blur card */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-rose-500 to-indigo-600 rounded-3xl blur opacity-30"></div>
                
                {/* Main Simulated Image Block */}
                <div className="relative bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-2.5">
                  <div className="aspect-video sm:aspect-square bg-slate-950 relative rounded-xl overflow-hidden flex items-center justify-center">
                    
                    {/* Visual Collage representing College life */}
                    <img 
                      src="https://web.academyims.com/storage/2406112/images/slider/slider_1754817585.webp" 
                      alt="College Girls Campus life" 
                      className="absolute inset-0 w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700" 
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                    {/* Badge Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur border border-slate-700/60 p-3 rounded-xl text-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                          {lang === "EN" ? "Live Registration Active" : "চলতি সেশনে সরাসরি ভর্তি চলছে"}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs md:text-sm mt-1">
                        {lang === "EN" ? "HSC & Degree Programs" : "উচ্চ মাধ্যমিক ও ডিগ্রি পাস কোর্স ২০২৬"}
                      </h5>
                      <p className="text-[10px] text-slate-400">
                        {t.affiliation}
                      </p>
                    </div>

                    {/* Absolute top badge */}
                    <div className="absolute top-3 right-3 bg-rose-600 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-md uppercase tracking-widest">
                      {lang === "EN" ? "HJSWC" : "হাজী জমির উদ্দীন শাফিনা"}
                    </div>
                  </div>

                  {/* Small Info Overlay List */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400">{lang === "EN" ? "Estd. Year" : "প্রতিষ্ঠাকাল"}</p>
                      <p className="text-xs font-bold text-rose-300">1995 AD</p>
                    </div>
                    <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400">{lang === "EN" ? "Safety Rating" : "নিরাপত্তা মান"}</p>
                      <p className="text-xs font-bold text-emerald-400">100% Secure</p>
                    </div>
                  </div>
                </div>

                {/* Extra Stats overlay box */}
                <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-3.5 rounded-xl shadow-xl hidden md:flex items-center gap-3 border border-slate-100 max-w-xs">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    96%
                  </div>
                  <div>
                    <h6 className="font-bold text-xs">{lang === "EN" ? "HSC Success" : "এইচএসসি পরীক্ষার সাফল্য"}</h6>
                    <p className="text-[10px] text-slate-500">{lang === "EN" ? "Outstanding results in Rajshahi" : "রাজশাহী বোর্ডে শ্রেষ্ঠ ফলাফল"}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- QUICK STATS GRID --- */}
      <section className="bg-white border-y border-slate-200 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            <div className="pt-4 md:pt-0">
              <span className="block text-2xl md:text-3.5xl font-extrabold text-rose-600">১,৫০০+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mt-1">
                {lang === "EN" ? "Active Female Students" : "সক্রিয় নিয়মিত ছাত্রী"}
              </span>
            </div>

            <div className="pt-4 md:pt-0">
              <span className="block text-2xl md:text-3.5xl font-extrabold text-rose-600">৪৫+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mt-1">
                {lang === "EN" ? "Experienced Faculty" : "অভিজ্ঞ শিক্ষকমণ্ডলী"}
              </span>
            </div>

            <div className="pt-4 md:pt-0">
              <span className="block text-2xl md:text-3.5xl font-extrabold text-indigo-600">৯৬.৫%</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mt-1">
                {lang === "EN" ? "HSC Success Rate" : "এইচএসসি সফলতার হার"}
              </span>
            </div>

            <div className="pt-4 md:pt-0">
              <span className="block text-2xl md:text-3.5xl font-extrabold text-indigo-600">৫টি</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mt-1">
                {lang === "EN" ? "Modern Computer & Science Labs" : "আধুনিক কম্পিউটার ও বিজ্ঞান ল্যাব"}
              </span>
            </div>

            <div className="pt-4 md:pt-0">
              <span className="block text-2xl md:text-3.5xl font-extrabold text-emerald-600">১০০%</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mt-1">
                {lang === "EN" ? "CCTV Monitor & Secure" : "নিরাপদ ও সিসিটিভি নিয়ন্ত্রিত"}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* --- ABOUT US / LEADERSHIP SECTION --- */}
      <section id="about-section" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-4.5xl font-extrabold text-slate-950">
              {lang === "EN" ? "About Our Institution" : "আমাদের পরিচিতি ও আদর্শ"}
            </h2>
            <div className="w-24 h-1.5 bg-rose-600 mx-auto mt-3 rounded-full"></div>
            <p className="text-slate-600 mt-4 text-sm md:text-base">
              {lang === "EN" 
                ? "Serving Rajshahi's female students with high secondary and degree level curriculum with a safe, caring, and stimulating environment."
                : "রাজশাহীর প্রাণকেন্দ্রে নারীদের মানসম্মত ও নৈতিক শিক্ষায় শিক্ষিত করার প্রত্যয়ে প্রতিষ্ঠিত এক অনন্য বিদ্যাপীঠ।"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* CARD 1: PRINCIPAL'S DESK */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
                  <div className="w-16 h-16 rounded-full bg-rose-100 shrink-0 border-2 border-rose-200 overflow-hidden">
                    <img src="https://web.academyims.com/storage/2406112/images/speeches/Principal%20(In%20Charge)_1756757670.webp" alt="Principal" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                      {t.principalTitle}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-0.5">
                      {t.principalName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {t.principalDegree}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed italic relative pl-4">
                  <span className="text-4xl text-rose-300 font-serif absolute left-0 top-[-10px] pointer-events-none">“</span>
                  {t.principalSpeech}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{lang === "EN" ? "Haji Jamir Uddin Shafina Women's College" : "হাজী জমির উদ্দীন শাফিনা মহিলা কলেজ"}</span>
                <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded">
                  {lang === "EN" ? "Principal" : "অধ্যক্ষ"}
                </span>
              </div>
            </div>

            {/* CARD 2: PRESIDENT OF GOVERNING BODY */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 shrink-0 border-2 border-indigo-200 overflow-hidden">
                    <img src="https://web.academyims.com/storage/2406112/images/speeches/%E0%A6%B6%E0%A6%BE%E0%A6%B9%E0%A6%BE%E0%A6%A8%E0%A7%81%E0%A6%B0%20%E0%A6%87%E0%A6%B8%E0%A6%B2%E0%A6%BE%E0%A6%AE_1754817473.webp" alt="President" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                      {t.presidentTitle}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-0.5">
                      {t.presidentName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {t.presidentDegree}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed italic relative pl-4">
                    <span className="text-4xl text-indigo-300 font-serif absolute left-0 top-[-10px] pointer-events-none">“</span>
                    {t.presidentSpeech}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{lang === "EN" ? "Governing Body" : "গভর্নিং বডি"}</span>
                <span className="bg-indigo-100 text-indigo-800 font-bold px-2.5 py-1 rounded">
                  {lang === "EN" ? "Leadership" : "নেতৃত্ব"}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- INTUITIVE ACADEMIC PROGRAMS --- */}
      <section id="programs-section" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
              {lang === "EN" ? "Academic Levels" : "একাডেমিক স্তরসমূহ"}
            </span>
            <h2 className="text-2xl md:text-4.5xl font-extrabold text-slate-900 mt-2">
              {t.academicTitle}
            </h2>
            <p className="text-slate-500 mt-3 text-xs md:text-sm">
              {t.academicSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* HSC LEVEL CARD */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="p-6 md:p-8">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-rose-100">
                  HSC
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {t.hscSection}
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  {t.hscDetails}
                </p>

                {/* Sub-groups */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {lang === "EN" ? "Available Streams:" : "শাখা সমুহ:"}
                  </h4>
                  
                  {hscGroups.map((group) => (
                    <div key={group.id} className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-slate-900">
                          {lang === "EN" ? group.nameEN : group.nameBN}
                        </span>
                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                          {group.duration}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {lang === "EN" ? "Major Subjects: " : "প্রধান বিষয়: "}
                        {(lang === "EN" ? group.subjectsEN : group.subjectsBN).slice(0, 4).join(", ")}...
                      </p>
                      <div className="mt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100 pt-2">
                        <span>{lang === "EN" ? `Seats: ${group.seats}` : `আসন সংখ্যা: ${group.seats}`}</span>
                        <span className="text-rose-600 font-semibold">{lang === "EN" ? "Min SSC GPA: " : "এসএসসি জিপিএ: "} {group.minGpaSsc.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {lang === "EN" ? "Rajshahi Board" : "রাজশাহী বোর্ড অনুমোদিত"}
                </span>
                <button
                  onClick={() => {
                    setActiveTab("admission");
                    setEligibilityLevel("hsc");
                    document.getElementById("admission-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{lang === "EN" ? "Calculate Admission" : "ভর্তির যোগ্যতা"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* DEGREE PASS LEVEL CARD */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="p-6 md:p-8">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-indigo-100">
                  DEG
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {t.degreeSection}
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  {t.degreeDetails}
                </p>

                {/* Degree Pass Courses */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {lang === "EN" ? "Degree streams:" : "ডিগ্রী পাস শাখাসমূহ:"}
                  </h4>

                  {degreeGroups.map((group) => (
                    <div key={group.id} className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-slate-900">
                          {lang === "EN" ? group.nameEN : group.nameBN}
                        </span>
                        <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono font-bold">
                          {group.duration}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {lang === "EN" ? "Subjects: " : "বিষয়সমূহ: "}
                        {(lang === "EN" ? group.subjectsEN : group.subjectsBN).slice(0, 4).join(", ")}...
                      </p>
                      <div className="mt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100 pt-2">
                        <span>{lang === "EN" ? `Seats: ${group.seats}` : `আসন সংখ্যা: ${group.seats}`}</span>
                        <span className="text-indigo-600 font-semibold">{lang === "EN" ? "Min GPA: " : "ন্যূনতম জিপিএ: "} ২.০০</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {lang === "EN" ? "National University" : "জাতীয় বিশ্ববিদ্যালয়"}
                </span>
                <button
                  onClick={() => {
                    setActiveTab("admission");
                    setEligibilityLevel("degree");
                    document.getElementById("admission-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{lang === "EN" ? "Check Eligibility" : "যোগ্যতা যাচাই"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* HONOURS COURSES LEVEL CARD */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="p-6 md:p-8">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-emerald-100">
                  HON
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {t.honoursSection}
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  {t.honoursDetails}
                </p>

                {/* Honours Program details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {lang === "EN" ? "Specialized Honours Subjects:" : "অনার্স বিষয়সমূহ:"}
                  </h4>

                  {honoursCourses.map((course) => (
                    <div key={course.id} className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-slate-900">
                          {lang === "EN" ? course.nameEN : course.nameBN}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                          {course.duration}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-tight">
                        <strong className="text-slate-600">{lang === "EN" ? "Eligibility: " : "যোগ্যতা: "}</strong>
                        {lang === "EN" ? course.eligibilityEN : course.eligibilityBN}
                      </p>
                      <div className="mt-1.5 text-[10px] text-slate-400 flex justify-between">
                        <span>{lang === "EN" ? `Affiliation Code: 2567` : `অধিভুক্তি কোড: ২৫৬৭`}</span>
                        <span className="font-semibold text-emerald-600">{lang === "EN" ? `Seats: ${course.seats}` : `আসন: ${course.seats}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {lang === "EN" ? "Honours Program" : "অনার্স প্রোগ্রাম"}
                </span>
                <span className="text-xs text-emerald-600 font-bold">
                  {lang === "EN" ? "Apply through NU Portal" : "NU পোর্টালের মাধ্যমে আবেদন"}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- INTERACTIVE ADMISSION PORTAL & ELIGIBILITY CALCULATOR & ADMISSION SLIP GENERATOR --- */}
      <section id="admission-section" className="py-16 bg-gradient-to-b from-slate-50 to-rose-50/40 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {lang === "EN" ? "ADMISSION PORTAL 2026" : "অনলাইন ভর্তি পোর্টাল ২০২৬"}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
              {lang === "EN" ? "Dynamic Admission & Eligibility Hub" : "সহজ অনলাইন ভর্তি ও যোগ্যতা নিরূপণ কেন্দ্র"}
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              {lang === "EN" 
                ? "First, check your eligibility instantly with our GPA calculator, then apply simulated online to receive your official registration slip."
                : "প্রথমে জিপিএ ক্যালকুলেটর দিয়ে আপনার ভর্তির যোগ্যতা পরীক্ষা করুন, এবং অনলাইনে আবেদন করে সাময়িক আবেদন কপি সংগ্রহ করুন।"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN 1 (4 Cores): ELIGIBILITY CALCULATOR WIDGET */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl shadow-md border border-rose-100">
              <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <BookMarked className="w-5 h-5 text-rose-600" />
                <span>{t.checkEligibility}</span>
              </h3>

              <form onSubmit={calculateEligibility} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    {lang === "EN" ? "Select Target Course Level" : "টার্গেট কোর্সের লেভেল"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEligibilityLevel("hsc")}
                      className={`py-2 text-xs font-bold rounded-lg transition-all ${
                        eligibilityLevel === "hsc"
                          ? "bg-rose-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {lang === "EN" ? "HSC Level" : "উচ্চ মাধ্যমিক স্তর"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEligibilityLevel("degree")}
                      className={`py-2 text-xs font-bold rounded-lg transition-all ${
                        eligibilityLevel === "degree"
                          ? "bg-rose-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {lang === "EN" ? "Degree Pass" : "ডিগ্রী পাস কোর্স"}
                    </button>
                  </div>
                </div>

                {eligibilityLevel === "hsc" && (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      {lang === "EN" ? "Target Academic Group" : "কাঙ্ক্ষিত গ্রুপ/শাখা"}
                    </label>
                    <select
                      value={targetGroup}
                      onChange={(e) => setTargetGroup(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                    >
                      <option value="science">{lang === "EN" ? "Science Group (Min: 3.5)" : "বিজ্ঞান বিভাগ (ন্যূনতম: ৩.৫)"}</option>
                      <option value="humanities">{lang === "EN" ? "Humanities Group (Min: 2.5)" : "মানবিক বিভাগ (ন্যূনতম: ২.৫)"}</option>
                      <option value="business">{lang === "EN" ? "Business Studies (Min: 2.5)" : "ব্যবসায় শিক্ষা (ন্যূনতম: ২.৫)"}</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      {lang === "EN" ? "Your SSC GPA (0 - 5.00)" : "আপনার এসএসসি জিপিএ"}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="1.00"
                      max="5.00"
                      value={sscGpaInput}
                      onChange={(e) => setSscGpaInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  {eligibilityLevel === "degree" && (
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                        {lang === "EN" ? "Your HSC GPA (0 - 5.00)" : "আপনার এইচএসসি জিপিএ"}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="1.00"
                        max="5.00"
                        value={hscGpaInput}
                        onChange={(e) => setHscGpaInput(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-rose-950 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-rose-400" />
                  <span>{lang === "EN" ? "Verify GPA Eligibility" : "ভর্তির যোগ্যতা যাচাই করুন"}</span>
                </button>
              </form>

              {/* Eligibility Result Display */}
              {eligibilityResult && (
                <div className={`mt-5 p-4 rounded-xl border ${
                  eligibilityResult.eligible 
                    ? "bg-emerald-50/90 border-emerald-200 text-emerald-950" 
                    : "bg-amber-50/90 border-amber-200 text-amber-950"
                } transition-all`}>
                  <div className="flex items-start gap-3">
                    {eligibilityResult.eligible ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-bold text-sm">
                        {lang === "EN" ? (eligibilityResult.eligible ? "Eligible to Apply!" : "Requirements Incomplete") : (eligibilityResult.eligible ? "আবেদনের জন্য যোগ্য!" : "ভর্তির যোগ্যতা অপূর্ণ রয়েছে")}
                      </h4>
                      <p className="text-xs mt-1 font-medium">
                        {lang === "EN" ? eligibilityResult.msgEN : eligibilityResult.msgBN}
                      </p>
                      {eligibilityResult.detailsEN && (
                        <p className="text-[11px] mt-2 text-slate-500 border-t border-slate-200/50 pt-2 font-light">
                          {lang === "EN" ? eligibilityResult.detailsEN : eligibilityResult.detailsBN}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Extra Document checklist info */}
              <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-xs text-slate-700 uppercase mb-2">
                  {lang === "EN" ? "Required Papers during Admission:" : "ভর্তির সময় প্রয়োজনীয় কাগজপত্র:"}
                </h4>
                <ul className="text-[11px] text-slate-500 space-y-1.5 list-disc pl-4">
                  <li>{lang === "EN" ? "SSC / HSC original Academic transcript (Mark-sheet)" : "এসএসসি/এইচএসসি পরীক্ষার মূল একাডেমিক ট্রান্সক্রিপ্ট (মার্কশীট)"}</li>
                  <li>{lang === "EN" ? "3 copies passport size color photograph with background white" : "৩ কপি পাসপোর্ট সাইজের রঙিন ছবি (ব্যাকগ্রাউন্ড সাদা)"}</li>
                  <li>{lang === "EN" ? "SSC/HSC Admit card & Registration certificate copies" : "এসএসসি/এইচএসসি মূল প্রবেশপত্র ও রেজিস্ট্রেশন কার্ডের কপি"}</li>
                  <li>{lang === "EN" ? "National ID Card or Online Birth Registration Card" : "জাতীয় পরিচয়পত্র বা অনলাইন জন্ম নিবন্ধন কার্ডের ফটোকপি"}</li>
                </ul>
              </div>

            </div>

            {/* COLUMN 2 (7 Cores): ONLINE APPLICATION WIDGET SIMULATOR */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl shadow-md border border-rose-100 relative overflow-hidden">
              
              {!isSubmitted ? (
                <div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-5">
                    <div>
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded">Step-by-Step</span>
                      <h3 className="text-lg font-bold text-slate-950 mt-1">
                        {lang === "EN" ? "Apply Online - Application Form" : "অনলাইন ভর্তি আবেদন ফরম ২০২৬"}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400">
                      {lang === "EN" ? "Time Left: Active" : "সময়সীমা: চলমান"}
                    </span>
                  </div>

                  <form onSubmit={handleAdmissionSubmit} className="space-y-4">
                    
                    {/* Select Student Avatar Avatar for application receipt */}
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                        {lang === "EN" ? "Select Student Avatar for Receipt" : "রশিদের জন্য ছাত্রীর প্রতিকৃতি নির্বাচন করুন"}
                      </label>
                      <div className="flex gap-4">
                        {[
                          { emoji: "👩🏽‍🎓", label: lang === "EN" ? "HSC Scholar" : "এইচএসসি ছাত্রী" },
                          { emoji: "👩🏻‍💻", label: lang === "EN" ? "ICT Focused" : "আইটি শিক্ষার্থিনী" },
                          { emoji: "👩🏾‍🏫", label: lang === "EN" ? "Honours Scholar" : "ডিগ্রী গবেষক" },
                          { emoji: "👩🏼‍🎨", label: lang === "EN" ? "Cultural Club" : "সাংস্কৃতিক ক্লাব" }
                        ].map((item) => (
                          <button
                            key={item.emoji}
                            type="button"
                            onClick={() => setChosenAvatar(item.emoji)}
                            className={`flex-1 p-2 rounded-xl border text-center transition-all cursor-pointer ${
                              chosenAvatar === item.emoji 
                                ? "bg-rose-50 border-rose-600 text-xl" 
                                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-lg"
                            }`}
                          >
                            <span className="block">{item.emoji}</span>
                            <span className="text-[9px] text-slate-500 block mt-1">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                          {lang === "EN" ? "Applicant Name *" : "ছাত্রীর পূর্ণ নাম (বাংলা/ইংরেজি) *"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tasnim Rahman Shafina"
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                          {lang === "EN" ? "Mobile Number *" : "অভিভাবক বা ছাত্রীর মোবাইল নম্বর *"}
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 01712XXXXXX"
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                          {lang === "EN" ? "Father's Name" : "পিতার নাম"}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Md. Abdur Rahman"
                          value={fatherName}
                          onChange={(e) => setFatherName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                          {lang === "EN" ? "Mother's Name" : "মাতার নাম"}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Begum Rokeya"
                          value={motherName}
                          onChange={(e) => setMotherName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                          {lang === "EN" ? "SSC Roll No *" : "এসএসসি রোল নং *"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="124578"
                          value={sscRoll}
                          onChange={(e) => setSscRoll(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                          {lang === "EN" ? "SSC Board" : "বোর্ড"}
                        </label>
                        <select
                          value={sscBoard}
                          onChange={(e) => setSscBoard(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                        >
                          <option value="Rajshahi">Rajshahi</option>
                          <option value="Dhaka">Dhaka</option>
                          <option value="Dinajpur">Dinajpur</option>
                          <option value="Jessore">Jessore</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                          {lang === "EN" ? "Passing Year" : "পাশের সন"}
                        </label>
                        <select
                          value={sscYear}
                          onChange={(e) => setSscYear(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                        >
                          <option value="2025">2025</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                          {lang === "EN" ? "SSC GPA *" : "প্রাপ্ত জিপিএ *"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 4.80"
                          value={applicantGpa}
                          onChange={(e) => setApplicantGpa(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500 font-mono font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                        {lang === "EN" ? "Preferred Course/Subject to Admit" : "ভর্তির জন্য কাঙ্ক্ষিত কোর্স বা গ্রুপ নির্বাচন করুন"}
                      </label>
                      <select
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className="w-full bg-slate-50 border-rose-200 border-2 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500 font-semibold"
                      >
                        <option value="HSC Science">{lang === "EN" ? "HSC - Science Group" : "এইচএসসি - বিজ্ঞান গ্রুপ"}</option>
                        <option value="HSC Humanities">{lang === "EN" ? "HSC - Humanities Group" : "এইচএসসি - মানবিক গ্রুপ"}</option>
                        <option value="HSC Business Studies">{lang === "EN" ? "HSC - Business Studies" : "এইচএসসি - ব্যবসায় শিক্ষা গ্রুপ"}</option>
                        <option value="Degree BA Pass">{lang === "EN" ? "Degree Pass - Bachelor of Arts (BA)" : "ডিগ্রী পাস - বি.এ (পাস)"}</option>
                        <option value="Degree BSS Pass">{lang === "EN" ? "Degree Pass - Bachelor of Social Science (BSS)" : "ডিগ্রী পাস - বি.এস.এস (পাস)"}</option>
                        <option value="Degree BBS Pass">{lang === "EN" ? "Degree Pass - Bachelor of Business Studies (BBS)" : "ডিগ্রী পাস - বি.বি.এস (পাস)"}</option>
                        <option value="Honours Bangla">{lang === "EN" ? "B.A. Honours - Bangla" : "অনার্স - বাংলা"}</option>
                        <option value="Honours Social Work">{lang === "EN" ? "B.S.S. Honours - Social Work" : "অনার্স - সমাজকর্ম"}</option>
                        <option value="Honours Economics">{lang === "EN" ? "B.S.S. Honours - Economics" : "অনার্স - অর্থনীতি"}</option>
                        <option value="Honours Management">{lang === "EN" ? "B.B.S. Honours - Management" : "অনার্স - ব্যবস্থাপনা"}</option>
                      </select>
                    </div>

                    <div className="p-3 bg-rose-50/50 rounded-lg text-[11px] text-rose-950 flex items-start gap-2 border border-rose-100">
                      <ShieldCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <p>
                        {lang === "EN" 
                          ? "By clicking Submit, your simulated application will be registered in our mock database. You will immediately receive a printable official temporary admission slip with custom QR Code and Application ID."
                          : "আবেদন সাবমিট করলে আমাদের ডেমো ডাটাবেজে আপনার তথ্য সংরক্ষিত হবে এবং আপনি একটি কিউআর কোডসহ ডাউনলোডযোগ্য সাময়িক ভর্তি আবেদন রশিদ পাবেন।"}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-rose-200 text-center"
                    >
                      {lang === "EN" ? "Submit Online Application Form" : "অনলাইন ভর্তি আবেদন পত্র জমা দিন"}
                    </button>
                  </form>
                </div>
              ) : (
                /* OFFICIAL APPLICATION SLIP VIEW */
                <div className="bg-white p-2 border-2 border-slate-900 rounded-xl">
                  
                  {/* SLIP HEADER */}
                  <div className="bg-slate-950 text-white p-4 rounded-lg flex justify-between items-center text-left">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-rose-400 font-bold">
                        {lang === "EN" ? "TEMPORARY APPLICATION SLIP" : "সাময়িক ভর্তি আবেদন পত্র"}
                      </p>
                      <h4 className="text-sm font-bold text-white uppercase">
                        {t.collegeNameShort}
                      </h4>
                      <p className="text-[10px] text-slate-300">
                        {lang === "EN" ? "EIIN - 127037 | Estd: 1995" : "ইআইআইএন - ১২৭০৩৭ | স্থাপিত: ১৯৯৫"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] bg-rose-600 text-white font-mono px-2 py-1 rounded font-bold">
                        {submittedData?.applicationID}
                      </span>
                      <p className="text-[9px] text-slate-400 mt-1">
                        {lang === "EN" ? "Status: PENDING" : "অবস্থা: অপেক্ষমান"}
                      </p>
                    </div>
                  </div>

                  {/* SLIP INNER DETAILS */}
                  <div className="p-4 md:p-6 space-y-4">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                      <div className="w-16 h-16 bg-slate-100 border-2 border-slate-200 rounded-xl flex items-center justify-center text-4xl shadow-inner">
                        {submittedData?.chosenAvatar}
                      </div>
                      <div className="flex-1">
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
                          {submittedData?.selectedProgram}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1">
                          {submittedData?.applicantName}
                        </h4>
                        <p className="text-xs text-slate-600">
                          {lang === "EN" ? "Mobile Contact:" : "মোবাইল নাম্বার:"} <strong className="font-mono text-slate-800">{submittedData?.applicantPhone}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold">{lang === "EN" ? "Father's Name" : "পিতার নাম"}</p>
                        <p className="font-semibold text-slate-800">{submittedData?.fatherName || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold">{lang === "EN" ? "Mother's Name" : "মাতার নাম"}</p>
                        <p className="font-semibold text-slate-800">{submittedData?.motherName || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold">{lang === "EN" ? "SSC Roll & Board" : "এসএসসি রোল ও বোর্ড"}</p>
                        <p className="font-semibold text-slate-800 font-mono">{submittedData?.sscRoll} ({submittedData?.sscBoard} Board)</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold">{lang === "EN" ? "SSC GPA & Year" : "এসএসসি জিপিএ ও পাশের সন"}</p>
                        <p className="font-semibold text-rose-700 font-mono">{submittedData?.applicantGpa} (Pass: {submittedData?.sscYear})</p>
                      </div>
                    </div>

                    {/* BARCODE LOOK-ALIKE & QR SIMULATOR */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold">{lang === "EN" ? "Official QR Code Verification" : "অফিসিয়াল কিউআর ভেরিফিকেশন"}</p>
                        <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">
                          {lang === "EN" 
                            ? "Please present a printed copy of this slip in College Admin desk room 102. Bring original transcripts and 3 copies of passport photos."
                            : "দয়া করে এই রশিদটি প্রিন্ট করে মূল মার্কশিটসহ কলেজের ১০২ নম্বর কক্ষে জমা দিয়ে ভর্তি চূড়ান্ত করুন।"}
                        </p>
                        
                        {/* Fake barcode bars */}
                        <div className="flex items-center gap-0.5 mt-3 h-8 opacity-75">
                          <span className="w-1.5 h-full bg-slate-900 inline-block"></span>
                          <span className="w-0.5 h-full bg-slate-900 inline-block"></span>
                          <span className="w-1 h-full bg-slate-900 inline-block"></span>
                          <span className="w-2.5 h-full bg-slate-900 inline-block"></span>
                          <span className="w-0.5 h-full bg-slate-900 inline-block"></span>
                          <span className="w-1.5 h-full bg-slate-900 inline-block"></span>
                          <span className="w-2 h-full bg-slate-900 inline-block"></span>
                          <span className="w-0.5 h-full bg-slate-900 inline-block"></span>
                          <span className="w-1 h-full bg-slate-900 inline-block"></span>
                          <span className="w-1.5 h-full bg-slate-900 inline-block"></span>
                          <span className="w-0.5 h-full bg-slate-900 inline-block"></span>
                          <span className="text-[10px] font-mono text-slate-500 tracking-widest pl-2">HJS-2026-X83</span>
                        </div>
                      </div>

                      {/* Fake QR box */}
                      <div className="w-24 h-24 bg-slate-900 p-1.5 rounded-lg flex flex-col items-center justify-center shrink-0">
                        <div className="grid grid-cols-4 gap-1 w-full h-full bg-white p-1">
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-400 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-400 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-400 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-400 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                          <div className="bg-slate-400 rounded-xs"></div>
                          <div className="bg-slate-900 rounded-xs"></div>
                        </div>
                        <span className="text-[7px] text-white mt-1 font-mono tracking-tighter">VERIFIED ID</span>
                      </div>
                    </div>
                  </div>

                  {/* FOOTER ACTIONS OF THE SLIP */}
                  <div className="bg-slate-50 p-4 border-t border-slate-100 rounded-b-xl flex flex-wrap justify-between items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {lang === "EN" ? "Generated on:" : "তৈরির তারিখ:"} {submittedData?.dateSubmitted}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrintSlip}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>{lang === "EN" ? "Print Slip" : "প্রিন্ট করুন"}</span>
                      </button>
                      <button
                        onClick={resetApplicationForm}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
                      >
                        {lang === "EN" ? "Apply for Another Student" : "নতুন আবেদন করুন"}
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* --- EXAM RESULTS SECTION --- */}
      <section id="results-section" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            
            {/* Left side text */}
            <div className="w-full lg:w-1/3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block mb-2">
                {lang === "EN" ? "ACADEMIC RESULTS PORTAL" : "একাডেমিক ফলাফল পোর্টাল"}
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4">
                {t.resultSectionTitle}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {t.resultSectionSubtitle}
              </p>
              <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  {lang === "EN" ? "Live Result Integration" : "লাইভ রেজাল্ট ইন্টিগ্রেশন"}
                </div>
              </div>
            </div>

            {/* Right side form and result */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 md:p-8">
                <form onSubmit={handleResultSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  
                  {/* Exam Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      {t.resultExamLabel}
                    </label>
                    <select
                      value={resultExam}
                      onChange={(e) => setResultExam(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                    >
                      <option value="HSC_1st">Intermediate 1st Year (HSC)</option>
                      <option value="HSC_2nd">Intermediate 2nd Year (HSC)</option>
                      <option value="Degree">Degree Pass</option>
                      <option value="Honours">Honours</option>
                      <option value="Masters">Masters</option>
                    </select>
                  </div>

                  {/* Passing Year */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      {t.resultYearLabel}
                    </label>
                    <select
                      value={resultYear}
                      onChange={(e) => setResultYear(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
                    >
                      {[2023, 2022, 2021, 2020].map(yr => (
                        <option key={yr} value={yr}>{yr}</option>
                      ))}
                    </select>
                  </div>

                  {/* Registration No */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      {t.resultRegLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={resultReg}
                      onChange={(e) => setResultReg(e.target.value)}
                      placeholder="e.g. 1928475"
                      className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors placeholder:text-slate-400"
                    />
                  </div>

                  {/* Roll No */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      {t.resultRollLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={resultRoll}
                      onChange={(e) => setResultRoll(e.target.value)}
                      placeholder="e.g. 83749"
                      className="w-full border-2 border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors placeholder:text-slate-400"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2">
                    <button
                      type="submit"
                      disabled={resultLoading}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
                    >
                      {resultLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Searching...</span>
                        </div>
                      ) : (
                        t.resultSearchBtn
                      )}
                    </button>
                  </div>
                </form>

                {/* MOCK RESULT DISPLAY */}
                {resultData && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-emerald-200/60">
                      <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700 text-lg">🎓</div>
                      <div>
                        <h4 className="font-bold text-emerald-900">{resultData.name}</h4>
                        <p className="text-xs text-emerald-700">CGPA: {resultData.cgpa} • {resultData.status}</p>
                      </div>
                    </div>
                    <p className="text-sm text-emerald-800 bg-white p-3 rounded-lg border border-emerald-100 shadow-sm italic">
                      {resultData.message}
                    </p>
                  </div>
                )}
                {resultError && (
                  <div className="bg-rose-50 text-rose-700 p-4 rounded-xl text-sm font-semibold border border-rose-200">
                    {resultError}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- NOTICE BOARD SECTION --- */}
      <section id="notices-section" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-5 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block">
                {lang === "EN" ? "HJSWC NOTICE BOARD" : "হাজী জমির উদ্দীন শাফিনা কলেজ নোটিশ বোর্ড"}
              </span>
              <h2 className="text-2xl md:text-4.5xl font-extrabold text-slate-950 mt-1">
                {t.navNotices}
              </h2>
            </div>
            
          </div>

          {/* SEARCH & CATEGORY FILTERS GRID */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Filter list */}
            <div className="flex flex-wrap gap-1.5 justify-center md:justify-start w-full md:w-auto">
              {[
                { id: "all", label: lang === "EN" ? "All Notices" : "সকল নোটিশ" },
                { id: "general", label: lang === "EN" ? "General" : "সাধারণ" },
                { id: "exam", label: lang === "EN" ? "Exams" : "পরীক্ষা সংক্রান্ত" },
                { id: "admission", label: lang === "EN" ? "Admissions" : "ভর্তি সংক্রান্ত" },
                { id: "holiday", label: lang === "EN" ? "Holidays" : "ছুটি সংক্রান্ত" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedNoticeCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedNoticeCategory === cat.id
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Search bar */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder={lang === "EN" ? "Search notice title..." : "নোটিশের শব্দ দিয়ে খুঁজুন..."}
                value={searchNotice}
                onChange={(e) => setSearchNotice(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

          </div>

          {/* NOTICE GRID AND DETAIL DISPLAY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LIST OF NOTICES (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <div 
                    key={notice.id} 
                    className="bg-white p-5 rounded-xl border border-slate-200 hover:border-rose-300 shadow-xs hover:shadow-md transition-all flex items-start gap-4"
                  >
                    
                    {/* Date badge */}
                    <div className="bg-slate-100 text-slate-700 p-2.5 rounded-lg text-center shrink-0 min-w-[70px] border border-slate-200">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(notice.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="block text-lg font-black font-mono text-slate-800 leading-tight">
                        {new Date(notice.date).getDate()}
                      </span>
                      <span className="block text-[9px] font-mono text-slate-500">
                        {new Date(notice.date).getFullYear()}
                      </span>
                    </div>

                    {/* Core Notice Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          notice.category === "exam" 
                            ? "bg-amber-100 text-amber-800" 
                            : notice.category === "admission" 
                            ? "bg-rose-100 text-rose-800" 
                            : notice.category === "holiday" 
                            ? "bg-violet-100 text-violet-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {notice.category}
                        </span>

                        {notice.isNew && (
                          <span className="bg-emerald-500 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded tracking-widest animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug hover:text-rose-600 transition-colors">
                        {lang === "EN" ? notice.titleEN : notice.titleBN}
                      </h3>

                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                        {lang === "EN" ? notice.contentEN : notice.contentBN}
                      </p>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{lang === "EN" ? "Authority: General Administration Office" : "কর্তৃপক্ষ: সাধারণ প্রশাসন শাখা"}</span>
                        <button
                          onClick={() => setViewingNotice(notice)}
                          className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>{t.viewDetails}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              ) : (
                <div className="bg-slate-50 border border-dashed border-slate-300 p-12 rounded-xl text-center">
                  <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h4 className="font-bold text-slate-700">No notices matched your search filter.</h4>
                  <p className="text-xs text-slate-500 mt-1">Try changing categories or check back later.</p>
                </div>
              )}
            </div>

            {/* SIDEBAR WIDGET: DOWNLOADS & ACADEMIC CALENDAR PREVIEW (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Quick Academic Files Download desk */}
              <div className="bg-slate-950 text-white p-6 rounded-2xl shadow-md">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-rose-400 flex items-center gap-2 mb-4">
                  <Download className="w-4 h-4" />
                  <span>{lang === "EN" ? "Academic Downloads" : "গুরুত্বপূর্ণ ডাউনলোড সমূহ"}</span>
                </h3>

                <div className="space-y-3">
                  {[
                    { nameEN: "Academic Calendar 2026", nameBN: "শিক্ষা বর্ষপঞ্জি ২০২৬", size: "1.4 MB" },
                    { nameEN: "HSC Class Routine (Revised)", nameBN: "এইচএসসি ক্লাস রুটিন (সংশোধিত)", size: "940 KB" },
                    { nameEN: "Degree 1st Year Exam Routine 2026", nameBN: "ডিগ্রী ১ম বর্ষ পরীক্ষার রুটিন ২০২৬", size: "1.1 MB" },
                    { nameEN: "Honours Syllabus Guide PDF", nameBN: "অনার্স সিলেবাস নির্দেশিকা", size: "2.8 MB" },
                    { nameEN: "Stipend Application Form HJS", nameBN: "উপবৃত্তি আবেদন ফর্ম ২০২৬", size: "520 KB" }
                  ].map((file, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white/5 hover:bg-white/10 p-3 rounded-lg flex items-center justify-between gap-2 border border-white/10 transition-all cursor-pointer"
                      onClick={() => {
                        const name = lang === "EN" ? file.nameEN : file.nameBN;
                        const text = `This is a simulated downloaded file for: ${name}\n\nIn a real production environment, this would be the actual PDF file from the server.`;
                        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${file.nameEN.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                      }}
                    >
                      <div className="overflow-hidden">
                        <span className="block text-xs font-bold text-white truncate">
                          {lang === "EN" ? file.nameEN : file.nameBN}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          PDF • {file.size}
                        </span>
                      </div>
                      <span className="bg-rose-600/20 hover:bg-rose-600 p-2 rounded-lg text-rose-400 hover:text-white transition-colors shrink-0">
                        <Download className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure Campus Assurance Pledge Box */}
              <div className="bg-rose-50 border border-rose-200/60 p-5 rounded-2xl">
                <h3 className="font-extrabold text-sm text-rose-950 flex items-center gap-2 mb-3">
                  <Users className="w-4.5 h-4.5 text-rose-700" />
                  <span>{lang === "EN" ? "Women Empowerment Pledge" : "নারী উন্নয়ন ও শিক্ষা অঙ্গীকার"}</span>
                </h3>
                <p className="text-xs text-rose-900 leading-relaxed font-light">
                  {lang === "EN" 
                    ? "Haji Jamir Uddin Shafina Women's Degree College serves as a secure sanctuary of learning for women in Rajshahi. We enforce 100% discipline, strictly prohibit eve-teasing, maintain high moral education standards and support financially constrained families."
                    : "রাজশাহীর রাজপাড়ায় নারী শিক্ষাকে বেগবান করতে আমাদের প্রতিষ্ঠানটি এক নির্ভরযোগ্য আশ্রয়স্থল। এখানে ছাত্রীদের শতভাগ নিরাপত্তা নিশ্চিতকরণ, সুশিক্ষা প্রদান ও ট্রাস্ট ফান্ডের মাধ্যমে বিশেষ সুবিধা প্রদান করা হয়।"}
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* --- CAMPUS LIFE / FACILITIES SECTION --- */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {lang === "EN" ? "Campus Infrastructure" : "ক্যাম্পাস সুযোগ-সুবিধা"}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              {lang === "EN" ? "Premium Learning Facilities" : "উন্নত শিক্ষা সহায়ক পরিবেশ ও ল্যাব"}
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilitiesData.map((fac) => (
              <div 
                key={fac.id} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={fac.image} 
                      alt={fac.titleEN} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded uppercase font-mono font-bold tracking-widest">
                      {fac.id}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold text-base text-slate-900 mb-2">
                      {lang === "EN" ? fac.titleEN : fac.titleBN}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {lang === "EN" ? fac.descEN : fac.descBN}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active facility</span>
                  </span>
                  <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-bold">
                    HJSWC
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- INTERACTIVE VIRTUAL CAMPUS MAP --- */}
      <section id="campus-map-section" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {lang === "EN" ? "Virtual Navigation" : "ভার্চুয়াল ক্যাম্পাস ম্যাপ"}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              {lang === "EN" ? "Interactive Campus Map Spots" : "ক্যাম্পাসের প্রধান স্থাপনা ও অবস্থান নির্দেশিকা"}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm mt-3">
              {lang === "EN" 
                ? "Click on any building location below to see its detailed infrastructure, floors, departments, and active facilities inside the college boundaries."
                : "ক্যাম্পাসের যেকোনো ভবনে ক্লিক করে সেটির তলা বিন্যাস, তদারকি কর্মকর্তা এবং সক্রিয় সুবিধাসমূহ বিস্তারিত দেখে নিন।"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Grid representation of the map (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 flex flex-col justify-between relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl"></div>

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-rose-600 animate-bounce" />
                    <span>{lang === "EN" ? "HJSWC Boundary Plan View" : "কলেজ প্রাঙ্গণ নকশা"}</span>
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {lang === "EN" ? "Gate: Open" : "ক্যাম্পাস গেট: উন্মুক্ত"}
                  </span>
                </div>

                {/* Simulated Visual Grid Map */}
                <div className="space-y-4">
                  {campusSpots.map((spot) => {
                    const isSelected = selectedSpotId === spot.id;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setSelectedSpotId(spot.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 cursor-pointer ${
                          isSelected 
                            ? "bg-rose-900 text-white border-rose-900 shadow-lg scale-[1.02]" 
                            : "bg-white text-slate-800 border-slate-200 hover:border-rose-400 hover:bg-rose-50/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                            isSelected ? "bg-white text-rose-900" : "bg-rose-50 text-rose-700"
                          }`}>
                            {spot.id === "admin" && "🏢"}
                            {spot.id === "shafina-hall" && "📚"}
                            {spot.id === "science-ict" && "💻"}
                            {spot.id === "girls-hostel" && "🏡"}
                            {spot.id === "common-room" && "🏸"}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm sm:text-base">
                              {lang === "EN" ? spot.nameEN : spot.nameBN}
                            </h4>
                            <p className={`text-[10px] font-medium ${isSelected ? "text-rose-200" : "text-slate-400"}`}>
                              {lang === "EN" ? spot.floorsEN : spot.floorsBN}
                            </p>
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                          isSelected 
                            ? "bg-rose-600 text-white" 
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {isSelected ? (lang === "EN" ? "Viewing Now" : "বর্তমানে নির্বাচিত") : (lang === "EN" ? "Click to Explore" : "দেখুন")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ground playground simulation representation */}
              <div className="mt-6 bg-emerald-500/10 border-2 border-dashed border-emerald-500/30 p-4 rounded-2xl text-center text-emerald-800">
                <p className="text-xs font-bold font-mono">
                  🟢 {lang === "EN" ? "CENTRAL PLAYGROUND & SHAHEED MINAR ZONE" : "কেন্দ্রীয় খেলার মাঠ ও শহীদ মিনার প্রাঙ্গণ"}
                </p>
                <p className="text-[10px] text-emerald-700 mt-1">
                  {lang === "EN" ? "Hosted venue for Annual Athletics and National Day celebrations." : "বার্ষিক ক্রীড়া প্রতিযোগিতা ও জাতীয় দিবস উদযাপনের মূল ভেন্যু।"}
                </p>
              </div>

            </div>

            {/* Right Column: Detail Description (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              
              {(() => {
                const currentSpot = campusSpots.find(s => s.id === selectedSpotId) || campusSpots[0];
                return (
                  <div className="space-y-6">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest block">
                        {lang === "EN" ? "Location Infrastructure Details" : "অবকাঠামোগত বিবরণ"}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                        {lang === "EN" ? currentSpot.nameEN : currentSpot.nameBN}
                      </h3>
                      <p className="text-xs font-bold text-indigo-700 mt-1 font-mono">
                        {lang === "EN" ? currentSpot.floorsEN : currentSpot.floorsBN}
                      </p>
                    </div>

                    {/* Dummy image representation of building */}
                    <div className="h-48 rounded-xl bg-slate-900 relative overflow-hidden flex items-center justify-center">
                      
                      {currentSpot.id === "admin" && (
                        <img 
                          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=500" 
                          alt="admin" 
                          className="w-full h-full object-cover opacity-80" 
                        />
                      )}
                      {currentSpot.id === "shafina-hall" && (
                        <img 
                          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=500" 
                          alt="shafina hall" 
                          className="w-full h-full object-cover opacity-80" 
                        />
                      )}
                      {currentSpot.id === "science-ict" && (
                        <img 
                          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=500" 
                          alt="science and technology block" 
                          className="w-full h-full object-cover opacity-80" 
                        />
                      )}
                      {currentSpot.id === "girls-hostel" && (
                        <img 
                          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=500" 
                          alt="girls hostel" 
                          className="w-full h-full object-cover opacity-80" 
                        />
                      )}
                      {currentSpot.id === "common-room" && (
                        <img 
                          src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=500" 
                          alt="recreation" 
                          className="w-full h-full object-cover opacity-80" 
                        />
                      )}

                      <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase font-mono">
                        {currentSpot.id}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-[11px] font-light">
                        {lang === "EN" ? "CCTV Secured Location • Active Zone" : "সিসিটিভি সুনিয়ন্ত্রিত • সার্বক্ষণিক সচল"}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {lang === "EN" ? "Functional Purpose & Roles:" : "কার্যক্রম ও বৈশিষ্ট্য:"}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-light bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {lang === "EN" ? currentSpot.detailsEN : currentSpot.detailsBN}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>{lang === "EN" ? "Status: Main Campus Plan" : "অবস্থা: মূল ক্যাম্পাস স্থাপনা"}</span>
                      <span className="text-rose-600 font-bold">★ Active</span>
                    </div>

                  </div>
                );
              })()}

            </div>

          </div>

        </div>
      </section>

      {/* --- PHOTO GALLERY SECTION --- */}
      <section id="gallery-section" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
              {lang === "EN" ? "Campus Life Visualized" : "ক্যাম্পাস চিত্র গ্যালারি"}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              {lang === "EN" ? "Moments & Memories of HJSWC" : "আমাদের শিক্ষা জীবনের রঙিন মুহূর্তসমূহ"}
            </h2>
            <div className="w-16 h-1 bg-rose-600 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Gallery Category buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {[
              { id: "all", label: lang === "EN" ? "All Photos" : "সকল ছবি" },
              { id: "campus", label: lang === "EN" ? "Infrastructure" : "অবকাঠামো" },
              { id: "events", label: lang === "EN" ? "Celebrations & Festivals" : "উৎসব ও অনুষ্ঠান" },
              { id: "lab", label: lang === "EN" ? "Science & ICT Labs" : "বিজ্ঞান ও প্রযুক্তি ল্যাব" },
              { id: "classroom", label: lang === "EN" ? "Classrooms" : "ক্লাসরুম" },
              { id: "sports", label: lang === "EN" ? "Sports" : "ক্রীড়া প্রতিযোগিতা" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setGalleryFilter(btn.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  galleryFilter === btn.id
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((img) => (
              <div 
                key={img.id}
                className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all-300 group cursor-pointer"
                onClick={() => setLightboxImg({ url: img.url, title: lang === "EN" ? img.titleEN : img.titleBN })}
              >
                <div className="h-48 sm:h-56 rounded-xl overflow-hidden relative bg-slate-900">
                  <img 
                    src={img.url} 
                    alt={img.titleEN} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-xs font-semibold flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{lang === "EN" ? "View Large" : "বড় আকারে দেখুন"}</span>
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded capitalize">
                    {img.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 mt-1.5 truncate">
                    {lang === "EN" ? img.titleEN : img.titleBN}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- AUTOMATED HELP DESK CHAT INTERFACE & FAQ SECTION --- */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: FAQ segment (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
                  {lang === "EN" ? "COMMON QUESTIONS" : "সাধারণ জিজ্ঞাসা ও উত্তরসমূহ"}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                  {lang === "EN" ? "Frequently Asked Questions" : "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)"}
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    qEN: "When was Haji Jamir Uddin Shafina Women's College established?",
                    qBN: "হাজী জমির উদ্দীন শাফিনা মহিলা কলেজ কত সালে প্রতিষ্ঠিত হয়?",
                    aEN: "The college was established in the year 1995. Over the last 3 decades, it has played a vital role in women's tertiary education in Rajpara, Rajshahi.",
                    aBN: "কলেজটি ১৯৯৫ সালে প্রতিষ্ঠিত হয়। বিগত ৩ দশক ধরে এটি রাজশাহীর রাজপাড়া থানা এলাকায় উচ্চ মাধ্যমিক ও ডিগ্রি পর্যায়ে নারী শিক্ষায় অত্যন্ত গুরুত্বপূর্ণ ভূমিকা পালন করে আসছে।"
                  },
                  {
                    qEN: "Are there science, commerce, and arts groups all available for HSC level?",
                    qBN: "উচ্চ মাধ্যমিকে কি বিজ্ঞান, মানবিক ও বাণিজ্য সব বিভাগই চালু আছে?",
                    aEN: "Yes, our high secondary level includes Science Group (150 seats), Humanities Group (300 seats), and Business Studies Group (200 seats) approved by Rajshahi Education Board.",
                    aBN: "হ্যাঁ, আমাদের উচ্চ মাধ্যমিক স্তরে বিজ্ঞান বিভাগ (১৫০ আসন), মানবিক বিভাগ (৩০০ আসন) এবং ব্যবসায় শিক্ষা বিভাগ (২০০ আসন) রয়েছে যা রাজশাহী শিক্ষা বোর্ড দ্বারা অনুমোদিত।"
                  },
                  {
                    qEN: "Does the college offer any hostel facility?",
                    qBN: "কলেজে কি কোনো ছাত্রী হোস্টেল সুবিধা আছে?",
                    aEN: "Yes! There is a secure, modern on-campus hostel (Begum Rokeya Girls Hostel) inside the college campus, specially customized for distant female students under strict supervision.",
                    aBN: "হ্যাঁ! দূরবর্তী এলাকা থেকে আসা ছাত্রীদের জন্য কলেজ ক্যাম্পাসের ভেতরেই সম্পূর্ণ নিরাপদ ও সুনিয়ন্ত্রিত 'বেগম রোকেয়া ছাত্রী নিবাস' (অন-ক্যাম্পাস হোস্টেল) রয়েছে।"
                  },
                  {
                    qEN: "How can I apply for free books and scholarship benefits?",
                    qBN: "বিনামূল্যে বই ও উপবৃত্তি সুবিধার জন্য কীভাবে আবেদন করব?",
                    aEN: "During admission, eligible students can download the trust fund scholarship form from our downloads panel or collect it directly from college room 104 and submit with documents before deadline.",
                    aBN: "ভর্তির পর নির্ধারিত সময়ের মধ্যে আমাদের ওয়েবসাইট বা কলেজের ১০৪ নম্বর কক্ষ হতে হাজী জমির উদ্দীন শাফিনা ট্রাস্ট ফান্ডের ফরম সংগ্রহ করে প্রয়োজনীয় প্রমাণাদিসহ জমা দিতে হবে।"
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{lang === "EN" ? faq.qEN : faq.qBN}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 pl-7 font-light leading-relaxed">
                      {lang === "EN" ? faq.aEN : faq.aBN}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Interactive Instant Chat Assistant (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
              
              {/* Background gradient graphics */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl"></div>
              
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-lg font-bold">
                      👩🏻‍💼
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">
                        {lang === "EN" ? "HJSWC Virtual Assistant" : "স্মার্ট তথ্য সহায়তা ডেস্"}
                      </h4>
                      <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                        <span>{lang === "EN" ? "Online • Instant Replies" : "অনলাইন • তাৎক্ষণিক উত্তর"}</span>
                      </p>
                    </div>
                  </div>

                  <span className="bg-slate-800 text-[10px] text-slate-400 px-2.5 py-1 rounded font-bold font-mono">
                    FAQ BOT v2.0
                  </span>
                </div>

                {/* Messages Panel */}
                <div className="h-64 overflow-y-auto space-y-3.5 pr-2 mb-4 scrollbar-thin scrollbar-thumb-slate-800">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs ${
                        msg.sender === "user" 
                          ? "bg-rose-600 text-white rounded-br-none" 
                          : "bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/60"
                      }`}>
                        <p className="leading-relaxed font-light">{msg.text}</p>
                        <span className="text-[8px] text-slate-400 mt-1 block text-right">
                          {msg.sender === "user" ? "You" : "HJSWC Bot"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleChatSend} className="space-y-2 mt-auto">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={lang === "EN" ? "Type keyword (admission, location, hostel, free, phone)..." : "ভর্তি, ঠিকানা, হোস্টেল বা উপবৃত্তি লিখে এন্টার চাপুন..."}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500 placeholder-slate-500"
                  />
                  <button
                    type="submit"
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Help tags suggestion */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400">Suggestions:</span>
                  {["admission", "hostel", "location", "scholarship", "phone"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setChatInput(tag);
                      }}
                      className="text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 rounded cursor-pointer transition-colors"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </form>

            </div>

          </div>

        </div>
      </section>

      {/* --- CONTACT US & DIRECT QUERY FEEDBACK --- */}
      <section id="contact-section" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
              {lang === "EN" ? "GET IN TOUCH" : "যোগাযোগ ও অনুসন্ধান শাখা"}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              {lang === "EN" ? "We are Here to Support You" : "যেকোনো জিজ্ঞাসায় আমাদের লিখুন"}
            </h2>
            <div className="w-16 h-1 bg-rose-600 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Contact card details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200">
                <h3 className="font-extrabold text-base text-slate-900 mb-4 border-b border-slate-100 pb-3">
                  {lang === "EN" ? "Official Campus Secretariat" : "কলেজ দাপ্তরিক কার্যালয়"}
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-800">{lang === "EN" ? "College Location" : "কলেজের ভৌগোলিক অবস্থান"}</strong>
                      <span className="text-slate-500 leading-relaxed block mt-0.5">
                        {t.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-800">{lang === "EN" ? "Administrative Telephone" : "প্রশাসনিক ল্যান্ডলাইন / মোবাইল"}</strong>
                      <span className="text-slate-500 block mt-0.5">+880 721 772567</span>
                      <span className="text-slate-500 block">+8801712-345678, +8801913-987654</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-800">{lang === "EN" ? "Official Email" : "অফিসিয়াল ইমেইল এড্রেস"}</strong>
                      <span className="text-slate-500 block mt-0.5">info@shafinacollege.online</span>
                      <span className="text-slate-500 block">principal@shafinacollege.online</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-800">{lang === "EN" ? "Academic Office Hours" : "দাপ্তরিক সময়সূচী"}</strong>
                      <span className="text-slate-500 block mt-0.5">
                        {lang === "EN" ? "Saturday - Thursday: 9:00 AM - 4:00 PM" : "শনিবার থেকে বৃহস্পতিবার: সকাল ৯:০০ টা - বিকেল ৪:০০ টা"}
                      </span>
                      <span className="text-slate-400 block mt-0.5">
                        {lang === "EN" ? "Closed on: Fridays & Official Gazetted Holidays" : "ছুটির দিন: শুক্রবার ও সরকারি সাধারণ ছুটি"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulated Google Map Mapbox Placeholder */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden relative p-4 text-white text-xs">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-rose-950 opacity-90"></div>
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px]">Google Map Navigation</span>
                    <span className="bg-rose-600/30 text-rose-300 text-[8px] font-bold px-2 py-0.5 rounded uppercase">Rajshahi</span>
                  </div>
                  <h4 className="font-bold text-slate-100">{t.collegeNameShort}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {lang === "EN" 
                      ? "Located behind the Deputy Commissioner (DC) Office, near Laxmipur Vatapara. Easily accessible by Auto-rickshaw from Rajshahi Railway Station."
                      : "রাজশাহী জেলা প্রশাসক (ডিসি) কার্যালয়ের পেছনের সড়ক দিয়ে লক্ষ্মীপুর ভাটাপাড়া মোড়ে অবস্থিত। যেকোনো স্থানীয় বাহনযোগে সহজে যাতায়াত করা যায়।"}
                  </p>
                  
                  {/* Embedded Google Map */}
                  <div className="border border-slate-800 rounded-xl overflow-hidden mt-3 shadow-inner">
                    <iframe 
                      src="https://maps.google.com/maps?q=24.3739698,88.5705294&z=17&output=embed"
                      width="100%" 
                      height="160" 
                      style={{ border: 0 }} 
                      allowFullScreen={true} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="College Location Map"
                      className="opacity-90 hover:opacity-100 transition-opacity"
                    ></iframe>
                  </div>
                  <div className="text-center mt-2">
                    <a
                      href="https://www.google.com/maps/place/Haji+Jomir+Uddin+Shafina+Women's+Degree+College,+Rajshahi/@24.3741006,88.5700925,18.25z/data=!4m12!1m5!3m4!2zMjTCsDIyJzIxLjAiTiA4OMKwMzUnMDAuMiJF!8m2!3d24.3725!4d88.5834!3m5!1s0x39fbef87d2f9a103:0x70741470622cea00!8m2!3d24.3739698!4d88.5705294!16s%2Fg%2F11hz0gcxmw?entry=ttu"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-bold text-rose-300 hover:text-white underline inline-block transition-colors"
                    >
                      {lang === "EN" ? "Open in Google Maps App ↗" : "গুগল ম্যাপে বড় করে দেখুন ↗"}
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Column 2: Interactive Query send form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-slate-200">
              <h3 className="font-extrabold text-base text-slate-900 mb-2">
                {lang === "EN" ? "Direct Academic Inquiry Form" : "সরাসরি জিজ্ঞাসা ও তথ্য জানার ফরম"}
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                {lang === "EN" 
                  ? "Are you looking to take admission or have questions regarding scholarships? Write us and our administrative support team will answer back soon."
                  : "ভর্তি প্রক্রিয়া, ট্রাস্ট ফান্ড সুবিধা কিংবা অন্যান্য তথ্য জানতে নিচের ফরমটি পূরণ করে বার্তা পাঠান। আমাদের প্রতিনিধি দল দ্রুত যোগাযোগ করবে।"}
              </p>

              {contactSubmitted && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-4 rounded-xl text-xs mb-5 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="font-bold">
                      {lang === "EN" ? "Query Sent Successfully!" : "বার্তাটি সফলভাবে পাঠানো হয়েছে!"}
                    </h5>
                    <p className="mt-1">
                      {lang === "EN" 
                        ? "Thank you! We have recorded your query in our local sandbox. Our help desk will reply soon."
                        : "ধন্যবাদ! আপনার বার্তাটি আমাদের ডেমো সিস্টেমে সংরক্ষিত হয়েছে। শীঘ্রই ইমেইল বা মোবাইলে যোগাযোগ করা হবে।"}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      {lang === "EN" ? "Your Name *" : "আপনার নাম *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sharmin Akter"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      {lang === "EN" ? "Email Address (Optional)" : "ইমেইল এড্রেস (ঐচ্ছিক)"}
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. sharmin@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    {lang === "EN" ? "Your Detailed Message / Question *" : "জিজ্ঞাসা বা বার্তার বিবরণ *"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={lang === "EN" ? "Please detail your admission or course query here..." : "আপনার ভর্তি বা অন্যান্য কাঙ্ক্ষিত প্রশ্নটি বিস্তারিতভাবে লিখুন..."}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === "EN" ? "Send Query Message" : "জিজ্ঞাসা সাবমিট করুন"}</span>
                </button>
              </form>

              {/* Display previously simulated queries if any */}
              {submittedQueries.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-widest mb-3">
                    {lang === "EN" ? "Submitted Queries (This Session)" : "দাখিলকৃত বার্তা সমূহ (চলতি সেশন)"}
                  </h4>
                  <div className="space-y-3.5">
                    {submittedQueries.map((query, index) => (
                      <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex justify-between items-center mb-1 text-[11px]">
                          <strong className="text-slate-800">{query.name}</strong>
                          <span className="text-slate-400 font-mono">{query.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {query.msg}
                        </p>
                        <div className="mt-2 text-[10px] text-rose-700 font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping"></span>
                          <span>{lang === "EN" ? "Awaiting admin phone reply..." : "অ্যাডমিন ফিরতি কলের জন্য অপেক্ষমান..."}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* --- FOOTER DESK --- */}
      <footer className="bg-slate-950 text-slate-300 border-t border-rose-950 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* College Intro brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white text-base font-black">
                  HJS
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white tracking-wide">
                    {lang === "EN" ? "HJS Women's College" : "হাজী জমির উদ্দীন শাফিনা মহিলা কলেজ"}
                  </h4>
                  <span className="text-[10px] text-slate-500">EIIN - 127037 • Rajshahi</span>
                </div>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {lang === "EN" 
                  ? "A prestigious women's degree college established in 1995 behind the DC office in Rajpara, Rajshahi, creating leaders of tomorrow."
                  : "১৯৯৫ সালে রাজশাহীর রাজপাড়ায় প্রতিষ্ঠিত একটি ঐতিহ্যবাহী বেসরকারি মহিলা ডিগ্রি কলেজ, যা তিন দশক ধরে মেধা ও নৈতিকতার শিক্ষা দিয়ে চলেছে।"}
              </p>

              <div className="pt-2 text-xs text-rose-400 font-bold">
                {lang === "EN" ? "Affiliated with National University" : "জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত কোড: ২৫৬৭"}
              </div>

              {/* Social Media Links */}
              <div className="flex gap-4 pt-4">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-rose-600 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-rose-600 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-rose-600 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-rose-600 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM10 15l5-3-5-3v6z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div>
              <h4 className="font-extrabold text-sm text-white tracking-wide mb-4 border-b border-slate-800 pb-2">
                {lang === "EN" ? "Quick Navigation" : "দ্রুত লিঙ্কসমূহ"}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {[
                  { id: "home", label: t.navHome },
                  { id: "about", label: t.navAbout },
                  { id: "programs", label: t.navPrograms },
                  { id: "admission", label: t.navAdmission },
                  { id: "notices", label: t.navNotices },
                  { id: "campus-map", label: t.navCampusMap },
                  { id: "gallery", label: t.navGallery }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        document.getElementById(`${item.id}-section`)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-slate-400 hover:text-rose-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3 h-3 text-rose-500" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic Portals Info */}
            <div>
              <h4 className="font-extrabold text-sm text-white tracking-wide mb-4 border-b border-slate-800 pb-2">
                {lang === "EN" ? "Academic Disciplines" : "শিক্ষা শাখাসমূহ"}
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <strong className="text-slate-300 block">{lang === "EN" ? "HSC Level:" : "উচ্চ মাধ্যমিক স্তর:"}</strong>
                  <span>{lang === "EN" ? "Science, Humanities, Business Studies" : "বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা গ্রুপ"}</span>
                </li>
                <li>
                  <strong className="text-slate-300 block">{lang === "EN" ? "Degree Pass Courses:" : "ডিগ্রী পাস কোর্সসমূহ:"}</strong>
                  <span>{lang === "EN" ? "BA, BSS, BBS (3 Years Duration)" : "বিএ, বিএসএস, বিবিএস (৩ বছর মেয়াদী)"}</span>
                </li>
                <li>
                  <strong className="text-slate-300 block">{lang === "EN" ? "Honours Programs:" : "অনার্স প্রফেশনাল:"}</strong>
                  <span>{lang === "EN" ? "Bangla, Social Work, Economics, Management" : "বাংলা, সমাজকর্ম, অর্থনীতি এবং ব্যবস্থাপনা"}</span>
                </li>
              </ul>
            </div>

            {/* Government and Board Links */}
            <div>
              <h4 className="font-extrabold text-sm text-white tracking-wide mb-4 border-b border-slate-800 pb-2">
                {lang === "EN" ? "External Portals" : "জাতীয় ও বোর্ড লিংকসমূহ"}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="https://www.nubd.info" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors block">
                    National University Online ↗
                  </a>
                </li>
                <li>
                  <a href="http://www.rajshahieducationboard.gov.bd" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors block">
                    Rajshahi Education Board ↗
                  </a>
                </li>
                <li>
                  <a href="http://www.shed.gov.bd" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors block">
                    Ministry of Education (SHED) ↗
                  </a>
                </li>
                <li>
                  <a href="https://xiclassadmission.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors block">
                    XI Class Admission Link ↗
                  </a>
                </li>
                <li>
                  <a href="http://www.banbeis.gov.bd" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors block">
                    BANBEIS Information Desk ↗
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* LOWER COPYRIGHT BAR */}
          <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500 space-y-3">
            <p>
              {lang === "EN" 
                ? "© 2026 Haji Jamir Uddin Shafina Women's Degree College. Luxmipur Vatapara, Rajpara, Rajshahi, Bangladesh. All Rights Reserved." 
                : "© ২০২৬ হাজী জমির উদ্দীন শাফিনা মহিলা ডিগ্রী কলেজ। লক্ষ্মীপুর ভাটাপাড়া, ডাকঘর: রাজশাহী জিপিও-৬০০০, রাজপাড়া, রাজশাহী, বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।"}
            </p>
            <p className="text-[10px] text-slate-600">
              Developed & Maintained in affiliation with National University and BISE Rajshahi. 
              Authorized by Government of People's Republic of Bangladesh. (College Code: 1029, 2567)
            </p>
          </div>

        </div>
      </footer>

      {/* --- NOTICE DETAIL MODAL VIEW --- */}
      {viewingNotice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-mono bg-rose-600 text-white px-2 py-0.5 rounded font-extrabold tracking-wider">
                  {viewingNotice.category} Notice
                </span>
                <p className="text-[11px] text-slate-400 font-mono mt-1">
                  {lang === "EN" ? "Date Published:" : "প্রকাশের তারিখ:"} {viewingNotice.date}
                </p>
              </div>
              <button
                onClick={() => setViewingNotice(null)}
                className="text-white hover:text-rose-400 font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body with letterhead look */}
            <div className="p-6 md:p-8 space-y-4">
              
              {/* Fake letterhead */}
              <div className="text-center border-b border-dashed border-slate-200 pb-4 mb-4">
                <h4 className="font-extrabold text-slate-950 uppercase tracking-wide text-xs">
                  {t.collegeName}
                </h4>
                <p className="text-[10px] text-slate-500 uppercase mt-0.5">
                  Office of the Principal, Luxmipur Vatapara, Rajshahi
                </p>
              </div>

              <h3 className="font-extrabold text-base md:text-lg text-slate-900 leading-snug">
                {lang === "EN" ? viewingNotice.titleEN : viewingNotice.titleBN}
              </h3>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-light py-2">
                {lang === "EN" ? viewingNotice.contentEN : viewingNotice.contentBN}
              </div>

              {/* Fake signature seal */}
              <div className="pt-6 flex justify-between items-end">
                <div className="text-slate-400 text-[10px]">
                  ID Reference: HJSWC-N{viewingNotice.id}
                </div>
                
                <div className="text-right">
                  <div className="inline-block relative">
                    {/* Simulated hand stamp */}
                    <div className="absolute -top-6 right-2 w-16 h-16 rounded-full border-2 border-red-500/30 flex items-center justify-center text-[10px] text-red-500/40 font-bold uppercase rotate-12 select-none pointer-events-none">
                      APPROVED
                    </div>
                    <span className="block font-bold text-xs text-slate-800">{t.principalName}</span>
                    <span className="block text-[10px] text-slate-400">{t.principalDegree}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  const title = lang === "EN" ? viewingNotice.titleEN : viewingNotice.titleBN;
                  const content = lang === "EN" ? viewingNotice.contentEN : viewingNotice.contentBN;
                  const text = `${t.collegeName}\n\nNotice: ${title}\nDate: ${viewingNotice.date}\n\n${content}\n\n---\nIssued by: ${t.principalName}\n${t.principalDegree}`;
                  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `Notice_${viewingNotice.id}.txt`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
                className="bg-slate-800 hover:bg-slate-950 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{lang === "EN" ? "Download Notice" : "নোটিশ ডাউনলোড"}</span>
              </button>
              <button
                onClick={() => setViewingNotice(null)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
              >
                {t.closeBtn}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- LIGHTBOX PHOTO GALLERY VIEW --- */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-50 cursor-zoom-out"
          onClick={() => setLightboxImg(null)}
        >
          <div className="max-w-4xl w-full space-y-2 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center text-white pb-2">
              <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">HJSWC Photo Album</span>
              <button 
                onClick={() => setLightboxImg(null)}
                className="text-white hover:text-rose-400 text-lg font-bold cursor-pointer bg-white/10 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
              <img 
                src={lightboxImg.url} 
                alt={lightboxImg.title} 
                className="max-h-[75vh] mx-auto object-contain" 
              />
            </div>
            
            <p className="text-slate-200 text-sm font-semibold pt-1">
              {lightboxImg.title}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
