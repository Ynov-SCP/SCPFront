"use client"
import { useEffect, useState } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import AuthForm from './component/AuthForm';
import SCPList from './component/SCPList';
import Notification from './component/Notification';

type Credentials = {
  email: string;
  password: string;
};

export default function Home() {
  const [scps, setScps] = useState([]);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    const fetchScps = async () => {
      try {
        const res = await fetch('/api/scps');
        if (!res.ok) {
          throw new Error('Erreur de chargement des SCP');
        }
        const data = await res.json();
        setScps(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setNotification(err.message);
        } else {
          setNotification('Une erreur inconnue est survenue.');
        }
      } finally {
        setLoading(false); // Fin du chargement
      }
    };
    fetchScps();
  }, []);

  const handleAuth = async (credentials: Credentials) => {
    // Logique d'authentification ici
    console.log(credentials);
    // Vous pouvez ajouter une logique d'authentification ici
  };

  const handleDelete = async (id: number) => { // Explicitly typing id as number
    try {
      const res = await fetch(`/api/scps/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Erreur lors de la suppression du SCP');
      }
      setScps(scps.filter((scp: any) => scp.id !== id));
      setNotification('SCP supprimé avec succès');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setNotification(err.message);
      } else {
        setNotification('Une erreur inconnue est survenue lors de la suppression.');
      }
    }
  };

  return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Liste des SCP</h1>
          <AuthForm onAuth={handleAuth} />
          {notification && <Notification message={notification} />}
          {loading ? (
              <p>Chargement des SCP...</p> // Message de chargement
          ) : (
              <SCPList scps={scps} onDelete={handleDelete} />
          )}
        </main>
      </div>
  );
}