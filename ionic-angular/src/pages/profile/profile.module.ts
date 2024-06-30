import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { SessionService } from '../../utils/sessionStore';
import { UserService } from '../../services/userService';
import { IonicModule } from 'ionic-angular';
import { ProfilePage } from './profile';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  bootstrap: [ProfilePage],
  imports: [IonicModule],
  providers: [
    NativePageTransitions,
    SessionService,
    UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule {}
