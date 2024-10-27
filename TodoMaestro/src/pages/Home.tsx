import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Buscador from '../components/buscador';
import Tabbar from '../components/tabbar';
import BtnPublicar from '../components/btnOpciones';
import { bookmarkOutline } from 'ionicons/icons';
import { useState } from 'react';



const Home: React.FC = () => {
  const homeCardsData = {
    contratar: [
      { title: 'Servicio 1', content: 'Descripción del servicio 1.', actions: [{ label: 'Leer más'}, {label: '',icon: bookmarkOutline }] },
      { title: 'Servicio 2', content: 'Descripción del servicio 2.', actions: [{ label: 'Leer más'}, {label: '',icon: bookmarkOutline }] },
    ],
    trabajar: [
      { title: 'Card Title', subtitle: 'Card Subtitle', content: 'Texto para trabajar.', actions: [{ label: 'Leer más'}, {label: '', icon: bookmarkOutline }] },
    ],
  };
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <Buscador/>
        <Tabbar firstOption="Contratar" secondOption="Trabajar" cardsData={homeCardsData} />
      </IonContent>

      <BtnPublicar/>
    </IonPage>
  );
};

export default Home;
