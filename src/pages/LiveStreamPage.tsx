"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../estilos/LiveStreamPage.css"
import { FaGift } from "react-icons/fa"

interface Regalo {
  id: number
  nombre: string
  costo: number
  puntos: number
  emoji: string
}
interface UserData {
  name: string
  email: string
  monedas: number
  puntos: number
}

const regalosDisponibles: Regalo[] = [
  { id: 1, nombre: "Rosa", costo: 5, puntos: 5, emoji: "🌹" },
  { id: 2, nombre: "Aplauso", costo: 10, puntos: 10, emoji: "👏" },
  { id: 3, nombre: "Corazón", costo: 25, puntos: 25, emoji: "❤️" },
  { id: 4, nombre: "Fuego", costo: 50, puntos: 50, emoji: "🔥" },
  { id: 5, nombre: "ULIMA GOAT", costo: 100, puntos: 100, emoji: "🐐" },
  { id: 6, nombre: "Diamante", costo: 250, puntos: 250, emoji: "💎" },
  { id: 7, nombre: "Cohete", costo: 500, puntos: 500, emoji: "🚀" },
  { id: 8, nombre: "Trofeo", costo: 750, puntos: 750, emoji: "🏆" },
  { id: 9, nombre: "Castillo", costo: 1000, puntos: 1000, emoji: "🏰" },
  { id: 10, nombre: "León", costo: 2500, puntos: 2500, emoji: "🦁" },
]

