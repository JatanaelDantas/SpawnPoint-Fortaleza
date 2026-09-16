import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import Toast from '../components/Toast';
import './Auth.css';

export default function Register() {
  const [tipo, setTipo] = useState('USER');
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '', nomeEmpresa: '', cnpj: '', cpf: '', termosAceitos: false });
  const [toast, setToast] = useState({ msg: '', type: '' });
  const navigate = useNavigate();

  const handleTab = (novoTipo) => {
    setTipo(novoTipo);
    setFormData({ ...formData, nomeEmpresa: '', cnpj: '', cpf: '' }); // Reseta campos
  };

  const handleRegister = async (e) => {

  e.preventDefault();


  if (!formData.termosAceitos) {

    setToast({
      msg: 'Aceite os termos LGPD para continuar.',
      type: 'error'
    });

    return;
  }


  try {

    const data =
      await register({
        ...formData,
        tipo
      });


    localStorage.setItem(
      'token',
      data.token
    );


    setToast({
      msg: 'Cadastro realizado com sucesso!',
      type: 'success'
    });


    setTimeout(() => {

      /*
       * Jogador vai para onboarding.
       *
       * Lojista terá o fluxo próprio
       * feito pelo outro membro.
       */
      if (data.tipo === 'USER') {

        navigate('/onboarding');

      } else {

        navigate('/');

      }

    }, 800);


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
          <Link to="/login" className="auth-tab">LOGIN</Link>
          <button className="auth-tab active">CADASTRO</button>
        </div>
        
        {/* Toggle Player / Comercial */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button type="button" onClick={() => handleTab('USER')} className={`btn-primary ${tipo === 'COMPANY' ? 'outline' : ''}`} style={{ background: tipo === 'USER' ? '#aa3bff' : 'transparent', border: '1px solid #aa3bff', color: '#fff' }}>PLAYER</button>
          <button type="button" onClick={() => handleTab('COMPANY')} className={`btn-primary ${tipo === 'USER' ? 'outline' : ''}`} style={{ background: tipo === 'COMPANY' ? '#ff7a00' : 'transparent', border: '1px solid #ff7a00', color: '#fff' }}>COMERCIAL</button>
        </div>

        <form onSubmit={handleRegister}>
          {tipo === 'COMPANY' && (
            <>
              <div className="input-group">
                <label>NOME DA EMPRESA</label>
                <input type="text" value={formData.nomeEmpresa} onChange={e => setFormData({...formData, nomeEmpresa: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>CNPJ</label>
                <input type="text" value={formData.cnpj} onChange={e => setFormData({...formData, cnpj: e.target.value})} required />
              </div>
            </>
          )}

          <div className="input-group">
            <label>{tipo === 'COMPANY' ? 'NOME DO RESPONSÁVEL' : 'SEU NOME / NICK'}</label>
            <input type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} required />
          </div>

          {tipo === 'COMPANY' && (
             <div className="input-group">
             <label>CPF DO RESPONSÁVEL</label>
             <input type="text" value={formData.cpf} onChange={e => setFormData({...formData, cpf: e.target.value})} required />
           </div>
          )}

          <div className="input-group">
            <label>{tipo === 'COMPANY' ? 'E-MAIL CORPORATIVO OU DO DONO' : 'E-MAIL'}</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          
          <div className="input-group">
            <label>SENHA</label>
            <input type="password" value={formData.senha} onChange={e => setFormData({...formData, senha: e.target.value})} required />
          </div>

          <div className="lgpd-box">
            <input type="checkbox" id="lgpd-reg" checked={formData.termosAceitos} onChange={e => setFormData({...formData, termosAceitos: e.target.checked})} />
            <label htmlFor="lgpd-reg">Concordo com o tratamento dos meus dados conforme as diretrizes da LGPD (Lei 13.709/2018).</label>
          </div>

          <button type="submit" className="btn-primary">CRIAR CONTA</button>
        </form>
      </div>
    </div>
  );
}