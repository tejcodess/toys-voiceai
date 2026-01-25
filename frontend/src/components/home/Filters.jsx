import React, { useContext } from 'react';
import { AppContext } from '../../App';

export default function Filters() {
    const { setSearchQuery } = useContext(AppContext);

    return (
        <aside className="w-full lg:w-64 space-y-8 flex-shrink-0">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold uppercase tracking-wider">Filters</h3>
                <p className="text-slate-400 dark:text-white/40 text-xs font-medium">Refine your collection (17 items)</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <p className="text-sm font-bold text-primary/80 uppercase">Scale</p>
                    <div className="flex flex-col gap-2">
                        {['1:8 Scale', '1:10 Scale', '1:12 Scale', '1:16 Scale'].map((scale, i) => (
                            <label key={scale} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    defaultChecked={i === 0}
                                    className="rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-black"
                                    type="checkbox"
                                />
                                <span className="text-sm text-slate-600 dark:text-white/70 group-hover:text-white transition-colors">{scale}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-bold text-primary/80 uppercase">Price Range</p>
                        <span className="text-xs text-slate-400 dark:text-white/40">$250 - $800</span>
                    </div>
                    <div className="relative h-6 flex items-center pt-2">
                        <div className="absolute h-1 w-full bg-white/10 rounded-full" />
                        <div className="absolute h-1 w-3/4 left-[15%] bg-primary rounded-full" />
                        <div className="absolute left-[15%] size-4 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-pointer" />
                        <div className="absolute right-[10%] size-4 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-pointer" />
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <p className="text-sm font-bold text-primary/80 uppercase">Availability</p>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            <span className="text-sm font-bold uppercase tracking-tight">In Stock</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/5 text-slate-500 dark:text-white/50">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            <span className="text-sm font-bold uppercase tracking-tight">Pre-order</span>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setSearchQuery('')}
                className="w-full py-3 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-lg hover:border-primary/50 transition-all"
            >
                Reset Filters
            </button>
        </aside>
    );
}
