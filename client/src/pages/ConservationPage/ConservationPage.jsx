import { useState } from "react";
import "./ConservationPage.css";

const VOLUNTEER_ITEMS = [
  { icon: "📋", title: "Bird Count 2024",  sub: "Saturday morning census team." },
  { icon: "🪵", title: "Nest Box Builder", sub: "Workshop for campus sanctuary boxes." },
];

export default function ConservationPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="cons-root">
      <main className="cons-main">

        {/* ── HERO ── */}
        <section className="cons-hero">
          <div>
            <p className="cons-eyebrow">Conservation</p>
            <h1 className="cons-hero-title">
              Take Action for Our Avian Community
            </h1>
            <p className="cons-hero-body">
              Every sighting matters. Join EcoAlas in protecting the avian biodiversity
              that keeps our campus environment vibrant. From rehabilitation resources
              to habitat guides, discover how you can contribute to our shared mission.
            </p>
            <a href="#guides" className="cons-hero-btn">
              📥 Download Guide
            </a>
          </div>

          <div className="cons-hero-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=800&q=85"
              alt="Conservation bird"
              className="cons-hero-img"
            />
            <div className="cons-hero-quote">
              <p>"Observation is the first step toward conservation."</p>
            </div>
          </div>
        </section>

        {/* ── CARDS ROW ── */}
        <div className="cons-cards-row" id="guides">

          {/* Injured bird */}
          <div className="cons-card">
            <p className="cons-card-eyebrow">Emergency Protocol</p>
            <div className="cons-card-img-row">
              <div>
                <h3 className="cons-card-title">Found an injured bird?</h3>
                <p className="cons-card-body">
                  Follow this 3-step emergency protocol to ensure safe recovery for our avian neighbors.
                </p>
                <div className="cons-steps">
                  {["Cover with a towel.", "Place in a warm space.", "Call a rehabber."].map((step, i) => (
                    <div key={i} className="cons-step">
                      <div className="cons-step-dot">{i + 1}</div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80"
                alt="Researcher with bird"
                className="cons-card-bird-img"
              />
            </div>
          </div>

          {/* Window collisions */}
          <div className="cons-card">
            <div className="cons-window-icon">🪟</div>
            <p className="cons-card-eyebrow">Habitat Safety</p>
            <h3 className="cons-card-title">Prevent window collisions</h3>
            <p className="cons-card-body">
              Millions of birds perish annually from glass strikes. Learn how to make your
              windows "visible" to birds using dots, patterns, or UV markers.
            </p>
            <a href="#" className="cons-install-link">
              View Installation Guide →
            </a>
          </div>

        </div>

        {/* ── BENTO ── */}
        <section className="cons-bento">

          {/* Initiative dark card */}
          <div className="cons-initiative-card">
            <div className="cons-initiative-icon-wrap">🌱</div>
            <h2 className="cons-initiative-title">
              Bird-friendly campus initiative
            </h2>
            <p className="cons-initiative-body">
              Advocating for native landscaping, reduced night lighting, and organic pest
              control to create a sustainable sanctuary for migratory species.
            </p>
            <div className="cons-initiative-tags">
              <span className="cons-initiative-tag">Native Flora</span>
              <span className="cons-initiative-tag">Dark Skies</span>
            </div>
            <div className="cons-initiative-bg-icon">🌳</div>
          </div>

          {/* Volunteer */}
          <div className="cons-volunteer-card">
            <div className="cons-volunteer-header">
              <div>
                <h2 className="cons-volunteer-title">Volunteer Opportunities</h2>
                <p className="cons-volunteer-sub">Lend your wings to our mission.</p>
              </div>
              <span className="cons-volunteer-icon">🤝</span>
            </div>

            <div className="cons-volunteer-list">
              {VOLUNTEER_ITEMS.map((item, i) => (
                <div key={i} className="cons-volunteer-item">
                  <div className="cons-volunteer-item-icon">{item.icon}</div>
                  <div>
                    <p className="cons-volunteer-item-title">{item.title}</p>
                    <p className="cons-volunteer-item-sub">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="cons-apply-btn">Apply Now</button>
          </div>

        </section>

        {/* ── NEWSLETTER ── */}
        <section className="cons-newsletter">
          <h2 className="cons-newsletter-title">Stay Informed</h2>
          <p className="cons-newsletter-sub">
            Get monthly field guides, migration alerts, and conservation success stories
            delivered to your inbox.
          </p>
          <div className="cons-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="cons-newsletter-input"
            />
            <button
              className="cons-newsletter-btn"
              onClick={() => { if (email) { alert(`Subscribed: ${email}`); setEmail(""); } }}
            >
              Subscribe
            </button>
          </div>
        </section>

      </main>

      {/* FAB */}
      <button className="cons-fab" title="Add">＋</button>
    </div>
  );
}