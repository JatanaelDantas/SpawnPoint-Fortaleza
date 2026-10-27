import React from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuth();

  if (!isAuthModalOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Entre no SpawnPoint</h2>
        <p>Você precisa estar logado para realizar esta ação e explorar Fortaleza ao máximo!</p>

        <div style={styles.actions}>
          <a href="/login" style={styles.loginBtn}>Entrar</a>
          <a href="/register" style={styles.registerBtn}>Criar Conta</a>
        </div>

        <button onClick={closeAuthModal} style={styles.closeBtn}>
          Continuar navegando como visitante
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: '#1E1E2E',
    color: '#FFF',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    margin: '1.5rem 0',
    justifyContent: 'center',
  },
  loginBtn: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#6C5CE7',
    color: '#FFF',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  registerBtn: {
    padding: '0.6rem 1.2rem',
    backgroundColor: 'transparent',
    border: '2px solid #6C5CE7',
    color: '#FFF',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  closeBtn: {
    marginTop: '1rem',
    background: 'none',
    border: 'none',
    color: '#A0A0A0',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
};