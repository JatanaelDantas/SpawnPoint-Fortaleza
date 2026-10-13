import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Mapa() {
  const navigate = useNavigate();
  const [logado, setLogado] = useState(false);

  // Coordenadas centrais de Fortaleza
  const position = [-3.7327, -38.5270];

  useEffect(() => {
    // Verifica se o usuário tem token para mudar os botões
    const token = localStorage.getItem('token');
    if (token) {
      setLogado(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    setLogado(false);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '20px', 
        zIndex: 1000, 
        display: 'flex', 
        gap: '10px' 
      }}>
        {!logado ? (
          <>
            <button 
              onClick={() => navigate('/login')} 
              className="btn-primary" 
              style={{ padding: '8px 16px', background: 'rgba(0,0,0,0.7)', border: '1px solid #aa3bff' }}>
              LOGIN
            </button>
            <button 
              onClick={() => navigate('/register')} 
              className="btn-primary" 
              style={{ padding: '8px 16px', background: '#aa3bff', border: 'none' }}>
              CADASTRO
            </button>
          </>
        ) : (
          <button 
            onClick={handleLogout} 
            className="btn-primary" 
            style={{ padding: '8px 16px', background: '#ff0055', border: 'none' }}>
            SAIR
          </button>
        )}
      </div>

      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(0,0,0,0.8)',
        padding: '10px 20px',
        borderRadius: '8px',
        color: '#fff',
        border: '1px solid #aa3bff'
      }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>SPAWNPOINT</h2>
      </div>

      {/* O Mapa em si */}
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        
        {/* Usando o mapa gratuito do OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <b>Centro de Fortaleza</b> <br /> Um potencial SpawnPoint!
          </Popup>
        </Marker>
        
      </MapContainer>
    </div>
  );
}