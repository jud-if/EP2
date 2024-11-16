import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Buscador from '../components/buscador';
import Tabbar from '../components/tabbar';
import BtnPublicar from '../components/btnOpciones';
import { bookmarkOutline } from 'ionicons/icons';
import { useState } from 'react';

const Home: React.FC = () => {
  const homeCardsData = {
    contratar: [
      {
        id_ad: 1,
        title: 'Servicio 1',
        content: 'Descripción del servicio 1.',
        region: 'Región Metropolitana',
        comuna: 'Santiago',
        salario: 500000,
        fecha_creacion: '2024-11-01',
        actions: [{ label: 'Leer más' }, { label: '', icon: bookmarkOutline }],
      },
      {
        id_ad: 2,
        title: 'Servicio 2',
        content: 'Descripción del servicio 2.',
        region: 'Valparaíso',
        comuna: 'Viña del Mar',
        salario: 60000,
        fecha_creacion: '2024-11-02',
        actions: [{ label: 'Leer más' }, { label: '', icon: bookmarkOutline }],
      },
    ],
    trabajar: [
      {
        id_ad: 3,
        subtitle: 'Card Subtitle',
        title: 'Trabajo 1',
        content: 'Texto para trabajar.',
        region: 'Región Metropolitana',
        comuna: 'Puente Alto',
        salario: 70000,
        fecha_creacion: '2024-11-03',
        actions: [{ label: 'Leer más' }, { label: '', icon: bookmarkOutline }],
      },
    ],
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Buscador />
        <Tabbar firstOption="Contratar" secondOption="Trabajar" cardsData={homeCardsData} />
      </IonContent>
      <BtnPublicar />
    </IonPage>
  );
};

export default Home;


