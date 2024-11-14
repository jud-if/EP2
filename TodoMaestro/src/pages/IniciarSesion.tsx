import { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonList, IonPage, IonRouterLink, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './InicioSesion.css';
import { arrowBack } from 'ionicons/icons';
//@ts-ignore
import api from '../services/api';

const InicioSesion: React.FC = () => {

  const [userData, setUserData] = useState({
    password: '',
    email: ''
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función de manejo de inicio de sesión
  const handleLogin = async () => {
    if(!userData.email || !userData.password){
      setError('Porfavor Completar todos loscampos');
    }
    else if(!userData.email){
      setError('Ingrese correo electronico');
    }
    else if(!userData.password)
    {
      setError('Ingrese contraseña porfavor');
    }
    else{
      try {
        // Realiza la solicitud POST para autenticar y obtener el token JWT
        const response = await api.post('/auth/login', {
          email: userData.email,
          password: userData.password,
        });
  
        const { token } = response.data;
  
        // Guarda el token en localStorage
        localStorage.setItem('authToken', token);
  
        // Redirige al usuario a la página principal en caso de éxito
        history.push('/app/home');
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Credenciales incorrectas');
      }
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
            name="email"
            label="Correo electrónico"
            labelPlacement="floating"
            fill="outline"
            type="email"
            placeholder="Ingrese correo"
            value={userData.email}
            onIonChange={handleChange}
          ></IonInput>

          <br />

          <IonInput
            name="password"
            label="Contraseña"
            labelPlacement="floating"
            fill="outline"
            type="password"
            placeholder="Ingrese contraseña"
            value={userData.password}
            onIonChange={handleChange}
          ></IonInput>
          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
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