import React from 'react';
import BarraNavegacao from '../components/BarraNavegacao';
import '../pages/Mapa.css';

export default function Eventos() {
  const logado = localStorage.getItem('token') !== null;

  return (
    <div className="mapa-wrapper" style={{ backgroundColor: '#121212' }}>
      <BarraNavegacao logado={logado} handleLogout={() => {}} />
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', color: 'white' }}>
        <span className="city-tag" style={{ marginBottom: '10px' }}>AGENDA DA COMUNIDADE</span>
        <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 20px 0' }}>EVENTOS</h1>
        <p style={{ color: '#aaa', fontSize: '18px', textAlign: 'center', maxWidth: '600px' }}>
          Eventos em breve! Primeiro, faça login para curiar os encontros, torneios e campeonatos da comunidade geek de Fortaleza.
        </p>
      </div>
    </div>
  );
}