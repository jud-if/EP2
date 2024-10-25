import React,{ useState } from 'react';
import { IonContent,IonHeader, IonPage, IonTitle, IonToolbar,IonItem,IonLabel,IonSelect,IonSelectOption,IonInput,IonText,IonButton, IonBackButton, IonButtons, IonList} from '@ionic/react';

const Registrarse: React.FC = () => {

    const [userData, setUserData] = useState({
        region: '',
        comuna: '',
        usuario: '',
        password: '',
        confirmPassword: '',
        email: ''
      });
    
      const [error, setError] = useState('');
    
      const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value
        });


        
      };
      const handleRegister = () => {
        if (!userData.region || !userData.comuna || !userData.usuario || !userData.password || !userData.confirmPassword || !userData.email) {
          setError('Por favor completa todos los campos');
        } else if (userData.password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres');
        } else if (userData.password !== userData.confirmPassword) {
          setError('Las contraseñas no coinciden');
        } else {
          setError('');
          console.log('Datos de registro:', userData);
        }

      }

    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
              <IonBackButton defaultHref="#"></IonBackButton>
          </IonButtons>
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
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
              label='Email'
              type="email"
              name="Ingresar email"
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
              {/* Agrega más opciones de regiones aquí */}
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
    )};

export default Registrarse;