import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage    from "./pages/HomePage/HomePage";
import ExploraPage from "./pages/ExploraPage/ExploraPage";
import Species     from "./pages/SpeciesPage/Species";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage  from "./pages/SignupPage/SignupPage";
import LoginPage   from "./pages/LoginPage/LoginPage";

import Navbar    from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon    from "./components/IsAnon/IsAnon";
import ConservationPage from "./pages/ConservationPage/ConservationPage";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Páginas principales */}
        <Route path="/"         element={<HomePage />} />
        <Route path="/explorar" element={<ExploraPage />} />
        <Route path="/conservacion" element={<ConservationPage />} />
          <Route path="/conservacion/:articleId" element={<ArticlePage />} />
        {/* Detalle de especie: /species/azure-kingfisher/detalles */}
        <Route path="/species/:nombreDelAve/detalles" element={<Species />} />
        <Route path="/acercaDe" element={<AboutPage />} />
        {/* Rutas protegidas */}
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        {/* Rutas anónimas */}
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;