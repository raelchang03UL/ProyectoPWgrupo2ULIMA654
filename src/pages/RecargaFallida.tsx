"use client"

import { useNavigate } from "react-router-dom"

/**
 * Página de recarga fallida o cancelada
 */
const RecargaFallida = () => {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0e0e10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "600px" }}>
        {/* Icono de error */}
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#ef4444",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 30px",
            animation: "shake 0.5s ease-out",
          }}
        >
          <span style={{ fontSize: "3rem", color: "#fff" }}>✕</span>
        </div>

        <h1 style={{ color: "#fff", fontSize: "2.5rem", marginBottom: "15px" }}>Pago Cancelado</h1>
        <p style={{ color: "#aaa", fontSize: "1.2rem", marginBottom: "40px" }}>Tu transacción no pudo ser completada</p>

        {/* Información */}
        <div
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "16px",
            padding: "30px",
            border: "2px solid #ef4444",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ color: "#fff", marginBottom: "15px" }}>Posibles razones:</h3>
          <ul style={{ color: "#aaa", textAlign: "left", lineHeight: "1.8" }}>
            <li>Cancelaste el proceso de pago</li>
            <li>Hubo un problema con tu método de pago</li>
            <li>La transacción fue rechazada por tu banco</li>
            <li>Se agotó el tiempo de la sesión</li>
          </ul>
        </div>

        {/* Botones de acción */}
        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn-ulima"
            onClick={() => navigate("/tienda")}
            style={{ padding: "14px 30px", fontSize: "1rem" }}
          >
            Reintentar Compra
          </button>
          <button
            className="btn-ulima-outline"
            onClick={() => navigate("/inicio")}
            style={{ padding: "14px 30px", fontSize: "1rem" }}
          >
            Volver al Inicio
          </button>
        </div>

        <p style={{ color: "#666", fontSize: "0.9rem", marginTop: "30px" }}>
          Si necesitas ayuda, contacta a nuestro soporte
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  )
}

export default RecargaFallida
