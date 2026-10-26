import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BarraNavegacao from '../components/BarraNavegacao';
import './Eventos.css';

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const { isAuthenticated, logout, requireAuth } = useAuth();

  useEffect(() => {
    // Integração futura com o backend
  }, []);

  const handleInteresse = (eventoId) => {
    requireAuth(() => {
      console.log(`Marcou interesse no evento: ${eventoId}`);
    });
  };

  const handleParticipar = (eventoId) => {
    requireAuth(() => {
      console.log(`Confirmou participação no evento: ${eventoId}`);
    });
  };

  const getCategoriaCor = (categoria) => {
    const cores = {
      'TCG': '#ff9f43',
      'BOARDGAMES': '#1dd1a1',
      'ARCADE': '#ff6b6b',
      'GAMES': '#54a0ff',
      'EVENTOS': '#feca57'
    };
    return cores[categoria?.toUpperCase()] || '#a4b0be';
  };

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <BarraNavegacao logado={isAuthenticated} handleLogout={logout} />
      
      <div className="page-container">
        <header className="page-header">
          <span className="subtitle">AGENDA DA COMUNIDADE</span>
          <h1 className="title">EVENTOS</h1>
          <p className="description">
            Encontros, torneios e campeonatos da comunidade geek de Fortaleza.
          </p>
        </header>

        {eventos.length === 0 ? (
          <div className="empty-state">Nenhum evento programado no momento.</div>
        ) : (
          <div className="eventos-grid">
            {eventos.map((evento) => (
              <div 
                key={evento.id} 
                className="evento-card" 
                style={{ borderLeftColor: getCategoriaCor(evento.categoria) }}
              >
                <div className="evento-info">
                  <span className="evento-categoria" style={{ color: '#a0a0a0' }}>
                    {evento.categoria}
                  </span>
                  <h2 className="evento-titulo">{evento.titulo}</h2>
                  <h3 className="evento-subtitulo">{evento.subtitulo}</h3>
                  
                  <div className="evento-detalhes">
                    <span>🕒 {evento.dataHora}</span>
                    <span>📍 {evento.local}</span>
                    <span>👥 {evento.participantes} participantes</span>
                  </div>
                </div>

                <div className="evento-footer">
                  <span className="evento-preco">
                    {evento.preco === 0 ? 'GRÁTIS' : `R$${evento.preco}`}
                  </span>
                  <div className="evento-acoes">
                    <button 
                      className="btn-interesse" 
                      onClick={() => handleInteresse(evento.id)}
                    >
                      Tenho interesse
                    </button>
                    <button 
                      className="btn-participar" 
                      onClick={() => handleParticipar(evento.id)}
                    >
                      Vou participar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}