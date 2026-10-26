import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './PerfilLayout.css';

const PerfilLayout = () => {
  return (
    <div className="lojista-container">
      <header className="lojista-header">
        <div className="logo-container">
          <span className="logo-icon">🎮</span>
          <div className="logo-text">
            <strong>SPAWNPOINT</strong>
            <span>FORTALEZA</span>
          </div>
        </div>
        
        <nav className="top-nav">
          <Link to="/lojista/visao-geral">DASHBOARD</Link>
          <Link to="/lojista/meu-estabelecimento">MEU LOCAL</Link>
          <Link to="/lojista/meus-eventos">EVENTOS</Link>
          <Link to="/lojista/comunidade">COMUNIDADE</Link>
        </nav>
        
        <div className="header-actions">
          <div className="radar-status">
            <span className="dot"></span> RADAR ATIVO
          </div>
          <Link to="/lojista/perfil" className="user-profile-btn" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div className="avatar-circle">K</div>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>KAHYK</span>
          </Link>
        </div>
      </header>

      <main style={{ flex: 1, padding: '3rem 6rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PerfilLayout;