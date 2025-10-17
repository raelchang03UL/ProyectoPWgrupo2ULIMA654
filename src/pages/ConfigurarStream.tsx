"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../estilos/PantallaGeneral.css"

interface StreamConfig {
  title: string
  category: string
  description: string
  isLive: boolean
  startTime: string
}

export default function ConfigurarStream() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("ASMR")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const categories = [
    "ASMR",
    "League of Legends",
    "Valorant",
    "Fortnite",
    "EA Sports FC 24",
    "Minecraft",
    "Music",
    "Just Chatting",
  ]

  const handleStartStream = () => {
    console.log("[v0] handleStartStream ejecutado")

    if (!title.trim()) {
      setError("El título del stream es obligatorio")
      return
    }

    const streamConfig: StreamConfig = {
      title: title.trim(),
      category,
      description: description.trim(),
      isLive: true,
      startTime: new Date().toISOString(),
    }

    console.log("[v0] Guardando configuración del stream:", streamConfig)
    localStorage.setItem("activeStream", JSON.stringify(streamConfig))

    console.log("[v0] Navegando a /mi-stream")
    navigate("/mi-stream")
  }

  const handleCancel = () => {
    navigate("/inicio")
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", color: "white", padding: "40px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px", color: "#ff6b35" }}>
          Configurar Stream
        </h1>
        <p style={{ color: "#999", marginBottom: "40px" }}>
          Configura los detalles de tu transmisión antes de comenzar
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Título del Stream */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Título del Stream *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                setError("")
              }}
              placeholder="Ej: Jugando ranked en Valorant"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "white",
                fontSize: "16px",
              }}
            />
          </div>

          {/* Categoría */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "white",
                fontSize: "16px",
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Descripción (opcional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu stream..."
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "white",
                fontSize: "16px",
                resize: "vertical",
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "12px",
                backgroundColor: "#ff6b3520",
                border: "1px solid #ff6b35",
                borderRadius: "8px",
                color: "#ff6b35",
              }}
            >
              {error}
            </div>
          )}

          {/* Botones */}
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <button
              onClick={handleStartStream}
              style={{
                flex: 1,
                padding: "14px",
                backgroundColor: "#ff6b35",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Iniciar Transmisión
            </button>
            <button
              onClick={handleCancel}
              style={{
                flex: 1,
                padding: "14px",
                backgroundColor: "transparent",
                border: "2px solid #ff6b35",
                borderRadius: "8px",
                color: "#ff6b35",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
