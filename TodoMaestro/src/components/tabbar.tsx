import React, { useState, useEffect } from 'react';
import { IonContent, IonToolbar, IonLabel, IonSegment, IonSegmentButton, IonSearchbar } from '@ionic/react';
import CardItem from './cardItem';

interface TabbarProps {
  firstOption: string;
  secondOption: string;
  cardsData: {
    [key: string]: { title: string; subtitle?: string; content: string; actions: { label: string; icon?: string }[] }[];
  };
}

const Tabbar: React.FC<TabbarProps> = ({ firstOption, secondOption, cardsData }) => {
  const [selectedSegment, setSelectedSegment] = useState<string>(firstOption.toLowerCase());

  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedSegment(event.detail.value);
  };

  const renderCards = () => {
    const currentCards = cardsData[selectedSegment];
    if (!currentCards || currentCards.length === 0) {
      return <p>No hay elementos disponibles.</p>;
    }
    return currentCards.map((card, index) => (
      <CardItem key={index} {...card} />
    ));
  };

  return (
    <>
      <IonToolbar>
        <IonSearchbar showCancelButton="never" placeholder="Buscar..." />
        <IonSegment value={selectedSegment} onIonChange={handleSegmentChange}>
          <IonSegmentButton value={firstOption.toLowerCase()}>
            <IonLabel>{firstOption}</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={secondOption.toLowerCase()}>
            <IonLabel>{secondOption}</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>

      <IonContent>
        {renderCards()}
      </IonContent>
    </>
  );
};

export default Tabbar;
