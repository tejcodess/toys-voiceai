import React, { useContext } from 'react';
import { AppContext } from '../../App';

export default function Filters() {
    const {
        products,
        selectedScale,
        setSelectedScale,
        selectedCategory,
        setSelectedCategory,
        resetFilters,
        searchQuery
    } = useContext(AppContext);

    const scales = ['1:8 Scale', '1:10 Scale', '1:12 Scale', '1:16 Scale'];
    const categories = ['All', 'Technic', 'Icons', 'Speed Champions', 'Die-Cast'];

    const handleScaleToggle = (scale) => {
        setSelectedScale((prev) =>
            prev.includes(scale) ? prev.filter((s) => s !== scale) : [...prev, scale]
        );
    };

    const hasActiveFilters =
        searchQuery !== '' || selectedCategory !== 'All' || selectedScale.length > 0;

    return (
        <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold uppercase tracking-wider">Filters</h3>
                <p className="text-slate-400 dark:text-white/40 text-xs font-medium">
                    Refine your collection ({products.length} models)
                </p>
            </div>

            <div className="space-y-6">
                {/* Category Filter */}
                <div className="space-y-3">
                    <p className="text-sm font-bold text-primary/80 uppercase">Category</p>
                    <div className="flex flex-col gap-1">
                        {categories.map((cat) => {
                            const isSelected =
                                cat === 'All'
                                    ? selectedCategory === 'All'
                                    : selectedCategory.toLowerCase().includes(cat.toLowerCase());
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`text-left text-xs font-semibold py-1.5 px-2 rounded-md transition-colors ${
                                        isSelected
                                            ? 'bg-primary/20 text-primary font-bold border border-primary/30'
                                            : 'text-slate-600 dark:text-white/70 hover:text-primary'
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Scale Filter */}
                <div className="space-y-4">
                    <p className="text-sm font-bold text-primary/80 uppercase">Scale</p>
                    <div className="flex flex-col gap-2">
                        {scales.map((scale) => (
                            <label key={scale} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedScale.includes(scale)}
                                    onChange={() => handleScaleToggle(scale)}
                                    className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-black"
                                />
                                <span className="text-sm text-slate-600 dark:text-white/70 group-hover:text-white transition-colors">
                                    {scale}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Availability Badge */}
                <div className="space-y-4 pt-2">
                    <p className="text-sm font-bold text-primary/80 uppercase">Status</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            <span className="text-sm font-bold uppercase tracking-tight">Ready to Ship</span>
                        </div>
                    </div>
                </div>
            </div>

            {hasActiveFilters && (
                <button
                    onClick={resetFilters}
                    className="w-full py-3 bg-white/5 border border-white/10 text-slate-700 dark:text-white text-xs font-black uppercase tracking-widest rounded-lg hover:border-primary/50 hover:text-primary transition-all"
                >
                    Reset Filters
                </button>
            )}
        </aside>
    );
}
