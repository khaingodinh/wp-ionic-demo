import { Injectable } from '@angular/core';
import { AuthInfo } from '../typings/AuthInfo';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SessionService {
  private session: AuthInfo | null = null;
  private sessionSubject = new BehaviorSubject<AuthInfo | null>(null);

  constructor() {
    this.initialize();
  }

  private emitChange() {
    this.sessionSubject.next(this.session);
  }

  getSnapshot(): AuthInfo | null {
    return this.session;
  }

  subscribe(listener: () => void) {
    return this.sessionSubject.subscribe(listener);
  }

  setSession(newSession: AuthInfo | null) {
    if (newSession) {
      const decoded = jwtDecode<any>(newSession.accessToken);
      newSession.id = decoded.data.user.id;
      this.session = newSession;
      localStorage.setItem('session', JSON.stringify(newSession));
      this.emitChange();
    }
  }

  removeSession() {
    this.session = null;
    localStorage.removeItem('session');
    this.emitChange();
  }

  initialize(): void {
    const session = localStorage.getItem('session');
    if (session) {
      this.session = JSON.parse(session);
      this.emitChange();
    }
  }

  isAuthenticated(): boolean {
    const session = localStorage.getItem('session');
    if (session) {
      const ss: AuthInfo = JSON.parse(session);
      const decodedToken = jwtDecode<JwtPayload>(ss.accessToken);
      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        this.removeSession();
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}