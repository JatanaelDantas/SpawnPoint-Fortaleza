import L from 'leaflet';
import './SpawnPin.css';

export const createSpawnPin = (color, svgPathD) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="spawn-pin" style="border-color: ${color};">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2">
            ${svgPathD}
        </svg>
      </div>
      <div class="spawn-pin-pointer" style="border-top-color: ${color};"></div>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50]
  });
};

// Dicionário de Ícones Úteis
export const PIN_ICONS = {
  // Ícone de comando dos jogos
  GAMES: '<rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect><path d="M6 12h4m-2-2v4m8-2h.01M16 10h.01"></path>',
  // Ícone de loja (porta)
  STORE: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  // Ícone de restaurante/comida
  FOOD: '<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>'
};