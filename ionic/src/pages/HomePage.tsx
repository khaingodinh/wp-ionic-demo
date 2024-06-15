import {
  IonContent,
  IonHeader,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Redirect, Route, RouteComponentProps, useHistory } from 'react-router';
import { UsersPage } from './UsersPage';
import { Header } from '../components/Header';
import { ProfilePage } from './ProfilePage';
import { useRef } from 'react';

export const HomePage: React.FC<RouteComponentProps> = ({ match }) => {
  const history = useHistory();
  close
  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonMenuToggle>
            <IonItem style={{ '--ion-item-background': 'none' }} routerLink='/home/users'>Users</IonItem>
          </IonMenuToggle>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <Header />
        <IonContent className="ion-padding">
          <IonRouterOutlet>
            <Route path="/home/users" component={UsersPage} />
            <Route path="/home/profile" component={ProfilePage} />
            <Redirect exact from="/home" to="/home/users" />
          </IonRouterOutlet>
        </IonContent>
      </IonPage>
    </>
  );
};
