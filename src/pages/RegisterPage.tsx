"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const RegisterPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    // Validar nombre
    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    } else if (name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres"
    }

    // Validar email
    if (!email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!validateEmail(email)) {
      newErrors.email = "El formato del correo electrónico no es válido"
    }

    // Validar contraseña
    if (!password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    // Validar confirmación de contraseña
    if (!confirmPassword) {
      newErrors.confirmPassword = "Debes confirmar tu contraseña"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const allUsersData = localStorage.getItem("allUsers")
    const allUsers = allUsersData ? JSON.parse(allUsersData) : []

    const existingUser = allUsers.find((u: any) => u.email === email)
    if (existingUser) {
      setErrors({ email: "Este correo electrónico ya está registrado" })
      return
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      password: password,
      puntos: 0,
      horasTransmitidas: 0,
      seguidores: 0,
      monedas: 100, // Monedas iniciales de bienvenida
      regalosRecibidos: 0,
      createdAt: new Date().toISOString(),
    }

    allUsers.push(newUser)
    localStorage.setItem("allUsers", JSON.stringify(allUsers))

    console.log("[v0] Nuevo usuario registrado:", newUser)
    alert(`¡Registro exitoso! Bienvenido, ${newUser.name}`)
    navigate("/")
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="card bg-secondary p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-3 text-warning">Crear Cuenta</h3>
        <form onSubmit={handleRegister}>
          {/* Campo de Nombre */}
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: "" })
              }}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Campo de Email */}
          <div className="mb-3">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: "" })
              }}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: "" })
              }}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            <small className="text-muted">Mínimo 8 caracteres</small>
          </div>

          {/* Campo de Confirmar Contraseña */}
          <div className="mb-3">
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" })
              }}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <button className="btn btn-warning w-100" type="submit">
            Registrarse
          </button>
        </form>
        <p className="text-center mt-3">
          ¿Ya tienes cuenta?{" "}
          <Link to="/" className="text-light text-decoration-underline">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
