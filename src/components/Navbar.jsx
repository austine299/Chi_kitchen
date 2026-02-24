import React, { useContext, useState } from "react";
import { FaMapPin, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CartContext } from "./CartContext";

function Navbar() {
  const { cart, setOpenCart } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((a, b) => a + b.qty, 0);

  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-red-500 font-semibold"
      : "hover:text-red-500";

  return (
    <nav className="fixed bg-gray-300 top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-6">
          <div className="font-bold text-lg">🍔 CHI_KITCHEN</div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <FaMapPin /> Lagos
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
          <NavLink to="/product" className={linkClasses}>All Products</NavLink>
          <NavLink to="/portfolio" className={linkClasses}>Portfolio</NavLink>

          <button
            onClick={() => setOpenCart(true)}
            className="bg-black text-white px-5 py-2 rounded-full flex gap-2 items-center hover:bg-gray-800"
          >
            <FaShoppingCart />
            Cart {totalItems}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-200 px-6 py-4 flex flex-col gap-4">
          <NavLink to="/" className={linkClasses} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/contact" className={linkClasses} onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
          <NavLink to="/product" className={linkClasses} onClick={() => setMobileMenuOpen(false)}>All Products</NavLink>
          <NavLink to="/portfolio" className={linkClasses} onClick={() => setMobileMenuOpen(false)}>Portfolio</NavLink>

          <button
            onClick={() => {
              setOpenCart(true);
              setMobileMenuOpen(false);
            }}
            className="bg-black text-white px-5 py-2 rounded-full flex gap-2 items-center hover:bg-gray-800"
          >
            <FaShoppingCart />
            Cart {totalItems}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;