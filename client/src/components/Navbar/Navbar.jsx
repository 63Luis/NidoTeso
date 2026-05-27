import { useState, useEffect } from "react";

const GREEN = "#1B4332";
const MUTED = "#6B705C";
const CREAM = "#F5F5DC";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        .nav-link-item {
          font-family: 'Newsreader', serif;
          font-style: italic;
          font-size: 14px;
          color: ${MUTED};
          text-decoration: none;
          padding: 5px 14px;
          border-radius: 999px;
          transition: background 0.2s, color 0.2s;
        }
        .nav-link-item:hover {
          background: #EBE7DE;
          color: ${GREEN};
        }
        .nav-link-item.active {
          color: ${GREEN};
          font-weight: 700;
        }
        .mobile-menu-link {
          display: block;
          font-family: 'Newsreader', serif;
          font-style: italic;
          font-size: 15px;
          color: ${MUTED};
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s;
        }
        .mobile-menu-link:hover {
          background: #EBE7DE;
          color: ${GREEN};
        }
        .menu-toggle {
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: ${GREEN};
          display: none;
          padding: 4px;
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .menu-toggle { display: block !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: CREAM,
          borderBottom: "1px solid #E0DCD0",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 32px", height: "52px",
        }}>
          {/* Logo */}
          <a href="/" style={{
            fontFamily: "'Newsreader', serif",
            fontSize: "20px", fontWeight: 700, color: GREEN,
            textDecoration: "none", letterSpacing: "-0.01em",
          }}>
            NidoTeso
          </a>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <a href="/"         className="nav-link-item active">Inicio</a>
            <a href="/explorar" className="nav-link-item">Explorar</a>
            <a href="/conservacion"  className="nav-link-item">Conservación</a>
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            borderTop: "1px solid #E0DCD0",
            background: "rgba(245,245,220,0.98)",
            padding: "8px 16px 16px",
          }}>
            {[
              { label: "Inicio",   href: "/" },
              { label: "Guía",     href: "/guia" },
              { label: "Explorar", href: "/explorar" },
              { label: "Impacto",  href: "/impacto" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-menu-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
