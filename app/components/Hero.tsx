"use client";

export default function Hero() {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 20px',
            position: 'relative',
            backgroundImage: 'linear-gradient(rgba(15, 15, 15, 0.7), rgba(15, 15, 15, 0.7)), url("/assets/hero.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="animate-fade" style={{ maxWidth: '900px' }}>
                <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '20px' }}>
                    Exclusive Real Estate
                </h4>
                <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: '1.1', marginBottom: '30px' }}>
                    Investing in the <br />
                    <span className="gold-text">Future of Dubai</span>
                </h1>
                <p style={{ color: 'var(--text-dim)', fontSize: '20px', maxWidth: '600px', margin: '0 auto 40px' }}>
                    Access off-market opportunities and ultra-luxury penthouses with our AI-powered investment concierge.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <a href="#" className="btn-primary">View Listings</a>
                    <a href="#" className="glass" style={{ padding: '12px 32px', borderRadius: '50px', color: 'white', textDecoration: 'none', fontWeight: '600' }}>
                        Our Agent
                    </a>
                </div>
            </div>
        </section>
    );
}
