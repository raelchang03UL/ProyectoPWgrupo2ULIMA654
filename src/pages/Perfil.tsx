import { useEffect, useState } from "react";
import "../estilos/Perfil.css";

interface StreamerProfile {
  name: string;
  description: string;
  followers: number;
  totalHours: number;
}

const defaultProfile: StreamerProfile = {
  name: "Tu Nombre",
  description: "Escribe una breve descripción sobre ti como streamer...",
  followers: 0,
  totalHours: 0,
};

const Perfil = () => {
  const [profile, setProfile] = useState<StreamerProfile>(defaultProfile);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("streamerProfile");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const saveProfile = (next: StreamerProfile) => {
    setProfile(next);
    localStorage.setItem("streamerProfile", JSON.stringify(next));
  };

  const handleAddHours = (hours: number) => {
    const next = { ...profile, totalHours: profile.totalHours + hours };
    saveProfile(next);
  };

  const handleAddFollower = () => {
    const next = { ...profile, followers: profile.followers + 1 };
    saveProfile(next);
  };

  const handleSaveEdits = () => {
    saveProfile(profile);
    setEditMode(false);
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        
        <div className="perfil-meta">
          {editMode ? (
            <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          ) : (
            <h2>{profile.name}</h2>
          )}
          <p className="perfil-followers">{profile.followers.toLocaleString()} seguidores</p>
          <p className="perfil-hours">{profile.totalHours} horas transmitidas</p>
        </div>
        <div className="perfil-actions">
          <button className="btn-ulima-outline" onClick={() => handleAddFollower()}>+ Seguidor</button>
          <button className="btn-ulima-outline" onClick={() => handleAddHours(1)}>+1 hora</button>
          <button className="btn-ulima" onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancelar' : 'Editar Perfil'}</button>
        </div>
      </div>

      <div className="perfil-body">
        <section className="perfil-about">
          <h3>Acerca de</h3>
          {editMode ? (
            <textarea value={profile.description} onChange={(e) => setProfile({ ...profile, description: e.target.value })} />
          ) : (
            <p>{profile.description}</p>
          )}
          {editMode && <button className="btn-ulima" onClick={handleSaveEdits}>Guardar</button>}
        </section>

      </div>
    </div>
  );
};

export default Perfil;