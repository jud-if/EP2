import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Drawer from '../components/drawer';
import Tabbar from '../components/tabbar';
import BtnPublicar from '../components/btnPublicar';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Drawer/>
      <IonContent fullscreen>

        {/* Asegúrate de que Tabbar no esté dentro de IonToolbar */}
        <Tabbar/>
      </IonContent>

      <BtnPublicar/>
    </IonPage>
  );
};

export default Home;
