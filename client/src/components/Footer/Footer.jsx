const GREEN  = "#1B4332";
const GREEN2 = "#3f6653";
const MUTED  = "#6B705C";
const BG     = "#F5F5E8";

const footerLinks = {
  Plataforma: ["Explorar Especies", "Registrar Avistamiento", "Guía de Campo", "Mapa del Campus"],
  Comunidad:  ["Acerca de", "Blog Científico", "Voluntarios", "Contacto"],
  Legal:      ["Términos de Uso", "Privacidad", "Licencias de Datos"],
};

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&family=Public+Sans:wght@400;600;700&display=swap');

        .footer-link {
          font-family: 'Public Sans', sans-serif;
          font-size: 13px;
          color: ${MUTED};
          text-decoration: none;
          line-height: 1;
          transition: color 0.2s;
          display: block;
        }
        .footer-link:hover { color: ${GREEN}; }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr repeat(3, 1fr);
          gap: 40px;
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
        }

        .stats-bar-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          text-align: center;
        }
        @media (max-width: 640px) {
          .stats-bar-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <footer style={{ background: "#fff", borderTop: "1px solid #e0dcd0" }}>

        {/* ── Stats strip ── */}
        <div style={{ borderBottom: "1px solid #ede9e0", padding: "28px 40px", maxWidth: "1100px", margin: "0 auto" }}>
          <div className="stats-bar-grid">
            {/* NEST_ cell */}
            <div style={s.statCell}>
              <p style={s.nestBrand}>NEST_🌿</p>
              <p style={s.statNum}>142</p>
              <p style={s.statLabel}>ESPECIES</p>
            </div>
            {[
              { icon: "👥", num: "2.4k", label: "REPORTES" },
              { icon: "📅", num: "18",   label: "HOY" },
              { icon: "🌿", num: "24",   label: "HECTÁREAS" },
            ].map((st, i) => (
              <div key={i} style={{ ...s.statCell, borderLeft: "1px solid #e0dcd0" }}>
                <span style={{ fontSize: "22px", marginBottom: "6px", display: "block" }}>{st.icon}</span>
                <p style={s.statNum}>{st.num}</p>
                <p style={s.statLabel}>{st.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main footer body ── */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px 32px" }}>
          <div className="footer-grid">

            {/* Brand column */}
            <div className="footer-brand">
              <p style={{
                fontFamily: "'Newsreader', serif",
                fontSize: "22px", fontWeight: 700, color: GREEN,
                marginBottom: "12px",
              }}>
                EcoAlas
              </p>
              <p style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: "13px", color: MUTED, lineHeight: 1.7,
                maxWidth: "260px", marginBottom: "24px",
              }}>
                Plataforma comunitaria para el monitoreo y conservación de la
                biodiversidad en campus universitarios.
              </p>
              {/* Social icons */}
              <div style={{ display: "flex", gap: "12px" }}>
                {["🐦", "📷", "🌐"].map((icon, i) => (
                  <a key={i} href="#" style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: BG, border: "1px solid #e0dcd0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", textDecoration: "none",
                    transition: "background 0.2s",
                  }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p style={{
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.1em", color: GREEN2,
                  textTransform: "uppercase", marginBottom: "16px",
                }}>
                  {section}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {links.map((link) => (
                    <a key={link} href="#" className="footer-link">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div style={{
            borderTop: "1px solid #e8e4dc",
            marginTop: "40px", paddingTop: "20px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
          }}>
            <p style={{
              fontFamily: "'Public Sans', sans-serif",
              fontSize: "12px", color: MUTED,
            }}>
              © {new Date().getFullYear()} EcoAlas — Todos los derechos reservados.
            </p>
            <p style={{
              fontFamily: "'Newsreader', serif", fontStyle: "italic",
              fontSize: "12px", color: MUTED,
            }}>
              Hecho con 🌿 para la biodiversidad universitaria
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

const s = {
  statCell: {
    display: "flex", flexDirection: "column",
    alignItems: "center", padding: "0 16px",
  },
  nestBrand: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "15px", fontWeight: 700, color: GREEN,
    letterSpacing: "0.02em", marginBottom: "8px",
  },
  statNum: {
    fontFamily: "'Newsreader', serif",
    fontSize: "26px", fontWeight: 600, color: GREEN, lineHeight: 1,
  },
  statLabel: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
    color: MUTED, marginTop: "4px",
  },
};