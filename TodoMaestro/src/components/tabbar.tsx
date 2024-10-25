import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonLabel, 
  IonSegment, 
  IonSegmentButton, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonSearchbar,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonButtons
} from '@ionic/react';
import { bookmark, bookmarkOutline, bookmarkSharp, logoIonic } from 'ionicons/icons';

const Tabbar: React.FC = () => {
  // Paso 1: Definir el estado para manejar la opción seleccionada
  const [selectedSegment, setSelectedSegment] = useState<string>('servicios');

  // Paso 2: Manejador de cambios en el IonSegment
  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedSegment(event.detail.value);
  };

  // Paso 3: Renderizar cards condicionalmente basado en la selección
  const renderCards = () => {
    if (selectedSegment === 'servicios') {
      return (
        <div>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Servicio 1</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Descripción del servicio 1.
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Servicio 2</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Descripción del servicio 2.
            </IonCardContent>
          </IonCard>
        </div>
      );
    } else if (selectedSegment === 'favorites') {
      return (
        <div>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

          <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            <IonButton fill="clear"><IonIcon icon={bookmarkOutline} size='large'></IonIcon></IonButton>
            <IonButton fill="clear">Leer mas</IonButton>
          </IonCard>
        </div>
      );
    }
  };

  return (
    <>
      <IonToolbar>
      <IonSearchbar showCancelButton="never" placeholder="Show on Focus" ></IonSearchbar>
        <IonSegment value={selectedSegment} onIonChange={handleSegmentChange}>
          <IonSegmentButton value="servicios">
            <IonLabel>Contratar</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="favorites">
            <IonLabel>Trabajar</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>

      <IonContent>
        {/* Paso 4: Mostrar la lista de cards basadas en la opción seleccionada */}
        {renderCards()}
      </IonContent>
    </>
  );
};

export default Tabbar;
