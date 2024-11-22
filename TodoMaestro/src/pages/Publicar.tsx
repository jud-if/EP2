import React, { useEffect, useState } from 'react';
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
//@ts-ignoref
import api from '../services/api';
import { useAuth } from '../contexts/authContext';
import regionesComunas from '../assets/comunas-regiones.json';

interface PublicarProps {
  onClose: () => void; 
}

const Publicar: React.FC<PublicarProps> = ({ onClose }) => {
  const [present] = useIonActionSheet();
  const [isPublished, setIsPublished] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [comunas, setComunas] = useState<string[]>([]);

  // manejamos las IDs etiquetas seleccionadas
  const [availableTags, setAvailableTags] = useState<{ id_etiqueta: number; nombre_etiqueta: string }[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        console.log('Iniciando la solicitud para obtener etiquetas');
        const response = await api.get('/api/getAllEtiquetas'); 
        console.log('Respuesta de la API:', response);
        setAvailableTags(response.data);
      } catch (error) {
        console.error('Error al cargar las etiquetas:', error);
      }
    };
  
    fetchTags();
  }, []);


  const { userId } = useAuth(); // Obtener el ID del usuario autenticado

  const [AnunciosData, setAnunciosData] = useState({
    tipo_anuncio: '',
    titulo: '',
    descripcion: '',
    region: '',
    comuna: '',
    salario: 0
  });

  const [error, setError] = useState('');

  // Obtener la id del anuncio Publicado
  const fetchAnuncioId = async (idUsuario: number, fecha: string) => {
    try {
      console.log("EN PUBLICAR:", idUsuario, fecha);
      const response = await api.get('/api/findanuncios', {
        params: { id_usuario: idUsuario, fecha_creacion: fecha }
      });
      console.log('ID del anuncio:', response.data.id);
      return response.data.id; 
    } catch (error) {
      console.error('Error al obtener el ID del anuncio:', error);
      throw new Error('No se pudo obtener el ID del anuncio.');
    }
  };

  const relacionarEtiquetasConAnuncio = async (anuncioId: number, tagIds: number[]) => {
    try {
      const relaciones = tagIds.map((tagId) => ({ id_ad: anuncioId, id_etiqueta: tagId }));
      await api.post('/api/insertarAnunciosEtiquetas', relaciones);
      console.log('Relaciones etiquetas-anuncio guardadas.');
    } catch (error) {
      console.error('Error al relacionar etiquetas con el anuncio:', error);
      throw new Error('No se pudieron guardar las relaciones de etiquetas.');
    }
  }

  useEffect(() => {
    const regionSeleccionada = regionesComunas.regiones.find(region => region.region === AnunciosData.region);
    if (regionSeleccionada) {
      setComunas(regionSeleccionada.comunas);
    } else {
      setComunas([]);
    }
  }, [AnunciosData.region]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAnunciosData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePublicar = async () => {
    if (!AnunciosData.titulo || !AnunciosData.region || !AnunciosData.comuna || !AnunciosData.tipo_anuncio) {
      setError('Por favor, completar los campos obligatorios (*)');
    } else {
      setError('');
      try {
        const fecha = new Date().toISOString();
        const payload = {
          ...AnunciosData,
          fecha_creacion: fecha,
          id_usuario: userId,
        };
        const response = await api.post('/api/anuncios', payload);
        console.log('Anuncio publicado:', response.data);

         // Llama a la función para obtener el ID del anuncio recién publicado
        const anuncioId = await fetchAnuncioId(Number(userId), fecha);
        console.log('ID del anuncio EN FETCH:', anuncioId);

        // Relaciona el anuncio con las etiquetas seleccionadas
        await relacionarEtiquetasConAnuncio(anuncioId, selectedTagIds);
  
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
          handler: onClose, 
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
            <IonButton className='botonCerrar' onClick={handleClose}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList className='formularioPublicar'>
          <IonInput
            label="Título*"
            name='titulo'
            labelPlacement="stacked"
            placeholder="Escriba un título."
            counter={true}
            maxlength={50}
            value={AnunciosData.titulo}
            onIonChange={handleChange}
            class='custom'
            required
          ></IonInput>
          <IonTextarea
            label='Descripción'
            name='descripcion'
            labelPlacement='stacked'
            counter={true}
            autoGrow={true}
            placeholder='Escriba una descripción.'
            maxlength={700}
            value={AnunciosData.descripcion}
            onIonChange={handleChange}
            class='custom'
          >  
          </IonTextarea>

          <IonItem>
            <IonSelect 
              name='region'
              placeholder="Seleccione su región" 
              value={AnunciosData.region}
              onIonChange={handleChange}
            >
              <div slot="label">
              Región<IonText color="danger">(*)</IonText>
              </div>
              {regionesComunas.regiones.map((region) => (
                <IonSelectOption key={region.region} value={region.region}>
                  {region.region}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonSelect 
              name='comuna'
              placeholder="Seleccione su comuna" 
              value={AnunciosData.comuna}
              onIonChange={handleChange}
            >
              <div slot="label">
              Comuna<IonText color="danger">(*)</IonText>
              </div>
              {comunas.map((comuna) => (
                <IonSelectOption key={comuna} value={comuna}>
                  {comuna}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonSelect 
              name='tipo_anuncio'
              placeholder="Seleccione su preferencia" 
              value={AnunciosData.tipo_anuncio}
              onIonChange={handleChange}
            >
              <div slot="label">
              Tipo de Anuncio<IonText color="danger">(*)</IonText>
              </div>
              <IonSelectOption value="1">Busco Trabajo</IonSelectOption>
              <IonSelectOption value="0"> Busco contratar</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonInput 
              name='salario'
              label="Salario"
              type="number"
              class='custom'
              value={AnunciosData.salario}
              onIonInput={handleChange}
              labelPlacement="stacked"
              placeholder="Escriba un salario aproximado.">
            </IonInput>
          </IonItem>

          <IonItem>
            <IonSelect
              name="nombre_etiqueta"
              multiple={true}
              placeholder="Seleccione etiquetas"
              value={selectedTagIds}
              onIonChange={(e) => setSelectedTagIds(e.detail.value)}
            >
              {availableTags.map((tag) => (
                <IonSelectOption key={tag.id_etiqueta} value={tag.id_etiqueta}>
                  {tag.nombre_etiqueta}
                </IonSelectOption>
              ))}
            </IonSelect>
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
                setShowSuccessAlert(false);
                onClose(); //Aquí se cierra el formulario solo después de la alerta
              },
            },
          ]}
        />
      </IonContent>
    </>
  );
};

export default Publicar;
