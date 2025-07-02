import React, { useState } from 'react';
import styles from './LoginModal.module.css';


const LoginModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <h1 className={styles.welcome}>Bienvenido a El Predio</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Contraseña'
              />
            <a href="">Has olvidado tu contraseña?</a>
          </div>


          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;