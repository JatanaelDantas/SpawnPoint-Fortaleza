const AUTH_URL =
  'http://localhost:8080/api/auth';

const ONBOARDING_URL =
  'http://localhost:8080/api/onboarding';


async function tratarResposta(res) {

  if (res.ok) {
    return res.json();
  }


  let mensagem =
    'Ocorreu um erro na comunicação com o servidor.';


  try {

    const body = await res.json();


    if (typeof body === 'string') {

      mensagem = body;

    } else if (body.message) {

      mensagem = body.message;

    } else if (body.error) {

      mensagem = body.error;

    }

  } catch {

    try {

      const texto = await res.text();

      if (texto) {
        mensagem = texto;
      }

    } catch {
      // mantém mensagem padrão
    }

  }


  if (res.status === 401) {

    localStorage.removeItem('token');

  }


  throw new Error(mensagem);
}


export const login = async (dados) => {

  const res = await fetch(
    `${AUTH_URL}/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(dados)
    }
  );


  return tratarResposta(res);
};


export const register = async (dados) => {

  const res = await fetch(
    `${AUTH_URL}/register`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(dados)
    }
  );


  return tratarResposta(res);
};


export const buscarStatusOnboarding =
  async () => {

    const token =
      localStorage.getItem('token');


    if (!token) {

      throw new Error(
        'Usuário não autenticado.'
      );

    }


    const res = await fetch(
      `${ONBOARDING_URL}/status`,
      {
        method: 'GET',

        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );


    return tratarResposta(res);
  };


export const concluirOnboarding =
  async (dados) => {

    const token =
      localStorage.getItem('token');


    if (!token) {

      throw new Error(
        'Usuário não autenticado.'
      );

    }


    const res = await fetch(
      `${ONBOARDING_URL}/concluir`,
      {
        method: 'POST',

        headers: {

          'Content-Type':
            'application/json',

          Authorization:
            `Bearer ${token}`

        },

        body:
          JSON.stringify(dados)
      }
    );


    return tratarResposta(res);
  };