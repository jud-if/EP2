//@ts-ignore
import api from './api';

export const getUserData = async (userId: string, setUserData: Function, setError: Function, setLoading: Function) => {
  setError('');
  try {
    const response = await api.get(`/api/usuarios/${userId}`);
    setUserData(response.data);
    console.log(response.data, "estoy en getUserData");
    setLoading(false);
  } catch (error) {
    console.error('Error al cargar los datos del usuario:', error);
    setError('Error al cargar los datos del usuario');
    setLoading(false);
  }
};