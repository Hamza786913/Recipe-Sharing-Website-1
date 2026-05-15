import type { Recipe } from '../../data/recipeData';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface RecipeModalProps {
  name: string;
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeModal({ name, recipe, onClose }: RecipeModalProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(name);
    showToast(`✅ ${name} added to cart!`);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[300] flex justify-center items-center p-4 backdrop-blur-sm transition-opacity opacity-100" onClick={handleOverlayClick}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl md:items-start">
        <img className="w-full md:w-2/5 h-64 md:h-auto md:max-h-[400px] object-cover sticky top-0 md:rounded-l-2xl md:rounded-tr-none rounded-t-2xl" src={`/images/${recipe.image}`} alt={name} />
        <div className="p-8 flex-1">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mb-3">{recipe.tag} · {recipe.time}</span>
          <div className="text-emerald-500 font-extrabold text-2xl mb-4">${recipe.price.toFixed(2)}</div>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">{recipe.desc}</p>
          <h4 className="font-bold text-slate-800 mb-2 mt-4">Ingredients</h4>
          <ul className="list-disc list-inside text-sm text-slate-600 mb-6 space-y-1">
            {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
          <h4 className="font-bold text-slate-800 mb-2 mt-4">Instructions</h4>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">{recipe.steps}</p>
          <div className="flex gap-3 mt-8">
            <button className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors" onClick={onClose}>✕ Close</button>
            <button className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" onClick={handleAddToCart}>🛒 Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}