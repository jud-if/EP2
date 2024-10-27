import React from 'react';
import { useLocation } from 'react-router-dom';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonButton, IonTitle, IonToolbar, IonIcon, IonItem, IonList, IonLabel, IonMenuToggle} from '@ionic/react';
import {bookmarks, create, home, logOut, person, personCircle} from 'ionicons/icons';

  interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
  }

  const appPages: AppPage[] = [
    {
      title: 'Mi perfil',
      url: '/app/miperfil',
      iosIcon: person,
      mdIcon: person
    },
    {
      title: 'Inicio',
      url: '/app/home',
      iosIcon: home,
      mdIcon: home
    },
    {
      title: 'Guardados',
      url: '/app/guardados',
      iosIcon: bookmarks,
      mdIcon: bookmarks
    },
    {
      title: 'Mis publicaciones',
      url: '/app/mispublicaciones',
      iosIcon: create,
      mdIcon: create
    },
    {
      title: 'Cerrar sesion',
      url: '/app/logOut',
      iosIcon: logOut,
      mdIcon: logOut
    }
  ];

const Drawer: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
              <IonIcon slot="start" icon={personCircle} size="large" className='ion-padding'></IonIcon>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
          {appPages.map((appPage, index) => {
            return (
                <IonMenuToggle key={index}>
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection='none' lines='none' detail={false}>
                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
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
