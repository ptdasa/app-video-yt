"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Welcome to AURUM. I am your personal investment advisor. Are you looking for a residential property or a commercial opportunity in Dubai?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { role: "user" as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMsg] }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 2000 }}>
            {isOpen ? (
                <div className="glass-dark animate-fade" style={{
                    width: '380px',
                    height: '550px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                }}>
                    {/* Header */}
                    <div style={{ padding: '20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '10px', height: '10px', background: '#4CAF50', borderRadius: '50%', boxShadow: '0 0 10px #4CAF50' }}></div>
                            <span style={{ fontWeight: '600', letterSpacing: '0.05em', fontSize: '14px' }}>AURUM AI CONCIERGE</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px', opacity: 0.6 }}>×</button>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {messages.map((m, i) => (
                            <div key={i} style={{
                                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%',
                                padding: '14px 18px',
                                borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                background: m.role === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                                color: m.role === 'user' ? '#000' : '#fff',
                                fontSize: '14px',
                                lineHeight: '1.5',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.05)' : 'none'
                            }}>
                                {m.content}
                            </div>
                        ))}
                        {isLoading && <div style={{ fontSize: '12px', color: 'var(--text-dim)', fontStyle: 'italic', marginLeft: '5px' }}>Concierge is typing...</div>}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} style={{ padding: '20px', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about Dubai property..."
                            style={{
                                width: '100%',
                                padding: '14px 22px',
                                borderRadius: '30px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.03)',
                                color: 'white',
                                outline: 'none',
                                fontSize: '14px'
                            }}
                        />
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn-primary"
                    style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 10px 30px rgba(var(--accent-rgb), 0.4)',
                        fontSize: '30px'
                    }}
                >
                    ✨
                </button>
            )}
        </div>
    );
}
