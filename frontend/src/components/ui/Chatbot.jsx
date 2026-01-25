import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import { CONFIG, SITE_CONTEXT } from '../../config';

export default function Chatbot() {
    const { isChatOpen, setIsChatOpen } = useContext(AppContext);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your Brick & Bolt assistant. How can I help you explore our collection today?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        const message = inputValue.trim();
        if (!message || isTyping) return;

        setMessages(prev => [...prev, { text: message, sender: 'user' }]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch(CONFIG.GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CONFIG.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: CONFIG.GROQ_MODEL,
                    messages: [
                        { role: "system", content: SITE_CONTEXT },
                        { role: "user", content: message }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });
            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "Error connecting to the network.", sender: 'ai' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            <div
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="fixed bottom-6 right-6 z-[2000] cursor-pointer group"
            >
                <div className="size-14 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.4)] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">smart_toy</span>
                </div>
            </div>

            <div className={`fixed bottom-24 right-6 w-[380px] h-[500px] glass z-[2000] rounded-2xl flex flex-col overflow-hidden shadow-2xl border-primary/20 transition-all duration-300 ${isChatOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                <div className="bg-primary/10 border-b border-primary/20 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-black">
                            <span className="material-symbols-outlined text-xl">bolt</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">Brick & Bolt AI</h4>
                            <div className="flex items-center gap-1.5">
                                <span className="size-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[10px] font-bold text-primary uppercase">Online</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsChatOpen(false)}
                        className="text-slate-500 dark:text-white/40 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`chat-message p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                    ? 'ml-auto bg-primary text-black rounded-tr-none font-medium shadow-lg'
                                    : 'mr-auto bg-black/5 dark:bg-white/5 text-slate-600 dark:text-white/70 rounded-tl-none border border-primary/10'
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chat-message mr-auto bg-black/5 dark:bg-white/5 p-3 rounded-2xl rounded-tl-none text-slate-400 flex items-center gap-1 typing-dots">
                            <span></span><span></span><span></span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-primary/10 bg-black/5 dark:bg-white/5">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Ask about our models..."
                            className="flex-1 bg-white/5 dark:bg-white/10 border border-primary/20 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isTyping}
                            className="bg-primary text-black size-10 rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,255,102,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-xl">send</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
