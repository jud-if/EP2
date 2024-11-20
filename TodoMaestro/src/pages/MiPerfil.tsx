import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import Dataperfil from '../components/dataperfil';

const MiPerfil: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Dataperfil />
        <IonButton expand="full" routerLink="/app/editarperfil" color="primary">
          Editar Perfil
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MiPerfil;