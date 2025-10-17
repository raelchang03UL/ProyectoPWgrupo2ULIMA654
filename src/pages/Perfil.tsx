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
  return nivel * 100 // Cada nivel requiere 100 puntos más que el anterior
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

  useEffect(() => {
    const stored = localStorage.getItem("streamerProfile")
    if (stored) {
      const loadedProfile = JSON.parse(stored)
      const mergedProfile = {
        ...defaultProfile,
        ...loadedProfile,
        // Asegurar que nivel y puntos existan y sean números válidos
        nivel: typeof loadedProfile.nivel === "number" ? loadedProfile.nivel : 1,
        puntos: typeof loadedProfile.puntos === "number" ? loadedProfile.puntos : 0,
      }
      setProfile(mergedProfile)
      // Guardar el perfil actualizado para futuras cargas
      localStorage.setItem("streamerProfile", JSON.stringify(mergedProfile))
    }
  }, [])

  const saveProfile = (next: StreamerProfile) => {
    setProfile(next)
    localStorage.setItem("streamerProfile", JSON.stringify(next))
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
    // Función para guardar los cambios en el perfil
    saveProfile(profile)
    setEditMode(false)
  }

  const puntosParaSiguienteNivel = calcularPuntosParaNivel(profile.nivel)
  const puntosBase = (profile.nivel - 1) * 100
  const puntosEnNivelActual = profile.puntos - puntosBase
  const progreso = calcularProgreso(profile.puntos, profile.nivel)

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
          {editMode ? (
            <textarea
              value={profile.description}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
            />
          ) : (
            <p>{profile.description}</p>
          )}
          {editMode && (
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
