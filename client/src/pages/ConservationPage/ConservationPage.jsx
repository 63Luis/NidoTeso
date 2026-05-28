import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConservationPage.css";
import Footer from "../../components/Footer/Footer";


// URLs de imágenes para cada guía
const GUIDE_IMAGES = {
    emergency: "/images/Protocolo.png",
    window: "/images/SeguridadEnVentanas.png",
    garden: "/images/JardinParaAves.png",
    kit: "/images/Kit.png",
    fractures: "/images/Fracturas.png",
    migration: "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?w=600&q=80",
    whennot: "/images/NoAyudar.png",
    tips: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80"
};

// Datos de los artículos con referencias APA 7
export const BLOG_POSTS = [
    {
        id: "protocolo-emergencia",
        title: "Protocolo de Emergencia",
        subtitle: "¿Encontraste un ave herida? Guía paso a paso",
        image: GUIDE_IMAGES.emergency,
        steps: [
            "Cubre con una toalla suavemente para reducir su estrés visual.",
            "Coloca en una caja con orificios, en un lugar cálido y silencioso.",
            "Llama a un rehabilitador de fauna silvestre inmediatamente."
        ],
        fullSteps: true,
        content: `
            <h3>¿Qué hacer si encuentras un ave herida?</h3>
            <p>Antes de actuar, observa: ¿El ave respira? ¿Hay peligro inmediato (gatos, perros, autos)? ¿Es un pichón (sin plumas) o un adulto?</p>
            <p>Si el ave está aturdida pero alerta: dale 10-15 minutos en silencio antes de hacer nada.</p>
            <p><strong>⚠️ Importante:</strong> Usa guantes (aunque sea una toalla doblada). Las aves pueden picar o arañar por miedo.</p>
            <p><strong>NO le des agua ni comida.</strong> Los animales en shock pueden ahogarse o atragantarse.</p>
            <h4>Señales de alarma para traslado inmediato:</h4>
            <ul>
                <li>Cabeza ladeada o en círculos (daño neurológico)</li>
                <li>Dificultad respiratoria (pico abierto sin calor extremo)</li>
                <li>Sangre en orificio auditivo o pico</li>
                <li>Fue atacada por un gato o perro (aunque se vea bien)</li>
            </ul>
        `,
        references: [
            "U.S. Fish & Wildlife Service. (2024). Nationwide avoidance & minimization measures for birds.",
            "Comisión Nacional para el Conocimiento y Uso de la Biodiversidad [CONABIO]. (s.f.). Principios de la Iniciativa de Conservación de Aves de América del Norte."
        ]
    },
    {
        id: "seguridad-ventanas",
        title: "Seguridad en Ventanas",
        subtitle: "El asesino invisible: cómo prevenir colisiones",
        image: GUIDE_IMAGES.window,
        steps: [
            "Aplica calcomanías UV o patrones densos en el vidrio.",
            "Coloca mallas mosquiteras a 5 cm del vidrio.",
            "Apaga luces exteriores durante la migración nocturna."
        ],
        fullSteps: true,
        content: `
            <h3>El asesino invisible en tu ventana</h3>
            <p>En Estados Unidos y Canadá mueren entre <strong>365 millones y 1,000 millones</strong> de aves al año por choques contra ventanas (Klem, 2021).</p>
            <p>Las aves no perciben el vidrio como un sólido. Ven el reflejo del cielo, árboles o pasto y vuelan hacia él.</p>
            <h4>5 Soluciones económicas:</h4>
            <ul>
                <li><strong>Jabón o marcador temporal (gratis):</strong> Dibuja líneas cada 10 cm.</li>
                <li><strong>Cuerda o acartonado externo:</strong> Patrón con separación menor a 10 cm.</li>
                <li><strong>Malla mosquitera tensa:</strong> Coloca a 5 cm del vidrio.</li>
                <li><strong>Calcomanías ultravioleta:</strong> Aves ven UV, humanos no.</li>
                <li><strong>Cortinas o persianas semi-cerradas:</strong> Reduce el efecto túnel.</li>
            </ul>
            <p><strong>❌ Lo que NO funciona:</strong> Un sticker de águila o halcón, plantas dentro de la ventana, calcomanías separadas más de 10 cm.</p>
        `,
        references: [
            "Klem, D. (2021). Window collisions. In Conservation of North American Birds.",
            "U.S. Fish & Wildlife Service. (2024). Nationwide avoidance & minimization measures for birds.",
            "BirdLife International. (2024). The Americas Flyways Initiative."
        ]
    },
    {
        id: "jardin-aves",
        title: "Jardín para Aves",
        subtitle: "Crea un refugio seguro en tu patio",
        image: GUIDE_IMAGES.garden,
        steps: [
            "Planta especies nativas productoras de néctar y frutos.",
            "Coloca comederos a menos de 30 cm del vidrio.",
            "Instala un baño de agua poco profundo con piedras."
        ],
        fullSteps: true,
        content: `
            <h3>Jardín para pájaros: 3 reglas de oro</h3>
            <p><strong>Regla 1:</strong> Coloca los comederos a menos de 30 cm del vidrio (si chocan, no toman velocidad) o a más de 1.5 m (permiten maniobrar). <strong>NUNCA</strong> a 50 cm - 1.5 m (máxima velocidad letal).</p>
            <p><strong>Regla 2:</strong> Plantas nativas lejos de ventanas reflectantes. Plantas que dan frutos o néctar (como Salvia, Lantana, Erythrina) a más de 3 m de ventanas grandes.</p>
            <p><strong>Regla 3:</strong> Baño de agua seguro: bandeja ancha y poco profunda (2-4 cm de agua) con piedras o ramas, sin vidrios cercanos.</p>
            <h4>Especies que agradecerán un jardín así:</h4>
            <ul>
                <li>Colibrí de pico ancho (néctar)</li>
                <li>Jilguero menor (semillas de girasol nativo)</li>
                <li>Papamoscas bermellón (insectos de plantas nativas)</li>
            </ul>
        `,
        references: [
            "National Wildlife Federation. (n.d.). Native plant finder.",
            "Comisión Nacional para el Conocimiento y Uso de la Biodiversidad [CONABIO]. (s.f.). Jardines para polinizadores."
        ]
    },
    {
        id: "kit-emergencia",
        title: "Kit de Emergencia",
        subtitle: "Lo que cabe en una caja de zapatos salva vidas",
        image: GUIDE_IMAGES.kit,
        steps: [
            "Prepara una caja con orificios de ventilación.",
            "Incluye toalla lisa, guantes y linterna.",
            "Guarda números de rehabilitadores locales."
        ],
        fullSteps: true,
        content: `
            <h3>Kit de 1ª respuesta para aves</h3>
            <p><strong>Materiales (todo cabe en una caja pequeña):</strong></p>
            <ul>
                <li><strong>Caja de zapatos con tapa y orificios</strong> - Transporte y oscuridad</li>
                <li><strong>Toalla lisa o tela de algodón</strong> - Evita hipotermia</li>
                <li><strong>Guantes de látex o tela</strong> - Protección zoonosis</li>
                <li><strong>Linterna chica</strong> - Evaluar reflejo pupilar</li>
                <li><strong>Bolsa ziploc con arroz seco</strong> - Calor suave (envuelto en tela)</li>
                <li><strong>Números de emergencia impresos</strong> - Rehabilitadores locales</li>
            </ul>
            <h4>Protocolo de 2 horas:</h4>
            <ul>
                <li><strong>Minuto 0-30:</strong> Caja cerrada, oscura, silenciosa. No abrir.</li>
                <li><strong>Minuto 30:</strong> Revisar postura – si está de pie, procede.</li>
                <li><strong>Minuto 60:</strong> Abrir caja lejos de ventanas – si sale volando → éxito.</li>
                <li><strong>Minuto 120:</strong> Si NO vuela o vuela mal → trasladar a rehabilitador.</li>
            </ul>
        `,
        references: [
            "International Wildlife Rehabilitation Council. (2023). Basic wildlife first aid.",
            "U.S. Department of the Interior. (2022). Multiagency strategy for preventing extinction."
        ]
    },
    {
        id: "fracturas-aves",
        title: "Fracturas en Aves",
        subtitle: "Qué hacer y qué NO hacer",
        image: GUIDE_IMAGES.fractures,
        steps: [
            "No intentes entablillar ni enderezar el hueso.",
            "Coloca el ave en una caja con poca altura.",
            "Transporta inmediatamente a un veterinario."
        ],
        fullSteps: true,
        content: `
            <h3>Señales inequívocas de fractura</h3>
            <ul>
                <li><strong>Ala:</strong> Un ala cuelga más baja, asimétrica respecto al cuerpo.</li>
                <li><strong>Pata:</strong> Apoya solo en un pie, o el dedo cuelga flojo sin movimiento.</li>
                <li><strong>Crepitación:</strong> al tacto muy suave se siente "arena o crujido" (hueso roto).</li>
            </ul>
            <h4>🚫 ¡NUNCA hagas esto!</h4>
            <ul>
                <li><strong>Entablillar con palitos de helado:</strong> Fractura conminuta, dolor extremo</li>
                <li><strong>Aplicar férula con cinta adhesiva:</strong> Corte de circulación, pérdida del miembro</li>
                <li><strong>Dar ibuprofeno o paracetamol:</strong> Muerte por toxicidad hepática en 24h</li>
                <li><strong>Mover articulaciones para "probarlas":</strong> Daño de ligamentos y desplazamiento de fractura</li>
            </ul>
            <p><strong>✅ Lo correcto:</strong> No endereces ni inmovilices nada. Coloca el ave en una caja con poca altura. Forra el fondo con toalla gruesa. Transporte inmediato (máximo 4-6 horas) a veterinario.</p>
        `,
        references: [
            "Asociación de Veterinarios de Fauna Silvestre. (2023). Protocolo de atención de fracturas en aves.",
            "International Wildlife Rehabilitation Council. (2023). Bone fracture assessment guide."
        ]
    },
    {
        id: "cuando-no-ayudar",
        title: "¿Cuándo NO ayudar?",
        subtitle: "No secuestres un pichón",
        image: GUIDE_IMAGES.whennot,
        steps: [
            "Observa desde lejos por 20 minutos.",
            "Si es un volantón, los padres lo alimentan.",
            "No intervengas si no hay peligro inminente."
        ],
        fullSteps: true,
        content: `
            <h3>Sí necesita ayuda si:</h3>
            <ul>
                <li>Tiene una <strong>ala caída asimétrica</strong></li>
                <li><strong>Sangre visible</strong> (en pico, ojo, cloaca)</li>
                <li>Está en el suelo con <strong>plumas mojadas o temblores</strong> (shock)</li>
                <li>Fue atacada por un gato o perro (aunque se vea bien)</li>
                <li>No puede pararse o mantiene la cabeza hacia atrás</li>
            </ul>
            <h3>✅ No necesita ayuda si:</h3>
            <ul>
                <li>Es un <strong>volantón</strong> (tiene plumas cortas pero vuela mal). Los padres lo alimentan en el suelo durante 2-3 días.</li>
                <li>Está <strong>descansando</strong> en sombra en un día caluroso</li>
                <li>Se <strong>baña</strong> en una fuente o charco</li>
                <li>Un adulto sano huye de ti → déjalo ir</li>
            </ul>
            <p class="rule-thumb"><strong>Regla del pulgar:</strong> Si no ves sangre, ala caída o convulsiones → probablemente no necesita rescate.</p>
            <p><strong>Consejo final:</strong> Observa 20 minutos desde lejos. El ave sabe lo que hace más que tú. Confía en sus padres.</p>
        `,
        references: [
            "Cornell Lab of Ornithology. (2023). NestWatch: When to intervene.",
            "U.S. Fish & Wildlife Service. (2024). Nationwide avoidance & minimization measures for birds."
        ]
    }
];

