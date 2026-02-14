import React, { useState } from 'react';
import { Student } from '../types';
import { Search, Filter, Eye } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  onSelectStudent: (id: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onSelectStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('All');

  const filteredStudents = students.filter(s => {
    const fullName = (s.firstName + ' ' + s.lastName).toLowerCase();
    const email = s.email.toLowerCase();
    const search = searchTerm.toLowerCase();
    const nameSearch = nameFilter.toLowerCase();

    // Global matches name OR email
    const matchesGlobalSearch = fullName.includes(search) || email.includes(search);
    // Column filter matches name only
    const matchesNameFilter = fullName.includes(nameSearch);
    const matchesGrade = gradeFilter === 'All' || s.gradeLevel === gradeFilter;

    return matchesGlobalSearch && matchesNameFilter && matchesGrade;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Student Directory</h2>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Global Search (Name or Email)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-slate-400"
            />
          </div>
          <div className="relative">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <select 
               value={gradeFilter}
               onChange={(e) => setGradeFilter(e.target.value)}
               className="pl-10 pr-8 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
             >
               <option value="All">All Grades</option>
               <option value="Freshman">Freshman</option>
               <option value="Sophomore">Sophomore</option>
               <option value="Junior">Junior</option>
               <option value="Senior">Senior</option>
             </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 min-w-[250px] align-top">
                  <div className="space-y-2">
                    <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">Student</div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="Filter name..."
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-sm font-normal rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent shadow-sm"
                      />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-4 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 align-top">Grade Level</th>
                <th className="px-6 py-4 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 align-top">GPA</th>
                <th className="px-6 py-4 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 align-top">Attendance</th>
                <th className="px-6 py-4 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 align-top">Status</th>
                <th className="px-6 py-4 text-right text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 align-top">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={student.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800" />
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-100">{student.firstName} {student.lastName}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{student.gradeLevel}</td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${
                        student.gpa >= 3.5 ? 'text-green-600 dark:text-green-400' : 
                        student.gpa >= 2.5 ? 'text-slate-600 dark:text-slate-300' : 'text-red-500 dark:text-red-400'
                      }`}>
                        {student.gpa.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              student.attendanceRate >= 90 ? 'bg-green-500' : 
                              student.attendanceRate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} 
                            style={{width: `${student.attendanceRate}%`}}
                          />
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{student.attendanceRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800/50">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onSelectStudent(student.id)}
                        className="p-2 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
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
};

export default StudentList;