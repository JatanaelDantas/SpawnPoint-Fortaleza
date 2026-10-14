import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';
import { createSpawnPin, PIN_ICONS } from '../components/SpawnPin';

export default function Mapa() {
  const navigate = useNavigate();
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setLogado(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    setLogado(false);
  };

  return (
    <div className="mapa-wrapper">
      
      {/* 1. NAVBAR SUPERIOR */}
      <header className="hud-navbar">
        <div className="logo-container">
          <span className="logo-text"><span className="text-orange">SPAWN</span>POINT<br/><span className="logo-sub">FORTALEZA</span></span>
        </div>
        
        <nav className="nav-links">
          <button>SPAWNPOINT</button>
          <button className="active">MAPA</button>
          <button>EVENTOS</button>
        </nav>
        
        <div className="nav-actions">
           <div className="radar-status">
              <div className="dot-green"></div> RADAR ATIVO
           </div>
           {!logado ? (
              <button onClick={() => navigate('/login')} className="btn-outline-orange">
                ENTRAR
              </button>
            ) : (
              <button onClick={handleLogout} className="btn-outline-orange">
                SAIR
              </button>
            )}
        </div>
      </header>

      {/* 2. PAINEL DE PESQUISA */}
      <div className="hud-search-panel">
        <div className="location-info">
          <span className="city-tag">FORTALEZA — CEARÁ</span>
          <h2>DESCUBRA ONDE A COMUNIDADE GEEK ESTÁ.</h2>
        </div>
        
        <div className="search-box-container">
          <div className="search-input-wrapper">
             <input type="text" placeholder="Procure por loja, evento, jogo ou bairro..." />
          </div>
          <button className="btn-filtros">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6"/></svg> 
             FILTROS
          </button>
        </div>
      </div>

      {/* 3. BOTÕES INFERIORES */}
      <div className="hud-bottom-left">
         <button className="btn-dark radar-btn">
            <div className="dot-green"></div> RADAR ATIVO
         </button>
      </div>
      
      <div className="hud-bottom-right">
        <button className="btn-dark">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
           LEGENDA
        </button>
        <button className="btn-dark">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
           PERTO DE MIM
        </button>
      </div>

      {/* 4. O MAPA */}
      <MapContainer 
        center={[-3.7327, -38.5270]} 
        zoom={13} 
        className="map-container custom-map-filter" 
        zoomControl={false} 
      >
        {/* TILE LAYER GRATUITO */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* PIN */}
        <Marker 
          position={[-3.7686, -38.4820]} 
          icon={createSpawnPin('#ff6b00', PIN_ICONS.GAMES)}
        > 
          <Popup className="custom-popup">
            <div className="popup-content">
              <b>Centro TCG Universitário</b><br />
              <span>Biblioteca da UNIFOR</span><br/>
              <i>Mesas de tabuleiro disponíveis.</i>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}