const LiveStreamPage = () => {
  const { streamerId } = useParams()
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [currentRole, setCurrentRole] = useState<string>("")
  const [mensaje, setMensaje] = useState("")
  const [mostrarOverlay, setMostrarOverlay] = useState(false)
  const [showGiftMenu, setShowGiftMenu] = useState(false)
  const [activeStream, setActiveStream] = useState<any>(null)
  const [isOwnStream, setIsOwnStream] = useState(false)
  const [streamDuration, setStreamDuration] = useState(0)

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    const role = localStorage.getItem("currentRole")
    if (role) {
      setCurrentRole(role)
    }
    const stream = localStorage.getItem("activeStream")
    if (stream) {
      const parsedStream = JSON.parse(stream)
      setActiveStream(parsedStream)
      setIsOwnStream(true)
    }
  }, [])

  useEffect(() => {
    if (isOwnStream && activeStream?.startTime) {
      const updateDuration = () => {
        const startTime = new Date(activeStream.startTime).getTime()
        const now = Date.now()
        const durationInSeconds = Math.floor((now - startTime) / 1000)
        setStreamDuration(durationInSeconds)
      }

      updateDuration()
      const interval = setInterval(updateDuration, 1000)
      return () => clearInterval(interval)
    }
  }, [isOwnStream, activeStream])

  const handleFinalizarStream = () => {
    if (window.confirm("¿Estás seguro de que quieres finalizar tu transmisión?")) {
      const horasTransmitidas = streamDuration / 3600

      const profile = localStorage.getItem("streamerProfile")
      if (profile) {
        const currentProfile = JSON.parse(profile)
        const puntosGanados = Math.floor(horasTransmitidas * 10)
        const nuevosPuntos = currentProfile.puntos + puntosGanados
        const nuevoNivel = Math.floor(nuevosPuntos / 100) + 1

        const updatedProfile = {
          ...currentProfile,
          totalHours: currentProfile.totalHours + horasTransmitidas,
          puntos: nuevosPuntos,
          nivel: nuevoNivel,
        }
        localStorage.setItem("streamerProfile", JSON.stringify(updatedProfile))
      }

      localStorage.removeItem("activeStream")
      alert(
        `¡Transmisión finalizada! Transmitiste ${horasTransmitidas.toFixed(2)} horas y ganaste ${Math.floor(horasTransmitidas * 10)} puntos.`,
      )
      navigate("/inicio")
    }
  }

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const updateBalances = (nuevasMonedas: number, nuevosPuntos: number) => {
    if (currentUser) {
      const updatedUser: UserData = {
        ...currentUser,
        monedas: nuevasMonedas,
        puntos: nuevosPuntos,
      }
      setCurrentUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    }
  }

  const enviarRegalo = (regalo: Regalo) => {
    if (!currentUser) {
      alert("Debes iniciar sesión para enviar regalos.")
      return
    }
    if (currentUser.monedas < regalo.costo) {
      alert("No tienes suficientes monedas. Ve a la tienda para comprar más.")
      return
    }
    const nuevasMonedas = currentUser.monedas - regalo.costo
    const nuevosPuntos = currentUser.puntos + regalo.puntos
    updateBalances(nuevasMonedas, nuevosPuntos)
    setMensaje(`¡Enviaste un ${regalo.nombre} y ganaste ${regalo.puntos} puntos!`)
    setMostrarOverlay(true)
    setShowGiftMenu(false)
    setTimeout(() => setMostrarOverlay(false), 4000)
  }

  const isStreamer = currentRole === "streamer"

  return (
    <>
      <div className="stream-layout">
        <div className="video-column">
          <div className="gif-player">
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTY2OWQzZTM0NDEyYmMyYjU1ODNiMWRkZWM2MDI3NzMzM2YyNDM3YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1FJH5e1DpiNO/giphy.gif"
              alt="Live Stream"
            />
            <div className="live-indicator">EN VIVO</div>
          </div>
          {isOwnStream ? (
            <div className="stream-info">
              <h3>Tu Transmisión en Vivo</h3>
              <p>
                <strong>Título:</strong> {activeStream?.title}
              </p>
              <p>
                <strong>Categoría:</strong> {activeStream?.category}
              </p>
              {activeStream?.description && (
                <p>
                  <strong>Descripción:</strong> {activeStream.description}
                </p>
              )}
            </div>
          ) : (
            <div className="stream-info">
              <h3>Viendo a {streamerId}</h3>
              <p>¡Bienvenido al stream! Envía regalos para aparecer en pantalla.</p>
            </div>
          )}
        </div>
        <div className="chat-column">
          {isOwnStream && (
            <div className="streamer-stats">
              <h4 style={{ color: "#ff6b35", marginBottom: "15px" }}>Estadísticas del Stream</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <p>
                  Duración: <strong>{formatDuration(streamDuration)}</strong>
                </p>
                <p>
                  Espectadores: <strong>42</strong> 👥
                </p>
                <p>
                  Regalos recibidos: <strong>15</strong> 🎁
                </p>
              </div>
              <button
                onClick={handleFinalizarStream}
                style={{
                  marginTop: "15px",
                  padding: "12px 24px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Finalizar Stream
              </button>
            </div>
          )}
          <div className="balance-header">
            <p>
              Monedas: <strong>{currentUser?.monedas ?? 0}</strong> 🪙
            </p>
            <p>
              Puntos: <strong>{currentUser?.puntos ?? 0}</strong> ⭐
            </p>
          </div>
          <div className="chat-log">
            <p>
              <span className="user-lime">Limeñito123:</span> ¡Grande {streamerId}!
            </p>
            <p>
              <span className="user-pro">ProPlayer99:</span> ¿A qué hora el sorteo?
            </p>
          </div>
          <div className="chat-input-area">
            {!isStreamer && showGiftMenu && (
              <div className="gift-menu-popup">
                {regalosDisponibles.map((r) => (
                  <div key={r.id} className="regalo-card" onClick={() => enviarRegalo(r)}>
                    <span className="emoji">{r.emoji}</span>
                    <span className="costo">{r.costo} 🪙</span>
                  </div>
                ))}
              </div>
            )}
            <input type="text" placeholder="Envía un mensaje" />
            {!isStreamer && (
              <button className="gift-button" onClick={() => setShowGiftMenu(!showGiftMenu)}>
                <FaGift />
              </button>
            )}
          </div>
        </div>
      </div>
      {mostrarOverlay && (
        <div className="donation-overlay">
          <div className="donation-alert">{mensaje}</div>
        </div>
      )}
    </>
  )
}

export default LiveStreamPage
