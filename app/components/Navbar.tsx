"use client";

export default function Navbar() {
    return (
        <nav className="glass" style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            padding: '15px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000,
        }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                <span className="gold-text">AURUM</span>
            </div>
            <div style={{ display: 'flex', gap: '30px', fontWeight: '500' }}>
                <a href="#" style={{ color: 'var(--text)', textDecoration: 'none' }}>Portfolio</a>
                <a href="#" style={{ color: 'var(--text)', textDecoration: 'none' }}>Market</a>
                <a href="#" style={{ color: 'var(--text)', textDecoration: 'none' }}>About</a>
            </div>
            <a href="#" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                Contact
            </a>
        </nav>
    );
}
