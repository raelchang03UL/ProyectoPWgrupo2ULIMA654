"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("usuario")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const allUsersData = localStorage.getItem("allUsers")

    if (allUsersData) {
      const allUsers = JSON.parse(allUsersData)
      const foundUser = allUsers.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        // Guardar sesión del usuario actual
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("currentUser", JSON.stringify(foundUser))
        localStorage.setItem("currentRole", selectedRole)

        console.log("[v0] Usuario encontrado:", foundUser)
        alert(`Bienvenido de nuevo, ${foundUser.name}!`)
        navigate("/inicio")
      } else {
        setErrors({ password: "Credenciales incorrectas" })
      }
    } else {
      setErrors({ email: "No se encontró ningún usuario registrado" })
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="card bg-secondary p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3 text-warning">Iniciar Sesión</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email:</label>
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
          </div>

          <div className="mb-3">
            <label>Selecciona tu rol:</label>
            <select className="form-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="usuario">Espectador</option>
              <option value="streamer">Streamer</option>
            </select>
          </div>

          <button className="btn btn-warning w-100" type="submit">
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center mt-3">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-light text-decoration-underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
