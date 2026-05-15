import { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const { showToast } = useToast();

  const handleSubmit = () => {
    showToast("✅ Message sent! We'll reply soon.");
    setName(''); setEmail(''); setMessage('');
  };

  const inputClass = "w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-sans text-[0.95rem] outline-none transition-colors bg-slate-50 focus:border-purple-600 focus:bg-white mb-4";
  const labelClass = "block text-left text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide mt-4";

  return (
    <div className="px-8 py-9 max-w-7xl mx-auto flex justify-center items-center min-h-[82vh]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[440px] p-10 text-center">
        <h2 className="font-serif text-3xl text-purple-600 mb-6">Get in Touch 📬</h2>
        <p className="text-slate-500 text-sm mb-6">Have questions about a recipe or need help? We're here!</p>

        <div className="text-left">
          <label className={labelClass}>Your Name</label>
          <input className={inputClass} type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />

          <label className={labelClass}>Email Address</label>
          <input className={inputClass} type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />

          <label className={labelClass}>Subject</label>
          <select className={inputClass} value={subject} onChange={e => setSubject(e.target.value)}>
            <option>General Inquiry</option>
            <option>Recipe Request</option>
            <option>Order Issue</option>
            <option>Technical Support</option>
            <option>Feedback</option>
          </select>

          <label className={labelClass}>Message</label>
          <textarea className={inputClass} rows={5} placeholder="Write your message here..." value={message} onChange={e => setMessage(e.target.value)} />
        </div>

        <button className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-extrabold text-base cursor-pointer mt-4 transition-opacity hover:opacity-90 border-none" onClick={handleSubmit}>📨 Send Message</button>
      </div>
    </div>
  );
}