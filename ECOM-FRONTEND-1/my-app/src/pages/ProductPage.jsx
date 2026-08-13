import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Product from '../components/ProductComp';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import api from '../axioxInstance';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    api.get('/products')
      .then(response => {
        setProducts(response.data || []); 
        setLoading(false);
      })
      .catch(err => {
        console.error("fetch error", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    if (!Array.isArray(products)) return ["All"];
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [products]);

  // Filter products safely by search AND selected category
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((product) => {
      const matchesSearch = product.prodName
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <NavBar search={search} setSearch={setSearch} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Category Filter Bar */}
        {!loading && !error && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-xs font-medium text-gray-500">
              Showing {filteredProducts.length} results
            </p>
          </div>
        )}

        {/* Loading State / Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-80 w-full animate-pulse rounded-2xl bg-gray-900 border border-gray-800"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="my-16 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-red-400 font-semibold text-base mb-1">
              404 Error: Products Not Found!
            </p>
            <p className="text-gray-500 text-sm">
              Please check your internet connection and try reloading the page.
            </p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((item) => (
                <motion.div
                  key={item.prodId || item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <Product product={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="my-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-gray-900/50 p-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-gray-800/80 text-gray-400 mb-4">
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">No products found</h3>
            <p className="mt-1 text-sm text-gray-400">
              {search
                ? `We couldn't find any items matching "${search}"`
                : "No products match the selected filters."}
            </p>
            {(search || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-lg bg-gray-800 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-700"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}