import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import Filters from './components/home/Filters';
import ProductGrid from './components/home/ProductGrid';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot';
import VoiceAssistant from './components/ui/VoiceAssistant';
import ScrollProgress from './components/ui/ScrollProgress';
import Toast from './components/ui/Toast';
import CartModal from './components/ui/CartModal';

export const AppContext = createContext();

export default function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isCallActive, setIsCallActive] = useState(false);
    const [toasts, setToasts] = useState([]);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const lastToastRef = useRef({ message: '', time: 0 });

    const showToast = (message) => {
        const now = Date.now();

        // Block duplicate messages within 500ms
        if (message === lastToastRef.current.message && now - lastToastRef.current.time < 500) {
            return;
        }

        lastToastRef.current = { message, time: now };
        const id = now + Math.random();

        setToasts((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 2500);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        showToast(`${product.title} added!`);
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing && existing.quantity > 1) {
                return prev.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            return prev.filter(item => item.id !== productId);
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <AppContext.Provider value={{
            theme, toggleTheme,
            products, cartItems, cartCount, addToCart, removeFromCart, clearCart,
            isCartOpen, setIsCartOpen,
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
                <CartModal />
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[5000] flex flex-col gap-2 pointer-events-none">
                    {toasts.map(toast => (
                        <Toast key={toast.id} message={toast.message} />
                    ))}
                </div>
            </div>
        </AppContext.Provider>
    );
}
