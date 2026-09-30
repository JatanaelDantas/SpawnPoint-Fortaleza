import { Outlet, Link, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token de autenticação
    localStorage.removeItem('token');
    // Redireciona de volta para a tela de login
    navigate('/login');
  };

  return (
    <div className="admin-container">
      {/* Barra Lateral (Sidebar) */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <strong>SPAWNPOINT</strong>
          <span>ADMIN</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/admin" className="nav-link">Dashboard</Link>
          <Link to="/admin/companies" className="nav-link">Lojas e Eventos</Link>
          <Link to="/admin/players" className="nav-link">Jogadores</Link>
        </nav>
        
        <button onClick={handleLogout} className="btn-logout">
          Sair do Painel
        </button>
      </aside>

      {/* Área Principal onde o conteúdo vai mudar */}
      <main className="admin-content">
        <Outlet /> 
      </main>
    </div>
  );
}