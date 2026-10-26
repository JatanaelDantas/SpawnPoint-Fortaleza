import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './Mapa.css';
import { createSpawnPin, PIN_ICONS } from '../components/SpawnPin';
import PainelPesquisa from '../components/PainelPesquisa';
import BarraNavegacao from '../components/BarraNavegacao';


const MOCK_LOCAIS = [ //PRA TESTAR A LOGICA DE PESQUISA E FILTRO, POSTERIORMENTE VAI SER SUBSTITUIDO POR UMA REQUISIÇÃO AO BACKEND
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
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setLogado(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    setLogado(false);
  };
  const [textoPesquisa, setTextoPesquisa] = useState("");

  const locaisFiltrados = MOCK_LOCAIS.filter((local) => {
    const nomeLocal = local.nome.toLowerCase();
    const categoriaLocal = local.categoria.toLowerCase();
    const enderecoLocal = local.endereco.toLowerCase();
    const termoBuscado = textoPesquisa.toLowerCase();

    return nomeLocal.includes(termoBuscado) || categoriaLocal.includes(termoBuscado) || enderecoLocal.includes(termoBuscado);
  });

  return (
    <div className="mapa-wrapper">
      
      <BarraNavegacao logado={logado} handleLogout={handleLogout} />
      
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
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}