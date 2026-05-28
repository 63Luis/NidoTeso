import React, { useEffect, useRef } from 'react';
import './AboutPage.css';
import Footer from "../../components/Footer/Footer";

function AboutPage() {
    const heroImageRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroImageRef.current) {
                const scroll = window.pageYOffset;
                heroImageRef.current.style.transform = `translateY(${scroll * 0.1}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="about-page">
            {/* TopAppBar */}
            <header className="app-bar">
                <div className="app-bar-container">
                    <div className="logo-area">
                        <span className="logo">EcoAlas</span>
                        <nav className="nav-links">
                            <a href="#">Inicio</a>
                            <a href="#">Explorar</a>
                            <a href="#">Conservación</a>
                            <a href="#" className="active">Acerca de</a>
                        </nav>
                    </div>
                    <div className="actions-area">
                        <button className="donate-btn">Donar</button>
                        <span className="icon material-symbols-outlined">notifications</span>
                        <span className="icon material-symbols-outlined">account_circle</span>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="hero">
                    <img
                        ref={heroImageRef}
                        className="hero-img"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqOUaO5PcMWgg7PpBxqIJbVEaPitafwYTGG6jmBJAfirF5VHzASNhjp2Yv9iBAhpKm5gK155Cc-KOFGxmY1pG6kkLbMca-kpTLDawermLuGGgAaPlvhIn5vazssKo_a3hkPtqWIdk4O2J2K6Mq5JINSPfIYBZn60I3GL08I1ckJzLCGyCK2Q0wC5U19X1PsNbvLBhoax0L8GAnclUpKC6s3sPIcSjKW8jWLybo1UaAfDtefA88ou6uMuJPgW6VLtWWnQ9jvS9XBA"
                        alt="University campus garden"
                    />
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">Nuestro Compromiso con el Vuelo</h1>
                    </div>
                </section>

                {/* Propósito y Misión */}
                <section className="section">
                    <div className="container">
                        <div className="mission-grid">
                            <div className="mission-text">
                                <h2 className="section-title">Propósito y Misión</h2>
                                <p>
                                    EcoAlas surge como una respuesta a la necesidad de documentar la vasta biodiversidad
                                    que habita en nuestro campus universitario. Somos una iniciativa que une el rigor
                                    científico con la participación comunitaria, buscando transformar cada observación en
                                    un dato valioso para la conservación.
                                </p>
                                <p>
                                    Nuestra misión es fomentar una cultura de respeto y admiración por el mundo natural,
                                    proporcionando herramientas digitales accesibles que permitan a estudiantes, docentes
                                    y visitantes conectar con el ecosistema aviar local.
                                </p>
                            </div>
                            <div className="mission-image">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6f8HSpwOJCcnH8zuZVJC624v2rvvvAdDHLA_65WqGeFIe31IcKSL2hNl90U9J8cw_kKo_Un0Exbg6o7JsLlWfAoAKPUbT6qdDlZ0PrytmAH-_Fecw_J9aD-qyUpwByqk0yjs_rJ4sYwlXj_WwU8lOu3yjja1Avd5wRg3MY4wTR_EX7586m8dWbN0sX1-V6pDRT1x_zlsw6OY-sofnTENoiA5hehWoH_AEkHePfDZMFg95AtnOJA0h1BLSndZNdVwvVQLsBAApWQ"
                                    alt="Student observing birds"
                                    className="rounded-image"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* El Equipo de Desarrollo */}
                <section className="section">
                    <div className="container">
                        <h2 className="section-title centered">El Equipo de Desarrollo</h2>
                        <p className="subtitle centered">
                            Liderazgo académico para el futuro de la ornitología digital.
                        </p>
                        <div className="team-grid">
                            <div className="team-card">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRZx_jpUBbKr4bA4M4SCHB0pXi-mbIzL0LZjJ0yfws4gQ0FTt5NRJQNVWnmehKAdZsDhAOzUAow95ET-Hox3lfy7W_8i6XtBcRld7qu4deBXIWXiy5fGmwzWbze_l9qA3-xTpmJ0p0IGRKFgf6FJf9mYJd5hFfsGcOJA2kWvUQuqLzzDKVQOB5Tuj8TdpnDCJ-0oE4CHIcJ91D1JnvLnivbWoOevnqaDeSmJsvwPAn6o_-KqQrZ1-dF4NLG7J7V4kowgehfB_xQQ"
                                    alt="Dr. Julián Vaca"
                                    className="team-avatar"
                                />
                                <h4 className="team-name">Dr. Julián Vaca</h4>
                                <p className="team-role">Director Científico</p>
                                <p className="team-desc">
                                    Especialista en ecología de aves neotropicales y conservación de hábitats urbanos.
                                </p>
                            </div>
                            <div className="team-card">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLLwY78B9pDxJCX-W_376FmSmvvXD0n4MlCY7kAGiOM90aZHGq2WaiFpJsywTjUaj-oecOxNRM88H108XascU-TmNmdOjiEAsXmNKZw4lLvb5Yo-hvqVunFZO-mCvE7ifdWjOoP2nyPyRBjEPD0V2mzB97qiDOcCv5wPDj6_k38mifS7gbZbiyHOvXEnDMTsg75PLE6y9WOZB-Yx8qaAPoGa0EVHFyyO11FR1pRTAYqB9NXg-nyLb5fwVYiOGjI7t542DzjPmuqA"
                                    alt="Ing. Sofía Alas"
                                    className="team-avatar"
                                />
                                <h4 className="team-name">Ing. Sofía Alas</h4>
                                <p className="team-role">Líder de Desarrollo</p>
                                <p className="team-desc">
                                    Arquitecta de sistemas dedicada a crear puentes entre la tecnología móvil y la ciencia de datos.
                                </p>
                            </div>
                            <div className="team-card">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4c6hAiQSkBXwgZUviD9mSPRZcxLVY7ox7NLN2WHheDI8zyeepqH4YEi87V6AVzMHRHtkcNyxU_7BhUXh1H7vPRT3w6Fwc4rZWADNDONkp5Dk5CfAGRRk6TgOjHfMt_UmrroDrCQKg4T6E_2YIsyc_m2YUIIBdYAhox18umNpcoW0z_P5-Vf4M_0tYSVAeTyyG7U96Qgt8k7PQ3UDEpnvxpa90QRubiHvMM88YxHP6yIG_jN5nrB7xxqGjy7HVY1ff1DCFXiW4qw"
                                    alt="Carlos Méndez"
                                    className="team-avatar"
                                />
                                <h4 className="team-name">Carlos Méndez</h4>
                                <p className="team-role">Analista de Datos</p>
                                <p className="team-desc">
                                    Experto en modelado estadístico y visualización de biodiversidad regional.
                                </p>
                            </div>
                            <div className="team-card">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAr70uXRL0Rqhbphnoz2WJcOCVBPu6u8J-OcZiP559PvBcE3PVMr_KWyipT_XsZrQ86mnjqmMDUoYeOWwI1Zkg14elANowdOBrrjfxLpW_bsdqzdmSkyTONJBloODHr4ULRFtLu_jwEvj9ZKxcYTXyzmRmCqSGoPSMQEVwiAh0U_KyPGfbw_8YjSALrUTkbN6vO5LQJ2waTQe9HPqw5jmKSPtheNtoucTCCTiFsVS7GjOeetwomJqIrWIIfsfTvA15geweKqK41A"
                                    alt="Elena Rocha"
                                    className="team-avatar"
                                />
                                <h4 className="team-name">Elena Rocha</h4>
                                <p className="team-role">Coord. Comunitaria</p>
                                <p className="team-desc">
                                    Enlace principal entre la iniciativa científica y los programas de voluntariado estudiantil.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <Footer/>
        </div>
    );
}

export default AboutPage;