import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';
import Toast from './components/Toast/page';

import Home from './pages/Home/page';
import Login from './pages/Login/page';
import Register from './pages/Register/page';
import Dashboard from './pages/Dashboard/page';
import Cart from './pages/Cart/page';
import Reviews from './pages/Reviews/page';
import About from './pages/About/page';
import Profile from './pages/Profile/page';
import Recipes from './pages/Recipes/page';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/recipes" element={<Recipes />} />
                </Routes>
              </main>
              <Footer />
              <Toast />
            </div>
          </BrowserRouter>
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;