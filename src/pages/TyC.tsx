import React from 'react';
import { useNavigate } from "react-router-dom";
import "../estilos/Nosotros.css";

const TyC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Universidad_de_Lima_logo.svg"
        alt="Logo Universidad de Lima"
        className="page-logo"
      />

      <h1 className="page-title text-warning">Términos y Condiciones</h1>

      <div className="text-content">
        <h2>1. Aceptación de los Términos</h2>
        <p>Al registrarte y utilizar la plataforma ULimeñitaPlay, aceptas y te comprometes a cumplir con los presentes términos y condiciones. Si no estás de acuerdo, no debes utilizar el servicio.</p>

        <h2>2. Cuentas de Usuario</h2>
        <p>Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Todas las actividades que ocurran bajo tu cuenta son de tu exclusiva responsabilidad. Debes ser mayor de edad para crear una cuenta.</p>

        <h2>3. Monedas y Puntos</h2>
        <p>Las monedas virtuales adquiridas en la tienda no son reembolsables y no tienen valor monetario fuera de la plataforma ULimeñitaPlay. Los puntos se ganan mediante la compra de monedas o el envío de regalos y pueden ser canjeados según las condiciones establecidas en la tienda.</p>

        <h2>4. Contenido y Conducta</h2>
        <p>No se permite el uso de lenguaje ofensivo, discriminatorio o cualquier tipo de acoso en los chats. ULimeñitaPlay se reserva el derecho de suspender o eliminar cuentas que violen esta normativa sin previo aviso.</p>
      </div>
      
      <button className="btn-ulima" onClick={() => navigate("/inicio")}>
        Regresar al Inicio
      </button>
    </div>
  );
};

export default TyC;