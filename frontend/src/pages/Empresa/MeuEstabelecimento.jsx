import React from 'react';
import './MeuEstabelecimento.css';

const MeuEstabelecimento = () => {
  return (
    <div className="estabelecimento-container">
      <h1>Meu estabelecimento</h1>
      <div className="status-badge">
        <span className="dot-orange"></span> Aguardando aprovação
      </div>

      <form className="form-grid">
        <div className="form-group">
          <label>Nome do estabelecimento</label>
          <input type="text" defaultValue="Geek House" />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <input type="text" defaultValue="Mesas, duelos e encontros da comunidade geek de Fortaleza." />
        </div>

        <div className="form-group">
          <label>Endereço em Fortaleza/CE</label>
          <input type="text" defaultValue="Av. da Universidade, 1200 - Fortaleza/CE" />
        </div>
        <div className="form-group">
          <label>Horário de funcionamento</label>
          <input type="text" defaultValue="Seg a sáb, 13h às 22h" />
        </div>

        <div className="form-group">
          <label>Latitude</label>
          <input type="text" defaultValue="-3.7405" />
        </div>
        <div className="form-group">
          <label>Longitude</label>
          <input type="text" defaultValue="-38.5395" />
        </div>

        <div className="form-group">
          <label>Instagram</label>
          <input type="text" defaultValue="@geekhouse.fic" />
        </div>
        <div className="form-group">
          <label>WhatsApp</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Site</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Jogos suportados</label>
          <input type="text" defaultValue="Pokémon TCG, Magic, Yu-Gi-Oh!" />
        </div>

        <div className="form-group">
          <label>Categoria</label>
          <select defaultValue="TCG">
            <option value="TCG">TCG</option>
            <option value="LAN">LAN House</option>
            <option value="BOARD">Board Games</option>
          </select>
        </div>
        <div className="form-group">
          <label>Bairro</label>
          <select defaultValue="Benfica">
            <option value="Benfica">Benfica</option>
            <option value="Aldeota">Aldeota</option>
          </select>
        </div>
      </form>

      <div className="fotos-section">
        <label>Fotos</label>
        <input type="file" />
      </div>

      <div className="mapa-section">
        <label>Localização no mapa</label>
        <div className="mapa-placeholder">
          <p>Área reservada para o Mapa</p>
        </div>
      </div>

      <button className="btn-salvar">Salvar e enviar para aprovação</button>
    </div>
  );
};

export default MeuEstabelecimento;