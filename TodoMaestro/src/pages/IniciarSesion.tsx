import { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonList, IonPage, IonRouterLink, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './InicioSesion.css';
import { arrowBack } from 'ionicons/icons';

const InicioSesion: React.FC = () => {
  // Constantes para credenciales locales
  const credenciales = {
    email: "usuario@ejemplo.com",
    password: "123456"
  };

  // Estado para los datos de inicio de sesión
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const history = useHistory();

  // Función de manejo de inicio de sesión
  const handleLogin = () => {
    if (email === credenciales.email && password === credenciales.password) {
      // Redirigir a home en caso de éxito
      history.push('/app/home');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} style={{ fontSize: '24px', padding: '14px'}}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div className="formularioSesion">
          <IonInput
            label="Correo electrónico"
            labelPlacement="floating"
            fill="outline"
            type="email"
            placeholder="Ingrese correo"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          ></IonInput>

          <br />

          <IonInput
            label="Contraseña"
            labelPlacement="floating"
            fill="outline"
            type="password"
            placeholder="Ingrese contraseña"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          ></IonInput>

          <br />
          <IonRouterLink color="medium" href="#">
            ¿Olvidó su contraseña?
          </IonRouterLink>

          <div className="ion-padding-top">
            <IonButton expand="block" onClick={handleLogin}>
              Ingresar
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default InicioSesion;