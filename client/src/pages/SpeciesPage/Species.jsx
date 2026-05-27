import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Species.css";

/* ── helper inverso: "azure-kingfisher" → "Azure Kingfisher" ── */
const fromSlug = (slug) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/* ─── BASE DE DATOS LOCAL
     Cuando conectes tu backend reemplaza esto por un fetch/useEffect con el slug ─── */
const SPECIES_DB = {
  "azure-kingfisher": {
    id: "B-2001",
    name: "Azure Kingfisher",
    scientific: "Ceyx azureus",
    status: "Least Concern",
    description:
      "A small kingfisher with vivid azure and orange plumage, found along streams and rivers. It dives steeply to catch small fish and aquatic invertebrates near the campus lake reserve.",
    size: "17 - 19 cm",
    weight: "21 - 27 g",
    diet: "Feeds primarily on small fish, aquatic insects, and crustaceans. Hunts from low perches overhanging still or slow-moving water.",
    nesting: "Excavates a burrow in an earthen bank near water, typically 30–100 cm deep, where it lays 4–7 white eggs.",
    img: "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=900&q=85",
    mapImg: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?w=800&q=80",
  },
  "emerald-hummer": {
    id: "B-2002",
    name: "Emerald Hummer",
    scientific: "Chlorostilbon lucidus",
    status: "Vulnerable",
    description:
      "A brilliant emerald-green hummingbird endemic to campus botanical areas. Its iridescent plumage and rapid wingbeats make it a prized sighting among student observers.",
    size: "8 - 9 cm",
    weight: "3.5 - 4.5 g",
    diet: "Feeds on nectar from tubular flowers, especially Salvia and Heliconia species. Supplements diet with small insects for protein.",
    nesting: "Builds a tiny cup-shaped nest of plant fibers and spider silk on a thin horizontal branch, 1–3 meters above ground.",
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=85",
    mapImg: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?w=800&q=80",
  },
  "crested-eagle": {
    id: "B-2003",
    name: "Crested Eagle",
    scientific: "Morphnus guianensis",
    status: "Critical",
    description:
      "One of the largest raptors in the Americas, distinguished by its long crest and powerful build. Critically observed near the Faculty of Science forest edge.",
    size: "76 - 89 cm",
    weight: "900 - 1200 g",
    diet: "Preys on medium-sized mammals, large lizards, and snakes. An ambush predator that hunts within dense forest canopy.",
    nesting: "Builds large stick nests high in emergent trees, reusing the same nest for several years.",
    img: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=900&q=85",
    mapImg: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?w=800&q=80",
  },
  "yellow-warbler": {
    id: "B-2004",
    name: "Yellow Warbler",
    scientific: "Setophaga petechia",
    status: "Least Concern",
    description:
      "A bright yellow songbird common in open shrubby habitats around the campus central park. Its cheerful song is one of the first signs of spring migration.",
    size: "11 - 13 cm",
    weight: "9 - 11 g",
    diet: "Insectivore. Gleans caterpillars, beetles, and other arthropods from foliage. Occasionally eats berries.",
    nesting: "Builds a neat cup nest of plant fibers in a shrub or small tree, 0.5–3 meters from the ground.",
    img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=900&q=85",
    mapImg: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?w=800&q=80",
  },
  "scarlet-macaw": {
    id: "B-2005",
    name: "Scarlet Macaw",
    scientific: "Ara macao",
    status: "Vulnerable",
    description:
      "A large, colorful macaw with scarlet, yellow, and blue plumage. A campus resident frequently spotted in the Central Park palms, it is a symbol of the university's conservation efforts.",
    size: "81 - 96 cm",
    weight: "900 - 1100 g",
    diet: "Feeds on seeds, nuts, fruits, and occasional insects. Uses its powerful beak to crack hard palm nuts.",
    nesting: "Nests in tree cavities, often competing with other species for suitable holes in mature trees.",
    img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=900&q=85",
    mapImg: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?w=800&q=80",
  },
  "grey-heron": {
    id: "B-2006",
    name: "Grey Heron",
    scientific: "Ardea cinerea",
    status: "Least Concern",
    description:
      "A tall wading bird with grey plumage and a white head. Frequently seen standing motionless at the lake reserve edge, waiting to strike at passing fish.",
    size: "84 - 102 cm",
    weight: "1500 - 2000 g",
    diet: "Carnivore. Eats fish, frogs, small mammals, and large insects. A patient stand-and-wait predator.",
    nesting: "Colonial nester. Builds large stick platforms (heronries) high in trees, often reused across seasons.",
    img: "https://images.unsplash.com/photo-1591608516485-a1a53df39498?w=900&q=85",
    mapImg: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?w=800&q=80",
  },
  /* Fallback genérico para cualquier slug desconocido */
  default: {
    id: "B-0000",
    name: "Azure-crowned Hummingbird",
    scientific: "Saucerottia cyanocephala",
    status: "Least Concern",
    description:
      "A medium-sized hummingbird recognized by its brilliant cerulean crown and snowy white throat. Primarily found in pine-oak forests and humid evergreen woodlands of Central America.",
    size: "10 - 11 cm",
    weight: "5.2 - 5.8 g",
    diet: "Feeds on nectar from various tubular flowers like Salvia and Inga. Also hunts small insects and spiders.",
    nesting:
      "Creates a delicate cup-shaped nest using plant fibers, moss, and spiderwebs, placed 2–6 meters above ground.",
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=85",
    mapImg: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c8bf?w=800&q=80",
  },
};

