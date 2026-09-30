import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  buscarStatusOnboarding,
  concluirOnboarding
} from '../services/api';

import './Onboarding.css';


const OPCOES_INTERESSES = [
  {
    value: 'POKEMON_TCG',
    label: 'Pokémon TCG',
    icon: '⚡'
  },
  {
    value: 'MAGIC_THE_GATHERING',
    label: 'Magic: The Gathering',
    icon: '🧙'
  },
  {
    value: 'YUGIOH',
    label: 'Yu-Gi-Oh!',
    icon: '🃏'
  },
  {
    value: 'FIGHTING_GAMES',
    label: 'Fighting Games',
    icon: '🥊'
  },
  {
    value: 'RPG',
    label: 'RPG',
    icon: '🐉'
  },
  {
    value: 'BOARD_GAMES',
    label: 'Board Games',
    icon: '🎲'
  },
  {
    value: 'ARCADE',
    label: 'Arcade',
    icon: '👾'
  },
  {
    value: 'GAMES',
    label: 'Games',
    icon: '🎮'
  },
  {
    value: 'ANIME_MANGA',
    label: 'Anime / Mangá',
    icon: '🍥'
  },
  {
    value: 'CULTURA_GEEK',
    label: 'Cultura Geek',
    icon: '⭐'
  }
];


