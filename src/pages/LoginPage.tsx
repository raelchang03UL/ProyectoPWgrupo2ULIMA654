import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("userData");

    if (!storedUser) {
      setError("No hay usuarios registrados. Regístrate primero.");
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");


      localStorage.setItem("currentRole", user.role);


      if (user.role === "streamer") {
        navigate("/inicio"); 
      } else {
        navigate("/inicio");
      }
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="card bg-secondary p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3 text-warning">Iniciar Sesión</h3>
        <form onSubmit={handleLogin}>
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
          {error && <p className="text-danger">{error}</p>}
          <button className="btn btn-warning w-100" type="submit">
            Ingresar
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
  );
};

export default LoginPage;
