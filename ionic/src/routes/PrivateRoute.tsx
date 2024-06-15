import { ReactNode, useSyncExternalStore } from 'react';
import { Redirect } from 'react-router-dom';
import { getSnapshot, removeSession, subscribe } from '../utils/sessionStore';
import { JwtPayload, jwtDecode } from 'jwt-decode';

type Props = { children?: ReactNode };

export const PrivateRoute = ({ children }: Props) => {
  const session = useSyncExternalStore(subscribe, getSnapshot);
  if (!session) {
    return <Redirect to="/login" />;
  } else {
    const decodedToken = jwtDecode<JwtPayload>(session.accessToken);
    if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
      removeSession();
      return <Redirect to="/login" />;
    }
  }
  return <>{children}</>;
};