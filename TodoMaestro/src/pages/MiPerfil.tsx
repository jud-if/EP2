import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonSpinner, IonButtons, IonBackButton } from '@ionic/react';
import Dataperfil from '../components/dataperfil';

const MiPerfil: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from JSON when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('perfilejemplo.json');
        const data = await response.json();
        setUser(data);
        setLoading(false);
        console.log(data.name)
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
            <IonBackButton defaultHref="#"></IonBackButton>
            </IonButtons>
            <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <IonSpinner name="crescent" />
        ) : user ? (
          <Dataperfil user={user} />
        ) : (
          <p>Error al cargar el perfil del usuario.</p>
        )}

        <IonButton expand="full" routerLink="#" color="primary">
          Editar Perfil
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MiPerfil;