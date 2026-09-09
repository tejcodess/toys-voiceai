import React, { useContext } from 'react';
import { AppContext } from '../../App';

export default function Header() {
    const {
        theme,
        toggleTheme,
        cartCount,
        searchQuery,
        setSearchQuery,
        setIsCartOpen,
        selectedCategory,
        setSelectedCategory
    } = useContext(AppContext);

    const categories = ['All', 'Technic', 'Icons', 'Speed Champions', 'Die-Cast'];

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between glass px-6 lg:px-20 py-4">
            <div className="flex items-center gap-8 lg:gap-12">
                <div
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => setSelectedCategory('All')}
                >
                    <div className="size-8 bg-primary flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(0,255,102,0.5)]">
                        <span className="material-symbols-outlined text-black font-bold">bolt</span>
                    </div>
                    <h2 className="text-xl font-black tracking-tighter uppercase italic">
                        Brick <span className="text-primary">&amp;</span> Bolt
                    </h2>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    {categories.map((cat) => {
                        const isActive =
                            cat === 'All'
                                ? selectedCategory === 'All'
                                : selectedCategory.toLowerCase().includes(cat.toLowerCase());
                        return (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-xs uppercase tracking-wider font-bold transition-all px-2.5 py-1 rounded-md ${
                                    isActive
                                        ? 'bg-primary/20 text-primary border border-primary/30'
                                        : 'text-slate-600 dark:text-white/70 hover:text-primary'
                                }`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </nav>
            </div>
            <div className="flex items-center gap-4 lg:gap-6">
                <label className="hidden sm:flex items-center bg-black/5 dark:bg-white/5 rounded-lg border border-white/10 px-3 h-10 focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-slate-500 dark:text-white/50 text-lg mr-2">search</span>
                    <input
                        className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-400 dark:placeholder:text-white/30 w-36 lg:w-48 outline-none"
                        placeholder="Search models..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="text-slate-400 hover:text-primary text-xs"
                        >
                            ✕
                        </button>
                    )}
                </label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 transition-all hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
                    >
                        <span className="material-symbols-outlined">
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        aria-label="Shopping Cart"
                        className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 text-slate-900 transition-all hover:bg-black/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                    >
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black shadow-[0_0_8px_#00ff66]">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
