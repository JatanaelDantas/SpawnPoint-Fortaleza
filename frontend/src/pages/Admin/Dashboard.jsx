import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard Admin</h1>
      <p>Bem-vindo ao painel de controle do SpawnPoint Fortaleza.</p>
      
      <div className="dashboard-cards">
        <div className="card">
          <h3>Lojas e Eventos</h3>
          <p>Gerencie os pontos geeks cadastrados na plataforma.</p>
        </div>
        <div className="card">
          <h3>Jogadores</h3>
          <p>Visão geral da comunidade e usuários ativos.</p>
        </div>
        <div className="card">
          <h3>Denúncias / Alertas</h3>
          <p>Acompanhe moderação de conteúdo no mapa.</p>
        </div>
      </div>
    </div>
  );
}