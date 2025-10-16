import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/PantallaGeneral.css";

const streamersData: { [key: string]: any[] } = {
  valorant: [ { id: "val-pro-01", name: "TenZ", title: "Radiant Ranked | Road to #1", viewers: 25300, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/5953b039-ba6b-4560-af60-5a507a7e1485-profile_image-70x70.png" }, { id: "val-pro-02", name: "Shroud", title: "Chill Valorant streams", viewers: 18900, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/643f2b96-60a6-4598-a6a3-009955e8c253-profile_image-70x70.png" }, { id: "val-pro-03", name: "Kyedae", title: "RANKED w/ friends! :)", viewers: 12100, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/754a0149-a3a1-432d-8153-a5c92d54e482-profile_image-70x70.png" } ],
  lol: [ { id: "lol-pro-01", name: "Faker", title: "Challenger Solo Queue", viewers: 45000, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/faker-profile_image-29f6e553a1f81498-70x70.jpeg" } ],
  asmr: [ { id: "asmr-01", name: "Amouranth", title: "ASMR & Just Chatting", viewers: 12300, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/amouranth-profile_image-9339d1db-4fab-4103-93c6-d80f837e2a48-70x70.png" } ],
  fortnite: [ { id: "fn-01", name: "Ninja", title: "Fortnite OG", viewers: 120800, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/4e36f06a-a03d-4229-8472-74d3209a3674-profile_image-70x70.png" } ],
  fc24: [ { id: "fc-01", name: "Castro_1021", title: "FUT Champions Rewards", viewers: 30200, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/41355009-1dd1-4357-89b5-68b3554b7336-profile_image-70x70.png" } ],
  minecraft: [ { id: "mc-01", name: "xQc", title: "Minecraft Speedruns", viewers: 25900, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/xqc-profile_image-9298d2877057642a-70x70.jpeg" } ],
  f1: [ { id: "f1-01", name: "LandoNorris", title: "Racing Sims & Fun", viewers: 15400, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/5a91d331-a6a5-42b7-a36c-486180a3a411-profile_image-70x70.png" } ],
  basketball: [ { id: "nba-01", name: "adinross", title: "NBA 2K25 Wagers", viewers: 8900, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/e83b3c2b-f227-42c2-a740-41a3130a3825-profile_image-70x70.png" } ],
  music: [ { id: "music-01", name: "TheWeeknd", title: "Exclusive Listening Party", viewers: 78000, avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/e519e933-d748-4790-8208-422c53f93ac4-profile_image-70x70.png" } ],
};
const allCategories = {
  popular: [ { id: "asmr", name: "ASMR", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/509659-285x380.jpg" }, { id: "lol", name: "League of Legends", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg" }, { id: "valorant", name: "Valorant", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg" }, { id: "fortnite", name: "Fortnite", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg" }, { id: "fc24", name: "EA Sports FC 24", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/1745202732_IGDB-285x380.jpg" }, { id: "minecraft", name: "Minecraft", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg" } ],
  others: [ { id: "f1", name: "F1 2025", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33895_IGDB-285x380.jpg" }, { id: "basketball", name: "NBA 2K25", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/196698144_IGDB-285x380.jpg" }, { id: "music", name: "Música", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/26936-285x380.jpg" } ]
};
interface UserData { name: string; email: string; password?: string; role: string; monedas: number; puntos: number; }

const PantallaGeneral = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false); const [mostrarRegistro, setMostrarRegistro] = useState(false); const [loginEmail, setLoginEmail] = useState(""); const [loginPassword, setLoginPassword] = useState(""); const [loginError, setLoginError] = useState(""); const [regName, setRegName] = useState(""); const [regEmail, setRegEmail] = useState(""); const [regPassword, setRegPassword] = useState(""); const [regError, setRegError] = useState("");

  useEffect(() => { const loggedInUser = localStorage.getItem("currentUser"); if (loggedInUser) { setIsLoggedIn(true); setCurrentUser(JSON.parse(loggedInUser)); } }, []);

  const handleRegister = () => { if (!regName || !regEmail || !regPassword) { setRegError("Por favor, completa todos los campos."); return; } const users: UserData[] = JSON.parse(localStorage.getItem("users") || "[]"); if (users.some(user => user.email === regEmail)) { setRegError("Este correo electrónico ya está registrado."); return; } const newUser: UserData = { name: regName, email: regEmail, password: regPassword, role: 'usuario', monedas: 100, puntos: 0 }; const updatedUsers = [...users, newUser]; localStorage.setItem("users", JSON.stringify(updatedUsers)); setIsLoggedIn(true); setCurrentUser(newUser); localStorage.setItem("currentUser", JSON.stringify(newUser)); alert(`¡Registro exitoso! Bienvenido, ${regName}.`); setMostrarRegistro(false); };
  const abrirModalLogin = () => { setLoginEmail(""); setLoginPassword(""); setLoginError(""); setMostrarLogin(true); }; const abrirModalRegistro = () => { setRegName(""); setRegEmail(""); setRegPassword(""); setRegError(""); setMostrarRegistro(true); }; const handleLogin = () => { setLoginError(""); const users: UserData[] = JSON.parse(localStorage.getItem("users") || "[]"); const foundUser = users.find(user => user.email === loginEmail && user.password === loginPassword); if (foundUser) { setIsLoggedIn(true); setCurrentUser(foundUser); localStorage.setItem("currentUser", JSON.stringify(foundUser)); setMostrarLogin(false); } else { setLoginError("Correo o contraseña incorrectos."); } }; const handleLogout = () => { localStorage.removeItem("currentUser"); setIsLoggedIn(false); setCurrentUser(null); navigate("/inicio"); };

  const getCategoryViewers = (categoryId: string) => { const viewers = (streamersData[categoryId] || []).reduce((sum, streamer) => sum + streamer.viewers, 0); if (viewers === 0) return '0 espectadores'; return (viewers / 1000).toFixed(1) + 'k espectadores'; };

  return (
    <>
      <div className="topbar">
        <input type="text" placeholder="Buscar..." className="search-input" />
        <div className="auth-buttons">{isLoggedIn && currentUser ? (<div className="d-flex align-items-center"><span className="me-3">¡Hola, {currentUser.name}!</span><button className="btn-ulima-outline" onClick={handleLogout}>Cerrar Sesión</button></div>) : (<><button className="btn-ulima-outline" onClick={abrirModalLogin}>Iniciar sesión</button><button className="btn-ulima" onClick={abrirModalRegistro}>Registrarse</button></>)}</div>
      </div>
      <section className="hero text-center"><h1>Bienvenido a ULimeñitaPlay</h1><p>Disfruta de los streamer ulimeños que más te gusten en nuestra plataforma creada por alumnos de la ULIMA.</p></section>
      <section className="category-section">
        <h3 className="section-title">Categorías <span className="text-warning">Populares</span></h3>
        <div className="category-grid">{allCategories.popular.map((category) => (<div key={category.id} className="category-card" onClick={() => navigate(`/category/${category.id}`)}><img src={category.imageUrl} alt={category.name} /><div className="card-info"><h5>{category.name}</h5><p>{getCategoryViewers(category.id)}</p></div></div>))}</div>
      </section>
      <section className="category-section">
        <h3 className="section-title">Explora <span className="text-warning">Otras Categorías</span></h3>
        <div className="category-grid">{allCategories.others.map((category) => (<div key={category.id} className="category-card" onClick={() => navigate(`/category/${category.id}`)}><img src={category.imageUrl} alt={category.name} /><div className="card-info"><h5>{category.name}</h5><p>{getCategoryViewers(category.id)}</p></div></div>))}</div>
      </section>
      {mostrarLogin && ( <div className="modal-backdrop" onClick={() => setMostrarLogin(false)}><div className="modal-content" onClick={(e) => e.stopPropagation()}><h3>Iniciar Sesión</h3><input className="mt-3" placeholder="Correo electrónico" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} /><input className="mt-3" placeholder="Contraseña" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} /><button className="btn-ulima w-100 mt-3" onClick={handleLogin}>Entrar</button>{loginError && <p className="modal-error">{loginError}</p>}<p className="text-center mt-3" style={{ color: "#bbb", fontSize: "0.9rem" }}>¿No tienes cuenta?{" "}<span style={{ color: "#ff6f00", cursor: "pointer", fontWeight: 500 }} onClick={() => { setMostrarLogin(false); abrirModalRegistro(); }}>Regístrate aquí</span></p></div></div> )}
      {mostrarRegistro && ( <div className="modal-backdrop" onClick={() => setMostrarRegistro(false)}><div className="modal-content" onClick={(e) => e.stopPropagation()}><h3>Crear Cuenta</h3><input className="mt-3" placeholder="Nombre completo" value={regName} onChange={(e) => setRegName(e.target.value)} /><input className="mt-3" placeholder="Correo electrónico" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} /><input className="mt-3" placeholder="Contraseña" type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} /><button className="btn-ulima w-100 mt-3" onClick={handleRegister}>Registrarme</button>{regError && <p className="modal-error">{regError}</p>}<p className="text-center mt-3" style={{ color: "#bbb", fontSize: "0.9rem" }}>¿Ya tienes cuenta?{" "}<span style={{ color: "#ff6f00", cursor: "pointer", fontWeight: 500 }} onClick={() => { setMostrarRegistro(false); abrirModalLogin(); }}>Inicia sesión aquí</span></p></div></div> )}
    </>
  );
};
export default PantallaGeneral;