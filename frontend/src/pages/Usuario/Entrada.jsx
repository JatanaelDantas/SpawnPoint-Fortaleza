import React from 'react';
import { useNavigate } from 'react-router-dom';
import BarraNavegacao from '../components/BarraNavegacao';
import '../pages/Mapa.css';

export default function Entrada() {
  const navigate = useNavigate();
  const logado = localStorage.getItem('token') !== null;

  return (
    <div className="mapa-wrapper" style={{ backgroundColor: '#121212', overflowY: 'auto' }}>
      <BarraNavegacao logado={logado} handleLogout={() => {}} />
      
      <main style={{ padding: '120px 40px 40px', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
        <div style={{ marginBottom: '40px' }}>
          <span className="city-tag">FORTALEZA — CEARÁ</span>
          <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '10px 0' }}>
            SPAWNPOINT <span className="text-orange">FORTALEZA</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: '18px' }}>Seu próximo encontro começa aqui.</p>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Card Explorar */}
          <div style={{ flex: 1, backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
            <div style={{ color: '#ff6b00', marginBottom: '15px' }}>
              {/* Ícone de Mapa */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 6v16l7-4.03L15 22l8-4.03V2l-8 4.03L8 2 1 6z"/><path d="M8 2v16M15 6v16"/></svg>
            </div>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Explorar Fortaleza</h2>
            <p style={{ color: '#aaa', marginBottom: '30px', lineHeight: '1.5' }}>
              Descubra lojas, eventos, campeonatos e pontos geek próximos de você.
            </p>
            <button 
              onClick={() => navigate('/mapa')}
              style={{ width: '100%', padding: '12px', backgroundColor: '#ff6b00', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Ver mapa →
            </button>
          </div>

          {/* Card Entrar */}
          <div style={{ flex: 1, backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
            <div style={{ color: '#00cc66', marginBottom: '15px' }}>
               {/* Ícone de Controle */}
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"/><path d="M6 12h4m-2-2v4m8-2h.01M16 10h.01"/></svg>
            </div>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Entrar no SpawnPoint</h2>
            <p style={{ color: '#aaa', marginBottom: '30px', lineHeight: '1.5' }}>
              Faça login para participar da comunidade, fazer check-ins, encontrar rotas, participar de eventos e desbloquear conquistas.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => navigate('/login')}
                style={{ flex: 1, padding: '12px', backgroundColor: '#ff6b00', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Entrar
              </button>
              <button 
                style={{ flex: 1, padding: '12px', backgroundColor: 'transparent', color: 'white', border: '1px solid #333', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Criar conta
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}