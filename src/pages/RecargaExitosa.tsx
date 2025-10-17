"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Página de confirmación de recarga exitosa
 *
 * En producción:
 * 1. Capturar session_id de la URL
 * 2. Llamar a /api/get-transaction-status?session_id=xxx
 * 3. Mostrar comprobante con datos reales del backend
 */
const RecargaExitosa = () => {
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState<any>(null)

  useEffect(() => {
    // Cargar datos de la transacción completada
    const completedTransaction = localStorage.getItem("completedTransaction")
    if (completedTransaction) {
      setTransaction(JSON.parse(completedTransaction))
      // Limpiar después de mostrar
      setTimeout(() => {
        localStorage.removeItem("completedTransaction")
      }, 1000)
    }
  }, [])

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
        {/* Icono de éxito */}
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#22c55e",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 30px",
            animation: "scaleIn 0.5s ease-out",
          }}
        >
          <span style={{ fontSize: "3rem" }}>✓</span>
        </div>

        <h1 style={{ color: "#fff", fontSize: "2.5rem", marginBottom: "15px" }}>¡Recarga Exitosa!</h1>
        <p style={{ color: "#aaa", fontSize: "1.2rem", marginBottom: "40px" }}>
          Tus monedas han sido acreditadas correctamente
        </p>

        {/* Comprobante */}
        {transaction && (
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderRadius: "16px",
              padding: "30px",
              border: "2px solid #22c55e",
              marginBottom: "30px",
              textAlign: "left",
            }}
          >
            <h3 style={{ color: "#fff", marginBottom: "20px", textAlign: "center" }}>Comprobante de Compra</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #2a2a2a",
                }}
              >
                <span style={{ color: "#aaa" }}>Monedas compradas:</span>
                <span style={{ color: "#fff", fontWeight: "600" }}>{transaction.coins} 💎</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #2a2a2a",
                }}
              >
                <span style={{ color: "#aaa" }}>Monto pagado:</span>
                <span style={{ color: "#fff", fontWeight: "600" }}>${transaction.price} USD</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #2a2a2a",
                }}
              >
                <span style={{ color: "#aaa" }}>Fecha:</span>
                <span style={{ color: "#fff", fontWeight: "600" }}>
                  {new Date(transaction.timestamp).toLocaleString()}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#aaa" }}>Estado:</span>
                <span style={{ color: "#22c55e", fontWeight: "600" }}>✓ Completado</span>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn-ulima"
            onClick={() => navigate("/tienda")}
            style={{ padding: "14px 30px", fontSize: "1rem" }}
          >
            Comprar Más Monedas
          </button>
          <button
            className="btn-ulima-outline"
            onClick={() => navigate("/inicio")}
            style={{ padding: "14px 30px", fontSize: "1rem" }}
          >
            Volver al Inicio
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default RecargaExitosa
