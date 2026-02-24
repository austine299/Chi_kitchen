import React from "react";
import {
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const phone = "2348135547625";

  return (
    <footer className="bg-black text-white mt-20">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold mb-4">🍽️ CHI_KITCHEN</h2>
          <p className="text-gray-400 text-sm leading-6">
            Delicious homemade meals prepared fresh daily.
            Order your favorite dishes quickly and get fast delivery
            straight to your doorstep.
          </p>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-green-600 px-4 py-2 rounded-full text-sm hover:bg-green-700 transition"
          >
            <FaWhatsapp /> Order on WhatsApp
          </a>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/product" className="hover:text-white">Menu</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/checkout" className="hover:text-white">Checkout</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Rice</li>
            <li>Soup</li>
            <li>Swallow</li>
            <li>Drinks</li>
            <li>Salad</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Contact Info</h3>

          <div className="space-y-3 text-gray-400 text-sm">

            <div className="flex items-center gap-2">
              <FaPhone />
              <a href="tel:+2348135547625" className="hover:text-white">
                +234 813 554 7625
              </a>
            </div>

            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              Lagos, Nigeria
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-3 text-lg">
              <a
                href="https://www.instagram.com/chik_ichen?igsh=aWhuZ3p3dDUzNnZx&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.tiktok.com/@chi.kitchen6?_r=1&_t=ZS-948L0RmRnjZ"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-800 text-center py-5 text-xs text-gray-500">
        © {new Date().getFullYear()} CHI_KITCHEN. All rights reserved.
      </div>
    </footer>
  );
}