import { Preferences } from '@capacitor/preferences';
import { AuthInfo } from '../typings/AuthInfo';
import { jwtDecode } from "jwt-decode";

let session: AuthInfo | null = null;
let listeners: any[] = [];

const subscribe = (listener: any) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const getSnapshot = (): AuthInfo | null => {
  return session;
};

const emitChange = () => {
  for (let listener of listeners) {
    listener();
  }
};

const setSession = async (newSession: AuthInfo | null) => {
  if (newSession) {
    const decoded = jwtDecode<any>(newSession!.accessToken);
    newSession.id = decoded.data.user.id;
    session = newSession;
    await Preferences.set({ key: 'session', value: JSON.stringify(newSession) });
    emitChange();
  }
};

const removeSession = async () => {
  session = null;
  await Preferences.remove({ key: 'session' });
  emitChange();
};

const initialize = async (): Promise<void> => {
  const { value } = await Preferences.get({ key: 'session' });
  if (value) {
    session = JSON.parse(value);
  }
};

export { initialize, subscribe, getSnapshot, setSession, removeSession };