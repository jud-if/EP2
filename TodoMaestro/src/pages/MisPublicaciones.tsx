import React, { useState , useEffect} from 'react';
import { IonContent, IonLabel, IonPage, IonCardSubtitle, IonButton, IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons';
import Tabbar from '../components/tabbar';
import Buscador from '../components/buscador';
import BtnPublicar from '../components/btnOpciones';



const MisPublicaciones: React.FC = () => {
  const [misPublicacionesCardsData, setHomeCardsData] = useState<{ ofertas: any[]; servicios: any[] }>({
        ofertas: [],
        servicios: [],
      });
      const [error, setError] = useState<string>('');
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchAnuncios = async () => {
          try {
            // Primero, verificamos el estado de autenticación
            const authResponse = await fetch('http://localhost:3000/auth/status', {
              credentials: 'include' // Importante para enviar cookies
            });
            const authData = await authResponse.json();
    
            if (!authData.isAuthenticated) {
              setError('Usuario no autenticado');
              setLoading(false);
              return;
            }
    
            // Usamos el ID del usuario obtenido
            const userId = authData.userId;
            
            // Hacemos la petición con el ID del usuario
            const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
              credentials: 'include' // Importante para enviar cookies
            });
            
    
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            
            // Separamos los anuncios por tipo
            const servicios = data.filter((item: any) => item.tipo_anuncio === 0);
            const ofertas = data.filter((item: any) => item.tipo_anuncio === 1);

            setHomeCardsData({ ofertas, servicios });
          } catch (error) {
            console.error('Error al cargar los anuncios:', error);
            setError('Error al cargar los anuncios');
          } finally {
            setLoading(false);
          }
        };
        fetchAnuncios();
  }, []);
  return (
    <IonPage>

      <IonContent fullscreen>
        <Buscador/>
        <Tabbar firstOption="Servicios" secondOption="Ofertas" cardsData={misPublicacionesCardsData} context='misPublicaciones'/>
      </IonContent>

      <BtnPublicar/>
    </IonPage>
  );
};

export default MisPublicaciones;
