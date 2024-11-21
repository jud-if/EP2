import React, { useState, useEffect } from 'react';
import { IonContent, IonToolbar, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import CardItem from './cardItem';
import Buscador from './buscador';
//@ts-ignore
import api from '../services/api';

interface TabbarProps {
  firstOption: string;
  secondOption: string;
  cardsData: {
    [key: string]: { 
      id_ad: number;
      subtitle?: string; 
      titulo: string;
      descripcion: string;
      region: string;
      comuna: string;
      salario: number;
      fecha_creacion: string;
    }[];
  };
  context: 'home' | 'misPublicaciones';
}

const Tabbar: React.FC<TabbarProps> = ({ firstOption, secondOption, cardsData, context }) => {
  const [selectedSegment, setSelectedSegment] = useState<string>(firstOption.toLowerCase());
  const [searchText, setSearchText] = useState('');
  const [filteredCards, setFilteredCards] = useState(cardsData);

  useEffect(() => {
    setFilteredCards(cardsData);
  }, [cardsData]);

  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedSegment(event.detail.value);
  };

  const handleSearchChange = async (value: string) => {
    setSearchText(value);
    if (value.trim() === '') {
      setFilteredCards(cardsData);
      return;
    }

    try {
      const response = await api.get(`/api/anuncios/${value}`);
      const data = response.data ? [response.data] : [];
      console.log("ESTOY EN TABBAR", data);
      setFilteredCards({
        ...cardsData,
        [selectedSegment]: data,
      });
    } catch (error) {
      console.error('Error al buscar anuncios:', error);
      setFilteredCards(cardsData);
    }
  };

  const renderCards = () => {
    const currentCards = filteredCards[selectedSegment];

    if (!currentCards || currentCards.length === 0) {
      return <p>No hay elementos disponibles.</p>;
    }

    return currentCards.map((card, index) => (
      <CardItem
        key={index}
        id_ad={card.id_ad}
        title={card.titulo}
        content={card.descripcion}
        region={card.region}
        comuna={card.comuna}
        salario={card.salario}
        fecha_creacion={card.fecha_creacion}
        context={context}
        onRefresh={context === 'misPublicaciones' ? refreshData : undefined}
      />
    ));
  };

  const refreshData = () => {
    // Lógica para actualizar los datos (puede ser un fetch o setState)
  };

  return (
    <>
      <IonToolbar>
        <Buscador value={searchText} onChange={handleSearchChange} />
        <IonSegment value={selectedSegment} onIonChange={handleSegmentChange}>
          <IonSegmentButton value={firstOption.toLowerCase()}>
            <IonLabel>{firstOption}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={secondOption.toLowerCase()}>
            <IonLabel>{secondOption}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
      <IonContent>{renderCards()}</IonContent>
    </>
  );
};

export default Tabbar;