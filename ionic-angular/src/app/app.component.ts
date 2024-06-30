import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SessionService } from '../utils/sessionStore';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    session: SessionService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      
      if (!session.isAuthenticated()) {
        this.rootPage = LoginPage;
      }
    });
  }
}