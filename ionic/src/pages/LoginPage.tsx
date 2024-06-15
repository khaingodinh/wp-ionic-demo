import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
  IonLoading,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router";
import "./LoginPage.css";
import { authService } from "../services/authService";
import { setSession } from "../utils/sessionStore";
import { logoIonic } from "ionicons/icons";

export const LoginPage: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowMsg, setIsShowMsg] = useState(false);
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      setMsg("Please enter username or password");
      setIsShowMsg(true);
    } else {
      setIsLoading(true);
      authService
        .login({ username, password })
        .then((res) => {
          setIsLoading(false);
          setSession({
            accessToken: res.token,
            email: res.user_email,
            name: res.user_display_name,
          });
          history.push("/home");
        })
        .catch(() => {
          setIsLoading(false);
          setMsg("Wrong username or password");
          setIsShowMsg(true);
        });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding login-page-content">
        <IonGrid>
          <IonRow className="ion-justify-content-center mt-200">
            <IonIcon icon={logoIonic} size="large"></IonIcon>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <h1>WP Ionic Demo</h1>
          </IonRow>
          <IonRow className="ion-justify-content-center ion-margin-top">
            <IonCol size="12" size-md="6" size-lg="2">
              <div className="login-form">
                <IonItem className="dark-item">
                  <IonInput
                    type="text"
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                    placeholder="Username"
                  />
                </IonItem>
                <IonItem className="dark-item">
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    placeholder="Password"
                  />
                </IonItem>
                <IonButton
                  expand="block"
                  className="ion-button ion-margin-top"
                  onClick={handleLogin}
                >
                  Login
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          isOpen={isShowMsg}
          message={msg}
          onDidDismiss={() => setIsShowMsg(false)}
          duration={5000}
          color={"warning"}
        ></IonToast>
        <IonLoading isOpen={isLoading} message="Loading..." spinner="circles" />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
