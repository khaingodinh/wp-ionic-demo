import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonIcon,
  useIonToast,
  IonTextarea,
  IonLoading,
} from "@ionic/react";
import { useRef, useState } from "react";
import { close } from "ionicons/icons";
import "./UserModal.css";
import { userService } from "../services/userService";

interface UserModalProps {
  isOpen: boolean;
  onCreatedSuccess: () => void;
  onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = (props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [present, dismiss] = useIonToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showErrorToast = (message: string) => {
    present({
      message,
      duration: 2000,
      color: "danger",
    });
  };

  const validateForm = () => {
    if (!firstName.trim()) {
      showErrorToast("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      showErrorToast("Last name is required");
      return false;
    }
    if (!email.trim()) {
      showErrorToast("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      showErrorToast("Email is invalid");
      return false;
    }
    if (!username.trim()) {
      showErrorToast("Username is required");
      return false;
    }
    if (!password) {
      showErrorToast("Password is required");
      return false;
    }
    if (!confirmPassword) {
      showErrorToast("Confirm password is required");
      return false;
    } else if (password !== confirmPassword) {
      showErrorToast("Passwords do not match");
      return false;
    }

    return true;
  };

  const submit = () => {
    if (validateForm()) {
      setIsLoading(true);
      userService.createUser({
        username,
        password,
        first_name: firstName,
        last_name: lastName,
        email,
        description,
        roles: [
          "administrator"
        ],
      }).then(() => {
        setIsLoading(false);
        props.onCreatedSuccess();
        props.onClose();
      }).catch(() => {
        setIsLoading(false);
      });
    }
  };

  return (
    <IonModal isOpen={props.isOpen} ref={modal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create User</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={props.onClose}>
              <IonIcon icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem className="user-input">
          <IonInput
            label="First name"
            labelPlacement="stacked"
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onIonChange={(e) => setFirstName(e.detail.value!)}
          />
        </IonItem>
        <IonItem className="user-input">
          <IonInput
            label="Last name"
            labelPlacement="stacked"
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onIonChange={(e) => setLastName(e.detail.value!)}
          />
        </IonItem>
        <IonItem className="user-input">
          <IonInput
            label="Email"
            labelPlacement="stacked"
            type="text"
            placeholder="Enter your email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem className="user-input">
          <IonInput
            label="Username"
            labelPlacement="stacked"
            type="text"
            placeholder="Enter your username"
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
          />
        </IonItem>
        <IonItem className="user-input">
          <IonInput
            label="Password"
            labelPlacement="stacked"
            type="password"
            placeholder="Enter your password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonItem className="user-input">
          <IonInput
            label="Confirm Password"
            labelPlacement="stacked"
            type="password"
            placeholder="Enter your confirm password"
            value={confirmPassword}
            onIonChange={(e) => setConfirmPassword(e.detail.value!)}
          />
        </IonItem>
        <IonItem className="user-input">
          <IonTextarea
            label="Description"
            labelPlacement="stacked"
            placeholder="Enter your description"
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>
        <IonButton
          onClick={submit}
          className="btn-submit"
          color="medium"
          expand="block"
        >
          Submit
        </IonButton>
      </IonContent>
      <IonLoading isOpen={isLoading} message="Saving..." spinner="circles" />
    </IonModal>
  );
};
