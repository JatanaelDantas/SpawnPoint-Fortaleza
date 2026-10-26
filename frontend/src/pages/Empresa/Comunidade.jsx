import React from 'react';
import './Comunidade.css';

const Comunidade = () => {
  return (
    <div className="comunidade-container">
      <h1>Comunidade</h1>
      
      <div className="comunidade-header">
        <h2>Comunidade de Geek House</h2>
        <p>48 seguidores · Pokémon TCG, Magic e Board Games</p>
      </div>

      <div className="comunidade-lista">
        <div className="comunidade-item">
          <p>Duelo da semana — 12 interessados</p>
        </div>
        <div className="comunidade-item">
          <p>Mesa de sábado — 8 participantes</p>
        </div>
      </div>
    </div>
  );
};

export default Comunidade;