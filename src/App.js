import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Products from "./components/Products";
import { CartProvider } from "./components/CartContext";
import CartModal from "./components/CartModal";
import { ProductModalProvider } from "./components/ProductModalContext";
import ProductModal from "./components/ProductModal";
import Checkout from "./components/Checkout";
import Portfolio from "./components/Portfolio";
import AdminDashboard from "./components/admin/AdminDashboard";



function App() {
  return (
    <Router>
      <CartProvider>
        <ProductModalProvider>
          <div className="App">
            <Navbar />
            <CartModal />
            <ProductModal />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product" element={<Products />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>

            <Footer />
          </div>
        </ProductModalProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
