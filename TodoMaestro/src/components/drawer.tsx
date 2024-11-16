import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonButton, IonTitle, IonToolbar, IonIcon, IonItem, IonList, IonLabel, IonMenuToggle } from '@ionic/react';
import { bookmarks, create, home, logOut, person, personCircle } from 'ionicons/icons';
//@ts-ignore
import api from '../services/api';
interface AppPage {
  url?: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  action?: () => void;
}


const Drawer: React.FC = () => {

  const history = useHistory();
  const location = useLocation();
  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');  // Endpoint para cerrar sesión
      history.push('/bienvenida'); // Redirige a la página de bienvenida 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

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
      iosIcon: logOut,
      mdIcon: logOut,
      action: handleLogout
    }
  ];

  return (
    <> 
    <IonMenu contentId="main-content"> 
      <IonHeader> 
        <IonToolbar> 
          <IonIcon slot="start" icon={personCircle} size="large" className='ion-padding'>
          </IonIcon> 
          <IonLabel>Juan Perez</IonLabel> 
        </IonToolbar> 
      </IonHeader> 
      <IonContent className="ion-padding"> 
        <IonList> {appPages.map((appPage, index) => { 
          if (appPage.action) { 
            return (
          <IonMenuToggle key={index}> 
            <IonItem button onClick={appPage.action} lines='none'> 
              <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} /> 
              <IonLabel>{appPage.title}</IonLabel> 
            </IonItem> 
          </IonMenuToggle>
          ); 
        } return (
          <IonMenuToggle key={index}> 
            <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection='none' lines='none' detail={false}> 
              <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} /> 
              <IonLabel>{appPage.title}</IonLabel> 
            </IonItem> 
          </IonMenuToggle>); 
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
