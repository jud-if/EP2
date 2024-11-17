import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  useIonActionSheet,
  IonList,
  IonItem,
  IonInput,
  IonText,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonAlert,
} from '@ionic/react';
import './Publicar.css';
//@ts-ignore
import api from '../services/api';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/authContext';

interface PublicarProps {
  onClose: () => void; 
}

const Publicar: React.FC<PublicarProps> = ({ onClose }) => {
  const [present] = useIonActionSheet();
  const [isPublished, setIsPublished] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);


  const { userId } = useAuth(); // Obtener el ID del usuario autenticado

  const [userData, setUserData] = useState({
    tipo_anuncio: '',
    titulo: '',
    descripcion: '',
    region: '',
    comuna: '',
    salario: ''
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

  const handlePublicar = async () => {
    if (!userData.titulo || !userData.region || !userData.comuna || !userData.tipo_anuncio) {
      setError('Por favor, completar los campos obligatorios (*)');
    } else {
      setError('');
      try {
        const payload = {
          ...userData,
          id_usuario: userId,
          salario: userData.salario ? parseInt(userData.salario, 10) : null,
        };
        const response = await api.post('/anuncios', payload);
        console.log(response.data);
  
        setIsPublished(true); // Cambia el estado al publicar
        setShowSuccessAlert(true); // Muestra la alerta de éxito

      } catch (error) {
        console.error('Error al publicar el anuncio:', error);
        setError('Hubo un problema al publicar tu anuncio. Intenta nuevamente.');
      }
    }
  };

  const handleClose = () => {
    present({
      header: 
      !isPublished
        ? '¿Está seguro que desea irse sin publicar?'
        : '',
      buttons: [
        {
          text: 'Sí',
          role: 'confirm',
          handler: onClose, // Llama a la función de cierre si confirma
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });
  };
  

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publicar Anuncio</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleClose}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonInput
            label="Título*"
            name='titulo'
            labelPlacement="stacked"
            placeholder="Escriba un título."
            counter={true}
            maxlength={50}
            value={userData.titulo}
            onIonChange={handleChange}
          ></IonInput>
          <IonTextarea
            label='Descripción'
            name='descripcion'
            labelPlacement='stacked'
            counter={true}
            autoGrow={true}
            placeholder='Escriba una descripción.'
            maxlength={700}
            value={userData.descripcion}
            onIonChange={handleChange}
          >  
          </IonTextarea>

          <IonItem>
            <IonLabel>Región<IonText color="danger">(*)</IonText></IonLabel>
            <IonSelect 
              name='region'
              placeholder="Seleccione su región" 
              value={userData.region}
              onIonChange={handleChange}
            >
              <IonSelectOption value="Región Metropolitana">Región Metropolitana</IonSelectOption>
              <IonSelectOption value="Valparaíso">Valparaíso</IonSelectOption>
              <IonSelectOption value="Biobío">Biobío</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Comuna<IonText color="danger">(*)</IonText></IonLabel>
            <IonSelect 
              name='comuna'
              placeholder="Seleccione su comuna" 
              value={userData.comuna}
              onIonChange={handleChange}
            >
              <IonSelectOption value="Comuna 1">Comuna 1</IonSelectOption>
              <IonSelectOption value="Comuna 2">Comuna 2</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Tipo de anuncio<IonText color="danger">(*)</IonText></IonLabel>
            <IonSelect 
              name='tipo_anuncio'
              placeholder="Seleccione su preferencia" 
              value={userData.tipo_anuncio}
              onIonChange={handleChange}
            >
              <IonSelectOption value="Trabajar"> Busco trabajo</IonSelectOption>
              <IonSelectOption value="Contratar"> Busco contratar</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonInput 
              name='salario'
              label="Salario"
              type='number'
              value={userData.salario}
              onIonChange={handleChange}
              labelPlacement="stacked"
              placeholder="Escriba un salario aproximado.">
            </IonInput>
          </IonItem>
          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
        </IonList>
        <IonButton className='btnPublicar' expand="block" onClick={handlePublicar}>
          Publicar anuncio
        </IonButton>
        <IonAlert
          isOpen={showSuccessAlert}
          header="¡Éxito!"
          message="Su anuncio se ha publicado con éxito"
          buttons={[
            {
              text: 'OK',
              handler: () => {
                setShowSuccessAlert(false); // Cierra la alerta
                onClose(); // Cierra el formulario solo después de la alerta
              },
            },
          ]}
        />
      </IonContent>
    </>
  );
};

export default Publicar;
