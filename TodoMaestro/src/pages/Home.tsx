import { IonContent, IonPage } from '@ionic/react';
import Tabbar from '../components/tabbar';
import BtnOpciones from '../components/btnOpciones';
import { useState, useEffect } from 'react';
import React from 'react';

const Home: React.FC = () => {
  // Estado para almacenar los datos de los anuncios
  const [homeCardsData, setHomeCardsData] = useState<{ contratar: any[]; trabajar: any[] }>({
    contratar: [],
    trabajar: [],
  });

  const [filteredAnunciosHome, setFilteredAnunciosHome] = useState<{ contratar: any[]; trabajar: any[] }>({
    contratar: [],
    trabajar: [],
  });

  const [isFiltered, setIsFiltered] = useState(false); // Estado para verificar si hay filtros aplicados

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/anuncios');
        const data = await response.json();

        const contratar = data.filter((item: any) => item.tipo_anuncio === "0");
        const trabajar = data.filter((item: any) => item.tipo_anuncio === "1");
        console.log(contratar, trabajar);

        setHomeCardsData({ contratar, trabajar });
        setFilteredAnunciosHome({ contratar, trabajar }); // Inicialmente, los anuncios filtrados son los mismos que los originales
      } catch (error) {
        console.error('Error al cargar los anuncios:', error);
      }
    };

    fetchAnuncios();
  }, []);

  return (
    <IonPage>
      <BtnOpciones setFilteredAnunciosHome={setFilteredAnunciosHome} setIsFiltered={setIsFiltered} context="home" />
      <IonContent fullscreen>
        <Tabbar firstOption="Contratar" secondOption="Trabajar" cardsData={isFiltered ? filteredAnunciosHome : homeCardsData} context="home" />
      </IonContent>
    </IonPage>
  );
};

export default Home;