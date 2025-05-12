import { useState } from 'react';
import styles from './AuthForm.module.css';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Échec de la connexion');
            }

            const data = await response.json();
            // Stocker le token ou autre information
            console.log(data);
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
