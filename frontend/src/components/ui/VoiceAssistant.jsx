import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import { CONFIG, SITE_CONTEXT } from '../../config';

export default function VoiceAssistant() {
    const { isCallActive, setIsCallActive, products } = useContext(AppContext);
    const [callStatus, setCallStatus] = useState("Ringing...");
    const [showWaves, setShowWaves] = useState(false);
    const [isRinging, setIsRinging] = useState(true);

    useEffect(() => {
        let recognition = null;
        let isActive = isCallActive;

        if (!isCallActive) {
            setCallStatus("Ringing...");
            setIsRinging(true);
            setShowWaves(false);
            return;
        }

        const startCall = setTimeout(() => {
            setCallStatus("Connected");
            setIsRinging(false);
            speak("Hello! I am your Brick & Bolt voice assistant. How can I help you?");
        }, 3000);

        const speak = (text) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = () => {
                setCallStatus("AI Speaking...");
                setShowWaves(true);
            };
            utterance.onend = () => {
                if (isActive) {
                    setCallStatus("Listening...");
                    setShowWaves(true);
                    startListening();
                }
            };
            window.speechSynthesis.speak(utterance);
        };

        const startListening = () => {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onresult = async (event) => {
                    const text = event.results[0][0].transcript;
                    setCallStatus("Processing...");
                    setShowWaves(false);

                    // Create dynamic context with current products
                    const dynamicContext = `
                        ${SITE_CONTEXT}
                        Current Products in Store (${products.length} total):
                        ${products.map((p, i) => `${i + 1}. ${p.title} (${p.category}, $${p.price})`).join('\n')}
                    `;

                    try {
                        const response = await fetch(CONFIG.GROQ_API_URL, {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${CONFIG.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                model: CONFIG.GROQ_MODEL,
                                messages: [
                                    { role: "system", content: dynamicContext + " Keep voice responses under 20 words for clarity." },
                                    { role: "user", content: text }
                                ],
                                temperature: 0.7,
                                max_tokens: 100
                            })
                        });
                        const data = await response.json();
                        speak(data.choices[0].message.content);
                    } catch (e) {
                        speak("Sorry, I encountered an error.");
                    }
                };

                recognition.start();
            }
        };

        return () => {
            isActive = false;
            clearTimeout(startCall);
            window.speechSynthesis.cancel();
            if (recognition) recognition.stop();
        };
    }, [isCallActive]);

    if (!isCallActive) return null;

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/60 backdrop-blur-md">
            <div className="w-80 glass rounded-3xl p-8 flex flex-col items-center gap-8 shadow-2xl border-primary/20 animate-in fade-in zoom-in duration-300">
                <div className="relative">
                    {isRinging && <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />}
                    <div className="size-24 bg-primary text-black rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(0,255,102,0.5)]">
                        <span className="material-symbols-outlined text-5xl">smart_toy</span>
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">{callStatus}</h3>
                    <p className="text-sm text-slate-500 dark:text-white/40 mt-1 uppercase font-bold tracking-tighter">Brick & Bolt Voice AI</p>

                    <div className={`flex items-center justify-center gap-1 mt-4 ${showWaves ? '' : 'hidden'}`}>
                        {[0.1, 0.2, 0.3, 0.4, 0.5].map((delay) => (
                            <div
                                key={delay}
                                className="w-1 h-6 bg-primary rounded-full animate-bounce"
                                style={{ animationDelay: `${delay}s`, height: `${12 + Math.random() * 20}px` }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => setIsCallActive(false)}
                        className="size-14 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                    >
                        <span className="material-symbols-outlined text-3xl">call_end</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
