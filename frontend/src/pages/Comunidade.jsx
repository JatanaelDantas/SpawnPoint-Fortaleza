import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BarraNavegacao from '../components/BarraNavegacao';
import './Comunidade.css';

export default function Comunidade() {
  const [ranking, setRanking] = useState([]);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // Integração futura com o backend
  }, []);

  const getCategoriaCor = (categoria) => {
    const cores = {
      'TCG': '#ff9f43',
      'BOARDGAMES': '#1dd1a1',
      'ARCADE': '#ff6b6b',
      'GAMES': '#54a0ff',
      'FOOD': '#c56cf0',
      'EVENTOS': '#feca57'
    };
    return cores[categoria?.toUpperCase()] || '#a4b0be';
  };

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <BarraNavegacao logado={isAuthenticated} handleLogout={logout} />

      <div className="page-container">
        <header className="page-header">
          <span className="subtitle">PULSO DA CIDADE</span>
          <h1 className="title">COMUNIDADE</h1>
          <p className="description">
            Onde a comunidade geek de Fortaleza está se movimentando hoje.
          </p>
        </header>

        {ranking.length === 0 ? (
          <div className="empty-state">Nenhum dado de check-in recente disponível.</div>
        ) : (
          <div className="ranking-list">
            {ranking.map((local, index) => (
              <div key={local.id} className="ranking-item">
                <div className="rank-position">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                <div className="local-info">
                  <h3 className="local-nome">{local.nome}</h3>
                  <span className="local-bairro">{local.bairro}</span>
                </div>

                <div className="local-categoria-badge" style={{ borderColor: getCategoriaCor(local.categoria) }}>
                  <span className="dot" style={{ backgroundColor: getCategoriaCor(local.categoria) }}></span>
                  {local.categoria}
                </div>

                <div className="local-stats">
                  <span className="checkin-count">{local.checkins}</span>
                  <span className="checkin-label">CHECK-INS</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}