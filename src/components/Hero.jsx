import { useState } from "react";

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="hero">
      <div className="hero-image-bg">
        <img src="/luana-perfil.png" alt="Luana Santos" />
      </div>

      <header className="navbar">
        <div className="logo">
          {/* <strong>Luana Santos</strong>
          <span>Beauty & Aesthetics</span> */}
        </div>

        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Portfolio</a>
          <a href="#">Contact</a>
        </nav>

        <button
          className={menuOpen ? "hamburger active" : "hamburger"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className="hero-inner">
        <div className="hero-content">
          <p className="eyebrow">♡ Enhance your natural beauty</p>

          <h1>Luana Santos</h1>
          <h2>Beauty & Aesthetics ♡</h2>

          <p className="hero-description">
            Real beauty, confidence, and care in every detail.
          </p>

          <div className="hero-actions">
            <a href="#" className="btn primary">Book via WhatsApp</a>
            <a href="#" className="btn secondary">My Instagram</a>
          </div>
        </div>
      </div>

      <div className="hero-curve">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#fffaf7"
            d="M0,120 C300,40 1100,200 1440,120 L1440,320 L0,320 Z"
          />
        </svg>
      </div>
    </section>
  );
}

export default Hero;