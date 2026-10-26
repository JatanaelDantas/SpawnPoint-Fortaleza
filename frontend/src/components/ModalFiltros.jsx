import { useState } from 'react';

export default function ModalFiltros({ aoDigitar, fecharModal }) {
  // Estado local para saber qual botão deve ficar laranja
  const [ativo, setAtivo] = useState("TODOS");

  const handleAplicar = () => {
    // Se for "TODOS", limpa a pesquisa. Se for outro, envia o termo para o mapa.
    if (ativo === "TODOS") {
      aoDigitar("");
    } else {
      aoDigitar(ativo);
    }
    fecharModal(); // Fecha o modal após aplicar
  };

  return (
    <div className="filtros-dropdown-radar">
      <div className="filtros-header">
        <h3>FILTROS DO RADAR</h3>
        <button className="btn-fechar" onClick={fecharModal}>✕</button>
      </div>

      <div className="filtros-section">
        <span className="section-title">CATEGORIA</span>
        <div className="tags-grid">
          <button className={ativo === "TODOS" ? "tag active" : "tag"} onClick={() => setAtivo("TODOS")}>
            TODOS
          </button>
          <button className={ativo === "TCG" ? "tag active" : "tag"} onClick={() => setAtivo("TCG")}>
            <span className="dot dot-orange"></span> TCG
          </button>
          <button className={ativo === "BOARDGAMES" ? "tag active" : "tag"} onClick={() => setAtivo("BOARDGAMES")}>
            <span className="dot dot-green"></span> BOARDGAMES
          </button>
          <button className={ativo === "GAMES" ? "tag active" : "tag"} onClick={() => setAtivo("GAMES")}>
            <span className="dot dot-blue"></span> GAMES
          </button>
          <button className={ativo === "ARCADE" ? "tag active" : "tag"} onClick={() => setAtivo("ARCADE")}>
            <span className="dot dot-red"></span> ARCADE
          </button>
          <button className={ativo === "EVENTOS" ? "tag active" : "tag"} onClick={() => setAtivo("EVENTOS")}>
            <span className="dot dot-yellow"></span> EVENTOS
          </button>
          <button className={ativo === "COMIDA" ? "tag active" : "tag"} onClick={() => setAtivo("COMIDA")}>
            <span className="dot dot-purple"></span> FOOD
          </button>
        </div>
      </div>

      <div className="filtros-section">
        <span className="section-title">BAIRRO</span>
        <div className="tags-grid">
          <button className={ativo === "Benfica" ? "tag active" : "tag"} onClick={() => setAtivo("Benfica")}>BENFICA</button>
          <button className={ativo === "Aldeota" ? "tag active" : "tag"} onClick={() => setAtivo("Aldeota")}>ALDEOTA</button>
          <button className={ativo === "Meireles" ? "tag active" : "tag"} onClick={() => setAtivo("Meireles")}>MEIRELES</button>
          <button className={ativo === "Centro" ? "tag active" : "tag"} onClick={() => setAtivo("Centro")}>CENTRO</button>
          <button className={ativo === "Cocó" ? "tag active" : "tag"} onClick={() => setAtivo("Cocó")}>COCÓ</button>
          <button className={ativo === "Parangaba" ? "tag active" : "tag"} onClick={() => setAtivo("Parangaba")}>PARANGABA</button>
        </div>
      </div>

      <div className="filtros-footer">
        <button className="btn-aplicar" onClick={handleAplicar}>
          ✓ APLICAR
        </button>
      </div>
    </div>
  );
}