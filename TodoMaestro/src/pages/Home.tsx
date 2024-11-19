import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Buscador from '../components/buscador';
import Tabbar from '../components/tabbar';
import BtnPublicar from '../components/btnOpciones';
import { bookmarkOutline } from 'ionicons/icons';
import { useState } from 'react';
import React, { useEffect } from 'react';




const Home: React.FC = () => {
  // Estado para almacenar los datos de los anuncios
  const [homeCardsData, setHomeCardsData] = useState<{ contratar: any[]; trabajar: any[] }>({
    contratar: [],
    trabajar: [],
  });

  
    useEffect(() => {
      const fetchAnuncios = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/anuncios');
          const data = await response.json();
          
  
        const contratar = data.filter((item: any) => item.tipo_anuncio === "0")
         const trabajar = data.filter((item:any) => item.tipo_anuncio === "1");
         console.log(contratar,trabajar)
          
    
          setHomeCardsData({ contratar, trabajar });
        } catch (error) {
          console.error('Error al cargar los anuncios:', error);
        }
      };
  
    fetchAnuncios();
  }, []);
  
    


  return (
    <IonPage>
      <IonContent fullscreen>
        <Buscador />
        <Tabbar firstOption="Trabajar" secondOption="Contratar" cardsData={homeCardsData} context='home' />
      </IonContent>
      <BtnPublicar />
    </IonPage>
  );
};

export default Home;




