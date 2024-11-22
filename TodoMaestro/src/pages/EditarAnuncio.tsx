import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonAlert
} from '@ionic/react';
//@ts-ignore
import api from '../services/api'; 

interface EditarAnuncioProps {
  isOpen: boolean;
  onClose: () => void;
  anuncio: {
    id_ad: number;
    title: string;
    //subtitle?: string;
    content: string;
    region: string;
    comuna: string;
    salario: number;
    fecha_creacion: string;
  };
  
}

const EditarAnuncio: React.FC<EditarAnuncioProps> = ({
  isOpen,
  onClose,
  anuncio,
}) => {
  const [titulo, setTitle] = useState(anuncio.title);
  //const [subtitle, setSubtitle] = useState(anuncio.subtitle || '');
  const [descripcion, setdescripcion] = useState(anuncio.content);
  const [region, setRegion] = useState(anuncio.region);
  const [comuna, setComuna] = useState(anuncio.comuna);
  const [salario, setSalario] = useState(anuncio.salario);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const guardarCambios = async () => {
    // Creamos el objeto con los datos a enviar
    const anuncioActualizado = {
      titulo,
      descripcion,
      region,
      comuna,
      salario,
    };
  
    try {
      // Hacemos la solicitud PUT al backend utilizando api.put
      const response = await api.put(`/api/anuncios/${anuncio.id_ad}`, anuncioActualizado);
  
      if (response && response.status === 200) {
        console.log('Anuncio actualizado con éxito:', anuncioActualizado);
        setShowSuccessAlert(true); // Muestra la alerta de éxito

        onClose(); // Cerrar el modal
      } else {
        throw new Error('Error al guardar los cambios');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      
    }
  };
  
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-ES', options);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Anuncio</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* Título */}
          <IonItem>
            <IonLabel position="stacked">Título</IonLabel>
            <IonInput value={titulo} onIonChange={(e) => setTitle(e.detail.value!)} />
          </IonItem>

          

          {/* Contenido */}
          <IonItem>
            <IonLabel position="stacked">Descripcion</IonLabel>
            <IonTextarea
              value={descripcion}
              onIonChange={(e) => setdescripcion(e.detail.value!)}
            />
          </IonItem>

          {/* Región */}
          <IonItem>
            <IonLabel position="stacked">Región</IonLabel>
            <IonSelect
              value={region}
              onIonChange={(e) => setRegion(e.detail.value!)}
            >
              <IonSelectOption value="Región Metropolitana">Región Metropolitana</IonSelectOption>
              <IonSelectOption value="Valparaíso">Valparaíso</IonSelectOption>
              <IonSelectOption value="Biobío">Biobío</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* Comuna */}
          <IonItem>
            <IonLabel position="stacked">Comuna</IonLabel>
            <IonInput value={comuna} onIonChange={(e) => setComuna(e.detail.value!)} />
          </IonItem>

          {/* Salario */}
          <IonItem>
            <IonLabel position="stacked">Salario</IonLabel>
            <IonInput
              type="number"
              value={salario}
              onIonChange={(e) => setSalario(parseFloat(e.detail.value!))}
            />
          </IonItem>

          {/* Fecha de creación */}
          <IonItem>
            <IonLabel position="stacked">Fecha de Creación</IonLabel>
            <IonInput value={formatDate(anuncio.fecha_creacion)} readonly />
          </IonItem>
        </IonList>

        {/* Botones */}
        <IonButton expand="full" onClick={guardarCambios}>
          Guardar Cambios
        </IonButton>
        <IonAlert
          isOpen={showSuccessAlert}
          header="¡Éxito!"
          message="Su anuncio se ha actualizado con éxito"
          buttons={[
            {
              text: 'OK',
              handler: () => {
                setShowSuccessAlert(false); 
                onClose(); 
              },
            },
          ]}
        />

      </IonContent>
    </IonModal>
  );
};

export default EditarAnuncio;
