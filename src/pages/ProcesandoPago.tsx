"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Página de procesamiento de pago
 *
 * SIMULACIÓN: Esta página simula el proceso de pago en Stripe
 * En producción, el usuario estaría en la página de Stripe Checkout
 */
const ProcesandoPago = () => {
  const navigate = useNavigate()

  console.log("[v0] ProcesandoPago - Componente renderizado")

  useEffect(() => {
    console.log("[v0] ProcesandoPago montado - iniciando simulación de pago")

    // SIMULACIÓN: Simular el proceso de pago (3 segundos)
    const timer = setTimeout(() => {
      console.log("[v0] Simulación de pago completada - procesando transacción")

      // SIMULACIÓN: Acreditar monedas (en producción esto lo hace el backend vía Webhook)
      const pendingTransaction = localStorage.getItem("pendingTransaction")

      if (pendingTransaction) {
        const transaction = JSON.parse(pendingTransaction)
        console.log("[v0] Transacción pendiente encontrada:", transaction)

        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
        const users = JSON.parse(localStorage.getItem("users") || "[]")

        // Actualizar monedas y puntos del usuario
        const updatedUsers = users.map((user: any) => {
          if (user.email === currentUser.email) {
            return {
              ...user,
              monedas: (user.monedas || 0) + transaction.amount,
              puntos: (user.puntos || 0) + transaction.pointsAwarded,
            }
          }
          return user
        })

        localStorage.setItem("users", JSON.stringify(updatedUsers))

        // Actualizar usuario actual
        const updatedCurrentUser = {
          ...currentUser,
          monedas: (currentUser.monedas || 0) + transaction.amount,
          puntos: (currentUser.puntos || 0) + transaction.pointsAwarded,
        }
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser))
        console.log("[v0] Usuario actualizado:", updatedCurrentUser)

        // Guardar transacción completada
        localStorage.setItem("completedTransaction", pendingTransaction)
        localStorage.removeItem("pendingTransaction")
      }

      // Redirigir a página de éxito
      console.log("[v0] Redirigiendo a página de éxito")
      navigate("/tienda/recarga-exitosa")
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

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
      <div style={{ textAlign: "center", maxWidth: "500px" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            border: "4px solid #2a2a2a",
            borderTop: "4px solid #ff6f00",
            borderRadius: "50%",
            margin: "0 auto 30px",
            animation: "spin 1s linear infinite",
          }}
        />
        <h2 style={{ color: "#fff", fontSize: "2rem", marginBottom: "15px" }}>Procesando Pago...</h2>
        <p style={{ color: "#aaa", fontSize: "1.1rem", marginBottom: "10px" }}>
          Estamos procesando tu transacción de forma segura
        </p>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>Por favor, no cierres esta ventana</p>

        <div
          style={{
            backgroundColor: "#1a1a1a",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "30px",
            border: "1px solid #2a2a2a",
          }}
        >
          <p style={{ color: "#aaa", fontSize: "0.85rem", margin: 0 }}>🔒 Transacción protegida con encriptación SSL</p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ProcesandoPago
