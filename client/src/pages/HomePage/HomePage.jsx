import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import birdService from "../../services/bird.service";

/* ─── COMPONENT ─── */
export default function LandingPage() {
  const navigate = useNavigate();
  const [featuredSpecies, setFeaturedSpecies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Nombres de las aves destacadas
  const featuredNames = ["Cotorra monje", "Halcón de Harris", "Zanate colilargo"];

  useEffect(() => {
    loadFeaturedSpecies();
  }, []);

  const loadFeaturedSpecies = async () => {
    try {
      setLoading(true);
      const response = await birdService.getAllBirds();
      const allBirds = response.data;

      // Filtrar las 3 aves destacadas
      const filtered = allBirds.filter(bird =>
          featuredNames.includes(bird.commonName)
      );

      setFeaturedSpecies(filtered);
    } catch (error) {
      console.error("Error loading featured species:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener el color de la etiqueta según la especie
  const getTagColor = (speciesName) => {
    switch(speciesName) {
      case "Cotorra monje": return "";
      case "Halcón de Harris": return "";
      case "Zanate colilargo": return "";
      default: return "#1B4332";
    }
  };

  // Función para obtener la etiqueta según la especie
  const getTagLabel = (speciesName) => {
    switch(speciesName) {
      case "Cotorra monje": return "";
      case "Halcón de Harris": return "";
      case "Zanate colilargo": return "";
      default: return "Especie";
    }
  };

  return (
      <div style={s.root}>
        <style>{css}</style>

        {/* ══ NAVBAR ══ */}
        <Navbar />

        <main style={{ paddingTop: "52px" }}>

          {/* ══ HERO ══ */}
          <section id="inicio" style={s.hero}>
            <div style={s.heroBg} />
            <div style={s.heroOverlay} />
            <div style={s.heroContent}>
              <p style={s.heroEyebrow}></p>
              <h1 style={s.heroTitle}>Descubre la vida del TESOEM</h1>
              <p style={s.heroSub}>
                Una ventana abierta al monitoreo científico y la preservación de las especies que
                habitan nuestra universidad.
              </p>
              <a href="#guia" className="hero-btn" style={s.heroBtn}>Ver Guía</a>
            </div>
          </section>

          {/* ══ PURPOSE ══ */}
          <section id="guia" style={s.pageSection}>
            <div style={s.purposeGrid} className="two-col">
              <div>
                <h2 style={s.sectionTitle}>Nuestro Propósito</h2>
                <p style={s.bodyText}>
                  NidoTeso nace de la necesidad de documentar y proteger la biodiversidad dentro de nuestro campus.
                  Nuestra plataforma integra la participación de la comunidad estudiantil con herramientas digitales
                  interactivas para crear un registro histórico, visual y auditivo de la avifauna en el TESOEM,
                  fomentando así la conciencia ambiental, el aprendizaje práctico y la conservación de las especies locales.
                </p>
                <div style={s.featsGrid}>
                  {[
                    { icon: "👁", t: "Observación", d: "Registro detallado de cada avistamiento." },
                    { icon: "📖", t: "Educación",   d: "Aprende sobre las aves de tu escuela: Taxonomía y datos curiosos." },
                  ].map((f, i) => (
                      <div key={i} style={s.feat}>
                        <span style={{ fontSize: "22px" }}>{f.icon}</span>
                        <div>
                          <p style={s.featTitle}>{f.t}</p>
                          <p style={s.featDesc}>{f.d}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              <div style={s.purposeImgWrap}>
                <img src="/ojo.png" alt="Ojo de ave" style={s.purposeImg} />
                <div style={s.purposeCaption}>
                  "La observación es el primer paso hacia la conservación."
                </div>
              </div>
            </div>
          </section>

          {/* ══ SPECIES ══ */}
          <section id="explorar" style={s.pageSection}>
            <div style={s.speciesHeader}>
              <div>
                <p style={s.eyebrow}>BIODIVERSIDAD LOCAL</p>
                <h2 style={s.sectionTitle}>Explorador de Especies</h2>
              </div>
              <a href="/explorar" className="catalog-btn" style={s.catalogBtn}>
                Ver Catálogo Completo
              </a>
            </div>

            <div style={s.speciesGrid}>
              {loading ? (
                  <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>
                    <div style={s.loadingSpinner}></div>
                    <p>Cargando especies...</p>
                  </div>
              ) : (
                  featuredSpecies.map((bird, i) => (
                      <div
                          key={bird._id}
                          style={{ ...s.spCard, borderRight: i < 2 ? "1px solid #e8e4dc" : "none" }}
                          className="sp-card"
                          onClick={() => navigate(`/species/${bird.commonName.toLowerCase().replace(/\s+/g, '-')}/detalles`, { state: { bird } })}
                      >
                        <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                          <img
                              src={bird.imageUrl}
                              alt={bird.commonName}
                              style={s.spImg}
                              className="sp-img"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
                              }}
                          />
                          <span style={{ ...s.spTag, background: getTagColor(bird.commonName) }}>
                      {getTagLabel(bird.commonName)}
                    </span>
                        </div>
                        <div style={{ padding: "16px" }}>
                          <h3 style={s.spName}>{bird.scientificName}</h3>
                          <p style={s.spCommon}>{bird.commonName}</p>
                          <p style={s.spDesc}>
                            {bird.description?.general?.[0] || "Especie fascinante del TESOEM."}
                          </p>
                        </div>
                      </div>
                  ))
              )}
            </div>
          </section>

          {/* ══ IMPACT ══ */}
          <section id="impacto" style={s.pageSection}>
            <div style={s.impactGrid} className="two-col">

              {/* left */}
              <div>
                <p style={s.eyebrow}>CENTRO DE CONSERVACIÓN</p>
                <h2 style={s.sectionTitle}>Nuestro Impacto en el Ecosistema</h2>
                <p style={s.bodyText}>
                  NidoTeso actúa como un puente entre la comunidad universitaria y el entorno natural que la rodea.
                  Facilitamos el conocimiento de la avifauna local, permitiendo promover la protección de sus hábitats
                  y fomentando el sentido de pertenencia con el ecosistema del cual es parte la universidad.
                </p>
                <button
                    className="report-btn"
                    style={s.reportBtn}
                    onClick={() => navigate("/explorar")}
                >
                  Explorar
                </button>
              </div>

              {/* right mosaic */}
              <div style={s.mosaic}>
                <div style={s.mosaicRow}>

                  {/* Mapa + botón */}
                  <div style={{ flex: 1, height: "220px", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.6057495451105!2d-98.95662402491672!3d19.342906781917407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce1d8826f677d5%3A0x32ada1eb4225d05e!2sTecnol%C3%B3gico%20de%20Estudios%20Superiores%20Oriente%20del%20Estado%20de%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v1779949877777!5m2!1ses-419!2smx"
                        width="100%"
                        height="100%"
                        style={{ border: 0, display: "block" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa TESOEM"
                    />
                    <a
                        href="https://valmejia.github.io/folleto/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          position: "absolute", bottom: "10px", left: "50%",
                          transform: "translateX(-50%)",
                          background: "#1B4332", color: "#fff",
                          borderRadius: "999px", padding: "8px 20px",
                          fontFamily: "'Public Sans', sans-serif",
                          fontSize: "11px", fontWeight: 700,
                          whiteSpace: "nowrap", textDecoration: "none",
                        }}
                    >
                      Ver Mapa Campus →
                    </a>
                  </div>

                  <div style={s.mosaicStatBox}>
                    <p style={s.bigNum}>28</p>
                    <p style={s.bigLabel}>ESPECIES</p>
                  </div>
                </div>

              </div>

            </div>
          </section>

        </main>

        <Footer />

        <button style={s.fab} className="fab" title="Registrar avistamiento">📷</button>
      </div>
  );
}

/* ─── TOKENS ─── */
const GREEN  = "#1B4332";
const GREEN2 = "#3f6653";
const MUTED  = "#6B705C";
const TEXT   = "#1c1c18";

const s = {
  root: {
    fontFamily: "'Public Sans', sans-serif",
    background: "#F5F5E8", color: TEXT, minHeight: "100vh",
  },
  hero: {
    position: "relative", height: "420px",
    display: "flex", alignItems: "center", justifyContent: "center",
    overflow: "hidden", textAlign: "center",
  },
  heroBg: {
    position: "absolute", inset: 0,
    backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=85')",
    backgroundSize: "cover", backgroundPosition: "center",
    filter: "brightness(0.72) saturate(0.85)",
  },
  heroOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to bottom, rgba(245,245,220,0.1) 0%, rgba(245,245,220,0.5) 100%)",
  },
  heroContent: {
    position: "relative", zIndex: 2,
    maxWidth: "560px", padding: "0 24px",
  },
  heroEyebrow: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.85)", marginBottom: "12px",
  },
  heroTitle: {
    fontFamily: "'Newsreader', serif",
    fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 600,
    color: "#fff", lineHeight: 1.2, marginBottom: "14px",
    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  heroSub: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "13.5px", color: "rgba(255,255,255,0.86)",
    lineHeight: 1.65, marginBottom: "28px",
    textShadow: "0 1px 4px rgba(0,0,0,0.25)",
  },
  heroBtn: {
    display: "inline-block", background: GREEN, color: "#fff",
    textDecoration: "none", borderRadius: "999px",
    padding: "11px 28px",
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "13px", fontWeight: 600,
  },
  pageSection: {
    background: "#fff", padding: "52px 40px",
    maxWidth: "1100px", margin: "0 auto",
    borderTop: "1px solid #ede9e0",
  },
  purposeGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "48px", alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "'Newsreader', serif",
    fontSize: "26px", fontWeight: 500, color: GREEN, marginBottom: "14px",
  },
  eyebrow: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
    color: GREEN2, marginBottom: "6px",
  },
  bodyText: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "13.5px", color: MUTED, lineHeight: 1.75, marginBottom: "24px",
  },
  featsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  feat: { display: "flex", alignItems: "flex-start", gap: "10px" },
  featTitle: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "13px", fontWeight: 700, color: TEXT, marginBottom: "3px",
  },
  featDesc: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "12px", color: MUTED, lineHeight: 1.5,
  },
  purposeImgWrap: {
    position: "relative", borderRadius: "16px", overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  purposeImg: { width: "100%", height: "260px", objectFit: "cover", display: "block" },
  purposeCaption: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    background: "rgba(27,67,50,0.8)", color: "rgba(255,255,255,0.9)",
    fontFamily: "'Newsreader', serif", fontStyle: "italic", fontSize: "12px",
    padding: "10px 16px",
  },
  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #e0dcd0",
    borderTopColor: GREEN,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 12px auto",
  },

  /* species */
  speciesHeader: {
    display: "flex", alignItems: "flex-end",
    justifyContent: "space-between", marginBottom: "24px",
  },
  catalogBtn: {
    display: "inline-block", border: "1px solid #c8c4bc",
    borderRadius: "8px", padding: "7px 16px",
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "12px", fontWeight: 600, color: TEXT,
    textDecoration: "none", background: "#fff", whiteSpace: "nowrap",
  },
  speciesGrid: {
    display: "grid", gridTemplateColumns: "repeat(3,1fr)",
    border: "1px solid #e8e4dc", borderRadius: "12px",
    overflow: "hidden", background: "#fff",
  },
  spCard: { background: "#fff", cursor: "pointer" },
  spImg:  { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", display: "block" },
  spTag:  {
    position: "absolute", top: "10px", right: "10px",
    color: "#fff", borderRadius: "999px", padding: "2px 9px",
    fontSize: "10px", fontWeight: 700, fontFamily: "'Public Sans', sans-serif",
  },
  spName: {
    fontFamily: "'Newsreader', serif",
    fontSize: "15px", fontWeight: 500, color: GREEN, marginBottom: "2px",
  },
  spCommon: {
    fontFamily: "'Newsreader', serif",
    fontStyle: "italic", fontSize: "12px", color: MUTED, marginBottom: "8px",
  },
  spDesc: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "11.5px", color: MUTED, lineHeight: 1.6,
  },

  /* impact */
  impactGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "52px", alignItems: "start",
  },
  reportBtn: {
    background: GREEN, color: "#fff", border: "none",
    borderRadius: "999px", padding: "11px 26px",
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "13px", fontWeight: 600, cursor: "pointer",
  },
  mosaic: { display: "flex", flexDirection: "column", gap: "12px" },
  mosaicRow: { display: "flex", gap: "12px", alignItems: "stretch" },
  mosaicStatBox: {
    width: "110px", flexShrink: 0,
    background: "#f0ede6", borderRadius: "12px",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "16px 8px",
  },
  bigNum: {
    fontFamily: "'Newsreader', serif",
    fontSize: "30px", fontWeight: 600, color: GREEN, lineHeight: 1,
  },
  bigLabel: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
    color: MUTED, marginTop: "4px", textAlign: "center",
  },

  /* fab */
  fab: {
    position: "fixed", bottom: "28px", right: "28px",
    width: "52px", height: "52px",
    background: GREEN, color: "#fff", border: "none",
    borderRadius: "50%", fontSize: "22px", cursor: "pointer",
    boxShadow: "0 4px 16px rgba(27,67,50,0.35)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 99,
  },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&family=Public+Sans:wght@400;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  a { text-decoration: none; }

  .hero-btn:hover   { background: #274e3d !important; }
  .catalog-btn:hover { background: #f5f5e8 !important; }
  .report-btn:hover  { background: #274e3d !important; }
  .fab:hover     { transform: scale(1.08); box-shadow: 0 6px 22px rgba(27,67,50,0.4) !important; }
  .sp-card:hover .sp-img { transform: scale(1.06); }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .two-col { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 600px) {
    section { padding: 36px 20px !important; }
  }
`;