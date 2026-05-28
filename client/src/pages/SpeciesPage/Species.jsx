import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Species.css";
import birdService from "../../services/bird.service";

/* ── helper inverso: "azure-kingfisher" → "Azure Kingfisher" ── */
const fromSlug = (slug) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/* ─── VALORES POR DEFECTO ─── */
const DEFAULT_SPECIES = {
  id: "B-0000",
  name: "Especie no encontrada",
  scientific: "Species not found",
  status: "No evaluado",
  conservationStatusIUCN: { category: "NE", description: "No Evaluada" },
  descriptionGeneral: [],
  imageUrl: "https://via.placeholder.com/900x600?text=No+Image",
  distributionMexico: "México",
  behavior: [],
  curiousFacts: [],
  diet: "No disponible",
  nesting: "No disponible",
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
  const { nombreDelAve } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const [species, setSpecies] = useState(DEFAULT_SPECIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpecies = async () => {
      if (location.state?.bird) {
        const bird = location.state.bird;
        setSpecies({
          id: bird._id?.slice(-6) || "B-0000",
          name: bird.commonName || "Sin nombre",
          scientific: bird.scientificName || "Sin nombre científico",
          status: bird.conservationStatusIUCN?.description || "No evaluado",
          conservationStatusIUCN: bird.conservationStatusIUCN,
          conservationStatusNOM059: bird.conservationStatusNOM059,
          descriptionGeneral: bird.description?.general || [],
          imageUrl: bird.imageUrl || DEFAULT_SPECIES.imageUrl,
          distributionMexico: bird.distributionMexico || "México",
          behavior: bird.behavior || [],
          curiousFacts: bird.curiousFacts || [],
          audioUrl: bird.audioUrl,
          diet: bird.diet || "No disponible",
          nesting: getNestingFromBehavior(bird.behavior),
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const searchTerm = fromSlug(nombreDelAve);
        const response = await birdService.searchBirds(searchTerm);
        
        if (response.data && response.data.length > 0) {
          const bird = response.data[0];
          setSpecies({
            id: bird._id?.slice(-6) || "B-0000",
            name: bird.commonName || "Sin nombre",
            scientific: bird.scientificName || "Sin nombre científico",
            status: bird.conservationStatusIUCN?.description || "No evaluado",
            conservationStatusIUCN: bird.conservationStatusIUCN,
            conservationStatusNOM059: bird.conservationStatusNOM059,
            descriptionGeneral: bird.description?.general || [],
            imageUrl: bird.imageUrl || DEFAULT_SPECIES.imageUrl,
            distributionMexico: bird.distributionMexico || "México",
            behavior: bird.behavior || [],
            curiousFacts: bird.curiousFacts || [],
            audioUrl: bird.audioUrl,
            diet: bird.diet || "No disponible",
            nesting: getNestingFromBehavior(bird.behavior),
          });
        } else {
          setSpecies(DEFAULT_SPECIES);
        }
      } catch (error) {
        console.error("Error loading species:", error);
        setSpecies(DEFAULT_SPECIES);
      } finally {
        setLoading(false);
      }
    };

    loadSpecies();
  }, [nombreDelAve, location.state]);

  const getNestingFromBehavior = (behavior) => {
    if (behavior && behavior.length > 0) {
      const nestingBehavior = behavior.find(b => 
        b.toLowerCase().includes("nest") || 
        b.toLowerCase().includes("anida") ||
        b.toLowerCase().includes("nido") ||
        b.toLowerCase().includes("anidación")
      );
      if (nestingBehavior) return nestingBehavior;
    }
    return "Construye nidos en árboles y arbustos.";
  };

  const getStatusClass = (status) => {
    if (!status) return "outline";
    const statusLower = status.toLowerCase();
    if (statusLower.includes("crítico") || statusLower.includes("critical")) return "red";
    if (statusLower.includes("vulnerable") || statusLower.includes("amenazada")) return "blue";
    return "green";
  };

  if (loading) {
    return (
      <div className="detail-root">
        <main className="detail-main">
          <div className="detail-loading">
            <div className="detail-loading-spinner"></div>
            <p>Cargando información...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="detail-root">
      <main className="detail-main">
        {/* ════ HERO ════ */}
        <section className="detail-hero">
          {/* Image column */}
          <div className="detail-img-col">
            <div className="detail-img-wrap">
              <img 
                src={species.imageUrl} 
                alt={species.name} 
                className="detail-img"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/900x600?text=No+Image";
                }}
              />
            </div>

            {/* Audio player - solo si hay audioUrl */}
            {species.audioUrl && (
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
                      <span className="detail-audio-time">0:00</span>
                      <span className="detail-audio-time">0:30</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info column */}
          <div className="detail-info-col">
            <h1 className="detail-bird-name">{species.name}</h1>
            <p className="detail-scientific">{species.scientific}</p>
            
            {/* Mostrar TODOS los puntos de description general */}
            {species.descriptionGeneral && species.descriptionGeneral.length > 0 && (
              <div className="detail-description-list">
                {species.descriptionGeneral.map((text, index) => (
                  <p key={index} className="detail-description-item">
                    {text}
                  </p>
                ))}
              </div>
            )}

            {/* Badge de estado de conservación */}
            <div className="detail-conservation-badge">
              <span className={`detail-status-badge-large ${getStatusClass(species.status)}`}>
                {species.status}
              </span>
            </div>
          </div>
        </section>

        {/* ════ SECONDARY ════ */}
        <section className="detail-secondary">
          {/* Left: Habits + Map */}
          <div className="detail-habits-col">
            <h2 className="detail-section-title">Acerca de:</h2>

            {/* Sección de Dieta */}
            <div className="detail-info-block">
              <p className="detail-info-label">🥗 Dieta</p>
              <p className="detail-info-text">{species.diet}</p>
            </div>

            {/* Sección de Comportamiento - COMO PÁRRAFO */}
              {species.behavior && species.behavior.length > 0 && (
                <div className="detail-info-block">
                  <p className="detail-info-label">🦜 Comportamiento</p>
                  <p className="detail-info-text">
                    {species.behavior.join(" ")}
                  </p>
                </div>
             )}

            {/* Sección de Anidación */}
            <div className="detail-info-block">
              <p className="detail-info-label">🏡 Anidación</p>
              <p className="detail-info-text">{species.nesting}</p>
            </div>

            {/* Datos curiosos */}
            {species.curiousFacts && species.curiousFacts.length > 0 && (
              <div className="detail-curious-box">
                <h3 className="detail-curious-title">💡Datos curiosos:</h3>
                <ul className="detail-curious-list">
                  {species.curiousFacts.map((fact, index) => (
                    <li key={index} className="detail-curious-item">
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Field Ethics */}
          <div className="detail-ethics-col">
            <div className="detail-ethics-box">
              <div className="detail-ethics-header">
                <span className="detail-ethics-icon">🌿</span>
                <h3 className="detail-ethics-title">Recomendaciones</h3>
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
                <p className="detail-ethics-support-label">Apoya la conservación</p>
                <a
                  href="https://www.audubon.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-ethics-link"
                >
                  Conoce más ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Back button */}
      <button className="detail-back-btn" onClick={() => navigate("/explorar")}>
        ← Regresar
      </button>

      {/* FAB */}
      <button className="detail-fab" title="Registrar avistamiento">📷</button>
    </div>
  );
}