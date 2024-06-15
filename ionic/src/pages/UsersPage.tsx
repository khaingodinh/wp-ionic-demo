import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
} from "@ionic/react";
import { useHistory } from "react-router";
import "./UsersPage.css";
import { addCircleOutline } from "ionicons/icons";
import { UserModal } from "../components/UserModal";
import { useEffect, useState } from "react";
import { UserResult } from "../typings/api/results/UserResult";
import { userService } from "../services/userService";

export const UsersPage: React.FC = () => {
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [users, setUsers] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userService.getUsers().then(res => {
      setUsers(res);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    })
  }, []);

  return (
    <>
      <IonList>
        <IonListHeader>
          <h2>List Users</h2>
          <IonIcon className="add-user" icon={addCircleOutline} onClick={() => setIsOpenModal(true)}></IonIcon>
        </IonListHeader>
        {users.map((user) => (
          <IonItem>
            <IonLabel>{user.first_name} {user.last_name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      <IonLoading isOpen={isLoading} message="Loading..." spinner="circles" />
      <UserModal isOpen={isOpenModal} onCreatedSuccess={() => {
        setIsLoading(true);
        userService.getUsers().then(res => {
          setUsers(res);
          setIsLoading(false);
        })
      }} onClose={() => setIsOpenModal(false)} />
    </>
  );
};
