import React, { useContext } from 'react';
import { AppContext } from '../../App';

export default function Header() {
    const { theme, toggleTheme, cartCount, searchQuery, setSearchQuery, setIsCallActive } = useContext(AppContext);

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between glass px-6 lg:px-20 py-4">
            <div className="flex items-center gap-12">
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(0,255,102,0.5)]">
                        <span className="material-symbols-outlined text-black font-bold">bolt</span>
                    </div>
                    <h2 className="text-xl font-black tracking-tighter uppercase italic">
                        Brick <span className="text-primary">&amp;</span> Bolt
                    </h2>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    {['Technic', 'Icons', 'Speed Champions', 'Die-Cast'].map((item) => (
                        <a
                            key={item}
                            className="text-slate-600 dark:text-white/70 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider"
                            href="#"
                        >
                            {item}
                        </a>
                    ))}
                </nav>
            </div>
            <div className="flex items-center gap-6">
                <label className="hidden lg:flex items-center bg-black/5 dark:bg-white/5 rounded-lg border border-white/10 px-4 h-10 focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-slate-500 dark:text-white/50 text-xl">search</span>
                    <input
                        className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-400 dark:placeholder:text-white/30 w-48"
                        placeholder="Search sets..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center rounded-lg h-10 w-10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                    >
                        <span className="material-symbols-outlined">
                            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    <button className="relative flex items-center justify-center rounded-lg h-10 w-10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black shadow-[0_0_8px_#00ff66]">
                            {cartCount}
                        </span>
                    </button>
                    <button
                        onClick={() => setIsCallActive(true)}
                        className="flex items-center justify-center rounded-lg h-10 w-10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all text-slate-900 dark:text-white"
                    >
                        <span className="material-symbols-outlined">call</span>
                    </button>
                </div>
                <div className="size-10 rounded-full border-2 border-primary/30 p-0.5">
                    <div
                        className="h-full w-full rounded-full bg-cover bg-center"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2i74uJqqG24obhNMGzRFWUfHcMFa13zGM6eSzWZ8SmN5Qc3U2hqQfv9H3ypAmhrZiQnX1MO12CKzyZCPgZpkkXVLFB5b7rpbxBkc21BYkfzKNSj5hkKydG_daZilFpbPCvAAfRoWlBD2B_jIjTWHjCqXM3YpvJKELVH7V6ng1dgTTssM5sCy2sUiJlXVKtgpHEAGlvVquCdTUXEqYv76EalTIL6ExMZdc0PMcflNe4a9aDHpR65XipLGQjNYdxLgBAMnovwf8jAg")' }}
                    />
                </div>
            </div>
        </header>
    );
}
