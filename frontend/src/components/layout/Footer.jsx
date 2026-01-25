import React, { useContext } from 'react';
import { AppContext } from '../../App';

export default function Footer() {
    const { showToast } = useContext(AppContext);

    return (
        <footer className="mt-20 border-t border-white/5 bg-black/40 py-12 px-6 lg:px-20">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary font-bold">bolt</span>
                        <h2 className="text-xl font-black tracking-tighter uppercase italic">Brick &amp; Bolt</h2>
                    </div>
                    <p className="text-slate-400 dark:text-white/40 text-sm leading-relaxed">
                        The ultimate destination for premium brick building sets and elite die-cast collectibles.
                        Engineered for the enthusiast.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white mb-4 tracking-widest">Inventory</h4>
                    <ul className="space-y-2 text-sm text-slate-500 dark:text-white/50">
                        {['New Releases', 'Technic Ultimate', 'Exclusive Icons', 'Retired Sets'].map(item => (
                            <li key={item}><a className="hover:text-primary transition-colors" href="#">{item}</a></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white mb-4 tracking-widest">Support</h4>
                    <ul className="space-y-2 text-sm text-slate-500 dark:text-white/50">
                        {['Track Order', 'Shipping Info', 'Elite Rewards', 'Contact Expert'].map(item => (
                            <li key={item}><a className="hover:text-primary transition-colors" href="#">{item}</a></li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white mb-2 tracking-widest">Newsletter</h4>
                    <p className="text-xs text-slate-400 dark:text-white/40">Get notified about limited releases.</p>
                    <div className="flex gap-2">
                        <input
                            className="bg-white/5 border-white/10 rounded focus:ring-primary text-sm px-4 py-2 flex-1 outline-none text-white"
                            placeholder="Email"
                            type="email"
                        />
                        <button
                            onClick={() => showToast('Subscription successful!')}
                            className="bg-primary p-2 rounded text-black hover:scale-105 transition-transform"
                        >
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                <p>© 2024 Brick &amp; Bolt. All rights reserved.</p>
                <div className="flex gap-8">
                    <a className="hover:text-primary transition-colors" href="#">Privacy</a>
                    <a className="hover:text-primary transition-colors" href="#">Terms</a>
                    <a className="hover:text-primary transition-colors" href="#">Cookies</a>
                </div>
            </div>
        </footer>
    );
}
