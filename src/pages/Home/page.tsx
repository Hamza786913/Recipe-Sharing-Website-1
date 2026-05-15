import { useState } from 'react';
import { recipeData } from '../../data/recipeData';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import RecipeModal from '../../components/RecipeModal/page';

export default function Home() {
  const [searchName, setSearchName] = useState('');
  const [searchCat, setSearchCat] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [searchRating, setSearchRating] = useState('0');
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (name: string) => {
    addToCart(name);
    showToast(`✅ ${name} added to cart!`);
  };

  const resetSearch = () => {
    setSearchName(''); setSearchCat(''); setSearchPrice(''); setSearchRating('0');
  };

  const filtered = Object.entries(recipeData).filter(([name, d]) => {
    const nameMatch = name.toLowerCase().includes(searchName.toLowerCase());
    const catMatch = searchCat === '' || d.category.toLowerCase().includes(searchCat.toLowerCase());
    const priceMatch = searchPrice === '' || d.price <= parseFloat(searchPrice);
    const ratingMatch = d.rating >= parseFloat(searchRating);
    return nameMatch && catMatch && priceMatch && ratingMatch;
  });

  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors duration-300 pb-12">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white px-8 py-20 text-center shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-white/5 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl mb-6 font-extrabold tracking-tight drop-shadow-lg">
            Discover & Order Amazing Recipes 🍛
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 dark:text-gray-300 font-light max-w-2xl mx-auto drop-shadow-md">
            Explore hundreds of delicious dishes — view ingredients, steps, and order online with ease.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-12 relative z-20 -mt-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 -mt-[30px] mx-auto max-w-[900px] mb-[30px] relative z-10 border border-transparent dark:border-gray-700 transition-colors duration-300">
          <h3 className="text-base text-slate-500 dark:text-gray-400 mb-3.5 font-bold uppercase tracking-wide">🔍 Search Recipes</h3>
          <div className="flex gap-3 flex-wrap items-end">
            <div className="flex flex-col flex-1 min-w-[160px]">
              <label className="text-[0.78rem] font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Recipe Name</label>
              <input className="px-3.5 py-2.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-600 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 mb-0" type="text" placeholder="e.g. Biryani..." value={searchName} onChange={e => setSearchName(e.target.value)} />
            </div>
            <div className="flex flex-col flex-1 min-w-[160px]">
              <label className="text-[0.78rem] font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Category</label>
              <select className="px-3.5 py-2.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-600 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 mb-0" value={searchCat} onChange={e => setSearchCat(e.target.value)}>
                <option value="">All Categories</option>
                <option value="rice">Rice</option>
                <option value="fast food">Fast Food</option>
                <option value="italian">Italian</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <div className="flex flex-col flex-1 min-w-[160px]">
              <label className="text-[0.78rem] font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Max Price ($)</label>
              <input className="px-3.5 py-2.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-600 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 mb-0" type="number" placeholder="e.g. 15" value={searchPrice} onChange={e => setSearchPrice(e.target.value)} />
            </div>
            <div className="flex flex-col flex-1 min-w-[160px]">
              <label className="text-[0.78rem] font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Min Rating</label>
              <select className="px-3.5 py-2.5 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-indigo-600 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-800 mb-0" value={searchRating} onChange={e => setSearchRating(e.target.value)}>
                <option value="0">Any Rating</option>
                <option value="4">4+ ⭐</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="4.7">4.7+ ⭐</option>
              </select>
            </div>
            <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none rounded-xl font-bold text-sm cursor-pointer whitespace-nowrap transition-opacity hover:opacity-90" onClick={resetSearch}>Reset</button>
          </div>
        </div>
      </div>

      <div className="px-8 py-9 max-w-[1200px] mx-auto">
        <h2 className="font-serif text-[1.9rem] text-indigo-600 dark:text-indigo-400 mb-7">All Recipes</h2>
        
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-slate-100 dark:border-gray-700">
            <span className="text-6xl mb-4 block">🍳</span>
            <h3 className="text-2xl font-bold text-slate-700 dark:text-gray-300">No recipes found</h3>
            <p className="text-slate-500 dark:text-gray-500 mt-2">Try adjusting your search filters.</p>
          </div>
        ) : (
          <div className="flex justify-center gap-[22px] flex-wrap">
            {filtered.map(([name, d]) => (
              <div key={name}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.09)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] cursor-pointer w-[220px] overflow-hidden transition-all duration-300 border border-slate-200 dark:border-gray-700 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                  <img className="w-full h-[155px] object-cover block border-b-[3px] border-indigo-600 dark:border-indigo-400" src={`/images/${d.image}`} alt={name} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Food' }} />
                  <div className="py-3.5 px-4">
                    <h3 className="text-base mb-1 text-slate-800 dark:text-white line-clamp-1">{name}</h3>
                    <div className="text-emerald-500 dark:text-emerald-400 font-extrabold text-base mb-1">${d.price.toFixed(2)}</div>
                    <p className="text-[0.82rem] text-slate-500 dark:text-gray-400 mb-2.5">{d.tag} ⭐ {d.rating}</p>
                    <div className="flex gap-1.5">
                      <button className="inline-block bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-[0.78rem] font-bold px-3 py-1.5 rounded-full cursor-pointer border-none transition-all active:scale-95" onClick={() => setSelectedRecipe(name)}>Details</button>
                      <button className="inline-block bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-[0.78rem] font-bold px-3 py-1.5 rounded-full cursor-pointer border-none transition-all active:scale-95 whitespace-nowrap" onClick={() => handleAddToCart(name)}>+ Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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