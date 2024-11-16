
import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
} from '@ionic/react';
import { locationOutline, calendarOutline, cashOutline, informationCircleOutline } from 'ionicons/icons';

interface LeerMasProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  region: string;
  comuna: string;
  salario: number;
  fecha_creacion: string;
}

const LeerMas: React.FC<LeerMasProps> = ({
  isOpen,
  onClose,
  title,
  content,
  region,
  comuna,
  salario,
  fecha_creacion,
}) => {
    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('es-ES', options);
      };



  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles del Anuncio</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Cerrar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* Título */}
          <IonItem>
            <IonLabel>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--ion-color-primary)',display: 'flex',
                alignItems: 'center', }}>
                <IonIcon
                  icon={informationCircleOutline}
                  slot="start"
                  style={{ fontSize: '1.8rem', marginRight: '0.5rem', color: 'var(--ion-color-primary)' }}
                />
                {title}
              </h2>
            </IonLabel>
          </IonItem>

          {/* Descripción */}
          <IonItem>
            <IonLabel>
              <p style={{ fontSize: '1.2rem' }}>{content}</p>
            </IonLabel>
          </IonItem>

          {/* Ubicación */}
          <IonItem>
            <IonLabel>
              <p style={{ fontSize: '1.2rem',display: 'flex',
                alignItems: 'center',  }}>
                <IonIcon
                  icon={locationOutline}
                  slot="start"
                  style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: 'var(--ion-color-primary)' }}
                />
                {region}, {comuna}
              </p>
            </IonLabel>
          </IonItem>

          {/* Salario */}
          <IonItem>
            <IonLabel
              className="ion-text-wrap"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IonIcon
                  icon={cashOutline}
                  slot="start"
                  style={{ fontSize: '1.5rem', marginRight: '0.8rem', color: 'var(--ion-color-primary)' }}
                />
                <IonText style={{ fontSize: '1.2rem'}}>Remuneración mensual</IonText>
              </div>
              <IonText style={{ fontSize: '1.2rem'}}>
                ${salario.toLocaleString()}
              </IonText>
            </IonLabel>
          </IonItem>

          {/* Fecha de creación */}
          <IonItem>
            <IonLabel
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IonIcon
                  icon={calendarOutline}
                  slot="start"
                  style={{
                    fontSize: '1.5rem',
                    marginRight: '0.8rem',
                    color: 'var(--ion-color-primary)',
                  }}
                />
                <IonText style={{ fontSize: '1.2rem' }}>
                  Creado en:
                </IonText>
              </div>
              <IonText style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {formatDate(fecha_creacion)}
              </IonText>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default LeerMas;
