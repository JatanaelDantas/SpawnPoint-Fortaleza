
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function BarraNavegacao() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    user,
    isAuthenticated,
    logout,
    openAuthModal,
    requireAuth
  } = useAuth();

  const [confirmarSaida, setConfirmarSaida] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? 'active' : '';

  const handlePerfilClick = () => {
    requireAuth(() => {
      console.log('A tela de Perfil está em desenvolvimento.');
    });
  };

  const handleLogout = () => {
    logout();
    setConfirmarSaida(false);
    navigate('/', { replace: true });
  };

  const nomeUsuario =
    user?.nome ||
    user?.nickname ||
    user?.nomeFantasia ||
    'PLAYER';

  const inicialUsuario = nomeUsuario
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <>
      <header className="hud-navbar">
        <div
          className="logo-container"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <span className="logo-text">
            <span className="text-orange">SPAWN</span>POINT
            <br />
            <span className="logo-sub">FORTALEZA</span>
          </span>
        </div>

        <nav className="nav-links">
          <button
            className={isActive('/')}
            onClick={() => navigate('/')}
          >
            SPAWNPOINT
          </button>

          <button
            className={isActive('/mapa')}
            onClick={() => navigate('/mapa')}
          >
            MAPA
          </button>

          <button
            className={isActive('/eventos')}
            onClick={() => navigate('/eventos')}
          >
            EVENTOS
          </button>

          <button
            className={isActive('/comunidade')}
            onClick={() => navigate('/comunidade')}
          >
            COMUNIDADE
          </button>

          <button
            className={isActive('/perfil')}
            onClick={handlePerfilClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            PERFIL
            <span style={devBadgeStyle}>
              EM DEV
            </span>
          </button>
        </nav>

        <div
          className="nav-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {!isAuthenticated ? (
            <button
              onClick={openAuthModal}
              className="btn-outline-orange"
            >
              ENTRAR
            </button>
          ) : (
            <>
              <span style={usuarioStyle} title={nomeUsuario}>
                <span style={avatarStyle}>
                  {inicialUsuario}
                </span>
                <span style={nomeStyle}>
                  {nomeUsuario}
                </span>
              </span>

              <button
                onClick={() => setConfirmarSaida(true)}
                className="btn-outline-orange"
              >
                SAIR
              </button>
            </>
          )}
        </div>
      </header>

      {confirmarSaida && (
        <div
          style={modalOverlayStyle}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setConfirmarSaida(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-confirmar-saida"
            aria-describedby="descricao-confirmar-saida"
            style={modalStyle}
          >
            <div style={modalIconStyle}>↪</div>

            <h2
              id="titulo-confirmar-saida"
              style={modalTitleStyle}
            >
              Deseja sair da sua conta?
            </h2>

            <p
              id="descricao-confirmar-saida"
              style={modalDescriptionStyle}
            >
              Você poderá continuar explorando Fortaleza
              e acessar o mapa sem estar logado.
            </p>

            <div style={modalActionsStyle}>
              <button
                type="button"
                onClick={() => setConfirmarSaida(false)}
                style={cancelarStyle}
              >
                CANCELAR
              </button>

              <button
                type="button"
                onClick={handleLogout}
                style={confirmarStyle}
              >
                SIM, SAIR
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const devBadgeStyle = {
  fontSize: '0.55rem',
  backgroundColor: '#ff6b00',
  color: '#ffffff',
  padding: '0.1rem 0.35rem',
  borderRadius: '3px',
  fontWeight: '800',
  letterSpacing: '0.5px',
  textTransform: 'uppercase'
};

const usuarioStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: 0
};

const avatarStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '30px',
  height: '30px',
  minWidth: '30px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #ff7a00, #a43cff)',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '800'
};

const nomeStyle = {
  color: '#ffffff',
  fontSize: '0.85rem',
  fontWeight: '700',
  maxWidth: '110px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

const modalOverlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  backgroundColor: 'rgba(0, 0, 0, 0.78)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
};

const modalStyle = {
  width: '100%',
  maxWidth: '430px',
  padding: '32px 26px',
  borderRadius: '16px',
  border: '1px solid #49334c',
  background: '#1b1722',
  boxShadow: '0 20px 70px rgba(0, 0, 0, 0.5)',
  textAlign: 'center'
};

const modalIconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '58px',
  height: '58px',
  margin: '0 auto 18px',
  borderRadius: '50%',
  background: 'rgba(255, 122, 0, 0.12)',
  color: '#ff7a00',
  fontSize: '30px',
  fontWeight: '700'
};

const modalTitleStyle = {
  margin: '0 0 12px',
  color: '#ffffff',
  fontSize: '23px',
  fontWeight: '800'
};

const modalDescriptionStyle = {
  margin: '0 0 26px',
  color: '#bcb4c4',
  fontSize: '14px',
  lineHeight: 1.7
};

const modalActionsStyle = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'center'
};

const cancelarStyle = {
  flex: 1,
  padding: '13px 12px',
  border: '1px solid #655a6e',
  borderRadius: '8px',
  background: 'transparent',
  color: '#ffffff',
  fontWeight: '700',
  cursor: 'pointer'
};

const confirmarStyle = {
  flex: 1,
  padding: '13px 12px',
  border: 'none',
  borderRadius: '8px',
  background: '#ff7a00',
  color: '#151015',
  fontWeight: '800',
  cursor: 'pointer'
};
