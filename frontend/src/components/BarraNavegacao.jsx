import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function BarraNavegacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, openAuthModal, requireAuth } = useAuth();

  const isActive = (path) => (location.pathname === path ? "active" : "");

 
  const handlePerfilClick = () => {
    requireAuth(() => {
      console.log('A tela de Perfil está em desenvolvimento.');
    });
  };

  return (
    <header className="hud-navbar">
      <div 
        className="logo-container" 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer' }}
      >
        <span className="logo-text">
          <span className="text-orange">SPAWN</span>POINT<br/>
          <span className="logo-sub">FORTALEZA</span>
        </span>
      </div>
      
      <nav className="nav-links">
        <button 
          className={isActive('/')} 
          onClick={() => navigate('/')}
        >
          SPAWNPOINT
        </button>

        <button 
          className={isActive('/mapa')} 
          onClick={() => navigate('/mapa')}
        >
          MAPA
        </button>

        <button 
          className={isActive('/eventos')} 
          onClick={() => navigate('/eventos')}
        >
          EVENTOS
        </button>

       
        <button 
          className={isActive('/comunidade')} 
          onClick={() => navigate('/comunidade')}
        >
          COMUNIDADE
        </button>

        
        <button 
          className={isActive('/perfil')} 
          onClick={handlePerfilClick}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          PERFIL
          <span style={devBadgeStyle}>
            EM DEV
          </span>
        </button>
      </nav>
      
      <div className="nav-actions">
        {!isAuthenticated ? (
          <button onClick={openAuthModal} className="btn-outline-orange">
            ENTRAR
          </button>
        ) : (
          <button onClick={logout} className="btn-outline-orange">
            SAIR
          </button>
        )}
      </div>
    </header>
  );
}


const devBadgeStyle = {
  fontSize: '0.55rem',
  backgroundColor: '#ff6b00',
  color: '#ffffff',
  padding: '0.1rem 0.35rem',
  borderRadius: '3px',
  fontWeight: '800',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
};