import React from 'react';
import { IonButton, IonFab, IonFabButton, IonFabList, IonIcon, IonText } from '@ionic/react';
import {
  add,
  chevronUpCircle,
  filterOutline
} from 'ionicons/icons';

const btnPublicar: React.FC = () => {
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={chevronUpCircle}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={add}>
              </IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={filterOutline}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>

  );
};
export default btnPublicar;