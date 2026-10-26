import React from 'react';
import './Estatisticas.css';

const Estatisticas = () => {
  return (
    <div className="estatisticas-container">
      <h1>Estatísticas</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h2>1</h2>
          <span>Eventos ativos</span>
        </div>
        <div className="stat-card">
          <h2>12</h2>
          <span>Check-ins hoje</span>
        </div>
        <div className="stat-card">
          <h2>24</h2>
          <span>Pessoas interessadas</span>
        </div>
        <div className="stat-card">
          <h2>48</h2>
          <span>Seguidores/favoritos</span>
        </div>
      </div>

      <p className="footer-note-estatisticas">Indicadores demonstrativos do estabelecimento, sem analytics real.</p>
    </div>
  );
};

export default Estatisticas;