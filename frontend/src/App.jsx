import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';

import './App.css';


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/onboarding"
          element={<Onboarding />}
        />

        <Route
          path="/"
          element={

            <div
              style={{
                minHeight: '100vh',
                background: '#09090d',
                color: 'white',
                padding: '50px',
                boxSizing: 'border-box'
              }}
            >

              Mapa em breve!

              <br />

              <a href="/login">
                Ir para Login
              </a>

            </div>

          }
        />


        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;