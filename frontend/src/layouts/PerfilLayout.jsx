import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './PerfilLayout.css';

const PerfilLayout = () => {
  return (
    <div className="perfil-layout-container">
      <header className="perfil-header">
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
          {}
          <Link to="/perfil" className="user-profile-btn">
            <div className="avatar-circle">T</div>
            <span className="user-name-header">TESTE </span>
          </Link>
        </div>
      </header>

      <main className="perfil-main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default PerfilLayout;