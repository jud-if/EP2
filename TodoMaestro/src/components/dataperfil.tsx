import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';

interface UserInfoProps {
  user: {
    name: string;
    email: string;
    profilePicture: string;
  };
}

const Dataperfil: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <IonCard>
      {/* Imagen del usuario */}
      <IonImg src={user.profilePicture} alt="Foto de perfil" style={{width: '100px'}}/>

      <IonCardHeader>
        <IonCardTitle>{user.name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p><strong>Email:</strong> {user.email}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default Dataperfil;