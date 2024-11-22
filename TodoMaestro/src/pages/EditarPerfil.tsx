import React, { useState, useEffect } from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonList,
    IonItem,
    IonInput,
    IonText,
    IonLabel,
    IonAlert,
    IonSpinner,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import { useAuth } from '../contexts/authContext';
//@ts-ignore
import api from '../services/api';
import './EditarPerfil.css';
import { getUserData } from '../services/userService';
import regionesComunas from '../assets/comunas-regiones.json';

interface UserData {
    nombres: string;
    apellido: string;
    email: string;
    tipo_perfil: string;
    region: string;
    comuna: string;
}

const EditarPerfil: React.FC = ({ }) => {
    const { userId } = useAuth();
    const [userData, setUserData] = useState<UserData>({
        nombres: '',
        apellido: '',
        email: '',
        tipo_perfil: '',
        region: '',
        comuna: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [comunas, setComunas] = useState<string[]>([]);

    useEffect(() => {
        if (userId) {
            getUserData(userId, setUserData, setError, setLoading);
        }
    }, [userId]);

    useEffect(() => {
        const regionSeleccionada = regionesComunas.regiones.find(region => region.region === userData.region);
        if (regionSeleccionada) {
            setComunas(regionSeleccionada.comunas);
        } else {
            setComunas([]);
        }
    }, [userData.region]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        console.log(userData, "estoy en handleUpdate");
        try {
            const response = await api.put(`/api/usuarios/${userId}`, userData);
            console.log(response.data);
            setShowSuccessAlert(true);
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            setError('Hubo un problema al actualizar tu perfil. Intenta nuevamente.');
        }
    };

    if (loading) {
        return <IonSpinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Editar Perfil</IonTitle>
                    <IonButtons slot="end">
                        <IonButton className='botonCerrar' onClick={() => window.history.back()}>Cerrar</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList className='formularioEditar'>
                    <IonInput
                        label="Nombre"
                        name='nombres'
                        type='text'
                        labelPlacement="stacked"
                        placeholder="Escriba su nombre."
                        value={userData.nombres}
                        onIonChange={handleChange}
                        class='custom'
                        required
                    ></IonInput>
                    <IonInput
                        label="Apellido"
                        name='apellido'
                        labelPlacement="stacked"
                        placeholder="Escriba su apellido."
                        value={userData.apellido}
                        onIonChange={handleChange}
                        class='custom'
                        required
                    ></IonInput>
                    <IonInput
                        label="Email"
                        name='email'
                        labelPlacement="stacked"
                        placeholder="Escriba su email."
                        value={userData.email}
                        onIonChange={handleChange}
                        class='custom'
                        required
                    ></IonInput>
                    <IonSelect
                        label="Tipo de Perfil"
                        name='tipo_perfil'
                        labelPlacement="stacked"
                        placeholder="Escriba su tipo de perfil."
                        value={userData.tipo_perfil}
                        onIonChange={handleChange}
                        class='custom'
                    >
                        <IonSelectOption value="Trabajador">Trabajador</IonSelectOption>
                        <IonSelectOption value="Empleador">Empleador</IonSelectOption>
                    </IonSelect>

                    <IonSelect
                        label="Región"
                        name='region'
                        labelPlacement="stacked"
                        value={userData.region}
                        onIonChange={handleChange}
                        class='custom'
                    >
                        {regionesComunas.regiones.map((region) => (
                            <IonSelectOption key={region.region} value={region.region}>
                                {region.region}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                    <IonSelect
                        label="Comuna"
                        name='comuna'
                        labelPlacement="stacked"
                        value={userData.comuna}
                        onIonChange={handleChange}
                        class='custom'
                    >
                        {comunas.map((comuna) => (
                            <IonSelectOption key={comuna} value={comuna}>
                                {comuna}
                            </IonSelectOption>
                        ))}
                    </IonSelect>
                    {error && (
                        <IonText color="danger">
                            <p>{error}</p>
                        </IonText>
                    )}
                </IonList>
                <IonButton className='btnActualizar' expand="block" onClick={handleUpdate}>
                    Actualizar perfil
                </IonButton>
                <IonButton expand="full" color="medium" routerLink="/app/miperfil">Cancelar</IonButton>
                <IonAlert
                    isOpen={showSuccessAlert}
                    header="¡Éxito!"
                    message="Su perfil se ha actualizado con éxito"
                    buttons={[
                        {
                            text: 'OK',
                            handler: () => {
                                setShowSuccessAlert(false);
                                window.history.back();
                            },
                        },
                    ]}
                />
            </IonContent>
        </>
    );
};

export default EditarPerfil;