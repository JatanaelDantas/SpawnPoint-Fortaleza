import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import './LojistaLayout.css';

const LojistaLayout = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

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
          <Link to="/lojista/visao-geral" className={isActive('/lojista/visao-geral') || isActive('/lojista') ? 'active' : ''}>DASHBOARD</Link>
          <Link to="/lojista/meu-estabelecimento" className={isActive('/lojista/meu-estabelecimento')}>MEU LOCAL</Link>
          <Link to="/lojista/meus-eventos" className={isActive('/lojista/meus-eventos')}>EVENTOS</Link>
          <Link to="/lojista/comunidade" className={isActive('/lojista/comunidade')}>COMUNIDADE</Link>
        </nav>
        
        <div className="header-actions">
          <div className="radar-status">
            <span className="dot"></span> RADAR ATIVO
          </div>
          <div className="user-avatar">
            <div className="avatar-circle">KW</div>
            <div className="avatar-circle dark">K</div>
          </div>
        </div>
      </header>

      <div className="lojista-body">
        <aside className="lojista-sidebar">
          <h3 className="sidebar-title">ÁREA DO LOJISTA</h3>
          <nav className="side-nav">
            <Link to="/lojista/visao-geral" className={isActive('/lojista/visao-geral') || isActive('/lojista') ? 'active' : ''}>
              Visão geral
            </Link>
            <Link to="/lojista/meu-estabelecimento" className={isActive('/lojista/meu-estabelecimento')}>
              Meu estabelecimento
            </Link>
            <Link to="/lojista/meus-eventos" className={isActive('/lojista/meus-eventos')}>
              Meus eventos
            </Link>
            <Link to="/lojista/comunidade" className={isActive('/lojista/comunidade')}>
              Comunidade
            </Link>
            <Link to="/lojista/estatisticas" className={isActive('/lojista/estatisticas')}>
              Estatísticas
            </Link>
            <Link to="/lojista/configuracoes" className={isActive('/lojista/configuracoes')}>
              Configurações
            </Link>
          </nav>
          <button className="btn-map">Ver mapa público</button>
        </aside>

        <main className="lojista-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LojistaLayout;