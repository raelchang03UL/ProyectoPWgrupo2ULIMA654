import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/LiveStreamPage.css";
import { FaGift } from "react-icons/fa";

interface Regalo { id: number; nombre: string; costo: number; puntos: number; emoji: string; }
interface UserData { name: string; email: string; monedas: number; puntos: number; }

const regalosDisponibles: Regalo[] = [ { id: 1, nombre: "Rosa", costo: 5, puntos: 5, emoji: "🌹" }, { id: 2, nombre: "Aplauso", costo: 10, puntos: 10, emoji: "👏" }, { id: 3, nombre: "Corazón", costo: 25, puntos: 25, emoji: "❤️" }, { id: 4, nombre: "Fuego", costo: 50, puntos: 50, emoji: "🔥" }, { id: 5, nombre: "ULIMA GOAT", costo: 100, puntos: 100, emoji: "🐐" }, { id: 6, nombre: "Diamante", costo: 250, puntos: 250, emoji: "💎" }, { id: 7, nombre: "Cohete", costo: 500, puntos: 500, emoji: "🚀" }, { id: 8, nombre: "Trofeo", costo: 750, puntos: 750, emoji: "🏆" }, { id: 9, nombre: "Castillo", costo: 1000, puntos: 1000, emoji: "🏰" }, { id: 10, nombre: "León", costo: 2500, puntos: 2500, emoji: "🦁" }, ];

const LiveStreamPage = () => {
  const { streamerId } = useParams();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [mostrarOverlay, setMostrarOverlay] = useState(false);
  const [showGiftMenu, setShowGiftMenu] = useState(false);

  useEffect(() => { const user = localStorage.getItem("currentUser"); if (user) { setCurrentUser(JSON.parse(user)); } }, []);

  const updateBalances = (nuevasMonedas: number, nuevosPuntos: number) => { if (!currentUser) return; const updatedUser = { ...currentUser, monedas: nuevasMonedas, puntos: nuevosPuntos }; setCurrentUser(updatedUser); localStorage.setItem("currentUser", JSON.stringify(updatedUser)); const allUsers: UserData[] = JSON.parse(localStorage.getItem("users") || "[]"); const userIndex = allUsers.findIndex((u) => u.email === currentUser.email); if (userIndex !== -1) { allUsers[userIndex] = updatedUser; localStorage.setItem("users", JSON.stringify(allUsers)); } };
  const enviarRegalo = (regalo: Regalo) => { if (!currentUser) { alert("Debes iniciar sesión para enviar regalos."); return; } if (currentUser.monedas < regalo.costo) { alert("No tienes suficientes monedas. Ve a la tienda para comprar más."); return; } const nuevasMonedas = currentUser.monedas - regalo.costo; const nuevosPuntos = currentUser.puntos + regalo.puntos; updateBalances(nuevasMonedas, nuevosPuntos); setMensaje(`¡Enviaste un ${regalo.nombre} y ganaste ${regalo.puntos} puntos!`); setMostrarOverlay(true); setShowGiftMenu(false); setTimeout(() => setMostrarOverlay(false), 4000); };

  return (
    <>
      <div className="stream-layout">
        <div className="video-column">
          <div className="gif-player"><img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTY2OWQzZTM0NDEyYmMyYjU1ODNiMWRkZWM2MDI3NzMzM2YyNDM3YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1FJH5e1DpiNO/giphy.gif" alt="Live Stream" /><div className="live-indicator">EN VIVO</div></div>
          <div className="stream-info"><h3>Viendo a {streamerId}</h3><p>¡Bienvenido al stream! Envía regalos para aparecer en pantalla.</p></div>
        </div>
        <div className="chat-column">
            <div className="balance-header"><p>Monedas: <strong>{currentUser?.monedas ?? 0}</strong> 🪙</p><p>Puntos: <strong>{currentUser?.puntos ?? 0}</strong> ⭐</p></div>
            <div className="chat-log"><p><span className="user-lime">Limeñito123:</span> ¡Grande {streamerId}!</p><p><span className="user-pro">ProPlayer99:</span> ¿A qué hora el sorteo?</p></div>
            <div className="chat-input-area">{showGiftMenu && (<div className="gift-menu-popup">{regalosDisponibles.map(r => (<div key={r.id} className="regalo-card" onClick={() => enviarRegalo(r)}><span className="emoji">{r.emoji}</span><span className="costo">{r.costo} 🪙</span></div>))}</div>)}<input type="text" placeholder="Envía un mensaje" /><button className="gift-button" onClick={() => setShowGiftMenu(!showGiftMenu)}><FaGift /></button></div>
        </div>
      </div>
      {mostrarOverlay && (<div className="donation-overlay"><div className="donation-alert">{mensaje}</div></div>)}
    </>
  );
};

export default LiveStreamPage;