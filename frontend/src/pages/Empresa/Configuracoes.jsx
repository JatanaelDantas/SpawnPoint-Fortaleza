import React from 'react';
import './Configuracoes.css';

const Configuracoes = () => {
  return (
    <div className="configuracoes-container">
      <h1>Configurações</h1>
      
      <div className="config-option">
        <input type="checkbox" id="avisos" defaultChecked />
        <label htmlFor="avisos">Receber avisos de inscrições</label>
      </div>

      <button className="btn-salvar-pref">Salvar preferências</button>
    </div>
  );
};

export default Configuracoes;