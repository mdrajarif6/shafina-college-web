
import { useState } from 'react';
import { BookOpen, ArrowLeft, Calendar, User } from 'lucide-react';
import { articles as articlesPart1 } from '../data/blogArticles';
import { articlesPart2 } from '../data/blogArticles2';

export const BlogSection = ({ lang }: { lang: "EN" | "BN" | "AR" }) => {
  const articles = [...articlesPart1, ...articlesPart2];
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-5xl mx-auto px-4">


        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
              {lang === "EN" ? "Education Blog & Articles" : "এডুকেশন ব্লগ ও আর্টিকেল"}
            </h1>
            <p className="text-slate-500 mt-2">
              {lang === "EN" ? "Insights, tips, and thoughts from our faculty and students." : "শিক্ষক ও শিক্ষার্থীদের বিভিন্ন চিন্তাধারা, টিপস এবং প্রবন্ধসমূহ।"}
            </p>
          </div>
        </div>

        <div className="space-y-10">
          {articles.map((article) => {
            const isExpanded = expandedId === article.id;
            const content = lang === "EN" ? article.contentEN : article.contentBN;
            
            return (
              <article key={article.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow">
                <div className="p-8 md:p-10">
                  <h2 
                    onClick={() => toggleExpand(article.id)}
                    className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    {lang === "EN" ? article.titleEN : article.titleBN}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-rose-500" />
                      <span className="font-medium">{lang === "EN" ? article.authorEN : article.authorBN}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-rose-500" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  <div className={`prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                    {content}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                    <button 
                      onClick={() => toggleExpand(article.id)}
                      className="text-rose-600 font-bold hover:text-rose-700 inline-flex items-center gap-1"
                    >
                      {isExpanded 
                        ? (lang === "EN" ? "Show less" : "সংক্ষিপ্ত করুন") 
                        : (lang === "EN" ? "Read full article" : "সম্পূর্ণ পড়ুন")} 
                      <ArrowLeft className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : 'rotate-180'}`} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
