import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { bookmark, bookmarkOutline } from 'ionicons/icons';

interface CardItemProps {
  title: string;
  subtitle?: string;
  content: string;
  actions?: { label: string; icon?: string; onClick?: () => void }[];
}

const CardItem: React.FC<CardItemProps> = ({ title, subtitle, content, actions }) => {
  // Estado para tarjeta marcada: true si se marco bookmark para guardar.
  const [bookmarked, setBookmarked] = useState(false);

  // cambia estado bookmark al hacer click.
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        {subtitle && <IonCardSubtitle>{subtitle}</IonCardSubtitle>}
      </IonCardHeader>
      <IonCardContent>{content}</IonCardContent>
      {actions?.map((action, index) => (
        <IonButton key={index} fill="clear" onClick={action.label === '' && action.icon ? toggleBookmark : action.onClick}>
          {action.icon && <IonIcon icon={action.label === '' && action.icon ? (bookmarked ? bookmark : bookmarkOutline) : action.icon} slot="start" />}
          {action.label}
        </IonButton>
      ))}
    </IonCard>
  );
};

export default CardItem;
