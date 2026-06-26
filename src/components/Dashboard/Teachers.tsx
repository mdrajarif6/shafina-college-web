import React, { useState } from 'react';
import { Search, UserPlus, Filter, Trash2 } from 'lucide-react';

export type Teacher = {
  id?: number;
  teacher_id: string;
  name: string;
  department: string;
  pin: string;
  mpo_index: string;
  mobile: string;
};

type TeachersProps = {
  lang: "EN" | "BN" | "AR";
  teachers: Teacher[];
  setTeachers: (teachers: Teacher[]) => void;
};

export function Teachers({ lang, teachers, setTeachers }: TeachersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  
  // Add Teacher Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [newDepartment, setNewDepartment] = useState('General');
  const [newMpoIndex, setNewMpoIndex] = useState('');
  const [newPin, setNewPin] = useState('');

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMobile || !newPin) return;

    const newTeacher = {
      action: 'signup',
      name: newName,
      mobile: newMobile,
      department: newDepartment,
      mpo_index: newMpoIndex,
      pin: newPin
    };

    fetch('api/teachers.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTeacher)
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error && data.teacher_id) {
        setTeachers([{ 
          teacher_id: data.teacher_id, 
          name: newName, 
          mobile: newMobile, 
          department: newDepartment, 
          mpo_index: newMpoIndex, 
          pin: newPin 
        }, ...teachers]);
        setNewName('');
        setNewMobile('');
        setNewDepartment('General');
        setNewMpoIndex('');
        setNewPin('');
        setShowAddForm(false);
      } else {
        alert(data.error || "Failed to add teacher to database.");
      }
    })
    .catch(err => console.error(err));
  };

  const handleDelete = (id: string) => {
    if(!confirm("Are you sure you want to delete this teacher?")) return;
    
    fetch(`/api/teachers.php?id=${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        setTeachers(teachers.filter(t => t.teacher_id !== id));
      } else {
        alert("Failed to delete teacher from database.");
      }
    })
    .catch(err => console.error(err));
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          teacher.teacher_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (teacher.mobile && teacher.mobile.includes(searchTerm));
    const matchesFilter = filterDept === 'All' || teacher.department === filterDept;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-extrabold text-2xl text-slate-800 dark:text-slate-200">
            {lang === "EN" ? "Teacher Directory" : "শিক্ষক তালিকা"}
          </h3>
          <p className="text-slate-500 text-sm mt-1">
            {lang === "EN" ? "Manage teachers and their information." : "শিক্ষকদের তথ্য পরিচালনা করুন।"}
          </p>
        </div>
        
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <UserPlus className="w-5 h-5" />
          {lang === "EN" ? "Add Teacher" : "শিক্ষক যোগ করুন"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddTeacher} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
          <h4 className="font-bold text-slate-700 dark:text-slate-300 border-b pb-2 mb-4">Add New Teacher</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
              <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" placeholder="e.g. Abul Kalam" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile Number</label>
              <input type="text" required value={newMobile} onChange={e => setNewMobile(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" placeholder="01XXXXXXXXX" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
              <select value={newDepartment} onChange={e => setNewDepartment(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                <option value="General">General</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Humanities">Humanities</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">MPO Index</label>
              <input type="text" required value={newMpoIndex} onChange={e => setNewMpoIndex(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" placeholder="e.g. 1234567" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Secret PIN</label>
              <input type="text" required value={newPin} onChange={e => setNewPin(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-white" placeholder="****" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:bg-slate-800 rounded-lg">Cancel</button>
            <button type="submit" className="bg-rose-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-rose-700">Save Teacher</button>
          </div>
        </form>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder={lang === "EN" ? "Search by Name, ID, or Mobile..." : "নাম, আইডি বা মোবাইল দিয়ে খুঁজুন..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-slate-400 w-5 h-5" />
          <select 
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500/20 font-medium text-slate-700 dark:text-slate-300"
          >
            <option value="All">All Departments</option>
            <option value="General">General</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Humanities">Humanities</option>
          </select>
        </div>
      </div>

      {/* Teachers Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Teacher ID</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Mobile</th>
                <th className="px-6 py-4 font-semibold">MPO Index</th>
                <th className="px-6 py-4 font-semibold">Secret PIN</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.teacher_id} className="hover:bg-slate-50 dark:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {teacher.teacher_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">
                      {teacher.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {teacher.department}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {teacher.mobile || '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {teacher.mpo_index || '-'}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {teacher.pin}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          title="Delete Teacher"
                          onClick={() => handleDelete(teacher.teacher_id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No teachers found matching your criteria.
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
