import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonGrid, IonRow, IonCol, IonText, IonFooter,IonTitle} from '@ionic/react';
import './Bienvenida.css';
import images from '../assets/assets';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="titulo">
          <IonTitle>TodoMaestro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-text-center">
        <IonGrid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }} >
          <IonRow className='ion-align-items-center'>
            <IonCol size="12" sizeLg="6">
              <img src={images.imgTrabajo2} alt="Herramientas" style={{width: '100px'}}/>
              <IonText>
                <h1 className='tituloBienvenida'>
                  ¿<span style={{ color: '#4275F0' }}>Buscas un servicio</span> u <span style={{ color: '#286359' }}>ofreces uno</span>?
                </h1>
              </IonText>
              <img src={images.imgTrabajo1} alt="Tuberias" style={{width: '150px'}} />
            </IonCol>
            <IonCol className="ion-margin-top ion-margin-start">
              <IonButton routerLink="/iniciosesion" routerDirection='forward' expand="block" className='btnInicioSesion' strong>
                Tengo cuenta
              </IonButton>
              <IonButton routerLink="/registrarse" routerDirection='forward' expand="block" className='btnRegistro' strong>
                Soy nuevo
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;