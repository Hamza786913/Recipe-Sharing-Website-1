import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const linkClass = "text-white/90 hover:text-white font-medium text-sm px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/5";

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-gray-900 text-white sticky top-0 z-50 shadow-lg border-b border-transparent dark:border-gray-700 transition-colors duration-300">
      <Link to="/" className="font-serif text-2xl font-bold tracking-wide m-0 flex items-center gap-2 hover:opacity-90 transition-opacity">
        <span className="text-3xl">✨</span> Appify
      </Link>

      <button
        className="md:hidden bg-white/10 dark:bg-white/5 border-none text-white text-xl px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <ul className={`${menuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-indigo-700 dark:bg-gray-800 p-6 gap-4 shadow-xl border-b border-white/10 dark:border-gray-700' : 'hidden md:flex'} list-none gap-2 items-center m-0 p-0 transition-all duration-300`}>
        <li><Link to="/" className={linkClass}>Home</Link></li>
        <li><Link to="/dashboard" className={linkClass}>Dashboard</Link></li>
        <li><Link to="/recipes" className={linkClass}>Recipes</Link></li>
        <li><Link to="/reviews" className={linkClass}>Reviews</Link></li>
        <li><Link to="/about" className={linkClass}>About</Link></li>
        <li><Link to="/profile" className={linkClass}>Profile</Link></li>
        <li><Link to="/login" className={linkClass}>Login</Link></li>
        <li><Link to="/register" className={linkClass}>Register</Link></li>

        <li className="flex items-center gap-3 mt-4 md:mt-0 md:ml-4">
          <Link to="/cart" className="bg-white/15 hover:bg-white/25 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-full font-bold text-sm inline-flex items-center transition-all duration-300 shadow-inner">
            🛒 Cart
            {cartCount > 0 && (
              <span className="bg-amber-400 text-amber-900 text-[0.75rem] font-extrabold px-2 py-0.5 rounded-full ml-2 shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 border border-white/5 shadow-inner flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </li>
      </ul>
    </nav>
  );
}