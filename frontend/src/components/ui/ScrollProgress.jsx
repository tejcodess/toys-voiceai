import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="progress-container fixed top-0 left-0 w-full h-[4px] z-[1000] bg-black/10 dark:bg-white/10">
            <div
                className="h-full bg-primary shadow-[0_0_15px_#00ff66] transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
}
