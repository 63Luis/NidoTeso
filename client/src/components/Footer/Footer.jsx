import { Link } from "react-router-dom";

const GREEN  = "#1B4332";
const GREEN2 = "#3f6653";
const MUTED  = "#6B705C";

const footerLinks = {
  Plataforma: [
    { label: "Explorar Especies",           to: "/explorar" },
    { label: "Mapa del Campus interactivo", to: "https://valmejia.github.io/folleto/" },
  ],
  Comunidad: [
    { label: "Acerca de",              to: "/acercaDe" },
    { label: "Centro de Conservación", to: "/conservacion" },
    { label: "Contacto",               to: "/" },
  ],
  Legal: [
    { label: "Términos de Uso",    to: "/" },
    { label: "Privacidad",         to: "/" },
    { label: "Licencias de Datos", to: "/" },
  ],
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
      `}</style>

      <footer style={{ background: "#fff", borderTop: "1px solid #e0dcd0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 40px 32px" }}>
          <div className="footer-grid">

            {/* Brand column */}
            <div className="footer-brand" style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "'Newsreader', serif",
                fontSize: "22px", fontWeight: 700, color: GREEN,
                marginBottom: "12px",
              }}>
                NidoTeso
              </p>
              <p style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: "13px", color: MUTED, lineHeight: 1.7,
                maxWidth: "260px", marginBottom: "24px",
              }}>
                Plataforma comunitaria para el monitoreo y conservación de la
                biodiversidad en campus universitarios.
              </p>
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
                  {links.map((link) => {
                    if (link.to.startsWith("http")) {
                      return (
                        <a
                          key={link.label}
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="footer-link"
                        >
                          {link.label}
                        </a>
                      );
                    }
                    return (
                      <Link key={link.label} to={link.to} className="footer-link">
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
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
              © {new Date().getFullYear()} NidoTeso — Todos los derechos reservados.
            </p>
            <p style={{
              fontFamily: "'Newsreader', serif", fontStyle: "italic",
              fontSize: "12px", color: MUTED,
            }}>
              Hecho con amor para la biodiversidad universitaria
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}