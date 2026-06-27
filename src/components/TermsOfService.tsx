
import { FileText } from 'lucide-react';

export const TermsOfService = ({ lang }: { lang: "EN" | "BN" | "AR" }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">


        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              {lang === "EN" ? "Terms of Service" : "ব্যবহারের শর্তাবলী"}
            </h1>
          </div>
          
          <div className="space-y-6 text-slate-700 dark:text-slate-300 font-light leading-relaxed">
            <p>
              {lang === "EN" ? "Last updated: June 2026" : "সর্বশেষ আপডেট: জুন ২০২৬"}
            </p>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {lang === "EN" ? "1. Agreement to Terms" : "১. শর্তাবলীতে সম্মতি"}
            </h3>
            <p>
              {lang === "EN" 
                ? "By accessing our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any part of these terms, you may not access our service." 
                : "আমাদের ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলী এবং প্রযোজ্য সকল আইন কানুন মেনে চলতে সম্মত হচ্ছেন। আপনি যদি এর কোনো অংশের সাথে দ্বিমত পোষণ করেন, তবে আমাদের সেবা ব্যবহার থেকে বিরত থাকুন।"}
            </p>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {lang === "EN" ? "2. Intellectual Property" : "২. মেধাস্বত্ব বা ইন্টেলেকচুয়াল প্রপার্টি"}
            </h3>
            <p>
              {lang === "EN"
                ? "The website and its original content, features, and functionality are owned by Haji Jamir Uddin Shafina Women's Degree College and are protected by international copyright, trademark, and other intellectual property laws."
                : "এই ওয়েবসাইটের সকল অরিজিনাল কন্টেন্ট, ফিচার এবং ডিজাইন হাজী জমির উদ্দীন শাফিনা মহিলা ডিগ্রী কলেজের নিজস্ব সম্পত্তি এবং এটি আন্তর্জাতিক কপিরাইট ও ট্রেডমার্ক আইনের অধীনে সংরক্ষিত।"}
            </p>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {lang === "EN" ? "3. User Conduct" : "৩. ব্যবহারকারীর আচরণ"}
            </h3>
            <p>
              {lang === "EN"
                ? "You agree not to use the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website."
                : "আপনি এমন কোনো কাজে ওয়েবসাইটটি ব্যবহার না করতে সম্মত হচ্ছেন যা সাইটের ক্ষতি করতে পারে অথবা সাইটের স্বাভাবিক কার্যক্রমে বিঘ্ন ঘটাতে পারে।"}
            </p>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {lang === "EN" ? "4. Limitation of Liability" : "৪. দায়বদ্ধতার সীমাবদ্ধতা"}
            </h3>
            <p>
              {lang === "EN"
                ? "In no event shall Haji Jamir Uddin Shafina Women's Degree College be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses."
                : "কোনো অবস্থাতেই হাজী জমির উদ্দীন শাফিনা মহিলা ডিগ্রী কলেজ কোনো পরোক্ষ, আনুষঙ্গিক বা বিশেষ ক্ষতির জন্য (যেমন- ডেটা হারানো বা ব্যবসায়িক ক্ষতি) দায়ী থাকবে না।"}
            </p>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              {lang === "EN" ? "5. Changes to Terms" : "৫. শর্তাবলীর পরিবর্তন"}
            </h3>
            <p>
              {lang === "EN"
                ? "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days notice prior to any new terms taking effect."
                : "যেকোনো সময় এই শর্তাবলী পরিবর্তন বা আপডেট করার পূর্ণ অধিকার আমাদের রয়েছে। আমরা বড় ধরনের পরিবর্তনের ক্ষেত্রে সাধারণত ৩০ দিন আগে নোটিশ দেওয়ার চেষ্টা করব।"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
