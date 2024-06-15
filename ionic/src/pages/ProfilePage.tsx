import { IonAvatar, IonLoading } from "@ionic/react";
import { useHistory } from "react-router";
import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { UserResult } from "../typings/api/results/UserResult";
import { userService } from "../services/userService";
import { getSnapshot } from "../utils/sessionStore";

export const ProfilePage: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<UserResult>();
  const authInfo = getSnapshot();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authInfo && authInfo.id) {
      userService
        .getUserById(authInfo.id)
        .then((res) => {
          setUser(res);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [authInfo]);

  return (
    <>
      {user && (
        <div className="profile-page">
          <div className="profile-panel">
            <div className="profile-header">
              <IonAvatar className="avatar">
                <img
                  alt="avatar"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>
            </div>
            <div className="profile-info">
              <h4 className="profile-name">
                {user?.first_name} {user?.last_name}
              </h4>
              <div className="profile-info-item">
                <div className="profile-info-item_label">Email</div>
                <div className="profile-info-item_text">{user?.email}</div>
              </div>
              <div className="profile-info-item">
                <div className="profile-info-item_label">Description</div>
                <div className="profile-info-item_text">
                  {user?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <IonLoading
        isOpen={isLoading}
        message="Loading..."
        spinner="circles"
      />
    </>
  );
};
