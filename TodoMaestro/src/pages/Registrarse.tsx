import React,{ useState } from 'react';
import { IonContent,IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonLabel,IonSelect,IonSelectOption,IonInput,IonText,IonButton, IonBackButton, IonButtons, IonList, IonIcon} from '@ionic/react';
import { useHistory } from 'react-router';
import { arrowBack, chevronBack } from 'ionicons/icons';
//@ts-ignore
import api from '../services/api';

const Registrarse: React.FC = () => {

  const [userData, setUserData] = useState({
      region: '',
      comuna: '',
      usuario: '',
      apellido: '',
      password: '',
      confirmPassword: '',
      email: '',
      tipoPerfil: ''
  });
  
  const [error, setError] = useState('');
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value
    });   
  };

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!userData.region || !userData.comuna || !userData.usuario || !userData.apellido || !userData.password || !userData.confirmPassword || !userData.email || !userData.tipoPerfil) {
      setError('Por favor completa todos los campos');
    } else if (!emailRegex.test(userData.email)) {
      setError('Por favor ingresa un email válido');
    } else if (userData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
    } else if (userData.password !== userData.confirmPassword) {
      setError('Las contraseñas no coinciden');
    } else {
      setError('');
      try {
        // Enviar los datos de registro al backend
        const response = await api.post('/auth/register', userData); // Ruta POST en tu backend
        console.log(response.data); // Puedes mostrar la respuesta si es necesario

        // Redirigir o mostrar un mensaje de éxito
        alert('Registro exitoso');
        // Por ejemplo, redirigir al login
        history.push('/iniciosesion');
      } catch (error) {
        console.error('Error al registrar:', error);
        setError('Hubo un problema al registrar tu cuenta. Intenta nuevamente.');
      }
    }
  };
  

  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBack} style={{ fontSize: '24px', padding: '14px'}}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <IonList>
          <IonItem>
            <IonInput
              label='Usuario'
              type="text"
              name="usuario"
              value={userData.usuario}
              placeholder="Ingresa tu nombre de usuario"
              onIonChange={handleChange}
            />
          </IonItem>

          <IonItem>
            <IonInput
              label='Apellido'
              type="text"
              name="apellido"
              value={userData.apellido}
              placeholder="Ingresa tu apellido"
              onIonChange={handleChange}
            />
          </IonItem>

          <IonItem>
            <IonInput
              label='Email'
              type="email"
              name="email"
              value={userData.email}
              placeholder="email@domain.com"
              onIonChange={handleChange}
            />
          </IonItem>

          <IonItem>
            <IonInput
              label='Contraseña'
              type="password"
              name="password"
              value={userData.password}
              placeholder="***********"
              onIonChange={handleChange}
            />
          </IonItem>

          <IonItem>
            <IonInput
              label='Confirmar Contraseña'
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              placeholder="***********"
              onIonChange={handleChange}
            />
          </IonItem>
          <IonItem>
            <IonSelect
              label='Región'
              name="region"
              value={userData.region}
              placeholder="Selecciona tu región"
              onIonChange={handleChange}
            >
              <IonSelectOption value="Region Metropolitana">Región Metropolitana</IonSelectOption>
              <IonSelectOption value="Valparaíso">Valparaíso</IonSelectOption>
              <IonSelectOption value="Biobío">Biobío</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonInput
              label='Comuna'
              type="text"
              name="comuna"
              value={userData.comuna}
              placeholder="Ingresa tu comuna"
              onIonChange={handleChange}
            />
          </IonItem>

          <IonItem>
            <IonSelect
              label='Tipo de Perfil'
              name="tipoPerfil"
              value={userData.tipoPerfil}
              placeholder="Elige tu perfil"
              onIonChange={handleChange}
            >
              <IonSelectOption value="Trabajador">Trabajador</IonSelectOption>
              <IonSelectOption value="Empleador">Empleador</IonSelectOption>
            </IonSelect>
          </IonItem>

          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
          <br/>
          <IonText color="danger">Obligatorio rellenar todos los campos.</IonText>
          <IonButton expand="block" onClick={handleRegister}>
            Registrarse
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Registrarse;