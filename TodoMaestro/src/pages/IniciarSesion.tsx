import { useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonInputPasswordToggle, IonItem, IonList, IonPage, IonRouterLink, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './InicioSesion.css';
import { arrowBack, colorFill, lockClosed, person } from 'ionicons/icons';
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
    else{
      try {
        // Realiza la solicitud POST para autenticar y obtener el token JWT
          const response = await api.post('/auth/login', {
          email: userData.email,
          password: userData.password,
        });

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
        <div className="formulario-container">
          <div className='tituloInicio'>
            <h1>Iniciar Sesión</h1>
          </div>
          <IonItem>
            <IonInput
                name="email"
                type="email"
                class="custom"
                placeholder="Ingrese su correo"
                value={userData.email}
                onIonChange={handleChange}
            >
              <IonIcon slot="start" icon={person} aria-hidden="true"></IonIcon>
            </IonInput>
          </IonItem>
          <IonItem>
            <IonInput 
              name="password"
              class="custom"
              type="password"
              placeholder="Ingrese su contraseña"
              value={userData.password}
              onIonChange={handleChange}
            >
              <IonIcon slot="start" icon={lockClosed} aria-hidden="true"></IonIcon>
            </IonInput>
          </IonItem>
            {error && (
              <IonText color="danger">
                <p>{error}</p>
              </IonText>
            )}
              <IonRouterLink color="medium" href="#">
                <p style={{color:"white"}}>¿Olvidó su contraseña?</p>
              </IonRouterLink>
              <IonButton expand="block" onClick={handleLogin} className='btnIngresar'>
                Ingresar
              </IonButton>
        </div>
      </div>
      </IonContent>
    </IonPage>
  );
};

export default InicioSesion;