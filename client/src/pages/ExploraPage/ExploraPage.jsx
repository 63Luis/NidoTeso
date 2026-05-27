import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploraPage.css";

/* ── helper: "Azure Kingfisher" → "azure-kingfisher" ── */
const toSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

/* ─── DATA ─── */
const ALL_SPECIES = [
  {
    id: 1,
    name: "Azure Kingfisher",
    scientific: "Ceyx azureus",
    status: "LEAST CONCERN",
    statusStyle: "outline",
    badge: "COMMON",
    habitat: "Lake Reserve",
    img: "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=600&q=80",
  },
  {
    id: 2,
    name: "Emerald Hummer",
    scientific: "Chlorostilbon lucidus",
    status: "VULNERABLE",
    statusStyle: "blue",
    badge: "ENDEMIC",
    habitat: "Botanical Garden",
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
  },
  {
    id: 3,
    name: "Crested Eagle",
    scientific: "Morphnus guianensis",
    status: "CRITICAL",
    statusStyle: "red",
    badge: null,
    habitat: "Faculty of Science",
    img: "https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=600&q=80",
  },
  {
    id: 4,
    name: "Yellow Warbler",
    scientific: "Setophaga petechia",
    status: "LEAST CONCERN",
    statusStyle: "outline",
    badge: null,
    habitat: "Central Park",
    img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
  },
  {
    id: 5,
    name: "Scarlet Macaw",
    scientific: "Ara macao",
    status: "VULNERABLE",
    statusStyle: "blue",
    badge: "CAMPUS RESIDENT",
    habitat: "Central Park",
    img: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80",
  },
  {
    id: 6,
    name: "Grey Heron",
    scientific: "Ardea cinerea",
    status: "LEAST CONCERN",
    statusStyle: "outline",
    badge: null,
    habitat: "Lake Reserve",
    img: "https://images.unsplash.com/photo-1591608516485-a1a53df39498?w=600&q=80",
  },
];

const HABITATS = [
  "All Areas",
  "Central Park",
  "Botanical Garden",
  "Faculty of Science",
  "Lake Reserve",
];

/* ─── COMPONENT ─── */
export default function ExploraPage() {
  const navigate = useNavigate();

  const [search, setSearch]               = useState("");
  const [activeHabitat, setActiveHabitat] = useState("All Areas");
  const [visibleCount, setVisibleCount]   = useState(6);

  const filtered = ALL_SPECIES.filter((sp) => {
    const matchSearch =
      sp.name.toLowerCase().includes(search.toLowerCase()) ||
      sp.scientific.toLowerCase().includes(search.toLowerCase());
    const matchHabitat =
      activeHabitat === "All Areas" || sp.habitat === activeHabitat;
    return matchSearch && matchHabitat;
  });

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="explore-root">

      <main className="explore-main">

        {/* ── Page header ── */}
        <div className="explore-page-header">
          <h1 className="explore-title">Species Explorer</h1>
          <p className="explore-subtitle">
            Cataloging the vibrant avian life across our university campus. Discover, identify, and
            contribute to our growing scientific repository.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="explore-search-wrap">
          <span className="explore-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, family, or scientific name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="explore-search-input"
          />
        </div>

        {/* ── Habitat filters ── */}
        <div className="explore-filters-wrap">
          <span className="explore-filters-label">HABITATS:</span>
          <div className="explore-filters-list">
            {HABITATS.map((h) => (
              <button
                key={h}
                onClick={() => { setActiveHabitat(h); setVisibleCount(6); }}
                className={`explore-filter-btn ${activeHabitat === h ? "active" : ""}`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* ── Species grid ── */}
        <div className="explore-grid">
          {visible.map((sp) => (
            <div key={sp.id} className="explore-card">

              {/* Image */}
              <div className="explore-card-img-wrap">
                <img
                  src={sp.img}
                  alt={sp.name}
                  className="explore-card-img"
                />
                {sp.badge && (
                  <div className="explore-card-badge">{sp.badge}</div>
                )}
              </div>

              {/* Body */}
              <div className="explore-card-body">
                <div className="explore-card-top-row">
                  <h3 className="explore-card-name">{sp.name}</h3>
                  <span className={`explore-status-pill ${sp.statusStyle}`}>
                    {sp.status}
                  </span>
                </div>

                <p className="explore-card-scientific">{sp.scientific}</p>

                <div className="explore-card-footer">
                  <div className="explore-card-location">
                    <span className="explore-card-location-icon">📍</span>
                    <span className="explore-card-location-text">{sp.habitat}</span>
                  </div>

                  {/* ── View Details → navega a /species/nombre-del-ave/detalles ── */}
                  <button
                    className="explore-details-btn"
                    onClick={() => navigate(`/species/${toSlug(sp.name)}/detalles`)}
                  >
                    View Details →
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Empty state ── */}
        {visible.length === 0 && (
          <div className="explore-empty">
            <p className="explore-empty-icon">🦅</p>
            <p className="explore-empty-text">No species found for your search.</p>
          </div>
        )}

        {/* ── Load more ── */}
        {visibleCount < filtered.length && (
          <div className="explore-load-more-wrap">
            <button
              className="explore-load-more-btn"
              onClick={() => setVisibleCount((c) => c + 4)}
            >
              🔄 Load More Species
            </button>
          </div>
        )}

      </main>

      {/* ── FAB ── */}
      <button className="explore-fab" title="Registrar avistamiento">
        📷
      </button>

    </div>
  );
}