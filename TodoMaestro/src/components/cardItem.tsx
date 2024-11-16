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
  IonModal,
  IonToolbar,
  IonButtons,
  IonHeader,
  IonTitle,
  IonContent as IonModalContent,
} from '@ionic/react';
import { bookmark, bookmarkOutline } from 'ionicons/icons';

interface CardItemProps {
  title: string;
  subtitle?: string;
  content: string;
  region: string;
  comuna: string;
  salario: number;
  fecha_creacion: string;
  actions?: { label: string; icon?: string; onClick?: () => void }[];
}

const CardItem: React.FC<CardItemProps> = ({
  title,
  subtitle,
  content,
  region,
  comuna,
  salario,
  fecha_creacion,
  actions,
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{title}</IonCardTitle>
          {subtitle && <IonCardSubtitle>{subtitle}</IonCardSubtitle>}
        </IonCardHeader>
        <IonCardContent>{content}</IonCardContent>
        {actions?.map((action, index) => (
          <IonButton
            key={index}
            fill="clear"
            onClick={
              action.label === '' && action.icon
                ? toggleBookmark
                : action.label === 'Leer más'
                ? openModal
                : action.onClick
            }
          >
            {action.icon && (
              <IonIcon
                icon={
                  action.label === '' && action.icon
                    ? bookmarked
                      ? bookmark
                      : bookmarkOutline
                    : action.icon
                }
                slot="start"
              />
            )}
            {action.label}
          </IonButton>
        ))}
      </IonCard>

      <LeerMas isOpen={isModalOpen} onClose={closeModal}
        title={title}
        content={content}
        region={region}
        comuna={comuna}
        salario={salario}
        fecha_creacion={fecha_creacion}
        />
    </>
  );
};

export default CardItem;