// Datos del calendario migratorio
const MIGRATION_DATA = [
    { region: "México", spring: "Mar - May", fall: "Sep - Oct", short: "MX" },
    { region: "EE. UU. sur", spring: "Feb - Abr", fall: "Oct - Nov", short: "US" },
    { region: "EE. UU. norte", spring: "Abr - Jun", fall: "Ago - Oct", short: "US" },
    { region: "Canadá", spring: "Abr - May", fall: "Ago - Sep", short: "CA" }
];

const MIGRATION_ACTIONS = [
    "Apaga luces exteriores de 23h a 6h, especialmente en pisos 2-10",
    "Refuerza ventanas antes del inicio de migración",
    "Revisión matutina (7-9 am) alrededor de tu casa u oficina"
];

// Consejos de conservación
const CONSERVATION_TIPS_DATA = [
    {
        category: "Protección del Hábitat",
        tip: "Mantener y restaurar la vegetación nativa en jardines y áreas verdes urbanas para proporcionar refugio y fuentes de alimento natural para el Colibrí de pico ancho y la Reinita de rabadilla amarilla.",
        source: "CONABIO. Iniciativa de Conservación de Aves de América del Norte."
    },
    {
        category: "Reducción de Amenazas",
        tip: "Mantener a los gatos domésticos en el interior. Son depredadores que afectan a especies como el Chochín de Bewick y el Gorrión chirriador.",
        source: "U.S. Fish & Wildlife Service. 2024."
    },
    {
        category: "Prevención de Colisiones",
        tip: "Colocar elementos visuales (calcomanías, cuerdas) en ventanas. Aves como el Petirrojo americano confunden el reflejo de los árboles con el hábitat real.",
        source: "U.S. Fish & Wildlife Service. 2024."
    },
    {
        category: "Manejo de Plagas",
        tip: "Evitar pesticidas y herbicidas químicos en jardines. Eliminan insectos de aves insectívoras como el Papamoscas bermellón.",
        source: "BirdLife International. 2024."
    }
];

