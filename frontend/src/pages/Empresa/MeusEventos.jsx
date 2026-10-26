import React, { useState, useEffect } from 'react';
import './MeusEventos.css';

const MeusEventos = () => {
  const [view, setView] = useState('list');
  
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    setEventos([
      {
        id: 1,
        titulo: 'Pokémon League Cup',
        data: '20/09/2026',
        hora: '19:00',
        local: 'Geek House',
        status: 'Aprovado'
      },
      {
        id: 2,
        titulo: 'Torneio de Street Fighter 6',
        data: '27/09/2026',
        hora: '18:00',
        local: 'Geek House',
        status: 'Aguardando aprovação'
      }
    ]);
  }, []);

  return (
    <div className="meus-eventos-container">
      <h1>Meus eventos</h1>

      {view === 'list' ? (

        <div className="lista-view">
          <button className="btn-criar" onClick={() => setView('form')}>
            + Criar evento
          </button>

          <div className="eventos-list">
            {eventos.map((evento) => (
              <div key={evento.id} className="evento-item">
                <h3>{evento.titulo}</h3>
                <p className="evento-meta">
                  {evento.data} • {evento.hora} • {evento.local}
                </p>
                
                <div className={`status-badge ${evento.status === 'Aprovado' ? 'aprovado' : 'pendente'}`}>
                  <span className="dot"></span> {evento.status}
                </div>
                
                <button className="btn-editar-outline">Editar</button>
                <hr className="divider-event" />
              </div>
            ))}
          </div>
        </div>
      ) : (

        <div className="form-view">
          <p className="subtitle-local">Local: Geek House • Fortaleza/CE</p>

          <form className="form-grid">
            <div className="form-group">
              <label>Título</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Jogo</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Data</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Hora</label>
              <input type="time" defaultValue="19:00" />
            </div>
            <div className="form-group">
              <label>Formato</label>
              <input type="text" defaultValue="Presencial" />
            </div>

            <div className="form-group">
              <label>Taxa de inscrição (R\$)</label>
              <input type="number" defaultValue="0" />
            </div>
            <div className="form-group">
              <label>Número de vagas</label>
              <input type="number" defaultValue="32" />
            </div>

            <div className="form-group">
              <label>Premiação</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Regras</label>
              <input type="text" />
            </div>
          </form>

          <div className="form-actions">
            <button className="btn-salvar" onClick={() => setView('list')}>
              Enviar para aprovação
            </button>
            <button className="btn-cancelar" onClick={() => setView('list')}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeusEventos;