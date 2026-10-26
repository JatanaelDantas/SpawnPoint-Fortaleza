import React, { useState } from 'react';
import './PerfilLojista.css';

const PerfilLojista = () => {
  const [usuario, setUsuario] = useState({
    nome: 'KAHYK',
    iniciais: 'KW',
    localizacao: 'Fortaleza — Ceará'
  });

  const [estatisticas, setEstatisticas] = useState({
    checkins: 0,
    eventosConfirmados: 0,
    bairrosExplorados: 0
  });

  return (
    <div className="perfil-page-container">
      <span className="explorador-tag">EXPLORADOR</span>
      <h1 className="perfil-title">PERFIL</h1>
      <p className="perfil-subtitle">Seu histórico de exploração pela cena geek de Fortaleza.</p>

      <div className="user-card">
        <div className="user-card-info">
          <div className="user-avatar-large">{usuario.iniciais}</div>
          <div className="user-details">
            <h2>{usuario.nome}</h2>
            <p>{usuario.localizacao}</p>
          </div>
        </div>
        <button className="btn-sair">SAIR</button>
      </div>

      <div className="perfil-stats-grid">
        <div className="perfil-stat-card">
          <h3>{estatisticas.checkins}</h3>
          <span>CHECK-INS</span>
        </div>
        <div className="perfil-stat-card">
          <h3>{estatisticas.eventosConfirmados}</h3>
          <span>EVENTOS CONFIRMADOS</span>
        </div>
        <div className="perfil-stat-card">
          <h3>{estatisticas.bairrosExplorados}</h3>
          <span>BAIRROS EXPLORADOS</span>
        </div>
      </div>

      <div className="empty-box">NENHUM CHECK-IN REGISTRADO AINDA.</div>

      <div className="locais-salvos-section">
        <h3>Locais salvos</h3>
        <p>Nenhum local salvo.</p>
      </div>
    </div>
  );
};

export default PerfilLojista;