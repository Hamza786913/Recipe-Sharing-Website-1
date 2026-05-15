import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email || !password) { showToast('⚠️ Please fill all fields!'); return; }
    showToast('✅ Logged in successfully!');
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  return (
    <div className="px-6 md:px-12 py-12 flex justify-center items-center min-h-[85vh] bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl w-full max-w-sm p-8 text-center border border-slate-100 dark:border-gray-700 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl transition-transform group-hover:scale-110 duration-700"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl transition-transform group-hover:scale-110 duration-700"></div>
        
        <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white mb-1 relative z-10">Welcome Back 👋</h2>
        <p className="text-slate-500 dark:text-gray-400 text-[0.82rem] mb-7 relative z-10">Sign in to your account</p>

        <div className="mb-4 text-left relative z-10">
          <label className="block text-[0.7rem] font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Email Address</label>
          <input className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 transition-all outline-none shadow-sm text-sm" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <div className="mb-5 text-left relative z-10">
          <label className="block text-[0.7rem] font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Password</label>
          <input className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 transition-all outline-none shadow-sm text-sm" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <div className="flex justify-between items-center mb-7 relative z-10">
          <label className="text-[0.82rem] text-slate-600 dark:text-gray-400 flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-600 dark:bg-gray-900 transition-colors" /> 
            <span className="select-none">Remember me</span>
          </label>
          <a href="#" className="text-[0.82rem] text-indigo-600 dark:text-indigo-400 font-bold hover:underline transition-all">Forgot?</a>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 border-none relative z-10" onClick={handleSubmit}>
          🔐 Sign In
        </button>

        <div className="my-6 text-[0.75rem] text-slate-400 dark:text-gray-500 relative flex items-center justify-center z-10">
          <div className="flex-grow h-px bg-slate-100 dark:bg-gray-700"></div>
          <span className="px-3 bg-white dark:bg-gray-800">or continue with</span>
          <div className="flex-grow h-px bg-slate-100 dark:bg-gray-700"></div>
        </div>

        <button className="w-full py-2.5 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-bold text-sm transition-all hover:bg-slate-50 dark:hover:bg-gray-700 shadow-sm relative z-10 flex items-center justify-center gap-2" onClick={() => showToast('Google login coming soon!')}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
          Google
        </button>

        <div className="mt-7 text-[0.82rem] text-slate-500 dark:text-gray-400 relative z-10">
          Don't have an account? <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-bold ml-1 hover:underline transition-all">Create one →</Link>
        </div>
      </div>
    </div>
  );
}