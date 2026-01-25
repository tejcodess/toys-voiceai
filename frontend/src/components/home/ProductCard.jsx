import React, { useContext } from 'react';
import { AppContext } from '../../App';

export default function ProductCard({ product }) {
    const { addToCart, showToast } = useContext(AppContext);

    return (
        <div className={`glass glass-card group flex flex-col rounded-xl overflow-hidden transition-all duration-300 ${product.comingSoon ? '' : 'hover:border-primary/40'}`}>
            <div className="relative aspect-square overflow-hidden">
                <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url("${product.image}")` }}
                />
                {product.scale && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/80 text-primary text-[10px] font-black uppercase tracking-tighter">
                        {product.scale}
                    </div>
                )}
                {product.tag && (
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${product.tag === 'Limited' ? 'bg-primary text-black' : 'bg-black/60 text-primary'}`}>
                        {product.tag}
                    </div>
                )}
                {product.comingSoon && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span
                            onClick={() => showToast('Wait-listed!')}
                            className="text-xs font-black uppercase tracking-widest border border-primary text-primary px-4 py-2 rounded cursor-pointer"
                        >
                            Notify Me
                        </span>
                    </div>
                )}
            </div>
            <div className="p-4 flex flex-col gap-1">
                <p className={`text-[10px] font-black uppercase tracking-widest ${product.comingSoon ? 'text-slate-400 dark:text-white/40' : 'text-primary'}`}>
                    {product.category}
                </p>
                <h3 className={`text-sm font-bold truncate transition-colors ${product.comingSoon ? 'text-slate-400 dark:text-white/40' : 'text-slate-900 dark:text-white group-hover:text-primary'}`}>
                    {product.title}
                </h3>
                <div className="flex items-center justify-between mt-4">
                    <span className={`text-lg font-black ${product.comingSoon ? 'text-slate-400 dark:text-white/40' : ''}`}>
                        ${product.price}
                    </span>
                    {product.comingSoon ? (
                        <button className="size-8 flex items-center justify-center rounded-lg bg-white/5 text-white/30 cursor-not-allowed">
                            <span className="material-symbols-outlined text-xl">notifications</span>
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="size-8 flex items-center justify-center rounded-lg bg-primary text-black hover:scale-110 transition-transform"
                        >
                            <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
