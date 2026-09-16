import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, buscarStatusOnboarding } from '../services/api';
import Toast from '../components/Toast';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '' });
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  if (!termosAceitos) {
    setToast({
      msg: 'Você precisa aceitar os termos LGPD para entrar.',
      type: 'error'
    });
    return;
  }

  try {
    const data =
      await login({
        email,
        senha
      });
    localStorage.setItem(
      'token',
      data.token
    );

    setToast({
      msg: 'Bem-vindo de volta!',
      type: 'success'
    });

    /*
     * Lojistas não passam pelo
     * onboarding de jogador.
     */
    if (data.tipo !== 'USER') {
      setTimeout(
        () => navigate('/'),
        700
      );
      return;
    }
    /*
     * Para USER verificamos se ele
     * já concluiu o onboarding.
     */
    const status =
      await buscarStatusOnboarding();

    setTimeout(() => {

      if (status.concluido) {
        navigate('/');
      } else {
        navigate('/onboarding');
      }

    }, 700);

  } catch (err) {
    setToast({
      msg: err.message,
      type: 'error'
    });
  }
};

  return (
    <div className="auth-page">
      <Toast message={toast.msg} type={toast.type} onClose={() => setToast({ msg: '' })} />
      <h2>SPAWNPOINT FORTALEZA</h2>
      <div className="auth-box">
        <div className="auth-tabs">
          <button className="auth-tab active">LOGIN</button>
          <Link to="/register" className="auth-tab">CADASTRO</Link>
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>E-MAIL</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>SENHA</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
          </div>
          <div className="lgpd-box">
            <input type="checkbox" id="lgpd" checked={termosAceitos} onChange={e => setTermosAceitos(e.target.checked)} />
            <label htmlFor="lgpd">Declaro que li e concordo com a Política de Privacidade e Termos de Uso (LGPD).</label>
          </div>
          <button type="submit" className="btn-primary">ENTRAR</button>
        </form>
      </div>
    </div>
  );
}