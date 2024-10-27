import React, { useState } from 'react';
import { 
  IonSearchbar,

} from '@ionic/react';

const Buscador: React.FC = () => {
    return (
        <IonSearchbar showCancelButton="never" placeholder="Buscar..." ></IonSearchbar>
    );
};

export default Buscador;