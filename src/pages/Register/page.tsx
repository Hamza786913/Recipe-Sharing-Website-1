import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [terms, setTerms] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !password) { showToast('⚠️ Please fill all required fields!'); return; }
    if (password !== confirmPass) { showToast('⚠️ Passwords do not match!'); return; }
    if (!terms) { showToast('⚠️ Please agree to the terms!'); return; }
    showToast('✅ Account created! Please login.');
    setTimeout(() => navigate('/login'), 1200);
  };

  const inputClass = "w-full px-4 py-3.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 transition-all outline-none shadow-sm mb-5";
  const labelClass = "block text-left text-xs font-bold text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wide";

  return (
    <div className="px-6 md:px-12 py-10 flex justify-center items-center min-h-[85vh] bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl w-full max-w-sm p-8 text-center border border-slate-100 dark:border-gray-700 transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-l from-indigo-500 to-purple-600"></div>
        
        <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white mb-1 relative z-10">Create Account ✨</h2>
        <p className="text-slate-500 dark:text-gray-400 text-[0.82rem] mb-7 relative z-10">Join Appify and start exploring!</p>

        <div className="space-y-0 text-left relative z-10">
          <div>
            <label className={labelClass}>First Name</label>
            <input className={inputClass} type="text" placeholder="Jane" value={firstName} onChange={e => setFirstName(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input className={inputClass} type="text" placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input className={inputClass} type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input className={inputClass} type="password" placeholder="Min. 8 chars" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Confirm Password</label>
            <input className={inputClass} type="password" placeholder="Repeat password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
          </div>
        </div>

        <div className="flex items-start gap-3 text-left mb-7 mt-1 relative z-10">
          <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-600 dark:bg-gray-900 transition-colors cursor-pointer" checked={terms} onChange={e => setTerms(e.target.checked)} />
          <label htmlFor="terms" className="text-[0.82rem] text-slate-600 dark:text-gray-400 leading-relaxed cursor-pointer select-none">
            Agree to <a href="#" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Terms</a> and <a href="#" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">Privacy</a>
          </label>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 border-none relative z-10" onClick={handleSubmit}>
          🚀 Create My Account
        </button>

        <div className="my-6 text-[0.75rem] text-slate-400 dark:text-gray-500 relative flex items-center justify-center z-10">
          <div className="flex-grow h-px bg-slate-100 dark:bg-gray-700"></div>
          <span className="px-3 bg-white dark:bg-gray-800">or sign up with</span>
          <div className="flex-grow h-px bg-slate-100 dark:bg-gray-700"></div>
        </div>

        <button className="w-full py-2.5 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-bold text-sm transition-all hover:bg-slate-50 dark:hover:bg-gray-700 shadow-sm relative z-10 flex items-center justify-center gap-2" onClick={() => showToast('Google signup coming soon!')}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
          Google
        </button>

        <div className="mt-7 text-[0.82rem] text-slate-500 dark:text-gray-400 relative z-10">
          Already have an account? <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold ml-1 hover:underline transition-all">Sign In →</Link>
        </div>
      </div>
    </div>
  );
}