import { useNavigate } from "react-router-dom";
import { FaHome, FaGift, FaStar, FaCogs, FaInfoCircle, FaFileAlt } from "react-icons/fa";
import "../estilos/Layout.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="app-container">

      <aside className="sidebar">
        <div className="logo" onClick={() => navigate("/inicio")}>
          <h2>
            <span className="logo-text-full">ULimeñita</span>
            <span className="logo-text-highlight">Play</span>
          </h2>
        </div>
        <nav>
          <ul>

            <li onClick={() => navigate("/inicio")}>
              <FaHome className="nav-icon" />
              <span className="nav-text">Inicio</span>
            </li>
            <li onClick={() => navigate("/perfil")}> 
              <FaStar className="nav-icon" />
              <span className="nav-text">Mi Perfil</span>
            </li>
            <li onClick={() => navigate("/regalos")}>
              <FaGift className="nav-icon" />
              <span className="nav-text">Tienda</span>
            </li>
            <li onClick={() => navigate("/nosotros")}>
              <FaInfoCircle className="nav-icon" />
              <span className="nav-text">Nosotros</span>
            </li>
            <li onClick={() => navigate("/terminos")}>
              <FaFileAlt className="nav-icon" />
              <span className="nav-text">Términos y Condiciones</span>
            </li>
            <li onClick={() => navigate("/favoritos")}>
              <FaStar className="nav-icon" />
              <span className="nav-text">Favoritos</span>
            </li>
            <li onClick={() => navigate("/configuracion")}>
              <FaCogs className="nav-icon" />
              <span className="nav-text">Configuración</span>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;