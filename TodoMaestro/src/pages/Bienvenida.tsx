import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonGrid, IonRow, IonCol, IonText, IonFooter,IonTitle} from '@ionic/react';
import './Bienvenida.css';
import images from '../assets/assets';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TodoMaestro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-justify=content-center">
        <section className="hero">
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeLg="6">
                <img src={images.imgTrabajo2} alt="Herramientas" style={{width: '100px'}}/>
                <IonText>
                  <h1>
                    ¿<span style={{ color: '#4275F0' }}>Buscas un servicio</span> u <span style={{ color: '#286359' }}>ofreces uno</span>?
                  </h1>
                </IonText>
                <img src={images.imgTrabajo1} alt="Tuberias" style={{width: '150px'}} />
              </IonCol>
              <IonCol className="ion-justify-content-center ion-margin-top">
                <IonButton routerLink="/InicioSesion" expand="block">
                  Tengo cuenta
                </IonButton>
                <IonButton routerLink="/Registrarse" expand="block">
                  Soy nuevo
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Home;