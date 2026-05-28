import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploraPage.css";
import birdService from "../../services/bird.service";

/* ── helper: "Azure Kingfisher" → "azure-kingfisher" ── */
const toSlug = (name) =>
  name?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "";

export default function ExploraPage() {
  const navigate = useNavigate();

  const [birds, setBirds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Cargar aves desde el backend
  useEffect(() => {
    loadBirds();
  }, []);

  const loadBirds = async () => {
    try {
      setLoading(true);
      const response = await birdService.getAllBirds();
      setBirds(response.data);
      setError(null);
    } catch (err) {
      console.error("Error loading birds:", err);
      setError("No se pudieron cargar las aves. Por favor, intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Filtrar aves basado en búsqueda
  const filteredBirds = birds.filter((bird) =>
    bird.commonName?.toLowerCase().includes(search.toLowerCase()) ||
    bird.scientificName?.toLowerCase().includes(search.toLowerCase())
  );

  // Mapear estado de conservación a estilo visual
  const getStatusStyle = (conservationStatus) => {
    if (!conservationStatus?.category) return "outline";
    
    const category = conservationStatus.category;
    if (category === "CR") return "red";
    if (category === "EN" || category === "VU") return "blue";
    return "outline";
  };

  // Obtener texto del estado de conservación
  const getStatusText = (conservationStatus) => {
    if (!conservationStatus?.description) return "NO EVALUADO";
    return conservationStatus.description.toUpperCase();
  };

  // Obtener la primera descripción general
  const getGeneralDescription = (description) => {
    if (description?.general && description.general.length > 0) {
      const text = description.general[0];
      return text.length > 100 ? text.substring(0, 100) + "..." : text;
    }
    return null;
  };

  // Renderizado condicional
  if (loading) {
    return (
      <div className="explore-root">
        <main className="explore-main">
          <div className="explore-loading">
            <div className="explore-loading-spinner"></div>
            <p>Cargando aves...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="explore-root">
        <main className="explore-main">
          <div className="explore-error">
            <p className="explore-error-icon">⚠️</p>
            <p className="explore-error-text">{error}</p>
            <button onClick={loadBirds} className="explore-retry-btn">
              Reintentar
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="explore-root">
      <main className="explore-main">
        {/* ── Page header ── */}
        <div className="explore-page-header">
          <h1 className="explore-title">Aves del TESOEM</h1>
          <p className="explore-subtitle">
            Explora, identifica y protege las aves de nuestro campus. Un proyecto para conocer y valorar la biodiversidad del TESOEM.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="explore-search-wrap">
          <span className="explore-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar por nombre común o nombre científico..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="explore-search-input"
          />
        </div>

        {/* ── Species grid ── */}
        <div className="explore-grid">
          {filteredBirds.map((bird) => (
            <div key={bird._id} className="explore-card">
              {/* Image */}
              <div className="explore-card-img-wrap">
                <img
                  src={bird.imageUrl}
                  alt={bird.commonName}
                  className="explore-card-img"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
                  }}
                />
                {/* Badge si existe NOM059 */}
                {bird.conservationStatusNOM059?.description && (
                  <div className="explore-card-badge">
                    {bird.conservationStatusNOM059.description}
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="explore-card-body">
                <div className="explore-card-top-row">
                  <h3 className="explore-card-name">{bird.commonName}</h3>
                  <span className={`explore-status-pill ${getStatusStyle(bird.conservationStatusIUCN)}`}>
                    {getStatusText(bird.conservationStatusIUCN)}
                  </span>
                </div>

                <p className="explore-card-scientific">{bird.scientificName}</p>

                {/* Mostrar un resumen de la descripción general si existe */}
                {getGeneralDescription(bird.description) && (
                  <p className="explore-card-description">
                    {getGeneralDescription(bird.description)}
                  </p>
                )}

                <div className="explore-card-footer">
                  <div className="explore-card-location">
                    <span className="explore-card-location-icon">📍</span>
                    <span className="explore-card-location-text">
                      {bird.distributionMexico || "TESOEM"}
                    </span>
                  </div>

                  <button
                    className="explore-details-btn"
                    onClick={() => navigate(`/species/${toSlug(bird.commonName)}/detalles`, { state: { bird } })}
                  >
                    Ver detalles →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Empty state ── */}
        {filteredBirds.length === 0 && (
          <div className="explore-empty">
            <p className="explore-empty-icon">🦅</p>
            <p className="explore-empty-text">
              {search ? "No se encontraron especies para tu búsqueda." : "No hay especies disponibles."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}