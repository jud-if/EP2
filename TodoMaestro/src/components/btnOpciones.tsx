import React, { useEffect, useState } from 'react';
import { IonFab, IonFabButton, IonFabList, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { add, chevronUpCircle, filterOutline } from 'ionicons/icons';
import Publicar from '../pages/Publicar';
//@ts-ignoref
import api from '../services/api';

interface BtnPublicarProps {
  setFilteredAnunciosHome?: React.Dispatch<React.SetStateAction<{ contratar: any[]; trabajar: any[] }>>;
  setFilteredAnunciosMisPublicaciones?: React.Dispatch<React.SetStateAction<{ ofertas: any[]; servicios: any[] }>>;
  setIsFiltered?: React.Dispatch<React.SetStateAction<boolean>>;
  context: 'home' | 'misPublicaciones';
}

const BtnPublicar: React.FC<BtnPublicarProps> = ({ setFilteredAnunciosHome, setFilteredAnunciosMisPublicaciones, setIsFiltered, context }) => {
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

      if (context === 'home' && setFilteredAnunciosHome && setIsFiltered) {
        const contratar = response.data.filter((item: any) => item.tipo_anuncio === "0");
        const trabajar = response.data.filter((item: any) => item.tipo_anuncio === "1");
        setFilteredAnunciosHome({ contratar, trabajar });
        setIsFiltered(true); // Indica que hay filtros aplicados
      } else if (context === 'misPublicaciones' && setFilteredAnunciosMisPublicaciones && setIsFiltered) {
        const ofertas = response.data.filter((item: any) => item.tipo_anuncio === "0");
        const servicios = response.data.filter((item: any) => item.tipo_anuncio === "1");
        setFilteredAnunciosMisPublicaciones({ ofertas, servicios });
        setIsFiltered(true); // Indica que hay filtros aplicados
      }
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