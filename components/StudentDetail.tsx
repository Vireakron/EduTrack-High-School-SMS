import React, { useState } from 'react';
import { Student } from '../types';
import { ArrowLeft, Mail, Star, BookOpen, Bot, Download, Loader2 } from 'lucide-react';
import { generateStudentReport } from '../services/geminiService';

interface StudentDetailProps {
  student: Student;
  onBack: () => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onBack }) => {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    setLoading(true);
    const result = await generateStudentReport(student);
    setReport(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Directory
      </button>

      {/* Header Profile */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="h-32 bg-gradient-to-r from-brand-600 to-brand-400 dark:from-brand-800 dark:to-brand-600"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="flex items-end gap-6">
              <img 
                src={student.avatarUrl} 
                alt={student.firstName} 
                className="w-32 h-32 rounded-xl border-4 border-white dark:border-slate-900 shadow-md object-cover bg-white dark:bg-slate-800" 
              />
              <div className="mb-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{student.firstName} {student.lastName}</h1>
                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {student.gradeLevel}</span>
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {student.email}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mb-2">
              <button 
                onClick={handleGenerateReport}
                disabled={loading}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                AI Insight Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Stats & Activities */}
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-slate-800 dark:text-white">{student.gpa}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Current GPA</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-800 dark:text-white">{student.attendanceRate}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Attendance</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                   <Star className="w-5 h-5 text-brand-500" /> Activities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {student.activities && student.activities.length > 0 ? (
                    student.activities.map((act, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm text-slate-600 dark:text-slate-300">
                        {act}
                      </span>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm">No activities listed.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Grades Table */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-500" /> Current Semester Grades
              </h3>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Subject</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Score</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {student.grades.map((grade, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 text-slate-800 dark:text-slate-200 font-medium">{grade.subject}</td>
                        <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-400">{grade.score}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`inline-block w-8 text-center font-bold ${
                            grade.letter.startsWith('A') ? 'text-green-600 dark:text-green-400' :
                            grade.letter.startsWith('B') ? 'text-brand-600 dark:text-brand-400' :
                            grade.letter.startsWith('C') ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-500 dark:text-red-400'
                          }`}>
                            {grade.letter}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Report Section */}
      {report && (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900/50 overflow-hidden animate-slide-up">
           <div className="bg-purple-50 dark:bg-purple-900/20 px-6 py-4 border-b border-purple-100 dark:border-purple-900/30 flex justify-between items-center">
             <div className="flex items-center gap-2">
               <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
               <h3 className="font-semibold text-purple-900 dark:text-purple-100">AI Generated Insight Report</h3>
             </div>
             <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200">
               <Download className="w-5 h-5" />
             </button>
           </div>
           <div className="p-6 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
             {report}
           </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetail;