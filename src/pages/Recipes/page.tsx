import { useState } from 'react';
import { recipeData } from '../../data/recipeData';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import RecipeModal from '../../components/RecipeModal/page';
import { useStock, type StockItem } from '../../hooks/useStock';

export default function Recipes() {
  const { stock, updateStock, deleteStock } = useStock();
  const [searchName, setSearchName] = useState('');
  const [searchCat, setSearchCat] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [searchRating, setSearchRating] = useState('0');
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  
  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editRecipe, setEditRecipe] = useState<StockItem | null>(null);
  const [editIndex, setEditIndex] = useState(-1);

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (name: string) => {
    addToCart(name);
    showToast(`✅ ${name} added to cart!`);
  };

  const resetSearch = () => {
    setSearchName(''); setSearchCat(''); setSearchPrice(''); setSearchRating('0');
  };

  const handleDelete = (index: number) => {
    const name = stock[index].name;
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteStock(index);
      showToast(`🗑️ Deleted ${name} from stock!`);
    }
  };

  const handleEditClick = (recipe: StockItem, index: number) => {
    setEditRecipe({ ...recipe });
    setEditIndex(index);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editRecipe) {
      updateStock(editIndex, editRecipe);
      setIsEditing(false);
      showToast(`✏️ Updated ${editRecipe.name} successfully!`);
    }
  };

  const filtered = stock.filter((r: StockItem) => {
    const nameMatch = r.name.toLowerCase().includes(searchName.toLowerCase());
    const catMatch = searchCat === '' || r.category.toLowerCase().includes(searchCat.toLowerCase());
    const priceMatch = searchPrice === '' || r.price <= parseFloat(searchPrice);
    const ratingMatch = r.rating >= parseFloat(searchRating);
    return nameMatch && catMatch && priceMatch && ratingMatch;
  });

  const inputClass = "px-3.5 py-2.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-purple-600 dark:focus:border-purple-400 focus:bg-white dark:focus:bg-gray-800 mb-0";

  return (
    <div className="px-8 py-9 max-w-7xl mx-auto min-h-screen transition-colors duration-300">
      <h2 className="font-serif text-[1.9rem] text-purple-600 dark:text-purple-400 mb-7">All Recipes / Stock Management</h2>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.09)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-6 mb-6 transition-colors border border-slate-100 dark:border-gray-700">
        <h3 className="text-base text-slate-500 dark:text-gray-400 mb-3.5 font-bold uppercase tracking-wide">🔍 Filter Stock</h3>
        <div className="flex gap-3 flex-wrap items-end">
          <div className="flex flex-col flex-1 min-w-[160px]">
            <label className="text-[0.78rem] font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Search Name</label>
            <input className={inputClass} type="text" placeholder="e.g. Biryani..." value={searchName} onChange={e => setSearchName(e.target.value)} />
          </div>
          <div className="flex flex-col flex-1 min-w-[160px]">
            <label className="text-[0.78rem] font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Category</label>
            <select className={inputClass} value={searchCat} onChange={e => setSearchCat(e.target.value)}>
              <option value="">All Categories</option>
              <option value="rice">Rice</option>
              <option value="fast food">Fast Food</option>
              <option value="italian">Italian</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none rounded-xl font-bold text-sm cursor-pointer whitespace-nowrap transition-opacity hover:opacity-90" onClick={resetSearch}>Reset Filters</button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.09)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 transition-colors">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-3.5 text-left text-[0.82rem] tracking-wide whitespace-nowrap uppercase font-bold">Image</th>
              <th className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-3.5 text-left text-[0.82rem] tracking-wide whitespace-nowrap uppercase font-bold">Item Name</th>
              <th className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-3.5 text-left text-[0.82rem] tracking-wide whitespace-nowrap uppercase font-bold">Category</th>
              <th className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-3.5 text-left text-[0.82rem] tracking-wide whitespace-nowrap uppercase font-bold">Price</th>
              <th className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-3.5 text-left text-[0.82rem] tracking-wide whitespace-nowrap uppercase font-bold">Rating</th>
              <th className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-3.5 text-left text-[0.82rem] tracking-wide whitespace-nowrap uppercase font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r: StockItem, i: number) => (
              <tr key={r.name} className={`${i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-[#f8f9ff] dark:bg-gray-800/50'} hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors`}>

                <td className="py-2.5 px-3.5 align-middle"><img className="w-[60px] h-[44px] object-cover rounded-lg block shadow-sm" src={`/images/${r.img}`} alt={r.name} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=Food' }} /></td>
                <td className="py-2.5 px-3.5 align-middle"><strong className="text-slate-800 dark:text-white">{r.name}</strong></td>
                <td className="py-2.5 px-3.5 align-middle"><span className={`inline-block px-2.5 py-0.5 rounded-full text-[0.73rem] font-bold ${r.badge}`}>{r.category}</span></td>
                <td className="py-2.5 px-3.5 align-middle"><strong className="text-slate-700 dark:text-gray-300">${r.price.toFixed(2)}</strong></td>
                <td className="py-2.5 px-3.5 align-middle text-amber-500 font-bold">⭐ {r.rating}</td>
                <td className="py-2.5 px-3.5 align-middle">
                  <div className="flex gap-1.5 flex-wrap">
                    <button className="py-1.5 px-3.5 rounded-lg text-[0.78rem] font-bold cursor-pointer transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/40 bg-indigo-50 dark:bg-gray-700 text-purple-600 dark:text-purple-400 border-none" onClick={() => setSelectedRecipe(r.name)}>View</button>
                    <button className="py-1.5 px-3.5 rounded-lg text-[0.78rem] font-bold cursor-pointer transition-all hover:bg-amber-100 dark:hover:bg-amber-900/40 bg-amber-50 dark:bg-gray-700 text-amber-800 dark:text-amber-400 border-none" onClick={() => handleEditClick(r, i)}>Edit</button>
                    <button className="py-1.5 px-3.5 rounded-lg text-[0.78rem] font-bold cursor-pointer transition-all hover:bg-red-100 dark:hover:bg-red-900/40 bg-red-50 dark:bg-gray-700 text-red-600 dark:text-red-400 border-none" onClick={() => handleDelete(i)}>Delete</button>
                    <button className="py-1.5 px-3.5 rounded-lg text-[0.78rem] font-bold cursor-pointer transition-all hover:scale-105 active:scale-95 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-none" onClick={() => handleAddToCart(r.name)}>+ Cart</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditing && editRecipe && (
        <div className="fixed inset-0 bg-black/60 z-[300] flex justify-center items-center p-4 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) setIsEditing(false); }}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md shadow-2xl p-7 flex flex-col border border-slate-100 dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">✏️ Edit Stock Item</h2>
            
            <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Item Name</label>
            <input className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-purple-600 mb-4" type="text" value={editRecipe.name} onChange={e => setEditRecipe({...editRecipe, name: e.target.value})} />
            
            <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Price ($)</label>
            <input className="w-full px-4 py-2.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-purple-600 mb-6" type="number" value={editRecipe.price} onChange={e => setEditRecipe({...editRecipe, price: parseFloat(e.target.value)})} />
            
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-200 font-bold rounded-xl transition-colors border-none" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 border-none" onClick={handleSaveEdit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {selectedRecipe && recipeData[selectedRecipe] && (
        <RecipeModal
          name={selectedRecipe}
          recipe={recipeData[selectedRecipe]}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}