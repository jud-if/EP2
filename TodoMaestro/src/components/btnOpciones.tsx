import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonFab, IonFabButton, IonFabList, IonIcon, IonText } from '@ionic/react';
import {
  add,
  chevronUpCircle,
  filterOutline
} from 'ionicons/icons';

const btnPublicar: React.FC = () => {
  const history = useHistory();
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton color='tertiary'>
        <IonIcon icon={chevronUpCircle} ></IonIcon>
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton onClick={() => history.push('/app/publicar')}>
          <IonIcon icon={add} size='large' color='tertiary'>
          </IonIcon>
        </IonFabButton>
        <IonFabButton>
          <IonIcon icon={filterOutline} color='tertiary'></IonIcon>
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};
export default btnPublicar;
