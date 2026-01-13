import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ChatWidget />

      <section style={{ padding: '100px 20px', background: 'var(--primary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '10px' }}>Elite <span className="gold-text">Destinations</span></h2>
          <p style={{ color: 'var(--text-dim)' }}>Hand-picked investment opportunities in Dubai&apos;s most prestigious areas.</p>
        </div>

        <div className="bento-grid">
          <div className="bento-item" style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
            <Image src="/assets/palm.png" alt="Palm Jumeirah" width={800} height={600} priority />
            <div className="overlay">
              <p>Palm Jumeirah</p>
              <h3>Beachfront Villas</h3>
            </div>
          </div>
          <div className="bento-item">
            <Image src="/assets/downtown.png" alt="Downtown Dubai" width={400} height={300} />
            <div className="overlay">
              <p>Downtown</p>
              <h3>Luxury Living</h3>
            </div>
          </div>
          <div className="bento-item">
            <Image src="/assets/marina.png" alt="Dubai Marina" width={400} height={300} />
            <div className="overlay">
              <p>Marina</p>
              <h3>Lifestyle Towers</h3>
            </div>
          </div>
          <div className="bento-item" style={{ gridColumn: 'span 2' }}>
            <Image src="/assets/creek.png" alt="Creek Harbour" width={800} height={300} />
            <div className="overlay">
              <p>Creek Harbour</p>
              <h3>Future Skyline</h3>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '60px 20px', background: 'var(--secondary)', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '14px' }}>© 2026 AURUM LUXURY REAL ESTATE DUBAI | AI POWERED CONCIERGE</p>
      </footer>
    </main>
  );
}
