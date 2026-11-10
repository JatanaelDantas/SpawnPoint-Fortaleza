
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as autenticar, buscarStatusOnboarding } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import './AuthLogin.css';

export default function Login() {
  const navigate = useNavigate();
  const { login: atualizarSessao } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '' });

  const handleLogin = async (event) => {
    event.preventDefault();
    if (carregando) return;

    setCarregando(true);

    try {
      const dados = await autenticar({
        email: email.trim(),
        senha
      });

      if (!dados?.token || dados.autenticado === false) {
        throw new Error('O servidor não confirmou a autenticação.');
      }

      const usuario = {
        nome: dados.nome,
        email: email.trim(),
        tipo: dados.tipo
      };

      localStorage.setItem('token', dados.token);
      localStorage.setItem('tipoUsuario', dados.tipo);
      atualizarSessao(usuario);

      setToast({
        msg: `Bem-vindo${dados.nome ? `, ${dados.nome}` : ''}!`,
        type: 'success'
      });

      if (dados.tipo === 'COMPANY') {
        navigate('/lojista', { replace: true });
        return;
      }

      if (dados.tipo === 'ADMIN') {
        navigate('/admin', { replace: true });
        return;
      }

      if (dados.tipo === 'USER') {
        try {
          const status = await buscarStatusOnboarding();
          navigate(
            status?.concluido ? '/' : '/onboarding',
            { replace: true }
          );
        } catch {
          navigate('/onboarding', { replace: true });
        }
        return;
      }

      navigate('/', { replace: true });
    } catch (erro) {
      setToast({
        msg: erro.message || 'Não foi possível realizar o login.',
        type: 'error'
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="sp-login-page">
      <Toast
        message={toast.msg}
        type={toast.type}
        onClose={() => setToast({ msg: '', type: '' })}
      />

      <header className="sp-login-header">
        <Link to="/" className="sp-login-logo">
          <span className="sp-login-symbol">S</span>
          <span>
            <strong>SPAWNPOINT</strong>
            <small>FORTALEZA</small>
          </span>
        </Link>

        <Link to="/" className="sp-login-return">
          Voltar ao início
        </Link>
      </header>

      <main className="sp-login-main">
        <section className="sp-login-intro">
          <span className="sp-login-tag">SEU UNIVERSO GEEK</span>
          <h1>
            Sua próxima aventura
            <span> começa aqui.</span>
          </h1>
          <p>
            Descubra eventos, encontre lugares incríveis e faça
            parte da comunidade geek de Fortaleza.
          </p>

          <div className="sp-login-features">
            <span>✦ Eventos</span>
            <span>✦ Comunidade</span>
            <span>✦ Exploração</span>
          </div>
        </section>

        <section className="sp-login-card">
          <div className="sp-login-card-header">
            <span className="sp-login-tag">BEM-VINDO DE VOLTA</span>
            <h2>Entrar na sua conta</h2>
            <p>Continue sua jornada no SpawnPoint.</p>
          </div>

          <nav className="sp-login-tabs" aria-label="Autenticação">
            <Link to="/login" className="active" aria-current="page">
              Entrar
            </Link>
            <Link to="/register">
              Criar conta
            </Link>
          </nav>

          <form onSubmit={handleLogin}>
            <div className="sp-login-field">
              <label htmlFor="login-email">E-mail</label>
              <input
                id="login-email"
                type="email"
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="sp-login-field">
              <label htmlFor="login-password">Senha</label>
              <div className="sp-login-password">
                <input
                  id="login-password"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="sp-login-submit"
              disabled={carregando}
            >
              {carregando ? 'Entrando...' : 'Entrar no SpawnPoint'}
            </button>
          </form>

          <p className="sp-login-footer">
            Ainda não tem uma conta?{' '}
            <Link to="/register">Cadastre-se gratuitamente</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
