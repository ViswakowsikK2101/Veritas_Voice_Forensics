import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Icons } from '../constants';

const GeminiChat: React.FC = () => {
    const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
        { role: 'model', text: 'Hello. I am the Veritas Forensic Assistant. Ask me about the detection architecture or forensic methodology.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || !process.env.API_KEY) return;
        
        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // System instruction to act as the architect
            const systemContext = `
            You are the Lead Forensic Architect for "Veritas Voice", an AI audio detection system.
            The system uses a CNN for spectral artifacts and a Transformer for temporal consistency.
            It detects: Pitch over-stability, jitter/shimmer anomalies, and high-frequency inconsistencies.
            Supported languages: Tamil, English, Hindi, Malayalam, Telugu.
            Your answers should be technical, concise, and professional.
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [
                    { role: 'user', parts: [{ text: systemContext + "\n\nUser Question: " + userMsg }] }
                ]
            });

            const text = response.text || "I could not retrieve the forensic data at this time.";
            setMessages(prev => [...prev, { role: 'model', text }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Error connecting to forensic database (Gemini API Error)." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
            <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center gap-2">
                <Icons.Bot className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-sm">Forensic Assistant</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                            m.role === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-slate-800 text-slate-200 border border-slate-700'
                        }`}>
                            {m.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-slate-800 text-slate-400 p-3 rounded-lg text-xs animate-pulse">
                            Analyzing query...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={process.env.API_KEY ? "Ask about the model..." : "API Key Required in ENV"}
                        disabled={!process.env.API_KEY || isLoading}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={!process.env.API_KEY || isLoading}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeminiChat;