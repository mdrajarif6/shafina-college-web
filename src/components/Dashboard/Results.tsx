import React from 'react';
import { Search, Plus, Trash2, Award } from 'lucide-react';

export interface Result {
  id: number;
  student_id: string;
  exam_name: string;
  gpa: string;
  grade: string;
  published_date: string;
}

interface ResultsProps {
  lang: 'EN' | 'BN';
  results: Result[];
  setResults: (results: Result[]) => void;
}

export function Results({ lang, results, setResults }: ResultsProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // New Result Form State
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [studentId, setStudentId] = React.useState('');
  const [examName, setExamName] = React.useState('');
  const [gpa, setGpa] = React.useState('');
  const [grade, setGrade] = React.useState('');
  
  const handleAddResult = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newResult = {
      student_id: studentId,
      exam_name: examName,
      gpa: gpa,
      grade: grade,
      published_date: new Date().toISOString().split('T')[0]
    };

    fetch('api/results.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newResult)
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        // Refresh results
        fetch('api/results.php')
          .then(r => r.json())
          .then(data => setResults(data));
        
        setShowAddForm(false);
        setStudentId('');
        setExamName('');
        setGpa('');
        setGrade('');
      } else {
        alert("Failed to add result.");
      }
    })
    .catch(err => console.error(err));
  };

  const handleDelete = (id: number) => {
    fetch(`api/results.php?id=${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setResults(results.filter(r => r.id !== id));
      }
    })
    .catch(err => console.error(err));
  };

  const filteredResults = results.filter(r => 
    r.student_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.exam_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-sans">
      <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            {lang === 'EN' ? 'Manage Results' : 'ফলাফল পরিচালনা'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {lang === 'EN' ? 'Publish and manage student exam results.' : 'শিক্ষার্থীদের পরীক্ষার ফলাফল প্রকাশ ও পরিচালনা করুন।'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder={lang === 'EN' ? "Search ID or Exam..." : "আইডি বা পরীক্ষার নাম..."}
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'EN' ? 'Add Result' : 'ফলাফল যোগ করুন'}</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="p-6 border-b border-slate-200 bg-indigo-50/50">
          <form onSubmit={handleAddResult} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{lang === 'EN' ? 'Student ID' : 'স্টুডেন্ট আইডি'}</label>
              <input type="text" required value={studentId} onChange={e => setStudentId(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. STU-2026-001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{lang === 'EN' ? 'Exam Name' : 'পরীক্ষার নাম'}</label>
              <input type="text" required value={examName} onChange={e => setExamName(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. HSC Final Test" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{lang === 'EN' ? 'GPA' : 'জিপিএ'}</label>
              <input type="text" required value={gpa} onChange={e => setGpa(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. 5.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{lang === 'EN' ? 'Grade' : 'গ্রেড'}</label>
              <div className="flex gap-2">
                <input type="text" required value={grade} onChange={e => setGrade(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. A+" />
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700">{lang === 'EN' ? 'Save' : 'সংরক্ষণ'}</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Student ID' : 'স্টুডেন্ট আইডি'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Exam Name' : 'পরীক্ষার নাম'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'GPA' : 'জিপিএ'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Grade' : 'গ্রেড'}</th>
              <th className="p-4 font-semibold">{lang === 'EN' ? 'Published' : 'প্রকাশিত'}</th>
              <th className="p-4 font-semibold text-right">{lang === 'EN' ? 'Actions' : 'পদক্ষেপ'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredResults.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-400">
                  {lang === 'EN' ? 'No results found.' : 'কোন ফলাফল পাওয়া যায়নি।'}
                </td>
              </tr>
            ) : (
              filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-800 font-mono text-sm">{result.student_id}</td>
                  <td className="p-4 text-sm font-medium text-slate-700">{result.exam_name}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {result.gpa}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-700">{result.grade}</td>
                  <td className="p-4 text-sm text-slate-600">{result.published_date}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(result.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors tooltip"
                      title={lang === 'EN' ? 'Delete' : 'মুছে ফেলুন'}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
