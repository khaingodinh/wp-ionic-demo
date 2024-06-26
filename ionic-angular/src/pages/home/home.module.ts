import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { SessionService } from '../../utils/sessionStore';
import { UserService } from '../../services/userService';
import { HomePage } from './home';
import { IonicModule } from "ionic-angular";

@NgModule({
  declarations: [
    HomePage,
  ],
  bootstrap: [HomePage],
  imports: [IonicModule],
  providers: [
    NativePageTransitions,
    SessionService,
    UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
