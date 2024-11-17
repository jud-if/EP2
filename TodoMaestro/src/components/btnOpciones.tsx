import React, { useState } from 'react';
import { IonFab, IonFabButton, IonFabList, IonIcon, IonModal } from '@ionic/react';
import { add, chevronUpCircle, filterOutline } from 'ionicons/icons';
import Publicar from '../pages/Publicar';

const BtnPublicar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton color="tertiary">
          <IonIcon icon={chevronUpCircle}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} size="large" color="tertiary"></IonIcon>
          </IonFabButton>
          <IonFabButton>
            <IonIcon icon={filterOutline} color="tertiary"></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>

      <IonModal isOpen={showModal}>
        <Publicar onClose={() => setShowModal(false)} />
      </IonModal>
    </>
  );
};

export default BtnPublicar;
