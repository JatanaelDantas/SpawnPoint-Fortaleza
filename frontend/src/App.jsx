import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Mapa from './pages/Mapa'; 
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard'; 
import './App.css';
import 'leaflet/dist/leaflet.css';
import Entrada from './pages/Entrada';
import Eventos from './pages/Eventos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>


        <Route path="/mapa" element={<Mapa />} />
        <Route path="/" element={<Entrada />} />
        <Route path="/eventos" element={<Eventos />} /> 
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;