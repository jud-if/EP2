import React, { useState, useEffect } from 'react';
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
import regionesComunas from '../assets/comunas-regiones.json';

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
  const [comunas, setComunas] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const regionSeleccionada = regionesComunas.regiones.find(region => region.region === anuncio.region);
    if (regionSeleccionada) {
      setComunas(regionSeleccionada.comunas);
    } else {
      setComunas([]);
    }
  }, [region]);

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
        setIsPublished(true);
        setShowSuccessAlert(true); // Muestra la alerta de éxito

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
            <IonInput value={titulo} onIonInput={(e) => setTitle(e.detail.value!)} />
          </IonItem>

          

          {/* Contenido */}
          <IonItem>
            <IonLabel position="stacked">Descripcion</IonLabel>
            <IonTextarea
              value={descripcion}
              onIonInput={(e) => setdescripcion(e.detail.value!)}
            />
          </IonItem>

          {/* Región */}
          <IonItem>
            <IonLabel position="stacked">Región</IonLabel>
            <IonSelect
              value={region}
              onIonChange={(e) => setRegion(e.detail.value!)}
            >
              {regionesComunas.regiones.map((region) => (
                <IonSelectOption key={region.region} value={region.region}>
                  {region.region}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          {/* Comuna */}
          <IonItem>
            <IonLabel position="stacked">Comuna</IonLabel>
              <IonSelect
                value={comuna}
                onIonChange={(e) => setComuna(e.detail.value!)}
              >
                {comunas.map((comuna) => (
                  <IonSelectOption key={comuna} value={comuna}>
                    {comuna}
                  </IonSelectOption>
                ))}
            </IonSelect>
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
