"use client"

import { useEffect, useState } from "react"
import "../estilos/Perfil.css"

interface StreamerProfile {
  name: string
  description: string
  followers: number
  totalHours: number
  nivel: number
  puntos: number
}

const defaultProfile: StreamerProfile = {
  name: "Tu Nombre",
  description: "Escribe una breve descripción sobre ti como streamer...",
  followers: 0,
  totalHours: 0,
  nivel: 1,
  puntos: 0,
}

const calcularPuntosParaNivel = (nivel: number): number => {
  return nivel * 100
}

const calcularProgreso = (puntosActuales: number, nivel: number): number => {
  const puntosBase = (nivel - 1) * 100
  const puntosEnNivelActual = puntosActuales - puntosBase
  const puntosNecesarios = calcularPuntosParaNivel(nivel)
  return Math.min((puntosEnNivelActual / puntosNecesarios) * 100, 100)
}

const Perfil = () => {
  const [profile, setProfile] = useState<StreamerProfile>(defaultProfile)
  const [editMode, setEditMode] = useState(false)
  const [currentRole, setCurrentRole] = useState<"usuario" | "streamer">("usuario")

  useEffect(() => {
    const currentUserData = localStorage.getItem("currentUser")
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData)
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u: any) => u.email === currentUser.email)

      if (foundUser) {
        const userProfile: StreamerProfile = {
          name: foundUser.name,
          description: foundUser.description || defaultProfile.description,
          followers: foundUser.followers || 0,
          totalHours: foundUser.totalHours || 0,
          nivel: foundUser.nivel || 1,
          puntos: foundUser.puntos || 0,
        }
        setProfile(userProfile)
      }
    }

    const role = localStorage.getItem("currentRole") as "usuario" | "streamer" | null
    if (role) {
      setCurrentRole(role)
    }
  }, [])

  const saveProfile = (next: StreamerProfile) => {
    setProfile(next)

    const currentUserData = localStorage.getItem("currentUser")
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData)
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const userIndex = users.findIndex((u: any) => u.email === currentUser.email)

      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          name: next.name,
          description: next.description,
          followers: next.followers,
          totalHours: next.totalHours,
          nivel: next.nivel,
          puntos: next.puntos,
        }
        localStorage.setItem("users", JSON.stringify(users))

        const updatedCurrentUser = { ...currentUser, ...users[userIndex] }
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser))
      }
    }
  }

  const handleAddHours = (hours: number) => {
    const puntosGanados = hours * 10
    const nuevosPuntos = profile.puntos + puntosGanados
    const nuevoNivel = Math.floor(nuevosPuntos / 100) + 1

    const next = {
      ...profile,
      totalHours: profile.totalHours + hours,
      puntos: nuevosPuntos,
      nivel: nuevoNivel,
    }
    saveProfile(next)
  }

  const handleAddFollower = () => {
    const puntosGanados = 5
    const nuevosPuntos = profile.puntos + puntosGanados
    const nuevoNivel = Math.floor(nuevosPuntos / 100) + 1

    const next = {
      ...profile,
      followers: profile.followers + 1,
      puntos: nuevosPuntos,
      nivel: nuevoNivel,
    }
    saveProfile(next)
  }

  const handleSaveEdits = () => {
    saveProfile(profile)
    setEditMode(false)
  }

  const puntosParaSiguienteNivel = calcularPuntosParaNivel(profile.nivel)
  const puntosBase = (profile.nivel - 1) * 100
  const puntosEnNivelActual = profile.puntos - puntosBase
  const progreso = calcularProgreso(profile.puntos, profile.nivel)

  const isStreamer = currentRole === "streamer"

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <div className="perfil-meta">
          {editMode ? (
            <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          ) : (
            <h2>{profile.name}</h2>
          )}
          <p className="perfil-followers">{profile.followers.toLocaleString()} seguidores</p>
          <p className="perfil-hours">{profile.totalHours} horas transmitidas</p>
        </div>
        {isStreamer && (
          <div className="perfil-actions">
            <button className="btn-ulima-outline" onClick={() => handleAddFollower()}>
              + Seguidor
            </button>
            <button className="btn-ulima-outline" onClick={() => handleAddHours(1)}>
              +1 hora
            </button>
            <button className="btn-ulima" onClick={() => setEditMode(!editMode)}>
              {editMode ? "Cancelar" : "Editar Perfil"}
            </button>
          </div>
        )}
      </div>

      <div className="perfil-stats">
        <div className="stats-content">
          <div className="nivel-badge">
            <div className="nivel-numero">{profile.nivel}</div>
            <div className="nivel-label">Nivel</div>
          </div>

          <div className="puntos-info">
            <div className="puntos-header">
              <span className="puntos-actuales">
                {puntosEnNivelActual} / {puntosParaSiguienteNivel} puntos
              </span>
              <span className="puntos-totales">{profile.puntos} puntos totales</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progreso}%` }}></div>
            </div>
            <p className="puntos-faltantes">
              {puntosParaSiguienteNivel - puntosEnNivelActual} puntos para nivel {profile.nivel + 1}
            </p>
          </div>
        </div>
      </div>

      <div className="perfil-body">
        <section className="perfil-about">
          <h3>Acerca de</h3>
          {editMode && isStreamer ? (
            <textarea
              value={profile.description}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
            />
          ) : (
            <p>{profile.description}</p>
          )}
          {editMode && isStreamer && (
            <button className="btn-ulima" onClick={handleSaveEdits}>
              Guardar
            </button>
          )}
        </section>
      </div>
    </div>
  )
}

export default Perfil
