import { useEffect, useState } from 'react';
import AuthForm from '../component/AuthForm';
import SCPList from '../component/SCPList';
import Notification from '../component/Notification';

const Home = () => {
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
            } catch (err) {
                setNotification(err.message);
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchScps();
    }, []);

    const handleAuth = async (credentials) => {
        // Logique d'authentification ici
        console.log(credentials);
        // Vous pouvez ajouter une logique d'authentification ici
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/scps/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Erreur lors de la suppression du SCP');
            }
            setScps(scps.filter((scp) => scp.id !== id));
            setNotification('SCP supprimé avec succès');
        } catch (err) {
            setNotification(err.message);
        }
    };

    return (
        <div>
            <h1>Liste des SCP</h1>
            <AuthForm onAuth={handleAuth} />
            {notification && <Notification message={notification} />}
            {loading ? (
                <p>Chargement des SCP...</p> // Message de chargement
            ) : (
                <SCPList scps={scps} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default Home;
