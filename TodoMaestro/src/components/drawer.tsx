import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonButton, IonTitle, IonToolbar, IonIcon, IonItem} from '@ionic/react';
import {personCircle} from 'ionicons/icons';

const Drawer: React.FC = () => {
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
              <IonIcon slot="start" icon={personCircle} size="large" className='ion-padding'></IonIcon>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonButton routerLink="/perfil" expand="block" fill="clear">
              Mi perfil
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton routerLink="/home" expand="block" fill="clear">
              Inicio
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton routerLink="#" expand="block" fill="clear">
              Guardados
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton routerLink="/misPublicaciones" expand="block" fill="clear">
              Mis publicaciones
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton routerLink="#" expand="block" fill="clear">
              Cerrar sesion
            </IonButton>
          </IonItem>
        </IonContent>
      </IonMenu>
      <IonHeader id="main-content" className='ion-no-border'>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            
          </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Drawer;