export default function ConservationPage() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const openArticle = (articleId) => {
        navigate(`/conservacion/${articleId}`);
    };

    // Separar los artículos en dos grupos
    const mainGuides = BLOG_POSTS.slice(0, 6); // Protocolo, Seguridad, Jardín

    return (
        <div className="conservation-page">
            <main className="conservation-main">
                {/* ── HERO SECTION ── */}
                <section className="hero-section">
                    <div className="hero-bg"></div>
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <span className="hero-eyebrow">Iniciativa Científica</span>
                        <h1 className="hero-title">Centro de Conservación</h1>
                        <p className="hero-description">
                            Un espacio dedicado a la investigación aplicada y la acción comunitaria para la protección
                            de la biodiversidad aviar en nuestro campus y ecosistemas urbanos.
                        </p>
                    </div>
                </section>
                <div className="conservation-container">



                    {/* ── GUÍAS PRINCIPALES DE CONSERVACIÓN (3 columnas) ── */}
                    <section className="guides-section">
                        <div className="section-header">
                            <h2 className="section-title">Guías de Conservación</h2>
                            <p className="section-subtitle">Haz clic en cualquier tarjeta para leer la guía completa</p>
                        </div>
                        <div className="guides-grid">
                            {mainGuides.map((post) => (
                                <div
                                    key={post.id}
                                    onClick={() => openArticle(post.id)}
                                    className="guide-card"
                                >
                                    <div className="guide-card-image">
                                        <img src={post.image} alt={post.title} />
                                    </div>
                                    <div className="guide-card-content">
                                        <h3 className="guide-card-title">{post.title}</h3>
                                        <p className="guide-card-subtitle">{post.subtitle}</p>
                                        <ul className="guide-card-steps">
                                            {post.steps.map((step, idx) => (
                                                <li key={idx} className="guide-step">
                                                    <span className="step-number">{idx + 1}</span>
                                                    <span>{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="guide-card-footer">
                                            <span>Leer artículo completo</span>
                                            <span className="arrow-icon">→</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── CALENDARIO MIGRATORIO ── */}
                    <section className="migration-section">
                        <div className="migration-header">
                            <div>
                                <h2 className="migration-title">Calendario Migratorio</h2>
                                <p className="migration-subtitle">Temporadas clave por región geográfica</p>
                            </div>
                            <div className="migration-icon">📅</div>
                        </div>
                        <div className="migration-grid">
                            {MIGRATION_DATA.map((item, idx) => (
                                <div key={idx} className="migration-card">
                                    <div className="migration-card-header">
                                        <div className="migration-short">{item.short}</div>
                                        <p className="migration-region">{item.region}</p>
                                    </div>
                                    <div className="migration-dates">
                                        <span className="spring-date">🌸 {item.spring}</span>
                                        <span className="fall-date">🍂 {item.fall}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="migration-actions">
                            <h4 className="actions-title">
                                <span className="light-icon">💡</span>
                                Acciones protectoras durante la migración
                            </h4>
                            <div className="actions-grid">
                                {MIGRATION_ACTIONS.map((action, idx) => (
                                    <div key={idx} className="action-item">
                                        <span className="action-number">{idx + 1}</span>
                                        <p className="action-text">{action}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── LAYOUT DE 2 COLUMNAS ── */}
                    <div className="two-column-layout">

                        {/* COLUMNA IZQUIERDA */}
                        <div className="left-column">

                            {/* Iniciativa Campus Amigable */}
                            <section className="initiative-card">
                                <div className="initiative-icon">
                                    <span>🌱</span>
                                </div>
                                <div className="initiative-content">
                                    <h2 className="initiative-title">Campus amigable con las aves</h2>
                                    <p className="initiative-description">
                                        Abogamos por jardinería con plantas nativas, reducción de iluminación nocturna y control
                                        orgánico de plagas para un santuario sostenible para las especies.
                                    </p>
                                </div>
                                <div className="initiative-bg-icon">🌳</div>
                            </section>

                            {/* Consejos de Conservación */}
                            <section className="tips-card">
                                <div className="tips-header">
                                    <h3 className="tips-title">
                                        <span className="tips-icon">📋</span> Consejos de Conservación
                                    </h3>
                                    <p className="tips-badge">Guías Oficiales</p>
                                </div>
                                <div className="tips-grid">
                                    {CONSERVATION_TIPS_DATA.map((tip, idx) => (
                                        <div key={idx} className="tip-item">
                                            <div className="tip-category">{tip.category}</div>
                                            <p className="tip-text">{tip.tip}</p>
                                            <p className="tip-source">Fuente: {tip.source}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>


                        </div>

                        {/* COLUMNA DERECHA */}
                        <div className="right-column">

                            {/* Voluntariado */}
                            <div className="volunteer-section">
                                <div className="volunteer-header">
                                    <h2 className="volunteer-title">Voluntariado</h2>
                                    <span className="volunteer-badge">En el campus</span>
                                </div>
                                <div className="volunteer-list">
                                    <div className="volunteer-item">
                                        <div className="volunteer-item-header">
                                            <span className="volunteer-tag">Campo</span>
                                            <span className="volunteer-date">Oct 24 - Nov 15</span>
                                        </div>
                                        <h4 className="volunteer-item-title">Conteo Estacional</h4>
                                        <div className="volunteer-item-footer">
                                            <span>👥 8 vacantes</span>
                                            <span>⏰ 4h/sem</span>
                                        </div>
                                    </div>
                                    <div className="volunteer-item">
                                        <div className="volunteer-item-header">
                                            <span className="volunteer-tag">Datos</span>
                                            <span className="volunteer-date">Permanente</span>
                                        </div>
                                        <h4 className="volunteer-item-title">Digitalización de Notas</h4>
                                        <div className="volunteer-item-footer">
                                            <span>👥 3 vacantes</span>
                                            <span>⏰ Flexible</span>
                                        </div>
                                    </div>
                                    <button className="volunteer-btn">Ver convocatorias</button>
                                </div>
                            </div>

                            {/* Newsletter */}
                            <section className="newsletter-card">
                                <h3 className="newsletter-title">Mantente informado</h3>
                                <p className="newsletter-description">Suscríbete para recibir noticias sobre hallazgos científicos.</p>
                                <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (email) { alert(`¡Suscrito! Revisa tu correo: ${email}`); setEmail(""); } }}>
                                    <input
                                        type="email"
                                        placeholder="tu@correo.edu"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="newsletter-input"
                                    />
                                    <button type="submit" className="newsletter-btn">Suscribir</button>
                                </form>
                            </section>
                        </div>
                    </div>


                </div>
            </main>


            {/* Footer */}
            <Footer />
        </div>
    );
}