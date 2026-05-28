import { useParams, useNavigate } from "react-router-dom";
import { BLOG_POSTS } from "../ConservationPage/ConservationPage";
import "./ArticlePage.css";

export default function ArticlePage() {
    const { articleId } = useParams();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.id === articleId);

    if (!post) {
        return (
            <div className="article-not-found">
                <h1>Artículo no encontrado</h1>
                <button onClick={() => navigate("/conservacion")}>Volver a la página principal</button>
            </div>
        );
    }

    return (
        <div className="article-root">
            <main className="article-main">

                {/* Botón de volver */}
                <button className="article-back-btn" onClick={() => navigate("/conservacion")}>
                    ← Volver a todas las guías
                </button>

                {/* Encabezado del artículo */}
                <div className="article-header">
                    <h1 className="article-title">{post.title}</h1>
                    <p className="article-subtitle">{post.subtitle}</p>
                </div>

                {/* Imagen destacada */}
                <img src={post.image} alt={post.title} className="article-image" />

                {/* Resumen rápido */}
                <div className="article-steps">
                    <h3>📋 Resumen rápido</h3>
                    <ol>
                        {post.steps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                        ))}
                    </ol>
                </div>

                {/* Contenido principal */}
                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Referencias APA 7 */}
                <div className="article-references">
                    <h3>📚 Referencias</h3>
                    <div className="references-list">
                        {post.references.map((ref, idx) => (
                            <div key={idx} className="reference-item">
                                <span className="reference-number">{idx + 1}.</span>
                                <span className="reference-text">{ref}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="article-footer">
                    <p>🪹 NidoTeso - Conservación de Aves</p>
                    <button className="article-share-btn" onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}>
                        Compartir este artículo
                    </button>
                </div>

            </main>
        </div>
    );
}