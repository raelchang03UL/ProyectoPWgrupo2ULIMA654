import 'bootstrap/dist/css/bootstrap.min.css'
import './PantallaGeneral.css'

const PantallaGeneral = () => {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2>ULimeñita<span>Play</span></h2>
        </div>
        <nav>
          <ul>
            <li>Inicio</li>
            <li>Explorar</li>
            <li>Favoritos</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal de la pantalla general o la q va a ver el usuario al entrar tipo bienvenida*/}
      <main className="main-content text-light">
        <header className="topbar">
          <input
            type="text"
            placeholder="Buscar..."
            className="search-input"
          />
          <div className="auth-buttons">
            <button className="btn btn-outline-light">Iniciar sesión</button>
            <button className="btn btn-primary">Registrarse</button>
          </div>
        </header>

        <section className="hero text-center">
          <h1>Bienvenido a ULimeñitaPlay</h1>
          <p>Disfruta de los streamer Ulimeños q más te gusten en nuestra propia plaforma diseña por nuestros propios alumnos</p>
        </section>
      </main>
    </div>
  )
}

export default PantallaGeneral
