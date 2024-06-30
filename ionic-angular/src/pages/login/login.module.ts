import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { SessionService } from '../../utils/sessionStore';
import { LoginService } from '../../services/authService';
import { UserService } from '../../services/userService';
import { LoginPage } from '../../pages/login/login';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    LoginPage,
  ],
  bootstrap: [LoginPage],
  imports: [IonicModule],
  providers: [
    NativePageTransitions,
    SessionService,
    LoginService,
    UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule {}
