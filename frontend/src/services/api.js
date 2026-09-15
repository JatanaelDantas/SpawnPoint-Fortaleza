const API_URL = 'http://localhost:8080/api/auth';

export const login = async (dados) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  if(!res.ok) throw new Error("Credenciais inválidas");
  return res.json();
};

export const register = async (dados) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  if(!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Erro no cadastro");
  }
  return res.json();
};