import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSpinner } from '@ionic/react';
import { useAuth } from '../contexts/authContext';
//@ts-ignore
import api from '../services/api';
import images from '../assets/assets';
import { getUserData } from '../services/userService';

interface UserData {
  nombres: string;
  apellido: string;
  email: string;
  tipo_perfil: string;
  fecha_creacion: string;
  region: string;
  comuna: string;
}

const Dataperfil: React.FC = ({ }) => {
  const { userId } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    nombres: '',
    apellido: '',
    email: '',
    tipo_perfil: '',
    fecha_creacion: '',
    region: '',
    comuna: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      getUserData(userId, setUserData, setError, setLoading);
    }
  }, [userId]);

  if (loading) {
    return <IonSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <IonCard>
      <img src={images.profilePicture} alt="Foto de perfil" style={{width: '100px'}}/>
      
      <IonCardHeader>
        <IonCardTitle>{userData.nombres} {userData.apellido}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p>Email: {userData.email}</p>
        <p>Tipo de perfil: {userData.tipo_perfil}</p>
        <p>Región: {userData.region}</p>
        <p>Comuna: {userData.comuna}</p>
        <p>Fecha de creación: {new Date(userData.fecha_creacion).toLocaleDateString()}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default Dataperfil;