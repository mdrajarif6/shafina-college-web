import { Construction } from "lucide-react";

export const PlaceholderPage = ({ 
  title, 
  lang
}: { 
  title: string; 
  lang: "EN" | "BN" | "AR"; 
}) => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        


        <div className="bg-white rounded-3xl shadow-xl shadow-indigo-900/5 p-8 md:p-12 text-center border border-indigo-50">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-indigo-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            {title}
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {lang === "EN" 
              ? "This page is currently under construction. Please check back later as we are actively adding more content to this section." 
              : "এই পেজটির কাজ বর্তমানে চলছে। আমরা খুব শীঘ্রই এই সেকশনে নতুন তথ্য যুক্ত করব। অনুগ্রহ করে কিছুদিন পর আবার চেক করুন।"}
          </p>
          
        </div>
        
      </div>
    </div>
  );
};
