import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("usuario");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { name, email, password, role };
    localStorage.setItem("userData", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "true");

    alert(`Su registro ha sido exitoso, Bienvenido ${name}`);
    navigate("/inicio");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="card bg-secondary p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3 text-warning">Crear Cuenta</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Rol:</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="usuario">Usuario (Espectador)</option>
              <option value="streamer">Streamer</option>
            </select>
          </div>

          <button className="btn btn-warning w-100" type="submit">
            Registrarse
          </button>
        </form>
        <p className="text-center mt-3">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-light text-decoration-underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
