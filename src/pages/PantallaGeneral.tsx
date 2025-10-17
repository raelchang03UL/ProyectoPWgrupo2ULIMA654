"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../estilos/PantallaGeneral.css"

const streamersData: { [key: string]: any[] } = {
  valorant: [
    {
      id: "val-pro-01",
      name: "TenZ",
      title: "Radiant Ranked | Road to #1",
      viewers: 25300,
      avatarUrl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/5953b039-ba6b-4560-af60-5a507a7e1485-profile_image-70x70.png",
    },
    {
      id: "val-pro-02",
      name: "Shroud",
      title: "Chill Valorant streams",
      viewers: 18900,
      avatarUrl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/643f2b96-60a6-4598-a6a3-009955e8c253-profile_image-70x70.png",
    },
    {
      id: "val-pro-03",
      name: "Kyedae",
      title: "RANKED w/ friends! :)",
      viewers: 12100,
      avatarUrl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/754a0149-a3a1-432d-8153-a5c92d54e482-profile_image-70x70.png",
    },
  ],
  lol: [
    {
      id: "lol-pro-01",
      name: "Faker",
      title: "Challenger Solo Queue",
      viewers: 45000,
      avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/faker-profile_image-29f6e553a1f81498-70x70.jpeg",
    },
  ],
  asmr: [
    {
      id: "asmr-01",
      name: "Amouranth",
      title: "ASMR & Just Chatting",
      viewers: 12300,
      avatarUrl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/amouranth-profile_image-9339d1db-4fab-4103-93c6-d80f837e2a48-70x70.png",
    },
  ],
  fortnite: [
    {
      id: "fn-01",
      name: "Ninja",
      title: "Fortnite OG",
      viewers: 120800,
      avatarUrl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/4e36f06a-a03d-4229-8472-74d3209a3674-profile_image-70x70.png",
    },
  ],
  fc24: [
    {
      id: "fc-01",
      name: "Castro_1021",
      title: "FUT Champions Rewards",
      viewers: 30200,
      avatarUrl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/41355009-1dd1-4357-89b5-68b3554b7336-profile_image-70x70.png",
    },
  ],
  minecraft: [
    {
      id: "mc-01",
      name: "xQc",
      title: "Minecraft Speedruns",
      viewers: 25900,
      avatarUrl: "https://static-cdn.jtvnw.net/jtv_user_pictures/xqc-profile_image-9298d2877057642a-70x70.jpeg",
    },
  ],
  f1: [
    {
      id: "f1-01",
      name: "LandoNorris",
      title: "Racing Sims & Fun",
      viewers: 15400,
      avatarUrl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/5a91d331-a6a5-42b7-a36c-486180a3a411-profile_image-70x70.png",
    },
  ],
  basketball: [
    {
      id: "nba-01",
      name: "adinross",
      title: "NBA 2K25 Wagers",
      viewers: 8900,
      avatarUrl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/e83b3c2b-f227-42c2-a740-41a3130a3825-profile_image-70x70.png",
    },
  ],
  music: [
    {
      id: "music-01",
      name: "TheWeeknd",
      title: "Exclusive Listening Party",
      viewers: 78000,
      avatarUrl:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/e519e933-d748-4790-8208-422c53f93ac4-profile_image-70x70.png",
    },
  ],
}

