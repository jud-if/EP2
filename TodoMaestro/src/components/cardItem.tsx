
import { bookmark, bookmarkOutline, reader,trash } from 'ionicons/icons';

// CardItem.tsx
import React, { useState } from 'react';
import LeerMas from './leerMas';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { createEnhancedCardData } from './cardDataEnhancer';
import Eliminar from '../pages/Eliminar';

interface CardItemProps extends JobData {
  context: 'home' | 'misPublicaciones';
  id_ad: number; // ID del anuncio
  onRefresh?: () => void; // Callback para refrescar datos
}

const CardItem: React.FC<CardItemProps> = (props) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const actions = [
    ...(props.context === 'home'
      ? [
          {
            label: 'Leer más',
            icon: reader,
            onClick: () => setIsModalOpen(true),
          },
          {
            label: '',
            icon: bookmarked ? bookmark : bookmarkOutline,
            onClick: toggleBookmark,
          },
        ]
      : []),
    ...(props.context === 'misPublicaciones'
      ? [
          {
            label: 'Eliminar',
            icon: trash,
            onClick: () => setIsModalOpen(true), // Abre el modal
          },
          {
            label: 'Editar',
            onClick: () => alert('Editar anuncio'), // Lógica para editar
          },
        ]
      : []),
  ];
  
  // Crear los datos mejorados usando el enhancer
  const enhancedData = createEnhancedCardData(
    props,
    actions)

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{enhancedData.title}</IonCardTitle>
          {enhancedData.subtitle && (
            <IonCardSubtitle>{enhancedData.subtitle}</IonCardSubtitle>
          )}
        </IonCardHeader>
        <IonCardContent>{enhancedData.content}</IonCardContent>
        {enhancedData.actions.map((action, index) => (
          <IonButton
            key={index}
            fill="clear"
            onClick={action.onClick}
          >
            {action.icon && (
              <IonIcon
                icon={action.icon}
                slot="start"
              />
            )}
            {action.label}
          </IonButton>
        ))}
    

      {/* Modal de Leer más */}
      {props.context === 'home' && (
        <LeerMas
          isOpen={isModalOpen}
          onClose={closeModal}
          title={enhancedData.title}
          content={enhancedData.content}
          region={enhancedData.region}
          comuna={enhancedData.comuna}
          salario={enhancedData.salario}
          fecha_creacion={enhancedData.fecha_creacion}
        />
      )
      }
      {props.context === 'misPublicaciones' && (
          <Eliminar
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            anuncioId={props.id_ad}
            onEliminar={props.onRefresh ?? (() => {})} // Aseguramos que siempre sea una función válida
          />
        )}

    </IonCard>
    </>
  );
};

export default CardItem;