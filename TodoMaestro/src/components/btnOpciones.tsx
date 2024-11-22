import React, { useEffect, useState } from 'react';
import { IonFab, IonFabButton, IonFabList, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { add, chevronUpCircle, filterOutline } from 'ionicons/icons';
import Publicar from '../pages/Publicar';
//@ts-ignoref
import api from '../services/api';

const BtnPublicar: React.FC = () => {
  const [showModalPublicar, setShowModalPublicar] = useState(false);
  const [showModalFiltros, setShowModalFiltros] = useState(false);
  const [availableTags, setAvailableTags] = useState<{ id_etiqueta: number; nombre_etiqueta: string }[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get('/api/getAllEtiquetas');
        setAvailableTags(response.data);
      } catch (error) {
        console.error('Error al cargar las etiquetas:', error);
      }
    };

    fetchTags();
  }, []);

  const applyFilters = async () => {
    try {
      console.log('Aplicando filtros:', selectedTagIds);
      const response = await api.post('/api/filterAnunciosByEtiquetas', { etiquetas: selectedTagIds });
      console.log('Anuncios filtrados:', response.data);
      // Aquí puedes actualizar el estado de los anuncios en tu aplicación para mostrar los anuncios filtrados
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
    }
  };

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton color="tertiary">
          <IonIcon icon={chevronUpCircle}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton onClick={() => setShowModalPublicar(true)}>
            <IonIcon icon={add} size="large" color="tertiary"></IonIcon>
          </IonFabButton>
          <IonFabButton onClick={() => setShowModalFiltros(true)}>
            <IonIcon icon={filterOutline} color="tertiary"></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>

      <IonModal isOpen={showModalPublicar}>
        <Publicar onClose={() => setShowModalPublicar(false)} />
      </IonModal>

      <IonModal isOpen={showModalFiltros}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Filtrar por Etiquetas</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModalFiltros(false)}>Cerrar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>Etiquetas</IonLabel>
              <IonSelect
                name="nombre_etiqueta"
                placeholder="Seleccione filtros"
                multiple={true}
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
          </IonList>
          <IonButton onClick={() => {
            applyFilters();
            setShowModalFiltros(false);
          }}>Aplicar Filtros</IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default BtnPublicar;
