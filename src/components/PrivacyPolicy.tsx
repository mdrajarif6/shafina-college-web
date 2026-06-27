
import { Shield } from 'lucide-react';

export const PrivacyPolicy = ({ lang }: { lang: "EN" | "BN" | "AR" }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">


        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {lang === "EN" ? "Privacy Policy" : "গোপনীয়তা নীতি"}
            </h1>
          </div>
          
          <div className="space-y-6 text-slate-700 dark:text-slate-300 font-light leading-relaxed">
            <p>
              {lang === "EN" ? "Last updated: June 2026" : "সর্বশেষ আপডেট: জুন ২০২৬"}
            </p>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {lang === "EN" ? "1. Introduction" : "১. ভূমিকা"}
            </h3>
            <p>
              {lang === "EN" 
                ? "Welcome to Haji Jamir Uddin Shafina Women's Degree College. We respect your privacy and are committed to protecting your personal data." 
                : "হাজী জমির উদ্দীন শাফিনা মহিলা ডিগ্রী কলেজে আপনাকে স্বাগতম। আমরা আপনার গোপনীয়তার প্রতি শ্রদ্ধাশীল এবং আপনার ব্যক্তিগত তথ্য সুরক্ষায় প্রতিশ্রুতিবদ্ধ।"}
            </p>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {lang === "EN" ? "2. Information We Collect" : "২. আমরা যে তথ্য সংগ্রহ করি"}
            </h3>
            <p>
              {lang === "EN"
                ? "We may collect personal information such as your name, email address, phone number, and academic records when you register for admission or use our student portals. We also automatically collect certain information such as your IP address and browsing behavior when you visit our site."
                : "ভর্তি আবেদন বা স্টুডেন্ট পোর্টাল ব্যবহারের সময় আমরা আপনার নাম, ইমেইল, ফোন নাম্বার এবং একাডেমিক তথ্য সংগ্রহ করতে পারি। এছাড়া আমাদের সাইট ভিজিট করার সময় আপনার আইপি এড্রেস এবং ব্রাউজিং ডেটা স্বয়ংক্রিয়ভাবে সংগৃহীত হতে পারে।"}
            </p>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {lang === "EN" ? "3. Google AdSense & Cookies" : "৩. গুগল অ্যাডসেন্স ও কুকিজ"}
            </h3>
            <p>
              {lang === "EN"
                ? "Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet."
                : "গুগলসহ অন্যান্য থার্ড-পার্টি ভেন্ডররা কুকিজ ব্যবহার করে আমাদের ওয়েবসাইটে বা ইন্টারনেটের অন্যান্য ওয়েবসাইটে আপনার পূর্ববর্তী ভিজিটের ওপর ভিত্তি করে বিজ্ঞাপন প্রদর্শন করে। গুগলের অ্যাডভার্টাইজিং কুকিজ ব্যবহারের মাধ্যমে তারা আমাদের ব্যবহারকারীদের উপযুক্ত বিজ্ঞাপন দেখিয়ে থাকে।"}
            </p>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {lang === "EN" ? "4. How We Use Your Information" : "৪. আপনার তথ্য কীভাবে ব্যবহার করা হয়"}
            </h3>
            <p>
              {lang === "EN"
                ? "Your information is used to provide educational services, process admissions, improve our website functionality, and communicate important notices to you."
                : "আপনার তথ্য শিক্ষামূলক পরিষেবা প্রদান, ভর্তি প্রক্রিয়া সম্পন্ন করা, ওয়েবসাইটের মান উন্নয়ন এবং আপনাকে গুরুত্বপূর্ণ নোটিশ পাঠানোর কাজে ব্যবহার করা হয়।"}
            </p>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {lang === "EN" ? "5. Contact Us" : "৫. যোগাযোগ"}
            </h3>
            <p>
              {lang === "EN"
                ? "If you have any questions about this Privacy Policy, please contact us at hjshafinamohila_college@yahoo.com."
                : "এই গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন থাকলে hjshafinamohila_college@yahoo.com এ আমাদের সাথে যোগাযোগ করুন।"}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};
