// AuthForm.tsx
import { useState } from 'react';
import styles from './AuthForm.module.css';

type Credentials = {
  email: string;
  password: string;
};

type AuthFormProps = {
  onAuth: (credentials: Credentials) => Promise<void>;
};

const AuthForm = ({ onAuth }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      await onAuth({ email, password }); // délégué au parent
    } catch (err) {
      setError('Erreur lors de l\'authentification. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Connexion</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Chargement...' : 'Connexion'}
      </button>
    </form>
  );
};

export default AuthForm;
