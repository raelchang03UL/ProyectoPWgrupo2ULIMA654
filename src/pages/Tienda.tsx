"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "../estilos/Tienda.css"
import PayUCheckoutForm from "../components/PayUCheckoutForm"

// Interfaces
interface CoinPack {
  amount: number
  price: string
  pointsAwarded: number
}
interface Regalo {
  id: number
  nombre: string
  costo: number
  emoji: string
}
interface UserData {
  name: string
  email: string
  monedas: number
  puntos: number
}

// Datos
const coinPacks: CoinPack[] = [
  { amount: 100, price: "S/ 5.00", pointsAwarded: 10 },
  { amount: 550, price: "S/ 25.00", pointsAwarded: 60 },
  { amount: 1200, price: "S/ 50.00", pointsAwarded: 150 },
]
const regalosCatalogo: Regalo[] = [
  { id: 1, nombre: "Rosa", costo: 5, emoji: "🌹" },
  { id: 2, nombre: "Aplauso", costo: 10, emoji: "👏" },
  { id: 3, nombre: "Corazón", costo: 25, emoji: "❤️" },
  { id: 4, nombre: "Fuego", costo: 50, emoji: "🔥" },
  { id: 5, nombre: "ULIMA GOAT", costo: 100, emoji: "🐐" },
  { id: 6, nombre: "Diamante", costo: 250, emoji: "💎" },
  { id: 7, nombre: "Cohete", costo: 500, emoji: "🚀" },
  { id: 8, nombre: "Trofeo", costo: 750, emoji: "🏆" },
  { id: 9, nombre: "Castillo", costo: 1000, emoji: "🏰" },
  { id: 10, nombre: "León", costo: 2500, emoji: "🦁" },
]

const TiendaPage = () => {
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [payuCheckout, setPayuCheckout] = useState<{
    amount: number
    description: string
  } | null>(null)

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const updateBalances = (nuevasMonedas: number, nuevosPuntos: number) => {
    if (!currentUser) return
    const updatedUser = { ...currentUser, monedas: nuevasMonedas, puntos: nuevosPuntos }
    setCurrentUser(updatedUser)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))
    const allUsers: UserData[] = JSON.parse(localStorage.getItem("users") || "[]")
    const userIndex = allUsers.findIndex((u) => u.email === currentUser.email)
    if (userIndex !== -1) {
      allUsers[userIndex] = updatedUser
      localStorage.setItem("users", JSON.stringify(allUsers))
    }
  }

  const comprarMonedas = (pack: CoinPack) => {
    if (!currentUser) {
      alert("Debes iniciar sesión para poder comprar monedas.")
      return
    }

    console.log("[v0] Iniciando proceso de pago con PayU...")
    console.log("[v0] Paquete seleccionado:", pack)
    console.log("[v0] Usuario:", currentUser.email)

    const pendingTransaction = {
      amount: pack.amount,
      price: pack.price,
      pointsAwarded: pack.pointsAwarded,
      userId: currentUser.email,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("pendingTransaction", JSON.stringify(pendingTransaction))

    const amountNumber = Number.parseFloat(pack.price.replace("S/", "").trim())

    setPayuCheckout({
      amount: amountNumber,
      description: `Paquete de ${pack.amount} monedas`,
    })
  }

  const canjearPuntos = () => {
    if (!currentUser) {
      alert("Debes iniciar sesión para canjear puntos.")
      return
    }
    if (currentUser.puntos < 100) {
      alert("No tienes suficientes puntos para canjear.")
      return
    }
    const nuevosPuntos = currentUser.puntos - 100
    const nuevasMonedas = currentUser.monedas + 10
    updateBalances(nuevasMonedas, nuevosPuntos)
    alert(`¡Canjeaste 100 puntos por 10 monedas!`)
  }

  return (
    <div className="tienda-container">
      {payuCheckout && currentUser && (
        <PayUCheckoutForm
          amount={payuCheckout.amount}
          description={payuCheckout.description}
          buyerEmail={currentUser.email}
          onSubmit={() => {
            console.log("[v0] Redirigiendo a PayU...")
          }}
        />
      )}

      <div className="header-tienda">
        <h1 className="text-warning">Tienda</h1>
        <div className="balance-info">
          <span>
            Tienes: <strong>{currentUser?.monedas ?? 0}</strong> 🪙
          </span>
          <span>
            Puntos: <strong>{currentUser?.puntos ?? 0}</strong> ⭐
          </span>
        </div>
      </div>
      <section className="seccion-comprar">
        <h2>Comprar Monedas</h2>
        <div className="packs-grid">
          {coinPacks.map((pack) => (
            <div key={pack.amount} className="pack-card">
              <h4>{pack.amount} 🪙</h4>
              <p className="price-tag">{pack.price}</p>
              <p className="points-bonus">+ {pack.pointsAwarded} Puntos ⭐</p>
              <button className="btn-comprar" onClick={() => comprarMonedas(pack)}>
                Comprar
              </button>
            </div>
          ))}
        </div>
      </section>
      <section className="seccion-catalogo">
        <h2>Catálogo de Regalos Virtuales</h2>
        <p className="subtitle">Usa tus monedas para enviar estos regalos durante los streams</p>
        <div className="gifts-grid">
          {regalosCatalogo.map((regalo) => (
            <div key={regalo.id} className="gift-card">
              <span className="emoji">{regalo.emoji}</span>
              <span className="nombre">{regalo.nombre}</span>
              <span className="costo">{regalo.costo} 🪙</span>
            </div>
          ))}
        </div>
      </section>
      <section className="seccion-canjear">
        <h2>Canjear Puntos</h2>
        <div className="canje-card">
          <p>Convierte tus puntos de lealtad en poder de compra.</p>
          <div className="conversion-info">
            <span>100 ⭐</span>
            <span className="arrow">→</span>
            <span>10 🪙</span>
          </div>
          <button className="btn-canjear" onClick={canjearPuntos}>
            Canjear Ahora
          </button>
        </div>
      </section>
    </div>
  )
}

export default TiendaPage
