import React, { useState, useEffect } from 'react';
import './VisaoGeral.css';

const VisaoGeral = () => {
    const [usuario, setUsuario] = useState({
        nome: '',
        iniciais: ''
    });

    const [estatisticas, setEstatisticas] = useState({
        eventosAtivos: 0,
        checkinsHoje: 0,
        pessoasInteressadas: 0,
        seguidores: 0
    });

    const [estabelecimento, setEstabelecimento] = useState({
        nome: '',
        status: '',
        endereco: '',
        horario: '',
        categoria: ''
    });

    useEffect(() => {

    }, []);

    return (
        <div className="visao-geral-container">
            <h1 className="page-title">Visão geral</h1>
            <p className="greeting">Olá, {usuario.nome || 'Carregando...'}</p>

            <div className="stats-grid">
                <div className="stat-card">
                    <h2>{estatisticas.eventosAtivos}</h2>
                    <span>Eventos ativos</span>
                </div>
                <div className="stat-card">
                    <h2>{estatisticas.checkinsHoje}</h2>
                    <span>Check-ins hoje</span>
                </div>
                <div className="stat-card">
                    <h2>{estatisticas.pessoasInteressadas}</h2>
                    <span>Pessoas interessadas</span>
                </div>
                <div className="stat-card">
                    <h2>{estatisticas.seguidores}</h2>
                    <span>Seguidores/favoritos</span>
                </div>
            </div>

            <hr className="divider" />

            <div className="estabelecimento-info">
                <h2>{estabelecimento.nome || 'Nome não definido'}</h2>

                <div className="status-badge">
                    <span className="dot-orange"></span>
                    {estabelecimento.status || 'Sem status'}
                </div>

                <p className="address-text">{estabelecimento.endereco}</p>
                <p className="details-text">
                    {estabelecimento.horario} • {estabelecimento.categoria}
                </p>

                <button className="btn-editar">Editar estabelecimento</button>
            </div>

            <p className="footer-note">Indicadores fictícios • Fortaleza/CE</p>
        </div>
    );
};

export default VisaoGeral;