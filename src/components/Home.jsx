import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import Testimonials from "./Testmonial";
import { getProducts } from "../data/productStorage";
import {
  FaTruck,
  FaLeaf,
  FaClock,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================
     LOAD PRODUCTS FROM SHEETS
  ====================== */
  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={`${process.env.PUBLIC_URL}/images/chef1.avif`}
          alt="food"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Fresh Meals From <span className="italic">Chi Kitchen</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-200">
            Delicious homemade meals delivered hot and fresh to your doorstep.
          </p>

          <Link to="/product">
            <button className="mt-10 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition">
              Explore Menu <ArrowRight className="inline ml-2" />
            </button>
          </Link>
        </div>
      </div>

      {/* ================= FEATURED ================= */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            🔥 Featured Dishes
          </h2>

          {loading ? (
            <p className="text-center">Loading meals...</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/product"
              className="bg-black text-white px-8 py-3 rounded-full"
            >
              View All Meals
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <Testimonials />

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div>
            <FaTruck className="mx-auto text-3xl mb-3" />
            <h3 className="font-bold">Fast Delivery</h3>
            <p className="text-gray-500 text-sm">Quick doorstep delivery</p>
          </div>

          <div>
            <FaLeaf className="mx-auto text-3xl mb-3" />
            <h3 className="font-bold">Fresh Ingredients</h3>
            <p className="text-gray-500 text-sm">Healthy & hygienic meals</p>
          </div>

          <div>
            <FaClock className="mx-auto text-3xl mb-3" />
            <h3 className="font-bold">Always On Time</h3>
            <p className="text-gray-500 text-sm">Prepared when ordered</p>
          </div>

          <div>
            <FaStar className="mx-auto text-3xl mb-3" />
            <h3 className="font-bold">Top Rated</h3>
            <p className="text-gray-500 text-sm">Loved by customers</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-black text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Eat Something Delicious?
        </h2>

        <a
          href="https://wa.me/2348135547625"
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 px-8 py-4 rounded-full inline-flex items-center gap-2"
        >
          <FaWhatsapp /> Order on WhatsApp
        </a>
      </section>
    </>
  );
}