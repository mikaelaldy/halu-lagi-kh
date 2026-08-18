import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { StockProvider } from './context/StockContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Checkout } from './pages/Checkout';
import { ThankYou } from './pages/ThankYou';

export const App: React.FC = () => {
  return (
    <StockProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </StockProvider>
  );
};

export default App;
