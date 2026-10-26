import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './MeuEstabelecimento.css';


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


function UpdateMapCenter({ center }) {
  const map = useMap();
  map.flyTo(center, 16); 
  return null;
}

const MeuEstabelecimento = () => {
  const [endereco, setEndereco] = useState("Av. da Universidade, 1200 - Fortaleza, CE");
  const [lat, setLat] = useState("-3.7405");
  const [lng, setLng] = useState("-38.5395");
  const [buscando, setBuscando] = useState(false);

  const position = [parseFloat(lat) || -3.7405, parseFloat(lng) || -38.5395];


  const buscarCoordenadasPorEndereco = async () => {
    if (!endereco) return;
    setBuscando(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setLat(data[0].lat);
        setLng(data[0].lon);
      } else {
        alert("Endereço não encontrado no mapa. Tente incluir 'Fortaleza, CE'.");
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    } finally {
      setBuscando(false);
    }
  };

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

        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Endereço em Fortaleza/CE</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={endereco} 
              onChange={(e) => setEndereco(e.target.value)}
              onBlur={buscarCoordenadasPorEndereco} 
              placeholder="Ex: Av. Santos Dumont, 3000, Fortaleza - CE"
            />
            <button 
              type="button" 
              onClick={buscarCoordenadasPorEndereco}
              disabled={buscando}
              style={{
                padding: '0 16px',
                background: '#aa3bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: 'bold'
              }}
            >
              {buscando ? 'Buscando...' : 'Buscar no mapa'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Horário de funcionamento</label>
          <input type="text" defaultValue="Seg a sáb, 13h às 22h" />
        </div>

        <div className="form-group">
          <label>Instagram</label>
          <input type="text" defaultValue="@geekhouse.fic" />
        </div>

        <div className="form-group">
          <label>Latitude</label>
          <input 
            type="text" 
            value={lat} 
            onChange={(e) => setLat(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Longitude</label>
          <input 
            type="text" 
            value={lng} 
            onChange={(e) => setLng(e.target.value)} 
          />
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
        <div className="mapa-placeholder" style={{ height: '320px', width: '100%', padding: 0, overflow: 'hidden' }}>
          <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
            <UpdateMapCenter center={position} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Sua Localização</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      <button className="btn-salvar">Salvar e enviar para aprovação</button>
    </div>
  );
};

export default MeuEstabelecimento;