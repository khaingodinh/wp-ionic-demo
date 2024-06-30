import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { SessionService } from '../../utils/sessionStore';
import { UserService } from '../../services/userService';
import { IonicModule } from 'ionic-angular';
import { UsersPage } from './users';
import { UserModalComponent } from '../../components/user-modal/user-modal';

@NgModule({
  declarations: [
    UsersPage,
    UserModalComponent,
  ],
  bootstrap: [UsersPage],
  entryComponents: [UserModalComponent],
  imports: [IonicModule],
  providers: [
    NativePageTransitions,
    SessionService,
    UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule {}
