import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { useToast } from '../../context/ToastContext';
import { useStock, type StockItem } from '../../hooks/useStock';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Dashboard() {
  const navigate = useNavigate();
  const { stock, addStock } = useStock();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCat, setNewCat] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const { showToast } = useToast();

  const submitNewRecipe = () => {
    if (!newName || !newCat || !newTime || !newPrice) { showToast('⚠️ Please fill all fields!'); return; }
    
    addStock({
      name: newName,
      category: newCat,
      time: newTime,
      price: parseFloat(newPrice),
      description: newDesc
    });

    showToast(`✅ "${newName}" recipe added successfully!`);
    setShowAddModal(false);
    setNewName(''); setNewCat(''); setNewTime(''); setNewPrice(''); setNewDesc('');
  };

  const categoryData = {
    labels: ['Rice', 'Fast Food', 'Italian', 'Snack'],
    datasets: [{
      label: 'Recipes',
      data: [
        stock.filter((s: StockItem) => s.category === 'Rice').length,
        stock.filter((s: StockItem) => s.category === 'Fast Food').length,
        stock.filter((s: StockItem) => s.category === 'Italian').length,
        stock.filter((s: StockItem) => s.category === 'Snack').length,
      ],
      backgroundColor: ['#7c3aed','#2563eb','#06b6d4','#10b981'],
      borderRadius: 8,
    }]
  };

  const orderData = {
    labels: stock.slice(0, 6).map((s: StockItem) => s.name),
    datasets: [{
      data: [15, 10, 9, 7, 4, 3],
      backgroundColor: ['#7c3aed','#2563eb','#06b6d4','#10b981','#f59e0b','#ef4444'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const revenueData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{
      label: 'Revenue ($)',
      data: [120,180,150,240,200,310,280,350,300,384,420,390],
      borderColor: '#7c3aed',
      backgroundColor: 'rgba(124,58,237,0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#7c3aed',
      pointRadius: 4
    }]
  };

  const sidebarLinkClass = "flex items-center gap-2.5 p-2.5 rounded-xl text-[0.88rem] font-semibold text-slate-900 dark:text-gray-300 mb-0.5 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:text-purple-600 dark:hover:text-purple-400";
  const sidebarSectionClass = "px-3 pt-2 mt-3.5";
  const sidebarSectionTitleClass = "text-[0.7rem] uppercase tracking-[1.5px] text-slate-500 dark:text-gray-400 font-bold px-2.5 mb-1.5";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[calc(100vh-68px)] transition-colors duration-300">
      <aside className="bg-white dark:bg-gray-800 border-r border-slate-200 dark:border-gray-700 py-7 hidden md:block shadow-[2px_0_12px_rgba(0,0,0,0.04)] z-10 transition-colors">
        <div className="font-serif text-[1.2rem] text-purple-600 dark:text-purple-400 px-[22px] pb-6 border-b border-slate-200 dark:border-gray-700 mb-3">🍽 RecipeHub</div>

        <div className={sidebarSectionClass}>
          <div className={sidebarSectionTitleClass}>Main Menu</div>
          <Link to="/dashboard" className={`${sidebarLinkClass} bg-indigo-50 dark:bg-indigo-900/30 text-purple-600 dark:text-purple-400`}><span className="text-[1.1rem] w-[22px] text-center">📊</span> Dashboard</Link>
          <Link to="/recipes" className={sidebarLinkClass}><span className="text-[1.1rem] w-[22px] text-center">🍛</span> All Recipes</Link>
          <Link to="/cart" className={sidebarLinkClass}><span className="text-[1.1rem] w-[22px] text-center">🛒</span> Cart</Link>
        </div>

        <div className={sidebarSectionClass}>
          <div className={sidebarSectionTitleClass}>Stock Actions</div>
          <a href="#" className={sidebarLinkClass} onClick={e => { e.preventDefault(); setShowAddModal(true); }}><span className="text-[1.1rem] w-[22px] text-center">➕</span> Add Recipe</a>
          <a href="#" className={sidebarLinkClass} onClick={e => { e.preventDefault(); navigate('/recipes'); showToast('✏️ Click the Edit button on any row!'); }}><span className="text-[1.1rem] w-[22px] text-center">✏️</span> Update Recipe</a>
          <a href="#" className={sidebarLinkClass} onClick={e => { e.preventDefault(); navigate('/recipes'); showToast('🗑️ Click the Delete button on any row!'); }}><span className="text-[1.1rem] w-[22px] text-center">🗑️</span> Delete Recipe</a>
          <Link to="/recipes" className={sidebarLinkClass}><span className="text-[1.1rem] w-[22px] text-center">📋</span> View All Stock</Link>
        </div>

        <div className={sidebarSectionClass}>
          <div className={sidebarSectionTitleClass}>Reports</div>
          <a href="#" className={sidebarLinkClass} onClick={e => { e.preventDefault(); showToast('📊 Generating report...'); }}><span className="text-[1.1rem] w-[22px] text-center">📈</span> Sales Report</a>
          <a href="#" className={sidebarLinkClass} onClick={e => { e.preventDefault(); showToast('📧 Exporting data...'); }}><span className="text-[1.1rem] w-[22px] text-center">📤</span> Export Data</a>
        </div>

        <div className={sidebarSectionClass}>
          <div className={sidebarSectionTitleClass}>Account</div>
          <Link to="/profile" className={sidebarLinkClass}><span className="text-[1.1rem] w-[22px] text-center">👤</span> Profile</Link>
          <Link to="/login" className={sidebarLinkClass}><span className="text-[1.1rem] w-[22px] text-center">🚪</span> Logout</Link>
        </div>
      </aside>

      <main className="p-8 bg-slate-50 dark:bg-gray-900 overflow-y-auto transition-colors">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="font-serif text-indigo-600 dark:text-indigo-400 text-3xl mb-1 font-bold">Welcome Back 👋</h2>
            <p className="text-slate-500 dark:text-gray-400 text-sm">Here's what's happening with your Appify today.</p>
          </div>
          <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95 border-none" onClick={() => setShowAddModal(true)}>➕ Add New Recipe</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-gray-700 border-l-4 border-l-indigo-500 transition-transform hover:-translate-y-1">
            <div className="text-[0.76rem] text-slate-500 dark:text-gray-400 uppercase tracking-wide font-bold mb-2">Total Recipes</div>
            <div className="font-serif text-[2.1rem] leading-none mb-1 text-indigo-600 dark:text-indigo-400">{stock.length}</div>
            <div className="text-[0.78rem] text-emerald-500 dark:text-emerald-400 font-bold">In live stock</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-gray-700 border-l-4 border-l-blue-500 transition-transform hover:-translate-y-1">
            <div className="text-[0.76rem] text-slate-500 dark:text-gray-400 uppercase tracking-wide font-bold mb-2">Total Orders</div>
            <div className="font-serif text-[2.1rem] leading-none mb-1 text-blue-600 dark:text-blue-400">48</div>
            <div className="text-[0.78rem] text-emerald-500 dark:text-emerald-400 font-bold">↑ 12% this month</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-gray-700 border-l-4 border-l-emerald-500 transition-transform hover:-translate-y-1">
            <div className="text-[0.76rem] text-slate-500 dark:text-gray-400 uppercase tracking-wide font-bold mb-2">Revenue</div>
            <div className="font-serif text-[2.1rem] leading-none mb-1 text-emerald-500 dark:text-emerald-400">$384</div>
            <div className="text-[0.78rem] text-emerald-500 dark:text-emerald-400 font-bold">↑ 8% vs last month</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-gray-700 border-l-4 border-l-amber-500 transition-transform hover:-translate-y-1">
            <div className="text-[0.76rem] text-slate-500 dark:text-gray-400 uppercase tracking-wide font-bold mb-2">Avg. Rating</div>
            <div className="font-serif text-[2.1rem] leading-none mb-1 text-amber-500 dark:text-amber-400">4.5⭐</div>
            <div className="text-[0.78rem] text-emerald-500 dark:text-emerald-400 font-bold">Based on 48 orders</div>
          </div>
        </div>

        <h3 className="mb-3.5 font-bold text-slate-700">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          <Link className="bg-white rounded-2xl p-5 shadow-md text-center cursor-pointer transition-all border-2 border-transparent text-slate-900 block hover:border-purple-600 hover:-translate-y-1 hover:shadow-xl" to="/recipes">
            <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 bg-indigo-50">📋</div>
            <div className="font-bold text-[0.88rem] mb-1">View All Stock</div>
            <div className="text-[0.76rem] text-slate-500">See all recipes in table</div>
          </Link>
          <a className="bg-white rounded-2xl p-5 shadow-md text-center cursor-pointer transition-all border-2 border-transparent text-slate-900 block hover:border-purple-600 hover:-translate-y-1 hover:shadow-xl" href="#" onClick={e => { e.preventDefault(); setShowAddModal(true); }}>
            <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 bg-green-100">➕</div>
            <div className="font-bold text-[0.88rem] mb-1">Insert New Stock</div>
            <div className="text-[0.76rem] text-slate-500">Add a new recipe item</div>
          </a>
          <a className="bg-white rounded-2xl p-5 shadow-md text-center cursor-pointer transition-all border-2 border-transparent text-slate-900 block hover:border-purple-600 hover:-translate-y-1 hover:shadow-xl" href="#" onClick={e => { e.preventDefault(); navigate('/recipes'); showToast('✏️ Select a row to update!'); }}>
            <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 bg-amber-100">✏️</div>
            <div className="font-bold text-[0.88rem] mb-1">Update Stock</div>
            <div className="text-[0.76rem] text-slate-500">Edit existing recipes</div>
          </a>
          <a className="bg-white rounded-2xl p-5 shadow-md text-center cursor-pointer transition-all border-2 border-transparent text-slate-900 block hover:border-purple-600 hover:-translate-y-1 hover:shadow-xl" href="#" onClick={e => { e.preventDefault(); navigate('/recipes'); showToast('🗑️ Select a row to delete!'); }}>
            <div className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 bg-red-100">🗑️</div>
            <div className="font-bold text-[0.88rem] mb-1">Delete Stock</div>
            <div className="text-[0.76rem] text-slate-500">Remove a recipe item</div>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="font-bold text-[0.95rem] text-slate-900 mb-4 pb-3 border-b border-slate-200 flex justify-between items-center">📊 Recipes by Category</div>
            <div className="h-[250px] w-full">
              <Bar data={categoryData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }} />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5">
            <div className="font-bold text-[0.95rem] text-slate-900 mb-4 pb-3 border-b border-slate-200 flex justify-between items-center">🛒 Orders by Recipe</div>
            <div className="h-[250px] w-full flex justify-center items-center">
              <Doughnut data={orderData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { font: { size: 11 } } } } }} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-slate-100 dark:border-gray-700 p-6 mb-8 transition-colors">
          <h3 className="font-bold mb-4 pb-3 border-b border-slate-100 dark:border-gray-700 text-slate-900 dark:text-white">📈 Monthly Revenue ($)</h3>
          <div className="h-[280px] w-full">
            <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: false, grid: { color: 'rgba(156, 163, 175, 0.1)' }, ticks: { color: 'rgba(156, 163, 175, 0.8)' } }, x: { grid: { color: 'rgba(156, 163, 175, 0.1)' }, ticks: { color: 'rgba(156, 163, 175, 0.8)' } } } }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-slate-100 dark:border-gray-700 p-5 overflow-x-auto transition-colors">
            <div className="font-bold text-[0.95rem] text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center">
              Recent Recipes <Link to="/recipes" className="text-[0.78rem] text-indigo-600 dark:text-indigo-400 font-bold hover:underline">View All →</Link>
            </div>
            <table className="w-full border-collapse text-[0.85rem]">
              <thead>
                <tr>
                  <th className="text-left py-2 px-2.5 text-slate-500 dark:text-gray-400 text-[0.75rem] uppercase tracking-wide border-b border-slate-100 dark:border-gray-700">Image</th>
                  <th className="text-left py-2 px-2.5 text-slate-500 dark:text-gray-400 text-[0.75rem] uppercase tracking-wide border-b border-slate-100 dark:border-gray-700">Name</th>
                  <th className="text-left py-2 px-2.5 text-slate-500 dark:text-gray-400 text-[0.75rem] uppercase tracking-wide border-b border-slate-100 dark:border-gray-700">Price</th>
                  <th className="text-left py-2 px-2.5 text-slate-500 dark:text-gray-400 text-[0.75rem] uppercase tracking-wide border-b border-slate-100 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-gray-300">
                {stock.slice(0, 4).map((r: StockItem, i: number) => (
                  <tr key={r.name} className={i !== 3 ? 'border-b border-slate-50 dark:border-gray-700/50' : ''}>
                    <td className="py-2 px-2.5"><img className="w-[38px] h-[30px] object-cover rounded-md" src={`/images/${r.img}`} alt={r.name} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/50?text=Food' }} /></td>
                    <td className="py-2 px-2.5"><strong>{r.name}</strong></td>
                    <td className="py-2 px-2.5">${r.price.toFixed(2)}</td>
                    <td className="py-2 px-2.5"><span className={`inline-block px-2.5 py-0.5 rounded-full text-[0.73rem] font-bold ${r.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-slate-100 dark:border-gray-700 p-5 overflow-x-auto transition-colors">
            <div className="font-bold text-[0.95rem] text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-100 dark:border-gray-700 flex justify-between items-center">📦 Stock Status</div>
            <table className="w-full border-collapse text-[0.85rem]">
              <thead>
                <tr>
                  <th className="text-left py-2 px-2.5 text-slate-500 dark:text-gray-400 text-[0.75rem] uppercase tracking-wide border-b border-slate-100 dark:border-gray-700">Recipe</th>
                  <th className="text-left py-2 px-2.5 text-slate-500 dark:text-gray-400 text-[0.75rem] uppercase tracking-wide border-b border-slate-100 dark:border-gray-700">Stock</th>
                  <th className="text-left py-2 px-2.5 text-slate-500 dark:text-gray-400 text-[0.75rem] uppercase tracking-wide border-b border-slate-100 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-gray-300">
                {stock.slice(0, 6).map((r: StockItem, i: number) => (
                  <tr key={r.name} className={i !== 5 ? 'border-b border-slate-50 dark:border-gray-700/50' : ''}>
                    <td className="py-2 px-2.5 font-medium">{r.name}</td>
                    <td className="py-2 px-2.5">{r.stock}</td>
                    <td className="py-2 px-2.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[0.73rem] font-bold ${
                        r.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        r.status === 'Out of Stock' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-[300] flex justify-center items-center p-4 backdrop-blur-sm opacity-100" onClick={e => { if (e.target === e.currentTarget) setShowAddModal(false); }}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 flex flex-col border border-slate-100 dark:border-gray-700 transition-colors">
            <h2 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">➕ Add New Recipe</h2>
            
            <label className="block text-[0.7rem] font-bold text-slate-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Recipe Name</label>
            <input className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 mb-3 shadow-sm" type="text" placeholder="e.g. Khichdi" value={newName} onChange={e => setNewName(e.target.value)} />
            
            <label className="block text-[0.7rem] font-bold text-slate-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Category</label>
            <select className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 mb-3 shadow-sm" value={newCat} onChange={e => setNewCat(e.target.value)}>
              <option value="">Select Category</option>
              <option>Rice</option><option>Fast Food</option>
              <option>Italian</option><option>Snack</option><option>Dumplings</option>
            </select>
            
            <div className="grid grid-cols-2 gap-3 text-left mb-3">
              <div>
                <label className="block text-[0.7rem] font-bold text-slate-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Cook Time</label>
                <input className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 shadow-sm" type="text" placeholder="e.g. 30 min" value={newTime} onChange={e => setNewTime(e.target.value)} />
              </div>
              <div>
                <label className="block text-[0.7rem] font-bold text-slate-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Price ($)</label>
                <input className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 shadow-sm" type="number" placeholder="e.g. 8.99" value={newPrice} onChange={e => setNewPrice(e.target.value)} />
              </div>
            </div>
            
            <label className="block text-[0.7rem] font-bold text-slate-500 dark:text-gray-400 mb-1 uppercase tracking-wide">Description</label>
            <textarea className="w-full px-3 py-2 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 mb-4 shadow-sm resize-none" rows={2} placeholder="Brief description..." value={newDesc} onChange={e => setNewDesc(e.target.value)} />
            
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-200 font-bold rounded-xl transition-colors border-none text-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 border-none text-sm" onClick={submitNewRecipe}>✅ Save Recipe</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}