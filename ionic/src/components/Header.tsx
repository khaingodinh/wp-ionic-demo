import {
  IonAvatar,
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Header.css";
import { person, logOut } from "ionicons/icons";
import { useRef, useState } from "react";
import { removeSession } from "../utils/sessionStore";
import { useHistory } from "react-router";

export const Header: React.FC = () => {
  const avatarRef = useRef<HTMLIonAvatarElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  const toggleProfileMenu = () => {
    setMenuOpen(!isMenuOpen);
  }
  document.onclick = (e: any) => {
    if (avatarRef.current && avatarRef.current.contains(e.target)) {
      return;
    }
    if (profileMenuRef.current && profileMenuRef.current.contains(e.target)) {
      return;
    }
    setMenuOpen(false);
  }

  const logout = () => {
    removeSession().then(() => {
      window.location.reload();
    });
  };
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>WP Ionic Demo App</IonTitle>
        <IonAvatar ref={avatarRef} slot="end" onClick={() => toggleProfileMenu()}>
          <img
            alt="avatar"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </IonAvatar>
      </IonToolbar>
      <div ref={profileMenuRef} style={{visibility: !isMenuOpen ? "hidden" : "visible"}} className="profile-menu">
        <ul>
          <li>
            <IonItem onClick={() => toggleProfileMenu()} lines="none" routerLink="/home/profile">
              <IonIcon icon={person}></IonIcon>
              <span className="menu-label">Profile</span>
            </IonItem>
          </li>
          <li>
            <IonItem className="ion-activatable ripple-parent logout-btn" lines="none" onClick={() => logout()}>
              <IonRippleEffect></IonRippleEffect>
              <IonIcon style={{ paddingLeft: '16px' }} icon={logOut}></IonIcon>
              <span className="menu-label">Logout</span>
            </IonItem>
          </li>
        </ul>
      </div>
    </IonHeader>
  );
};
