import { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('personal');
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('✅ Profile updated successfully!');
  };

  const inputClass = "w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-700 rounded-xl bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 transition-all outline-none";
  const labelClass = "block text-xs font-bold text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wide";

  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors duration-300 py-10 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl font-bold text-slate-800 dark:text-white mb-7">My Profile 👤</h1>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Sidebar */}
          <div className="w-full md:w-56 shrink-0 space-y-1.5">
            <button 
              onClick={() => setActiveTab('personal')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'personal' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-100 dark:border-gray-700'}`}
            >
              Personal Info
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-100 dark:border-gray-700'}`}
            >
              Order History
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-100 dark:border-gray-700'}`}
            >
              Account Settings
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-[2rem] shadow-lg border border-slate-100 dark:border-gray-700 p-7 w-full transition-all duration-300">
            {activeTab === 'personal' && (
              <div>
                <div className="flex items-center gap-5 mb-8 pb-7 border-b border-slate-100 dark:border-gray-700">
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?u=user" alt="User Profile" className="w-20 h-20 rounded-full object-cover border-4 border-indigo-50 dark:border-gray-700 shadow-sm" />
                    <button className="absolute bottom-0 right-0 bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-colors text-xs">
                      ✏️
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Alex Johnson</h2>
                    <p className="text-sm text-slate-500 dark:text-gray-400">alex.j@example.com</p>
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[0.65rem] font-extrabold uppercase tracking-widest">Premium Member</span>
                  </div>
                </div>

                <form onSubmit={handleSave}>
                  <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-5">Edit Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>First Name</label>
                      <input className={inputClass} type="text" defaultValue="Alex" />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input className={inputClass} type="text" defaultValue="Johnson" />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className={labelClass}>Email Address</label>
                    <input className={inputClass} type="email" defaultValue="alex.j@example.com" />
                  </div>

                  <div className="mb-7">
                    <label className={labelClass}>Phone Number</label>
                    <input className={inputClass} type="tel" defaultValue="+1 234 567 890" />
                  </div>

                  <div className="flex gap-3">
                    <button type="submit" className="px-7 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-95 text-sm">
                      Save Changes
                    </button>
                    <button type="button" className="px-7 py-3 bg-slate-50 hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-slate-600 dark:text-gray-200 rounded-xl font-bold transition-all text-sm border border-slate-200 dark:border-gray-600">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white mb-5">Recent Orders</h3>
                <div className="space-y-3.5">
                  {[1, 2, 3].map((order) => (
                    <div key={order} className="flex justify-between items-center p-4 rounded-2xl border border-slate-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-750 transition-colors shadow-sm">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                          #{1000 + order}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white text-sm">Order placed</p>
                          <p className="text-[0.75rem] text-slate-500 dark:text-gray-400">Oct {10 + order}, 2026</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-500 dark:text-emerald-400 text-base">${(34.50 * order).toFixed(2)}</p>
                        <button className="text-[0.7rem] font-bold text-indigo-600 dark:text-indigo-400 hover:underline uppercase tracking-wider">Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-5">
                <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-white mb-2">Account Settings</h3>
                
                <div className="p-5 rounded-2xl border border-slate-100 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-900/20">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-1 text-[0.9rem]">Change Password</h4>
                  <p className="text-[0.75rem] text-slate-500 dark:text-gray-400 mb-3.5">Keep your account secure with a strong password.</p>
                  <button className="px-5 py-2 bg-white dark:bg-gray-700 hover:bg-slate-50 text-slate-700 dark:text-gray-200 rounded-lg font-bold transition-all text-xs border border-slate-200 dark:border-gray-600 shadow-sm">
                    Update Password
                  </button>
                </div>

                <div className="p-5 rounded-2xl border border-slate-100 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-900/20">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-1 text-[0.9rem]">Email Notifications</h4>
                  <p className="text-[0.75rem] text-slate-500 dark:text-gray-400 mb-3.5">Manage when you receive updates about orders.</p>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-600" defaultChecked />
                    <span className="text-slate-700 dark:text-gray-300 font-medium text-sm">Receive promotions</span>
                  </label>
                </div>

                <div className="p-5 rounded-2xl border border-red-100 dark:border-red-900/20 bg-red-50/50 dark:bg-red-900/5">
                  <h4 className="font-bold text-red-600 dark:text-red-400 mb-1 text-[0.9rem]">Danger Zone</h4>
                  <p className="text-[0.75rem] text-red-500/80 dark:text-red-400/80 mb-3.5">Deleting your account is permanent.</p>
                  <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all text-xs border-none shadow-sm">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
