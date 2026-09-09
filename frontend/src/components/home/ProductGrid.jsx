import React, { useContext, useState } from 'react';
import ProductCard from './ProductCard';
import { AppContext } from '../../App';

export default function ProductGrid() {
    const {
        products,
        searchQuery,
        selectedCategory,
        selectedScale,
        sortBy,
        setSortBy,
        resetFilters
    } = useContext(AppContext);

    const [visibleCount, setVisibleCount] = useState(8);

    // Filter products
    const filteredProducts = (products || []).filter((p) => {
        // Search query filter
        const matchesSearch =
            !searchQuery ||
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.keywords && p.keywords.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category filter
        const matchesCategory =
            selectedCategory === 'All' ||
            p.category.toLowerCase().includes(selectedCategory.toLowerCase());

        // Scale filter
        const matchesScale =
            selectedScale.length === 0 ||
            (p.scale && selectedScale.includes(p.scale));

        return matchesSearch && matchesCategory && matchesScale;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        if (sortBy === 'Name: A to Z') return a.title.localeCompare(b.title);
        // Default: Popularity (featured items first, then id)
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.id - b.id;
    });

    const displayedProducts = sortedProducts.slice(0, visibleCount);

    return (
        <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                        Featured <span className="text-primary">Models</span>
                    </h2>
                    <p className="text-xs text-slate-400 dark:text-white/40 mt-0.5">
                        Showing {displayedProducts.length} of {sortedProducts.length} items
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-black/5 dark:bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase py-2 px-3 focus:ring-primary focus:border-primary text-slate-900 dark:text-white outline-none cursor-pointer"
                    >
                        <option value="Popularity">Popularity</option>
                        <option value="Price: Low to High">Price: Low to High</option>
                        <option value="Price: High to Low">Price: High to Low</option>
                        <option value="Name: A to Z">Name: A to Z</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {sortedProducts.length === 0 && (
                    <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-white/20">search_off</span>
                        <p className="text-xl font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">
                            No matching models found
                        </p>
                        <button
                            onClick={resetFilters}
                            className="text-primary hover:underline text-sm font-bold uppercase"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {visibleCount < sortedProducts.length && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setVisibleCount((prev) => prev + 8)}
                        className="px-10 py-3 glass hover:bg-white/10 text-xs font-black uppercase tracking-[0.2em] rounded-lg transition-all border border-white/20"
                    >
                        Load More Inventory ({sortedProducts.length - visibleCount} remaining)
                    </button>
                </div>
            )}
        </div>
    );
}
