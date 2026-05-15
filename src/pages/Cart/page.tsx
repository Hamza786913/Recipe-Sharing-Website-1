import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function Cart() {
  const { cart, removeFromCart, changeQty, clearCart, checkout } = useCart();
  const { showToast } = useToast();
  const [promoCode, setPromoCode] = useState('');

  const [discount, setDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + delivery - discount;
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  const applyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'hamza') {
      if (isPromoApplied) {
        showToast('ℹ️ Promo code already applied!');
        return;
      }
      const discAmount = subtotal * 0.15;
      setDiscount(discAmount);
      setIsPromoApplied(true);
      showToast('🎉 Promo code "Hamza" applied! 15% discount added.');
    } else {
      showToast('❌ Invalid promo code!');
    }
  };

  const handleRemove = (idx: number) => {
    const name = cart[idx].name;
    removeFromCart(idx);
    showToast(`🗑️ ${name} removed from cart`);
    if (cart.length === 1) { // If it was the last item
      setDiscount(0);
      setIsPromoApplied(false);
    } else if (isPromoApplied) {
      // Recalculate discount for remaining items
      const newSubtotal = cart.filter((_, i) => i !== idx).reduce((s, i) => s + i.price * i.qty, 0);
      setDiscount(newSubtotal * 0.15);
    }
  };

  const handleClearCart = () => {
    clearCart();
    setDiscount(0);
    setIsPromoApplied(false);
    showToast('🗑️ Cart cleared!');
  };

  const handleCheckout = () => {
    if (cart.length === 0) { showToast('⚠️ Your cart is empty!'); return; }
    checkout(() => {
      showToast('🎉 Order placed successfully! Thank you!');
      setDiscount(0);
      setIsPromoApplied(false);
    });
  };

  if (cart.length === 0) {
    return (
      <div className="px-6 md:px-12 py-16 max-w-7xl mx-auto min-h-[70vh] bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
        <h2 className="font-serif text-4xl font-bold text-slate-800 dark:text-white mb-10 text-center">🛒 Your Cart</h2>
        <div className="text-center py-20 px-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-slate-100 dark:border-gray-700 max-w-3xl mx-auto">
          <div className="text-8xl mb-6 opacity-30 dark:opacity-20">🛒</div>
          <h2 className="font-serif text-slate-800 dark:text-white mb-4 text-3xl font-bold">Your cart is empty!</h2>
          <p className="mb-8 text-slate-500 dark:text-gray-400 text-lg">Add some delicious recipes to get started.</p>
          <Link to="/" className="inline-block py-4 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1">Browse Recipes →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 py-9 max-w-[1200px] mx-auto min-h-[85vh] transition-colors duration-300">
      <h2 className="font-serif text-[1.9rem] text-purple-600 dark:text-purple-400 mb-7">🛒 Your Cart</h2>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-6 w-full">
          {cart.map((item, idx) => (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.09)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-5 flex flex-col sm:flex-row gap-6 items-center border border-slate-200 dark:border-gray-700 transition-colors" key={idx}>
              <img className="w-full sm:w-32 h-24 object-cover rounded-xl" src={`/images/${item.image}`} alt={item.name} onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=Food' }} />
              <div className="flex-1 text-center sm:text-left w-full">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{item.name}</h3>
                <p className="text-[0.82rem] text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wide">{item.category}</p>
                <p className="text-emerald-500 dark:text-emerald-400 font-extrabold text-xl">${(item.price * item.qty).toFixed(2)}</p>
                
                <div className="flex items-center justify-center sm:justify-start gap-1 mt-3">
                  <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-800 dark:text-white text-lg font-bold flex items-center justify-center cursor-pointer border-none" onClick={() => changeQty(idx, -1)}>−</button>
                  <span className="font-bold text-base min-w-[32px] text-center dark:text-white">{item.qty}</span>
                  <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-800 dark:text-white text-lg font-bold flex items-center justify-center cursor-pointer border-none" onClick={() => changeQty(idx, 1)}>+</button>
                </div>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 border-none cursor-pointer transition-colors" onClick={() => handleRemove(idx)} aria-label="Remove item">
                🗑️
              </button>
            </div>
          ))}
          
          <div className="mt-8 flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.09)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] border border-slate-200 dark:border-gray-700 transition-colors">
            <Link to="/" className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-[0.88rem]">
              ← Continue Shopping
            </Link>
            <button className="text-red-500 dark:text-red-400 font-bold text-[0.88rem] border-none bg-transparent cursor-pointer" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="w-full md:w-[320px] lg:w-[350px] bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.09)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-5 sticky top-24 border border-slate-200 dark:border-gray-700 transition-colors">
          <h3 className="font-serif text-lg mb-4 pb-2 border-b border-slate-200 dark:border-gray-700 text-slate-800 dark:text-white font-bold">Order Summary</h3>
          
          <div className="space-y-2.5 mb-4 text-[0.88rem] text-slate-600 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Items ({itemCount})</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold">${delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-emerald-500 dark:text-emerald-400 font-bold">-${discount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center border-t border-slate-200 dark:border-gray-700 pt-4 mb-5">
            <span className="text-base text-slate-800 dark:text-white font-bold">Total</span>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">${total.toFixed(2)}</span>
          </div>
          
          <div className="mb-5">
            <label className="block text-[0.75rem] font-bold text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Promo Code</label>
            <div className="flex gap-2">
              <input type="text" className="flex-1 px-3 py-2 border-2 border-slate-200 dark:border-gray-700 rounded-xl font-sans text-sm outline-none transition-colors bg-slate-50 dark:bg-gray-900 text-slate-800 dark:text-white focus:border-purple-600 dark:focus:border-purple-400 focus:bg-white dark:focus:bg-gray-800" placeholder="Enter code..." value={promoCode} onChange={e => setPromoCode(e.target.value)} />
              <button className="px-4 bg-slate-800 dark:bg-gray-700 text-white rounded-xl font-bold border-none cursor-pointer" onClick={applyPromo}>Apply</button>
            </div>
          </div>
          
          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none rounded-xl font-bold text-base cursor-pointer transition-opacity hover:opacity-90 flex items-center justify-center gap-2" onClick={handleCheckout}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}