const allCategories = {
  popular: [
    { id: "asmr", name: "ASMR", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/509659-285x380.jpg" },
    { id: "lol", name: "League of Legends", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg" },
    { id: "valorant", name: "Valorant", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg" },
    { id: "fortnite", name: "Fortnite", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg" },
    {
      id: "fc24",
      name: "EA Sports FC 24",
      imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/1745202732_IGDB-285x380.jpg",
    },
    { id: "minecraft", name: "Minecraft", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-285x380.jpg" },
  ],
  others: [
    { id: "f1", name: "F1 2025", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33895_IGDB-285x380.jpg" },
    {
      id: "basketball",
      name: "NBA 2K25",
      imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/196698144_IGDB-285x380.jpg",
    },
    { id: "music", name: "Música", imageUrl: "https://static-cdn.jtvnw.net/ttv-boxart/26936-285x380.jpg" },
  ],
}

interface UserData {
  name: string
  email: string
  password?: string
  role: string
  monedas: number
  puntos: number
}

const PantallaGeneral = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentRole, setCurrentRole] = useState<"usuario" | "streamer">("usuario")
  const [activeStream, setActiveStream] = useState<any>(null)
  const [horasTransmitidas, setHorasTransmitidas] = useState(0)
  const [horasParaNivel, setHorasParaNivel] = useState(0)
  const [nivelActual, setNivelActual] = useState(1)
  const [mostrarLogin, setMostrarLogin] = useState(false)
  const [mostrarRegistro, setMostrarRegistro] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<"usuario" | "streamer">("usuario")
  const [loginError, setLoginError] = useState("")
  const [regName, setRegName] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regError, setRegError] = useState("")

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser")
    const storedRole = localStorage.getItem("currentRole") as "usuario" | "streamer" | null
    const storedActiveStream = localStorage.getItem("activeStream")

    if (loggedInUser) {
      setIsLoggedIn(true)
      setCurrentUser(JSON.parse(loggedInUser))
      if (storedRole) {
        setCurrentRole(storedRole)
      }
    }

    if (storedActiveStream) {
      setActiveStream(JSON.parse(storedActiveStream))
    }
  }, [])

  useEffect(() => {
    const handleStorageChange = () => {
      const storedActiveStream = localStorage.getItem("activeStream")
      if (storedActiveStream) {
        setActiveStream(JSON.parse(storedActiveStream))
      } else {
        setActiveStream(null)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    const interval = setInterval(() => {
      const storedActiveStream = localStorage.getItem("activeStream")
      if (storedActiveStream) {
        setActiveStream(JSON.parse(storedActiveStream))
      } else {
        setActiveStream(null)
      }
    }, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (currentRole === "streamer" && currentUser) {
      console.log("[v0] Calculando nivel y horas para:", currentUser.email)
      const users: UserData[] = JSON.parse(localStorage.getItem("users") || "[]")
      console.log("[v0] Usuarios en localStorage:", users)
      const foundUser = users.find((u) => u.email === currentUser.email)
      console.log("[v0] Usuario encontrado:", foundUser)

      if (foundUser) {
        const puntos = foundUser.puntos || 0
        console.log("[v0] Puntos del usuario:", puntos)
        const nivel = Math.floor(puntos / 100) + 1
        const puntosEnNivelActual = puntos % 100
        const puntosParaSiguienteNivel = 100 - puntosEnNivelActual

        const horasFaltantes = puntosParaSiguienteNivel / 10
        const horasActuales = puntosEnNivelActual / 10

        console.log("[v0] Nivel calculado:", nivel)
        console.log("[v0] Horas actuales:", horasActuales)
        console.log("[v0] Horas faltantes:", horasFaltantes)

        setNivelActual(nivel)
        setHorasTransmitidas(horasActuales)
        setHorasParaNivel(horasFaltantes)
      } else {
        console.log("[v0] No se encontró el usuario en localStorage")
      }
    }
  }, [currentRole, currentUser])

  useEffect(() => {
    if (currentRole === "streamer" && activeStream) {
      const interval = setInterval(() => {
        const startTime = new Date(activeStream.startTime).getTime()
        const now = Date.now()
        const durationInSeconds = Math.floor((now - startTime) / 1000)
        const horasStreamActual = durationInSeconds / 3600

        setHorasTransmitidas((prev) => {
          const users: UserData[] = JSON.parse(localStorage.getItem("users") || "[]")
          const foundUser = users.find((u) => u.email === currentUser?.email)
          if (foundUser) {
            const puntosBase = foundUser.puntos || 0
            const puntosEnNivelActual = puntosBase % 100
            const horasBase = puntosEnNivelActual / 10
            return horasBase + horasStreamActual
          }
          return prev
        })

        setHorasParaNivel((prev) => {
          const horasTotales = 10
          const horasAcumuladas = horasTransmitidas + horasStreamActual
          return Math.max(0, horasTotales - horasAcumuladas)
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [currentRole, activeStream, currentUser, horasTransmitidas])

  const handleRegister = () => {
    if (!regName || !regEmail || !regPassword) {
      setRegError("Por favor, completa todos los campos.")
      return
    }
    const users: UserData[] = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.some((user) => user.email === regEmail)) {
      setRegError("Este correo electrónico ya está registrado.")
      return
    }
    const newUser: UserData = {
      name: regName,
      email: regEmail,
      password: regPassword,
      role: "usuario",
      monedas: 100,
      puntos: 0,
    }
    const updatedUsers = [...users, newUser]
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    setIsLoggedIn(true)
    setCurrentUser(newUser)
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    alert(`¡Registro exitoso! Bienvenido, ${regName}.`)
    setMostrarRegistro(false)
  }

  const abrirModalLogin = () => {
    setLoginEmail("")
    setLoginPassword("")
    setSelectedRole("usuario")
    setLoginError("")
    setMostrarLogin(true)
  }

  const abrirModalRegistro = () => {
    setRegName("")
    setRegEmail("")
    setRegPassword("")
    setRegError("")
    setMostrarRegistro(true)
  }

  const handleLogin = () => {
    setLoginError("")
    const users: UserData[] = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((user) => user.email === loginEmail && user.password === loginPassword)
    if (foundUser) {
      const userWithSelectedRole = { ...foundUser, role: selectedRole }
      setIsLoggedIn(true)
      setCurrentUser(userWithSelectedRole)
      localStorage.setItem("currentUser", JSON.stringify(userWithSelectedRole))
      localStorage.setItem("currentRole", selectedRole)
      setCurrentRole(selectedRole)
      setMostrarLogin(false)
    } else {
      setLoginError("Correo o contraseña incorrectos.")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentRole")
    localStorage.removeItem("activeStream")
    setIsLoggedIn(false)
    setCurrentUser(null)
    setActiveStream(null)
    navigate("/inicio")
  }

  const getCategoryViewers = (categoryId: string) => {
    const viewers = (streamersData[categoryId] || []).reduce((sum, streamer) => sum + streamer.viewers, 0)
    if (viewers === 0) return "0 espectadores"
    return (viewers / 1000).toFixed(1) + "k espectadores"
  }

  return (
    <>
      <div className="topbar">
        <input type="text" placeholder="Buscar..." className="search-input" />
        <div className="auth-buttons">
          {isLoggedIn && currentUser ? (
            <div className="d-flex align-items-center" style={{ gap: "12px", height: "100%" }}>
              <span style={{ lineHeight: "1" }}>¡Hola, {currentUser.name}!</span>
              <span
                style={{
                  backgroundColor: currentRole === "streamer" ? "#9146ff" : "#1f69ff",
                  color: "#fff",
                  padding: "8px 14px",
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  lineHeight: "1",
                }}
              >
                {currentRole === "streamer" ? "Streamer" : "Espectador"}
              </span>
              {currentRole === "streamer" && activeStream ? (
                <button
                  className="btn-ulima"
                  onClick={() => navigate("/mi-stream")}
                  style={{
                    padding: "8px 16px",
                    fontSize: "0.9rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#e91916",
                    animation: "pulse 2s infinite",
                    lineHeight: "1",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  />
                  EN VIVO - Volver a mi Stream
                </button>
              ) : currentRole === "streamer" ? (
                <button
                  className="btn-ulima"
                  onClick={() => navigate("/configurar-stream")}
                  style={{
                    padding: "8px 16px",
                    fontSize: "0.9rem",
                    display: "inline-flex",
                    alignItems: "center",
                    lineHeight: "1",
                  }}
                >
                  Iniciar Stream
                </button>
              ) : null}
              <button
                className="btn-ulima-outline"
                onClick={handleLogout}
                style={{
                  padding: "8px 16px",
                  lineHeight: "1",
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <>
              <button className="btn-ulima-outline" onClick={abrirModalLogin}>
                Iniciar sesión
              </button>
              <button className="btn-ulima" onClick={abrirModalRegistro}>
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>

      {isLoggedIn && currentRole === "streamer" && (
        <div
          style={{
            backgroundColor: "#1a1a1a",
            padding: "16px 24px",
            borderBottom: "2px solid #ff6f00",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "200px" }}>
            <span style={{ color: "#ff6f00", fontWeight: "700", fontSize: "1.1rem" }}>Nivel {nivelActual}</span>
            <span style={{ color: "#aaa", fontSize: "0.9rem" }}>{horasTransmitidas.toFixed(1)}h / 10h</span>
          </div>
          <div style={{ flex: 1, maxWidth: "600px" }}>
            <div
              style={{
                width: "100%",
                height: "24px",
                backgroundColor: "#2a2a2a",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #444",
              }}
            >
              <div
                style={{
                  width: `${(horasTransmitidas / 10) * 100}%`,
                  height: "100%",
                  backgroundColor: "#ff6f00",
                  transition: "width 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "8px",
                }}
              >
                <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: "600" }}>
                  {((horasTransmitidas / 10) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
          <div style={{ minWidth: "180px", textAlign: "right" }}>
            <span style={{ color: "#fff", fontSize: "0.9rem" }}>
              Faltan <strong style={{ color: "#ff6f00" }}>{horasParaNivel.toFixed(1)}h</strong> para nivel{" "}
              {nivelActual + 1}
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>

      <section className="hero text-center">
        <h1>Bienvenido a ULimeñitaPlay</h1>
        <p>Disfruta de los streamer ulimeños que más te gusten en nuestra plataforma creada por alumnos de la ULIMA.</p>
      </section>

      <section className="category-section">
        <h3 className="section-title">
          Categorías <span className="text-warning">Populares</span>
        </h3>
        <div className="category-grid">
          {allCategories.popular.map((category) => (
            <div key={category.id} className="category-card" onClick={() => navigate(`/category/${category.id}`)}>
              <img src={category.imageUrl || "/placeholder.svg"} alt={category.name} />
              <div className="card-info">
                <h5>{category.name}</h5>
                <p>{getCategoryViewers(category.id)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="category-section">
        <h3 className="section-title">
          Explora <span className="text-warning">Otras Categorías</span>
        </h3>
        <div className="category-grid">
          {allCategories.others.map((category) => (
            <div key={category.id} className="category-card" onClick={() => navigate(`/category/${category.id}`)}>
              <img src={category.imageUrl || "/placeholder.svg"} alt={category.name} />
              <div className="card-info">
                <h5>{category.name}</h5>
                <p>{getCategoryViewers(category.id)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {mostrarLogin && (
        <div className="modal-backdrop" onClick={() => setMostrarLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Iniciar Sesión</h3>
            <input
              className="mt-3"
              placeholder="Correo electrónico"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              className="mt-3"
              placeholder="Contraseña"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <select
              className="mt-3"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as "usuario" | "streamer")}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #444",
                backgroundColor: "#2a2a2a",
                color: "#fff",
                fontSize: "1rem",
              }}
            >
              <option value="usuario">Espectador</option>
              <option value="streamer">Streamer</option>
            </select>
            <button className="btn-ulima w-100 mt-3" onClick={handleLogin}>
              Entrar
            </button>
            {loginError && <p className="modal-error">{loginError}</p>}
            <p className="text-center mt-3" style={{ color: "#bbb", fontSize: "0.9rem" }}>
              ¿No tienes cuenta?{" "}
              <span
                style={{ color: "#ff6f00", cursor: "pointer", fontWeight: 500 }}
                onClick={() => {
                  setMostrarLogin(false)
                  abrirModalRegistro()
                }}
              >
                Regístrate aquí
              </span>
            </p>
          </div>
        </div>
      )}

      {mostrarRegistro && (
        <div className="modal-backdrop" onClick={() => setMostrarRegistro(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Crear Cuenta</h3>
            <input
              className="mt-3"
              placeholder="Nombre completo"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
            />
            <input
              className="mt-3"
              placeholder="Correo electrónico"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <input
              className="mt-3"
              placeholder="Contraseña"
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <button className="btn-ulima w-100 mt-3" onClick={handleRegister}>
              Registrarme
            </button>
            {regError && <p className="modal-error">{regError}</p>}
            <p className="text-center mt-3" style={{ color: "#bbb", fontSize: "0.9rem" }}>
              ¿Ya tienes cuenta?{" "}
              <span
                style={{ color: "#ff6f00", cursor: "pointer", fontWeight: 500 }}
                onClick={() => {
                  setMostrarRegistro(false)
                  abrirModalLogin()
                }}
              >
                Inicia sesión aquí
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default PantallaGeneral
