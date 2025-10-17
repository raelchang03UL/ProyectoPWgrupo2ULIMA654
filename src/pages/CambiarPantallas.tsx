import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PantallaGeneral from "./PantallaGeneral"
import TiendaPage from "./Tienda"
import Nosotros from "./Nosotros"
import TyC from "./TyC"
import LiveStreamPage from "./LiveStreamPage"
import CategoryStreamersPage from "./CategoryStreamersPage"
import Perfil from "./Perfil"
import ConfigurarStream from "./ConfigurarStream"
import RegisterPage from "./RegisterPage"
import Layout from "../components/Layout"

const CambiarPantallas = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <PantallaGeneral />
            </Layout>
          }
        />
        <Route
          path="/inicio"
          element={
            <Layout>
              <PantallaGeneral />
            </Layout>
          }
        />
        <Route
          path="/regalos"
          element={
            <Layout>
              <TiendaPage />
            </Layout>
          }
        />
        <Route
          path="/nosotros"
          element={
            <Layout>
              <Nosotros />
            </Layout>
          }
        />
        <Route
          path="/terminos"
          element={
            <Layout>
              <TyC />
            </Layout>
          }
        />
        <Route
          path="/perfil"
          element={
            <Layout>
              <Perfil />
            </Layout>
          }
        />
        <Route
          path="/category/:categoryId"
          element={
            <Layout>
              <CategoryStreamersPage />
            </Layout>
          }
        />
        <Route
          path="/live/:streamerId"
          element={
            <Layout>
              <LiveStreamPage />
            </Layout>
          }
        />
        <Route
          path="/configurar-stream"
          element={
            <Layout>
              <ConfigurarStream />
            </Layout>
          }
        />
        <Route
          path="/mi-stream"
          element={
            <Layout>
              <LiveStreamPage />
            </Layout>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default CambiarPantallas
