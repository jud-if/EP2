import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Bienvenida from './pages/Bienvenida';
import Registrarse from './pages/Registrarse';
import InicioSesion from './pages/IniciarSesion';
import MisPublicaciones from './pages/MisPublicaciones';
import MiPerfil from './pages/MiPerfil';
import Guardados from './pages/Guardados';

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


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/bienvenida" component={Bienvenida} exact />
        <Route path="/registrarse" component={Registrarse} exact />
        <Route path="/iniciosesion" component={InicioSesion} exact />
        <Redirect exact from="/" to="/bienvenida" />
      </IonRouterOutlet>

      <Route path="/app">
        <Drawer /> 
        <IonSplitPane contentId="main-content">

          <IonRouterOutlet id="main-content">
            <Route path="/app/home" component={Home} exact />
            <Route path="/app/mispublicaciones" component={MisPublicaciones} exact />
            <Route path="/app/miperfil" component={MiPerfil} exact />
            <Route path="/app/guardados" component={Guardados} exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </Route>
    </IonReactRouter>
  </IonApp>
);

export default App;