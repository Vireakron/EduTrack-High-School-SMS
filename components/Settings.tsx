import React, { useState } from 'react';
import { Save, Bell, School, Sparkles, CheckCircle2 } from 'lucide-react';

const Settings: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock state for form fields
  const [formData, setFormData] = useState({
    schoolName: 'Lincoln High School',
    academicYear: '2024-2025',
    gradingScale: 'standard',
    aiTone: 'encouraging',
    emailAlerts: true,
    weeklyReports: false
  });

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage your school preferences and application configuration.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
            saved 
              ? 'bg-green-600 text-white shadow-green-900/20' 
              : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-900/20'
          } shadow-lg`}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            <>
              <CheckCircle2 className="w-5 h-5" /> Saved
            </>
          ) : (
            <>
              <Save className="w-5 h-5" /> Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* School Configuration */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-950/30">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <School className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white">School Configuration</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">School Name</label>
              <input 
                type="text" 
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Academic Year</label>
              <select 
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="2023-2024">2023 - 2024</option>
                <option value="2024-2025">2024 - 2025</option>
                <option value="2025-2026">2025 - 2026</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Grading System</label>
              <select 
                name="gradingScale"
                value={formData.gradingScale}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="standard">Standard (A-F, 4.0 Scale)</option>
                <option value="weighted">Weighted (AP/Honors Bonus)</option>
                <option value="passfail">Pass/Fail Only</option>
              </select>
            </div>
          </div>
        </section>

        {/* AI Preferences */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-950/30">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white">AI Report Assistant</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Feedback Tone</label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Determines the writing style of generated student reports.</p>
                <select 
                  name="aiTone"
                  value={formData.aiTone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="encouraging">Encouraging & Motivational</option>
                  <option value="formal">Formal & Objective</option>
                  <option value="stern">Direct & Stern</option>
                  <option value="parent">Parent-Friendly (Simple)</option>
                </select>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Sample Output Style:</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                  {formData.aiTone === 'encouraging' && '"Sarah has shown remarkable resilience this semester..."'}
                  {formData.aiTone === 'formal' && '"Student academic performance indicates steady progress..."'}
                  {formData.aiTone === 'stern' && '"Immediate attention is required regarding attendance figures..."'}
                  {formData.aiTone === 'parent' && '"We are really happy with how Sarah is doing in Math..."'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications & Account */}
        <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-950/30">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white">Notifications & Alerts</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-slate-800 dark:text-white">At-Risk Student Alerts</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Receive an email when a student's GPA drops below 2.0</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="emailAlerts"
                  checked={formData.emailAlerts}
                  onChange={handleChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
              </label>
            </div>
            <hr className="border-slate-100 dark:border-slate-800" />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-slate-800 dark:text-white">Weekly Summary Reports</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Get a PDF summary of all class activities every Friday</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="weeklyReports"
                  checked={formData.weeklyReports}
                  onChange={handleChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 dark:peer-focus:ring-brand-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;