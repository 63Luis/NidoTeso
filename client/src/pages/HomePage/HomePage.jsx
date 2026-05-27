import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

/* ─── DATA ─── */
const species = [
  {
    name: "Tangara vitriolina",
    common: "Azulejo real",
    desc: "Comúnmente avistada en áreas de arbustos y jardines abiertos del campus central.",
    tag: "Frecuente",
    tagBg: "#4a7c59",
    img: "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=600&q=80",
  },
  {
    name: "Piranga rubra",
    common: "Piranga roja",
    desc: "Visitante estacional que prefiere las copas de los árboles altos cerca de la facultad de ciencias.",
    tag: "Migratoria",
    tagBg: "#0060ac",
    img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
  },
  {
    name: "Amazilia tzacatl",
    common: "Colibrí colirrufo",
    desc: "Residente permanente, fundamental para la polinización de la flora nativa del campus.",
    tag: "Endémica",
    tagBg: "#802919",
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
];

/* ─── COMPONENT ─── */
export default function LandingPage() {
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
            <p style={s.heroEyebrow}>OBSERVATORIO UNIVERSITARIO</p>
            <h1 style={s.heroTitle}>Descubre la vida alada de tu campus</h1>
            <p style={s.heroSub}>
              Una ventana abierta al monitoreo científico y la preservación de las especies que
              habitan nuestros espacios compartidos.
            </p>
            <a href="#guia" className="hero-btn" style={s.heroBtn}>Explorar Guía</a>
          </div>
        </section>

        {/* ══ PURPOSE ══ */}
        <section id="guia" style={s.pageSection}>
          <div style={s.purposeGrid} className="two-col">
            <div>
              <h2 style={s.sectionTitle}>Nuestro Propósito</h2>
              <p style={s.bodyText}>
                EcoAlas nace de la necesidad de documentar y proteger la biodiversidad urbana.
                Nuestra plataforma integra ciencia ciudadana con monitoreo profesional para crear
                un registro histórico de la avifauna en el campus.
              </p>
              <div style={s.featsGrid}>
                {[
                  { icon: "👁", t: "Observación", d: "Registro detallado de cada avistamiento." },
                  { icon: "📖", t: "Educación",   d: "Aprende sobre taxonomía y hábitats." },
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
              <img
                src="https://images.unsplash.com/photo-1504618223053-559bdef9ad5f?w=700&q=80"
                alt="Ojo de ave"
                style={s.purposeImg}
              />
              <div style={s.purposeCaption}>
                "La observación es el primer paso hacia la conservación."
              </div>
              <button style={s.fabInner} className="fab-inner">📷</button>
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
            {species.map((sp, i) => (
              <div
                key={i}
                style={{ ...s.spCard, borderRight: i < 2 ? "1px solid #e8e4dc" : "none" }}
                className="sp-card"
              >
                <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                  <img src={sp.img} alt={sp.name} style={s.spImg} className="sp-img" />
                  <span style={{ ...s.spTag, background: sp.tagBg }}>{sp.tag}</span>
                </div>
                <div style={{ padding: "16px" }}>
                  <h3 style={s.spName}>{sp.name}</h3>
                  <p style={s.spCommon}>{sp.common}</p>
                  <p style={s.spDesc}>{sp.desc}</p>
                </div>
              </div>
            ))}
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
                A través del monitoreo constante, hemos logrado identificar zonas críticas de
                nidificación y alimentación, lo que ha permitido implementar políticas de
                jardinería sostenible y protección de hábitats específicos.
              </p>
              <div style={{ marginTop: "20px", marginBottom: "28px" }}>
                {[
                  { t: "Restauración de Hábitat", d: "Más de 500 árboles nativos plantados para crear corredores biológicos." },
                  { t: "Reducción de Amenazas",   d: "Implementación de medidas para prevenir colisiones en ventanales de edificios." },
                ].map((item, i) => (
                  <div key={i} style={s.checkRow}>
                    <div style={s.checkDot}>✓</div>
                    <div>
                      <p style={s.checkTitle}>{item.t}</p>
                      <p style={s.checkDesc}>{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="report-btn" style={s.reportBtn}>Ver Informe Anual</button>
            </div>

            {/* right mosaic */}
            <div style={s.mosaic}>
              <div style={s.mosaicRow}>
                <div style={{ flex: 1, height: "160px", borderRadius: "12px", overflow: "hidden" }}>
                  <img
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?w=500&q=80"
                    alt="Mapa campus"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={s.mosaicStatBox}>
                  <p style={s.bigNum}>142</p>
                  <p style={s.bigLabel}>ESPECIES</p>
                </div>
              </div>
              <div style={s.mosaicRow}>
                <div style={{ ...s.mosaicStatBox, background: "#c1ecd4" }}>
                  <p style={s.bigNum}>85%</p>
                  <p style={{ ...s.bigLabel, color: "#3f6653" }}>ÁREA PROTEGIDA</p>
                </div>
                <div style={{ flex: 1, height: "130px", borderRadius: "12px", overflow: "hidden" }}>
                  <img
                    src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80"
                    alt="Ave colorida"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ══ FOOTER ══ */}
      <Footer />

      {/* ══ FAB ══ */}
      <button style={s.fab} className="fab" title="Registrar avistamiento">📷</button>
    </div>
  );
}

/* ─── TOKENS ─── */
const GREEN = "#1B4332";
const GREEN2 = "#3f6653";
const MUTED  = "#6B705C";
const TEXT   = "#1c1c18";

const s = {
  root: {
    fontFamily: "'Public Sans', sans-serif",
    background: "#F5F5E8", color: TEXT, minHeight: "100vh",
  },

  /* hero */
  hero: {
    position: "relative", height: "420px",
    display: "flex", alignItems: "center", justifyContent: "center",
    overflow: "hidden", textAlign: "center",
  },
  heroBg: {
    position: "absolute", inset: 0,
    backgroundImage: "url('https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=1400&q=85')",
    backgroundSize: "cover", backgroundPosition: "center 40%",
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

  /* sections */
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
  fabInner: {
    position: "absolute", bottom: "12px", right: "12px",
    width: "36px", height: "36px", borderRadius: "50%",
    background: GREEN, color: "#fff", border: "none",
    fontSize: "16px", cursor: "pointer",
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
  checkRow: { display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" },
  checkDot: {
    width: "20px", height: "20px", borderRadius: "50%",
    background: "#d1fae5", flexShrink: 0, marginTop: "1px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "11px", color: GREEN, lineHeight: "20px",
  },
  checkTitle: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "13px", fontWeight: 700, color: TEXT, marginBottom: "2px",
  },
  checkDesc: {
    fontFamily: "'Public Sans', sans-serif",
    fontSize: "12px", color: MUTED, lineHeight: 1.5,
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
  .fab-inner:hover { background: #274e3d !important; }
  .sp-card:hover .sp-img { transform: scale(1.06); }

  @media (max-width: 768px) {
    .two-col { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 600px) {
    section { padding: 36px 20px !important; }
  }
`;
