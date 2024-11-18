
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

interface CardItemProps extends JobData {
  context: 'home' | 'misPublicaciones';
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

  // Crear los datos mejorados usando el enhancer
  const enhancedData = createEnhancedCardData(
    props,
    props.context=== 'home' ? [
      {
        label: 'Leer más',
        icon: reader,
        onClick: openModal,
      },
      {
        label: '',
        icon: bookmarked ? bookmark : bookmarkOutline,
        onClick: toggleBookmark,
      },
    ] : [
      {
        label: 'Eliminar',
        icon: trash,
        onClick: () => alert('Eliminar anuncio'),
      },
      {
        label: 'Editar',
        onClick: () => alert('Editar anuncio'),
      },
    ]
    
  );

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
      )}
    </IonCard>
    </>
  );
};

export default CardItem;