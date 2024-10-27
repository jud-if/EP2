import React, { useState } from 'react';
import { IonContent, IonLabel, IonPage, IonSegment, IonSegmentButton, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, IonCardSubtitle, IonButton, IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons';
import Tabbar from '../components/tabbar';
import Buscador from '../components/buscador';
import BtnPublicar from '../components/btnOpciones';

const MisPublicaciones: React.FC = () => {
  const misPublicacionesCardsData = {
    'mis ofertas': [
      { title: 'Busco a Alguien', subtitle: 'Valparaíso', content: 'Descripción de la oferta.', actions: [{ label: 'Eliminar', icon: trash }, { label: 'Editar' }] },
    ],
    'mis servicios': [
      { title: 'Trabajos de Electricista', subtitle: 'Villa Alemana', content: 'Descripción del servicio.', actions: [{ label: 'Eliminar', icon: trash }, { label: 'Editar' }] },
    ],
  };
  

  return (
    <IonPage>

      <IonContent fullscreen>
        <Buscador/>
        <Tabbar firstOption="Mis ofertas" secondOption="Mis servicios" cardsData={misPublicacionesCardsData} />
      </IonContent>

      <BtnPublicar/>
    </IonPage>
  );
};

export default MisPublicaciones;
