import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../data/productStorage";
import { CATEGORIES } from "../data/categories";

const PRODUCTS_PER_PAGE = 12;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  /* ======================
     LOAD PRODUCTS
  ====================== */
  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const categories = ["All", ...CATEGORIES];

  /* ======================
     FILTER PRODUCTS
  ====================== */
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  /* ======================
     RESET PAGE WHEN CATEGORY CHANGES
  ====================== */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  /* ======================
     PAGINATION LOGIC
  ====================== */
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-200 min-h-screen">

      {/* ======================
         🔥 STICKY CATEGORY BAR
      ====================== */}
      <div className="sticky top-16 z-40 bg-white shadow-md p-4">
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 whitespace-nowrap rounded-lg transition ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ======================
         PRODUCTS GRID
      ====================== */}
      <div className="p-6 mt-12">

        {loading ? (
          <div className="text-center text-gray-500 mt-10">
            Loading meals...
          </div>
        ) : paginatedProducts.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No products in this category
          </p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* ======================
               PAGINATION CONTROLS
            ====================== */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

                {/* Prev */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-4 py-2 bg-white rounded shadow disabled:opacity-40"
                >
                  Prev
                </button>

                {/* Page numbers */}
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "bg-white shadow"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-4 py-2 bg-white rounded shadow disabled:opacity-40"
                >
                  Next
                </button>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}