const ETHICS = [
  {
    icon: "🚫",
    title: "Keep Your Distance",
    desc: "Maintain at least 10 meters distance from active nests to avoid stressing the parent birds.",
  },
  {
    icon: "🔇",
    title: "Avoid Playbacks",
    desc: "Do not use recorded bird calls to lure the species; it disrupts their natural territory marking.",
  },
  {
    icon: "🧴",
    title: "Feeder Maintenance",
    desc: "If using nectar feeders, clean them every 2-3 days with hot water to prevent fungal growth.",
  },
];

/* ─── COMPONENT ─── */
export default function Species() {
  const { nombreDelAve } = useParams();          // lee el slug de la URL
  const navigate         = useNavigate();
  const [playing, setPlaying] = useState(false);

  /* Busca en la DB local; si no existe usa el fallback */
  const SPECIES = SPECIES_DB[nombreDelAve] ?? SPECIES_DB["default"];

  return (
    <div className="detail-root">

      <main className="detail-main">

        {/* ════ HERO ════ */}
        <section className="detail-hero">

          {/* Image column */}
          <div className="detail-img-col">
            <div className="detail-img-wrap">
              <img src={SPECIES.img} alt={SPECIES.name} className="detail-img" />
            </div>

            {/* Audio player */}
            <div className="detail-audio">
              <div className="detail-audio-inner">
                <button
                  className="detail-audio-play"
                  onClick={() => setPlaying(!playing)}
                  title={playing ? "Pause" : "Play vocalizations"}
                >
                  {playing ? "⏸" : "▶"}
                </button>
                <div className="detail-audio-info">
                  <p className="detail-audio-label">Vocalizations</p>
                  <div className="detail-audio-bar-wrap">
                    <div
                      className="detail-audio-bar-fill"
                      style={{ width: playing ? "33%" : "0%", transition: "width 0.3s" }}
                    />
                  </div>
                  <div className="detail-audio-times">
                    <span className="detail-audio-time">0:12</span>
                    <span className="detail-audio-time">0:45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info column */}
          <div className="detail-info-col">
            <div className="detail-badges">
              <span className="detail-status-badge">{SPECIES.status}</span>
              <span className="detail-id">ID: #{SPECIES.id}</span>
            </div>

            <h1 className="detail-bird-name">{SPECIES.name}</h1>
            <p className="detail-scientific">{SPECIES.scientific}</p>
            <p className="detail-description">{SPECIES.description}</p>

            <div className="detail-stats-bento">
              <div className="detail-stat-box">
                <span className="detail-stat-icon">📏</span>
                <p className="detail-stat-label">Size</p>
                <p className="detail-stat-value">{SPECIES.size}</p>
              </div>
              <div className="detail-stat-box">
                <span className="detail-stat-icon">⚖️</span>
                <p className="detail-stat-label">Weight</p>
                <p className="detail-stat-value">{SPECIES.weight}</p>
              </div>
            </div>

            <button className="detail-log-btn">➕ Log New Sighting</button>
          </div>

        </section>

        {/* ════ SECONDARY ════ */}
        <section className="detail-secondary">

          {/* Left: Habits + Map */}
          <div className="detail-habits-col">
            <h2 className="detail-section-title">Habits &amp; Ecology</h2>

            <div className="detail-habits-grid">
              <div>
                <p className="detail-habit-label">Dietary Preferences</p>
                <p className="detail-habit-text">{SPECIES.diet}</p>
              </div>
              <div>
                <p className="detail-habit-label">Nesting Habits</p>
                <p className="detail-habit-text">{SPECIES.nesting}</p>
              </div>
            </div>

            {/* Map */}
            <div className="detail-map-box">
              <div className="detail-map-header">
                <h3 className="detail-map-title">Regional Distribution</h3>
                <span className="detail-map-icon">🗺️</span>
              </div>
              <div className="detail-map-img-wrap">
                <img src={SPECIES.mapImg} alt="Mapa de distribución" className="detail-map-img" />
                <div className="detail-map-overlay">
                  <span className="detail-map-chip">High Presence Area</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Field Ethics */}
          <div className="detail-ethics-col">
            <div className="detail-ethics-box">
              <div className="detail-ethics-header">
                <span className="detail-ethics-icon">🌿</span>
                <h3 className="detail-ethics-title">Field Ethics</h3>
              </div>

              <ul className="detail-ethics-list">
                {ETHICS.map((item, i) => (
                  <li key={i} className="detail-ethics-item">
                    <span className="detail-ethics-item-icon">{item.icon}</span>
                    <div>
                      <p className="detail-ethics-item-title">{item.title}</p>
                      <p className="detail-ethics-item-desc">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="detail-ethics-footer">
                <p className="detail-ethics-support-label">Support Conservation</p>
                <a
                  href="https://www.audubon.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-ethics-link"
                >
                  Join the Local Audobon Chapter ↗
                </a>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Back button */}
      <button
        onClick={() => navigate("/explorar")}
        style={{
          position: "fixed", top: "64px", left: "20px",
          background: "rgba(252,249,242,0.9)", backdropFilter: "blur(8px)",
          border: "1px solid #e0dcd0", borderRadius: "999px",
          padding: "8px 16px", fontFamily: "'Public Sans', sans-serif",
          fontSize: "13px", fontWeight: 600, color: "#1B4332",
          cursor: "pointer", zIndex: 90,
          display: "flex", alignItems: "center", gap: "6px",
        }}
      >
        ← Back
      </button>

      {/* FAB */}
      <button className="detail-fab" title="Registrar avistamiento">📷</button>

    </div>
  );
}