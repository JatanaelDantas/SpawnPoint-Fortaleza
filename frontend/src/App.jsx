import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';

import LojistaLayout from './layouts/LojistaLayout';
import VisaoGeral from './pages/Empresa/VisaoGeral';
import MeuEstabelecimento from './pages/Empresa/MeuEstabelecimento';
import MeusEventos from './pages/Empresa/MeusEventos';
import Comunidade from './pages/Empresa/Comunidade';
import Estatisticas from './pages/Empresa/Estatisticas';
import Configuracoes from './pages/Empresa/Configuracoes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        {}
        <Route path="/lojista" element={<LojistaLayout />}>
          <Route index element={<VisaoGeral />} />
          <Route path="visao-geral" element={<VisaoGeral />} />
          <Route path="meu-estabelecimento" element={<MeuEstabelecimento />} />
          <Route path="meus-eventos" element={<MeusEventos />} />
          <Route path="comunidade" element={<Comunidade />} />
          <Route path="estatisticas" element={<Estatisticas />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>

        <Route path="/" element={
          <div style={{ minHeight: '100vh', background: '#09090d', color: 'white', padding: '50px', boxSizing: 'border-box' }}>
            Mapa em breve!<br /><a href="/login">Ir para Login</a>
          </div>
        } />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;