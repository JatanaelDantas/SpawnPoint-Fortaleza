import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';
import { createSpawnPin, PIN_ICONS } from '../components/SpawnPin';
import PainelPesquisa from '../components/PainelPesquisa';
import BarraNavegacao from '../components/BarraNavegacao';
// Importação do Hook de Autenticação
import { useAuth } from '../context/AuthContext';

const MOCK_LOCAIS = [
  {
    id: 1,
    nome: "Centro TCG Universitário",
    endereco: "Biblioteca da UNIFOR",
    descricao: "Mesas de tabuleiro disponíveis.",
    categoria: "TCG",
    lat: -3.7686, 
    lng: -38.4820,
    cor: "#ff6b00", 
    icone: PIN_ICONS.STORE 
  },
  {
    id: 2,
    nome: "Bunker Aldeota",
    endereco: "Rua Tibúrcio Cavalcante, 800 - Aldeota",
    descricao: "Lan house focada em e-sports e campeonatos.",
    categoria: "GAMES",
    lat: -3.7345, 
    lng: -38.5023,
    cor: "#0099ff", 
    icone: PIN_ICONS.GAMES
  },
  {
    id: 3,
    nome: "Taverna do Dragão",
    endereco: "Benfica",
    descricao: "Restaurante temático com boardgames e RPG.",
    categoria: "FOOD",
    lat: -3.7412, 
    lng: -38.5350,
    cor: "#aa3bff", 
    icone: PIN_ICONS.FOOD
  },
  {
    id: 4,
    nome: "Arena Retrô",
    endereco: "Centro",
    descricao: "Fliperamas clássicos e jogos arcade.",
    categoria: "ARCADE",
    lat: -3.7250, 
    lng: -38.5270,
    cor: "#ff0055", 
    icone: PIN_ICONS.GAMES
  }
];

export default function Mapa() {
  const navigate = useNavigate();
  const [textoPesquisa, setTextoPesquisa] = useState("");

  // Pega o estado global e a trava de autorização
  const { isAuthenticated, logout, requireAuth } = useAuth();

  // Ação de favoritar protegida
  const handleFavoritar = (local) => {
    requireAuth(() => {
      console.log(`Ponto ${local.nome} adicionado aos favoritos!`);
      // Aqui entrará a requisição para salvar no banco futuramente
    });
  };

  // Ação de avaliar protegida
  const handleAvaliar = (local) => {
    requireAuth(() => {
      console.log(`Abrindo formulário de avaliação para ${local.nome}`);
    });
  };

  const locaisFiltrados = MOCK_LOCAIS.filter((local) => {
    const nomeLocal = local.nome.toLowerCase();
    const categoriaLocal = local.categoria.toLowerCase();
    const enderecoLocal = local.endereco.toLowerCase();
    const termoBuscado = textoPesquisa.toLowerCase();

    return (
      nomeLocal.includes(termoBuscado) || 
      categoriaLocal.includes(termoBuscado) || 
      enderecoLocal.includes(termoBuscado)
    );
  });

  return (
    <div className="mapa-wrapper">
      
      {/* Barra de Navegação usando o estado de autenticação global */}
      <BarraNavegacao logado={isAuthenticated} handleLogout={logout} />
      
      <PainelPesquisa 
        texto={textoPesquisa} 
        aoDigitar={setTextoPesquisa} 
      />
      
      <MapContainer 
        center={[-3.7327, -38.5270]} 
        zoom={13} 
        className="map-container custom-map-filter" 
        zoomControl={false} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* VARREDURA DE PINS MOCKADOS */}
        {locaisFiltrados.map((local) => (
          <Marker 
            key={local.id} 
            position={[local.lat, local.lng]} 
            icon={createSpawnPin(local.cor, local.icone)}
          > 
            <Popup className="custom-popup">
              <div className="popup-content">
                <b>{local.nome}</b><br />
                <span>{local.endereco}</span><br/>
                <i>{local.descricao}</i>

                {/* Botões de Ação Protegidos */}
                <div style={popupStyles.actions}>
                  <button 
                    onClick={() => handleFavoritar(local)} 
                    style={popupStyles.btnFavoritar}
                  >
                    ❤️ Favoritar
                  </button>
                  <button 
                    onClick={() => handleAvaliar(local)} 
                    style={popupStyles.btnAvaliar}
                  >
                    ⭐ Avaliar
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}


const popupStyles = {
  actions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.8rem',
  },
  btnFavoritar: {
    backgroundColor: '#6C5CE7',
    color: '#FFF',
    border: 'none',
    borderRadius: '4px',
    padding: '0.4rem 0.6rem',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
  btnAvaliar: {
    backgroundColor: '#2D3436',
    color: '#FFF',
    border: 'none',
    borderRadius: '4px',
    padding: '0.4rem 0.6rem',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: 'bold',
  },
};