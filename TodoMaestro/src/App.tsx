import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Bienvenida from './pages/Bienvenida';
import Registrarse from './pages/Registrarse';
import InicioSesion from './pages/IniciarSesion';
import MisPublicaciones from './pages/MisPublicaciones';
import MiPerfil from './pages/MiPerfil';
import Guardados from './pages/Guardados';
import Publicar from './pages/Publicar';
import EditarPerfil from './pages/EditarPerfil';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Drawer from './components/drawer';
import { AuthProvider } from './contexts/authContext';
import PrivateRoute from './components/privateRoute';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        
        <Route path="/bienvenida" component={Bienvenida}  />
        <Route path="/registrarse" component={Registrarse}  />
        <Route path="/iniciosesion" component={InicioSesion}  />
        <Redirect exact from="/" to="/bienvenida" />

        <Route path="/app">
          <Drawer /> 
          <IonRouterOutlet id="main-content">
            <IonContent>
              <PrivateRoute path="/app/home" component={Home}  />
              <PrivateRoute path="/app/mispublicaciones" component={MisPublicaciones}  />
              <PrivateRoute path="/app/miperfil" component={MiPerfil}  />
              <PrivateRoute path="/app/guardados" component={Guardados}  />
              <PrivateRoute path="/app/publicar" component={Publicar}  />
              <PrivateRoute path="/app/editarperfil" component={EditarPerfil}  />
              <Redirect exact from="/app" to="/app/home" />
            </IonContent>
          </IonRouterOutlet>
        </Route>
        
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;