export default function Onboarding() {

  const navigate = useNavigate();

  const [etapa, setEtapa] = useState(1);

  const [nickname, setNickname] = useState('');

  const [interesses, setInteresses] = useState([]);

  const [carregando, setCarregando] = useState(true);

  const [salvando, setSalvando] = useState(false);

  const [erro, setErro] = useState('');

  const [statusLocalizacao, setStatusLocalizacao] =
    useState('idle');

  useEffect(() => {

    const carregarOnboarding = async () => {

      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      try {

        const status =
          await buscarStatusOnboarding();

        if (status.concluido) {

          navigate('/', {
            replace: true
          });

          return;
        }

        if (status.nickname) {
          setNickname(status.nickname);
        }

        if (status.interesses) {
          setInteresses(status.interesses);
        }

      } catch (error) {

        setErro(
          error.message ||
          'Não foi possível carregar o onboarding.'
        );

      } finally {

        setCarregando(false);

      }
    };


    carregarOnboarding();

  }, [navigate]);


  const avancarNickname = () => {

    setErro('');

    const nomeTratado = nickname.trim();

    if (nomeTratado.length < 3) {

      setErro(
        'Seu nick precisa ter pelo menos 3 caracteres.'
      );

      return;
    }

    if (nomeTratado.length > 30) {

      setErro(
        'Seu nick pode ter no máximo 30 caracteres.'
      );

      return;
    }

    setNickname(nomeTratado);

    setEtapa(2);
  };


  const selecionarInteresse = (interesse) => {

    setErro('');

    setInteresses((atuais) => {

      if (atuais.includes(interesse)) {

        return atuais.filter(
          (item) => item !== interesse
        );
      }

      return [
        ...atuais,
        interesse
      ];
    });
  };

  const avancarInteresses = () => {

    setErro('');

    if (interesses.length === 0) {

      setErro(
        'Escolha pelo menos um interesse para continuar.'
      );

      return;
    }

    setEtapa(3);
  };

  const finalizarOnboarding = async () => {

    setErro('');
    setSalvando(true);

    try {

      await concluirOnboarding({

        nickname,

        interesses

      });

      setEtapa(4);

    } catch (error) {

      setErro(
        error.message ||
        'Não foi possível finalizar o onboarding.'
      );

    } finally {

      setSalvando(false);

    }
  };

  const solicitarLocalizacao = () => {

    setErro('');

    if (!navigator.geolocation) {

      setStatusLocalizacao('unsupported');

      finalizarOnboarding();

      return;
    }


    setStatusLocalizacao('loading');


    navigator.geolocation.getCurrentPosition(

      () => {

        setStatusLocalizacao('granted');

        finalizarOnboarding();

      },

      () => {

        setStatusLocalizacao('denied');

        /*
         * Localização não é obrigatória.
         * Mesmo recusando, o onboarding termina.
         */
        finalizarOnboarding();

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }

    );
  };


  if (carregando) {

    return (
      <div className="onboarding-page">

        <div className="onboarding-loading">

          <div className="spawn-loader"></div>

          <p>Carregando seu SpawnPoint...</p>

        </div>

      </div>
    );
  }


  return (

    <div className="onboarding-page">

      <div className="onboarding-background-glow glow-one"></div>

      <div className="onboarding-background-glow glow-two"></div>


      <header className="onboarding-header">

        <div className="spawn-logo">

          <div className="spawn-logo-icon">
            S
          </div>

          <div>
            <strong>SPAWNPOINT</strong>
            <span>FORTALEZA</span>
          </div>

        </div>

      </header>


      <main className="onboarding-container">

        {etapa <= 3 && (

          <div className="step-area">

            <span className="step-text">
              ETAPA {etapa} DE 3
            </span>

            <div className="step-dots">

              {[1, 2, 3].map((numero) => (

                <div
                  key={numero}
                  className={
                    numero <= etapa
                      ? 'step-dot active'
                      : 'step-dot'
                  }
                />

              ))}

            </div>

          </div>

        )}


        <section className="onboarding-card">

          {etapa === 1 && (

            <>

              <div className="onboarding-icon">
                🎮
              </div>

              <h1>
                Bem-vindo ao SpawnPoint!
              </h1>

              <p className="onboarding-description">
                Antes de explorar Fortaleza,
                vamos configurar seu perfil.
              </p>


              <div className="onboarding-form-group">

                <label>
                  COMO VOCÊ QUER SER CONHECIDO?
                </label>

                <input
                  type="text"
                  placeholder="Seu nick"
                  value={nickname}
                  maxLength={30}
                  onChange={(event) =>
                    setNickname(event.target.value)
                  }
                  onKeyDown={(event) => {

                    if (event.key === 'Enter') {
                      avancarNickname();
                    }

                  }}
                />

                <span className="input-help">
                  Esse será seu nome dentro da comunidade.
                </span>

              </div>


              {erro && (
                <div className="onboarding-error">
                  {erro}
                </div>
              )}


              <button
                className="onboarding-primary-button"
                onClick={avancarNickname}
              >
                CONTINUAR
                <span>→</span>
              </button>

            </>

          )}

          {etapa === 2 && (

            <>

              <div className="onboarding-icon">
                ✨
              </div>

              <h1>
                O que você curte?
              </h1>

              <p className="onboarding-description">
                Escolha seus interesses para encontrar
                lugares e eventos que combinam com você.
              </p>


              <div className="interesses-grid">

                {OPCOES_INTERESSES.map((opcao) => {

                  const selecionado =
                    interesses.includes(opcao.value);

                  return (

                    <button
                      type="button"
                      key={opcao.value}
                      className={
                        selecionado
                          ? 'interesse-card selected'
                          : 'interesse-card'
                      }
                      onClick={() =>
                        selecionarInteresse(opcao.value)
                      }
                    >

                      <span className="interesse-icon">
                        {opcao.icon}
                      </span>

                      <span>
                        {opcao.label}
                      </span>

                      {selecionado && (
                        <span className="interesse-check">
                          ✓
                        </span>
                      )}

                    </button>

                  );

                })}

              </div>


              <div className="selected-counter">

                {interesses.length === 0
                  ? 'Nenhum interesse selecionado'
                  : `${interesses.length} interesse${
                      interesses.length > 1 ? 's' : ''
                    } selecionado${
                      interesses.length > 1 ? 's' : ''
                    }`
                }

              </div>


              {erro && (
                <div className="onboarding-error">
                  {erro}
                </div>
              )}


              <div className="onboarding-actions">

                <button
                  className="onboarding-secondary-button"
                  onClick={() => {
                    setErro('');
                    setEtapa(1);
                  }}
                >
                  ← VOLTAR
                </button>

                <button
                  className="onboarding-primary-button"
                  onClick={avancarInteresses}
                >
                  CONTINUAR
                  <span>→</span>
                </button>

              </div>

            </>

          )}

          {etapa === 3 && (

            <>

              <div className="location-circle">
                📍
              </div>

              <h1>
                Encontre SpawnPoints perto de você
              </h1>

              <p className="onboarding-description location-description">
                Use sua localização para descobrir
                eventos e estabelecimentos geek
                próximos de você.
              </p>


              <div className="location-info">
                <p>
                  Sua localização será utilizada para
                  encontrar pontos próximos e não será
                  salva no seu perfil.
                </p>

              </div>


              {erro && (
                <div className="onboarding-error">
                  {erro}
                </div>
              )}


              <button
                className="onboarding-primary-button location-button"
                disabled={
                  salvando ||
                  statusLocalizacao === 'loading'
                }
                onClick={solicitarLocalizacao}
              >

                {statusLocalizacao === 'loading'
                  ? 'SOLICITANDO LOCALIZAÇÃO...'
                  : salvando
                    ? 'FINALIZANDO...'
                    : 'USAR MINHA LOCALIZAÇÃO'
                }

              </button>


              <button
                className="skip-location-button"
                disabled={salvando}
                onClick={finalizarOnboarding}
              >
                Agora não
              </button>


              <button
                className="back-link-button"
                disabled={salvando}
                onClick={() => {
                  setErro('');
                  setEtapa(2);
                }}
              >
                ← Voltar
              </button>

            </>

          )}

          {etapa === 4 && (

            <div className="onboarding-finished">

              <div className="finished-icon">
                ✓
              </div>

              <span className="finished-small-text">
                CHECKPOINT ALCANÇADO
              </span>

              <h1>
                Seu SpawnPoint está pronto!
              </h1>

              <p className="onboarding-description">
                Agora é hora de explorar a comunidade
                geek de Fortaleza.
              </p>


              <button
                className="onboarding-primary-button"
                onClick={() =>
                  navigate('/', {
                    replace: true
                  })
                }
              >
                EXPLORAR FORTALEZA
              </button>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}