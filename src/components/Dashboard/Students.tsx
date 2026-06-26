import React, { useState } from 'react';
import { Search, UserPlus, Filter, Trash2,   } from 'lucide-react';

export type Student = {
  id?: number;
  studentID: string;
  name: string;
  phone: string;
  program: string;
  status: 'Active' | 'Inactive' | 'Alumni';
};

type StudentsProps = {
  lang: 'EN' | 'BN';
  students: Student[];
  setStudents: (students: Student[]) => void;
};

export function Students({ lang, students, setStudents }: StudentsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('All');
  
  // Add Student Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newProgram, setNewProgram] = useState('HSC - Science');

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const student_id = "STU-" + new Date().getFullYear() + "-" + Math.floor(100 + Math.random() * 900);

    const newStudent = {
      student_id,
      name: newName,
      phone: newPhone,
      program: newProgram,
      status: 'Active' as const
    };

    fetch('api/students.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setStudents([{ ...newStudent, studentID: student_id }, ...students]);
        setNewName('');
        setNewPhone('');
        setShowAddForm(false);
      } else {
        alert("Failed to add student to database.");
      }
    })
    .catch(err => console.error(err));
  };

  const handleDelete = (id: string) => {
    if(!confirm("Are you sure you want to delete this student?")) return;
    
    fetch(`/api/students.php?id=${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setStudents(students.filter(s => s.studentID !== id));
      } else {
        alert("Failed to delete student from database.");
      }
    })
    .catch(err => console.error(err));
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.studentID.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.phone.includes(searchTerm);
    const matchesFilter = filterProgram === 'All' || student.program.includes(filterProgram);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-extrabold text-2xl text-slate-800">
            {lang === "EN" ? "Student Directory" : "শিক্ষার্থী তালিকা"}
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            {lang === "EN" ? "Manage enrolled students and their information." : "ভর্তি হওয়া শিক্ষার্থীদের তথ্য পরিচালনা করুন।"}
          </p>
        </div>
        
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          {lang === "EN" ? "Enroll Student" : "নতুন শিক্ষার্থী যোগ করুন"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddStudent} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h4 className="font-bold text-slate-700 border-b pb-2 mb-4">Add New Student Manually</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
              <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} className="w-full border rounded-lg p-2 text-sm" placeholder="e.g. Arif Rahman" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number</label>
              <input type="text" required value={newPhone} onChange={e => setNewPhone(e.target.value)} className="w-full border rounded-lg p-2 text-sm" placeholder="01XXXXXXXXX" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Program</label>
              <select value={newProgram} onChange={e => setNewProgram(e.target.value)} className="w-full border rounded-lg p-2 text-sm bg-white">
                <option value="HSC - Science">HSC - Science</option>
                <option value="HSC - Commerce">HSC - Commerce</option>
                <option value="HSC - Humanities">HSC - Humanities</option>
                <option value="Degree Pass">Degree Pass</option>
                <option value="Honours - Bangla">Honours - Bangla</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-indigo-700">Save Student</button>
          </div>
        </form>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder={lang === "EN" ? "Search by Name, ID, or Phone..." : "নাম, আইডি বা ফোন নম্বর দিয়ে খুঁজুন..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-slate-400 w-5 h-5" />
          <select 
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700"
          >
            <option value="All">All Programs</option>
            <option value="HSC">HSC Only</option>
            <option value="Degree">Degree Only</option>
            <option value="Honours">Honours Only</option>
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Student ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Program</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.studentID} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {student.studentID}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {student.program}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {student.phone}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                        student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                        student.status === 'Alumni' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          title="Delete Student"
                          onClick={() => handleDelete(student.studentID)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
