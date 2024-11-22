import React, { useState } from 'react';
//@ts-ignore
import api from '../services/api'; // Ajusta la ruta según tu proyecto
import { IonModal, IonAlert,IonButton, IonToast } from '@ionic/react';
import { IonContent, IonToolbar, IonHeader, IonTitle, IonFooter, IonSearchbar } from '@ionic/react';
import './Eliminar.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface EliminarProps {
    isOpen: boolean;
    onClose: () => void;
    anuncioId: number;
    onEliminar: () => void;
}

const Eliminar: React.FC<EliminarProps> = ({ isOpen, onClose, anuncioId, onEliminar }) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  const handleEliminar = async () => {
      try {
        // Lógica de eliminación
        console.log('pre', anuncioId)
        const response = await api.delete(`/api/anuncios/${anuncioId}`);

        if (response.status === 200) {
          setShowSuccessAlert(true); 
          onEliminar(); 
          onClose(); 
        } else {
          console.error('Error al eliminar el anuncio.');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud de eliminación:', error);
      }
    };

  return (
    
    <IonModal
    isOpen={isOpen}
    onDidDismiss={onClose}
    className="custom-delete-modal" // Clase personalizada
  >
    <IonContent className="ion-padding">
      <div className="modal-content">
        <p>¿Estás seguro de que deseas eliminar este anuncio?</p>
        <IonButton expand="block" color="danger" onClick={handleEliminar}>
          Eliminar Anuncio
        </IonButton>
        <IonButton expand="block" fill="outline" onClick={onClose}>
          Cancelar
        </IonButton>
      </div>
      <IonAlert
          isOpen={showSuccessAlert}
          header="¡Éxito!"
          message="El anuncio ha sido eliminado con éxito."
          buttons={[
            {
              text: 'OK',
              handler: () => {
                setShowSuccessAlert(false); 
                onClose(); 
              },
            },
          ]}
        />


    </IonContent>
  </IonModal>
  );
};

export default Eliminar;