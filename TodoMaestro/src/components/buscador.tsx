import React, { useState } from 'react';
import { IonItem, IonSearchbar, IonToolbar } from '@ionic/react';

interface BuscadorProps {
  value: string;
  onChange: (value: string) => void;
}

const Buscador: React.FC<BuscadorProps> = ({ value, onChange }) => {
  
  return (
    <div style={{marginTop:"55px"}}>
      <IonSearchbar
        value={value}
        onIonInput={(e: CustomEvent) => {
          const inputValue = e.detail.value || ''; // Maneja valores nulos.
          console.log('Texto ingresado en Buscador:', inputValue);
          onChange(inputValue); // Notifica al componente padre.
          
        }}
        placeholder="Buscar..."
      >
      </IonSearchbar>
    </div>
  ); 
}; 

export default Buscador;