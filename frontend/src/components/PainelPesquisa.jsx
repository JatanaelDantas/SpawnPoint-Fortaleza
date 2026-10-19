import { useState } from 'react';
import ModalFiltros from './ModalFiltros';

export default function PainelPesquisa({ texto, aoDigitar }) {
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  return (
    <div className="hud-search-panel">
      <div className="location-info">
        <span className="city-tag">FORTALEZA — CEARÁ</span>
        <h2>DESCUBRA ONDE A COMUNIDADE GEEK ESTÁ.</h2>
      </div>
      
      <div className="search-box-container">
        <div className="search-input-wrapper">
           <input 
             type="text" 
             placeholder="Procure por loja, evento, jogo ou bairro..." 
             value={texto}
             onChange={(e) => aoDigitar(e.target.value)} 
           />
           {texto && (
             <button className="btn-clear" onClick={() => aoDigitar("")}>✕</button>
           )}
        </div>
        
        <button 
          className="btn-filtros"
          onClick={() => setFiltrosAbertos(!filtrosAbertos)}
        >
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6"/></svg> 
           FILTROS
        </button>
      </div>
      {filtrosAbertos && <ModalFiltros aoDigitar={aoDigitar} fecharModal={() => setFiltrosAbertos(false)} />}
    </div>
  );
}