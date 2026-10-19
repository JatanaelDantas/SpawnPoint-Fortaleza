import { useNavigate, useLocation } from 'react-router-dom';

export default function BarraNavegacao({ logado, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation(); 
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <header className="hud-navbar">
      <div className="logo-container">
        <span className="logo-text"><span className="text-orange">SPAWN</span>POINT<br/><span className="logo-sub">FORTALEZA</span></span>
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
      </nav>
      
      <div className="nav-actions">
         {!logado ? (
            <button onClick={() => navigate('/login')} className="btn-outline-orange">
              ENTRAR
            </button>
          ) : (
            <button onClick={handleLogout} className="btn-outline-orange">
              SAIR
            </button>
          )}
      </div>
    </header>
  );
}