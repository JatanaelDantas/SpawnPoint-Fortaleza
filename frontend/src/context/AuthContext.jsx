
import React, {
  createContext,
  useContext,
  useState,
  useCallback
} from 'react';

const AuthContext = createContext(null);

const STORAGE_USER = 'spawnpoint_user';

function carregarUsuario() {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    const salvo = localStorage.getItem(STORAGE_USER);

    if (salvo) {
      const usuario = JSON.parse(salvo);

      if (usuario && typeof usuario === 'object') {
        return usuario;
      }
    }

    const tipo = localStorage.getItem('tipoUsuario');

    return {
      nome: '',
      email: '',
      tipo: tipo || null
    };
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(carregarUsuario);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isAuthenticated = Boolean(
    user && localStorage.getItem('token')
  );

  const login = useCallback((userData, tokenRecebido) => {
    if (tokenRecebido) {
      localStorage.setItem('token', tokenRecebido);
    }

    if (!localStorage.getItem('token')) {
      throw new Error('Token de autenticação não encontrado.');
    }

    const usuario = {
      ...userData
    };

    localStorage.setItem(
      STORAGE_USER,
      JSON.stringify(usuario)
    );

    if (usuario.tipo) {
      localStorage.setItem('tipoUsuario', usuario.tipo);
    }

    setUser(usuario);
    setIsAuthModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem(STORAGE_USER);

    setUser(null);
    setIsAuthModalOpen(false);
  }, []);

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const requireAuth = useCallback((actionCallback) => {
    if (isAuthenticated) {
      if (typeof actionCallback === 'function') {
        actionCallback();
      }
    } else {
      setIsAuthModalOpen(true);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        requireAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser utilizado dentro de AuthProvider.'
    );
  }

  return context;
};
