import React, { useState , useEffect} from 'react';
import { IonContent, IonLabel, IonPage, IonCardSubtitle, IonButton, IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons';
import Tabbar from '../components/tabbar';
import BtnPublicar from '../components/btnOpciones';

import { useAuth } from '../contexts/authContext';

const MisPublicaciones: React.FC = () => {
  const [misPublicacionesCardsData, setMisPublicacionesCardsData] = useState<{ ofertas: any[]; servicios: any[] }>({
    ofertas: [],
    servicios: [],
  });

  const [filteredAnunciosMisPublicaciones, setFilteredAnunciosMisPublicaciones] = useState<{ ofertas: any[]; servicios: any[] }>({
    ofertas: [],
    servicios: [],
  });
  const [isFiltered, setIsFiltered] = useState(false); // Estado para verificar si hay filtros aplicados
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/usuariosanuncios/${userId}`, {
          credentials: 'include', 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Separamos los anuncios por tipo
        const servicios = data.filter((item: any) => item.tipo_anuncio === "1");
        const ofertas = data.filter((item: any) => item.tipo_anuncio === "0");

        setMisPublicacionesCardsData({ ofertas, servicios });
        setFilteredAnunciosMisPublicaciones({ ofertas, servicios }); // Inicialmente, los anuncios filtrados serán los mismos que los originales
      } catch (error) {
        console.error('Error al cargar los anuncios:', error);
        setError('Error al cargar los anuncios');
      } finally {
        setLoading(false);
      }
    };
    fetchAnuncios();
  }, [userId]);
  return (
    <IonPage>
      <IonContent fullscreen>
        <Tabbar firstOption="Servicios" secondOption="Ofertas" cardsData={isFiltered ? filteredAnunciosMisPublicaciones : misPublicacionesCardsData} context="misPublicaciones" />
      </IonContent>
      <BtnPublicar setFilteredAnunciosMisPublicaciones={setFilteredAnunciosMisPublicaciones} setIsFiltered={setIsFiltered} context="misPublicaciones" />
    </IonPage>
  );
};

export default MisPublicaciones;
