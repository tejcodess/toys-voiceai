import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import Filters from './components/home/Filters';
import ProductGrid from './components/home/ProductGrid';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot';
import VoiceAssistant from './components/ui/VoiceAssistant';
import ScrollProgress from './components/ui/ScrollProgress';
import Toast from './components/ui/Toast';

export const AppContext = createContext();

export default function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    const [cartCount, setCartCount] = useState(3);
    const [searchQuery, setSearchQuery] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isCallActive, setIsCallActive] = useState(false);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const showToast = (message) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 2500);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const addToCart = () => {
        setCartCount(prev => prev + 1);
        showToast('Item added to cart!');
    };

    return (
        <AppContext.Provider value={{
            theme, toggleTheme,
            cartCount, addToCart,
            searchQuery, setSearchQuery,
            isChatOpen, setIsChatOpen,
            isCallActive, setIsCallActive,
            showToast
        }}>
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <ScrollProgress />
                <Header />
                <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-20 py-8">
                    <Hero />
                    <div className="flex flex-col lg:flex-row gap-10">
                        <Filters />
                        <ProductGrid />
                    </div>
                </main>
                <Footer />
                <Chatbot />
                <VoiceAssistant />
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[5000] flex flex-col gap-2 pointer-events-none">
                    {toasts.map(toast => (
                        <Toast key={toast.id} message={toast.message} />
                    ))}
                </div>
            </div>
        </AppContext.Provider>
    );
}
