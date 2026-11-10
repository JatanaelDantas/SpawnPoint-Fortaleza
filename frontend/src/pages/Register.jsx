
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import './AuthLogin.css';
import './AuthRegister.css';

const FORM_INICIAL = {
  nome: '',
  nomeFantasia: '',
  cnpj: '',
  telefone: '',
  email: '',
  senha: '',
  confirmarSenha: ''
};

export default function Register() {
  const navigate = useNavigate();
  const { login: iniciarSessao } = useAuth();

  const [tipo, setTipo] = useState('USER');
  const [formData, setFormData] = useState(FORM_INICIAL);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [toast, setToast] = useState({
    msg: '',
    type: ''
  });

  const atualizar = (campo, valor) => {
    setFormData(anterior => ({
      ...anterior,
      [campo]: valor
    }));
  };

  const mudarTipo = (novoTipo) => {
    setTipo(novoTipo);
    setFormData(anterior => ({
      ...anterior,
      nome: '',
      nomeFantasia: '',
      cnpj: '',
      telefone: ''
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (carregando) return;

    if (formData.senha !== formData.confirmarSenha) {
      setToast({
        msg: 'As senhas não coincidem.',
        type: 'error'
      });
      return;
    }

    if (formData.senha.length < 6) {
      setToast({
        msg: 'A senha deve ter pelo menos 6 caracteres.',
        type: 'error'
      });
      return;
    }

    const nome = tipo === 'COMPANY'
      ? formData.nomeFantasia.trim()
      : formData.nome.trim();

    if (!nome) {
      setToast({
        msg: 'Informe seu nome ou nome fantasia.',
        type: 'error'
      });
      return;
    }

    if (
      tipo === 'COMPANY' &&
      formData.cnpj.replace(/\D/g, '').length !== 14
    ) {
      setToast({
        msg: 'O CNPJ precisa conter 14 dígitos.',
        type: 'error'
      });
      return;
    }

    const email = formData.email.trim();

    const payload = {
      nome,
      email,
      senha: formData.senha,
      tipo
    };

    if (tipo === 'COMPANY') {
      payload.nomeFantasia = formData.nomeFantasia.trim();
      payload.cnpj = formData.cnpj.replace(/\D/g, '');
      payload.telefone = formData.telefone.trim();
    }

    setCarregando(true);
    setToast({ msg: '', type: '' });

    try {
      const resposta = await register(payload);

      if (resposta?.token) {
        const usuario = {
          nome: resposta.nome || nome,
          email,
          tipo: resposta.tipo || tipo
        };

        iniciarSessao(usuario, resposta.token);

        if (usuario.tipo === 'COMPANY') {
          navigate('/lojista', { replace: true });
        } else if (usuario.tipo === 'ADMIN') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/onboarding', { replace: true });
        }
      } else {
        setToast({
          msg: 'Conta criada! Faça login para continuar.',
          type: 'success'
        });

        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 1200);
      }
    } catch (erro) {
      setToast({
        msg: erro.message || 'Erro ao realizar cadastro.',
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
          <span className="sp-login-tag">
            SUA COMUNIDADE GEEK
          </span>

          <h1>
            Seu lugar no universo
            <span> geek de Fortaleza.</span>
          </h1>

          <p>
            Crie sua conta para descobrir eventos,
            participar da comunidade e encontrar
            pessoas que compartilham suas paixões.
          </p>

          <div className="sp-login-features">
            <span>✦ Eventos</span>
            <span>✦ Comunidade</span>
            <span>✦ Exploração</span>
          </div>
        </section>

        <section className="sp-login-card">
          <div className="sp-login-card-header">
            <span className="sp-login-tag">
              COMECE SUA JORNADA
            </span>

            <h2>Criar sua conta</h2>
            <p>Escolha seu perfil para começar.</p>
          </div>

          <nav
            className="sp-login-tabs"
            aria-label="Autenticação"
          >
            <Link to="/login">
              Entrar
            </Link>

            <Link
              to="/register"
              className="active"
              aria-current="page"
            >
              Criar conta
            </Link>
          </nav>

          <div className="sp-register-profile">
            <button
              type="button"
              className={tipo === 'USER' ? 'selected' : ''}
              onClick={() => mudarTipo('USER')}
              aria-pressed={tipo === 'USER'}
            >
              <strong>Player</strong>
              <small>Participar da comunidade</small>
            </button>

            <button
              type="button"
              className={tipo === 'COMPANY' ? 'selected' : ''}
              onClick={() => mudarTipo('COMPANY')}
              aria-pressed={tipo === 'COMPANY'}
            >
              <strong>Comercial</strong>
              <small>Lojas e estabelecimentos</small>
            </button>
          </div>

          <form onSubmit={handleRegister}>
            {tipo === 'USER' ? (
              <div className="sp-login-field">
                <label htmlFor="register-nome">
                  Nome / Nick
                </label>
                <input
                  id="register-nome"
                  type="text"
                  value={formData.nome}
                  onChange={e => atualizar('nome', e.target.value)}
                  placeholder="Como podemos chamar você?"
                  autoComplete="name"
                  required
                />
              </div>
            ) : (
              <>
                <div className="sp-login-field">
                  <label htmlFor="register-fantasia">
                    Nome fantasia
                  </label>
                  <input
                    id="register-fantasia"
                    type="text"
                    value={formData.nomeFantasia}
                    onChange={e =>
                      atualizar('nomeFantasia', e.target.value)
                    }
                    placeholder="Nome do estabelecimento"
                    required
                  />
                </div>

                <div className="sp-login-field">
                  <label htmlFor="register-cnpj">
                    CNPJ
                  </label>
                  <input
                    id="register-cnpj"
                    type="text"
                    inputMode="numeric"
                    value={formData.cnpj}
                    onChange={e =>
                      atualizar('cnpj', e.target.value)
                    }
                    placeholder="00.000.000/0000-00"
                    maxLength={18}
                    required
                  />
                </div>

                <div className="sp-login-field">
                  <label htmlFor="register-telefone">
                    Telefone
                  </label>
                  <input
                    id="register-telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={e =>
                      atualizar('telefone', e.target.value)
                    }
                    placeholder="(85) 99999-9999"
                    required
                  />
                </div>
              </>
            )}

            <div className="sp-login-field">
              <label htmlFor="register-email">
                {tipo === 'COMPANY'
                  ? 'E-mail da empresa'
                  : 'E-mail'}
              </label>
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={e =>
                  atualizar('email', e.target.value)
                }
                placeholder="seuemail@exemplo.com"
                required
              />
            </div>

            <div className="sp-login-field">
              <label htmlFor="register-senha">
                Senha
              </label>

              <div className="sp-login-password">
                <input
                  id="register-senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  autoComplete="new-password"
                  minLength={6}
                  value={formData.senha}
                  onChange={e =>
                    atualizar('senha', e.target.value)
                  }
                  placeholder="Mínimo de 6 caracteres"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setMostrarSenha(anterior => !anterior)
                  }
                >
                  {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <div className="sp-login-field">
              <label htmlFor="register-confirmar">
                Confirmar senha
              </label>
              <input
                id="register-confirmar"
                type="password"
                autoComplete="new-password"
                value={formData.confirmarSenha}
                onChange={e =>
                  atualizar('confirmarSenha', e.target.value)
                }
                placeholder="Repita sua senha"
                required
              />
            </div>

            <button
              type="submit"
              className="sp-login-submit"
              disabled={carregando}
            >
              {carregando
                ? 'Criando conta...'
                : tipo === 'COMPANY'
                  ? 'Cadastrar estabelecimento'
                  : 'Criar minha conta'}
            </button>
          </form>

          <p className="sp-login-footer">
            Já possui uma conta?{' '}
            <Link to="/login">Entrar</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
