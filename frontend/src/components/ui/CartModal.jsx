import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../App';

export default function CartModal() {
    const { isCartOpen, setIsCartOpen, cartItems, addToCart, removeFromCart, clearCart, showToast } = useContext(AppContext);
    const [checkoutStatus, setCheckoutStatus] = useState('idle'); // idle, processing, completed

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Reset checkout status when modal is closed
    useEffect(() => {
        if (!isCartOpen) {
            const timer = setTimeout(() => setCheckoutStatus('idle'), 400);
            return () => clearTimeout(timer);
        }
    }, [isCartOpen]);

    const handleCheckout = () => {
        if (cartItems.length === 0 || checkoutStatus !== 'idle') return;

        setCheckoutStatus('processing');

        setTimeout(() => {
            setCheckoutStatus('completed');
            clearCart();
            showToast('Order confirmed! 📦');
        }, 800);
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[6000] flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className="w-full max-w-md h-full glass shadow-2xl flex flex-col animate-in slide-in-from-right duration-500"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-primary/20 flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-2xl">shopping_cart</span>
                        <h2 className="text-xl font-black uppercase tracking-tighter italic">Your <span className="text-primary">Cart</span></h2>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="size-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Close cart"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                    {checkoutStatus === 'processing' ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center animate-pulse">
                            <div className="size-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
                            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">Processing...</h2>
                            <p className="text-slate-500 dark:text-white/50 text-xs mt-2 uppercase font-bold">Securing your elite collection</p>
                        </div>
                    ) : checkoutStatus === 'completed' ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                            <div className="size-20 bg-primary text-black rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(0,255,102,0.4)]">
                                <span className="material-symbols-outlined text-4xl">check_circle</span>
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">Ordered!</h2>
                            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-6">Your order will be delivered in 3 days</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="px-8 py-3 glass border-primary/30 text-primary text-xs font-black uppercase tracking-widest rounded-lg hover:bg-primary/10 transition-all"
                            >
                                Back to Shop
                            </button>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                            <span className="material-symbols-outlined text-6xl mb-4">shopping_basket</span>
                            <p className="text-lg font-bold uppercase tracking-widest">Cart is empty</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 text-primary hover:underline font-bold uppercase text-sm"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="size-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-black/20">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-2">{item.category}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 bg-black/20 dark:bg-white/5 rounded-lg p-1">
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="size-6 flex items-center justify-center hover:text-primary"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <span className="material-symbols-outlined text-sm">remove</span>
                                                </button>
                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="size-6 flex items-center justify-center hover:text-primary"
                                                    aria-label="Increase quantity"
                                                >
                                                    <span className="material-symbols-outlined text-sm">add</span>
                                                </button>
                                            </div>
                                            <span className="font-black text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer (Only shown when idle and has items) */}
                {checkoutStatus === 'idle' && cartItems.length > 0 && (
                    <div className="p-6 border-t border-primary/20 bg-black/20 space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-bold uppercase text-slate-400 dark:text-white/50 tracking-widest">Subtotal</span>
                            <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.2em] rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(0,255,102,0.3)]"
                        >
                            Checkout Now
                        </button>
                    </div>
                )}
            </div>
            {/* Click outside to close */}
            <div className="absolute inset-0 -z-10" onClick={() => setIsCartOpen(false)} />
        </div>
    );
}
