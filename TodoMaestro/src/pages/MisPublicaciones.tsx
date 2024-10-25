import React, { useState } from 'react';
import { 
  IonContent, 
  IonLabel, 
  IonSegment, 
  IonSegmentButton, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonSearchbar,
  IonCardSubtitle,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { bookmark, bookmarkOutline, trash} from 'ionicons/icons';
import Drawer from '../components/drawer';

const MisPublicaciones: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string>('misofertas');

  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedSegment(event.detail.value);
  };


  const renderCards = () => {
    if (selectedSegment === 'misofertas') {
      return (
        <div>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Busco a Alguien</IonCardTitle>
              <IonCardSubtitle>Valparaiso</IonCardSubtitle>
            </IonCardHeader>

          <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            <IonButton fill="clear"><IonIcon icon={trash} size='large'></IonIcon></IonButton>
            <IonButton fill="clear">Editar</IonButton>
          </IonCard>
        </div>
      );
    } else if (selectedSegment === 'misservicios') {
      return (
        <div>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Trabajos de Electricista</IonCardTitle>
              <IonCardSubtitle>Villa Alemana</IonCardSubtitle>
            </IonCardHeader>

          <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            <IonButton fill="clear"><IonIcon icon={trash} size='large'></IonIcon></IonButton>
            <IonButton fill="clear">Editar</IonButton>
          </IonCard>
        </div>
      );
    }
  };

  return (
    <>
    <Drawer/>
      <IonToolbar>
      <IonSearchbar showCancelButton="never" placeholder="Show on Focus" ></IonSearchbar>
        <IonSegment value={selectedSegment} onIonChange={handleSegmentChange}>
          <IonSegmentButton value="misofertas">
            <IonLabel>Mis ofertas</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="misservicios">
            <IonLabel>Mis servicios</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>

      <IonContent>
        {renderCards()}
      </IonContent>
    </>
  );
};

export default MisPublicaciones;
