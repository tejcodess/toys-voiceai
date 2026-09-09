import React, { useContext } from 'react';
import { AppContext } from '../../App';

export default function Hero() {
    const { showToast } = useContext(AppContext);

    return (
        <section className="relative mb-16 @container">
            <div
                className="relative overflow-hidden rounded-2xl min-h-[560px] flex flex-col justify-center p-8 lg:p-16 bg-cover bg-center"
                style={{
                    backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGseuHpE9a2r-n6Nouyzl0hAsi3IoxJ1x8-h6-DjH4j9U3gOYgKlC6FTd3iV-svL0Cmji10PmGJ8R2fasl621SzHHmVBS71eWbk6T9YPg3fYa6YWX4rDhFzmdZBWGyv1etU6ualcf1d9zHqgFJLod_YLgyntfXx1Oh_2dwD9D2nO36wMolYsUzISjeyAAX66hxq_MXE7OgN54_MPNVG1E2nQwkX27oxFGb1SvhK_qdgwUKSs-FGChYEuwDkoMyO1oxKTBH3A-56wk")'
                }}
            >
                <div className="absolute top-20 right-40 h-24 w-24 rounded-xl border border-primary/20 bg-primary/5 rotate-12 blur-sm hidden lg:block" />
                <div className="absolute bottom-40 right-10 h-16 w-16 rounded-full border border-primary/40 bg-primary/10 -rotate-445 blur-md hidden lg:block" />

                <div className="relative z-10 max-w-2xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
                        <span className="size-2 rounded-full bg-primary animate-pulse" />
                        New Release
                    </div>
                    <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter uppercase neon-text-glow text-white">
                        ENGINEERED TO <span className="text-primary italic">PERFECTION</span>
                    </h1>
                    <p className="text-lg text-white/70 max-w-lg font-medium leading-relaxed">
                        Experience the thrill of LEGO Technic with 3D depth and parallax precision. The definitive collection for the elite builder.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            onClick={() => {
                                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,255,102,0.4)]"
                        >
                            Shop Collection
                        </button>
                        <button
                            onClick={() => showToast('Viewing Details...')}
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all font-display"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
