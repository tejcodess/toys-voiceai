import React, { useContext } from 'react';
import { products } from '../../data/products';
import ProductCard from './ProductCard';
import { AppContext } from '../../App';

export default function ProductGrid() {
    const { searchQuery, setSearchQuery } = useContext(AppContext);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.keywords && p.keywords.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                    Featured <span className="text-primary">Models</span>
                </h2>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400 dark:text-white/40 uppercase">Sort by:</span>
                    <select className="bg-white/5 border-white/10 rounded text-xs font-bold uppercase py-1 pl-3 pr-8 focus:ring-primary text-slate-900 dark:text-white">
                        <option>Popularity</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Latest</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {filteredProducts.length === 0 && (
                    <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
                        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-white/20">search_off</span>
                        <p className="text-xl font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">No matching models found</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="text-primary hover:underline text-sm font-bold uppercase"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-12">
                <button className="px-10 py-3 glass hover:bg-white/10 text-xs font-black uppercase tracking-[0.2em] rounded-lg transition-all border border-white/20">
                    Load More Inventory
                </button>
            </div>
        </div>
    );
}
