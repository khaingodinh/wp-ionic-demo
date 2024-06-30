import { Component, OnInit } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { SessionService } from '../../utils/sessionStore';
import { UserResult } from '../../typings/api/results/UserResult';
import { UserService } from '../../services/userService';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  user: UserResult;
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private session: SessionService
  ) {}

  ngOnInit() {
    const authInfo = this.session.getSnapshot();
    if (authInfo && authInfo.id) {
      const loading = this.loadingCtrl.create({
        content: 'Loading...',
        spinner: 'circles'
      });
      loading.present();

      this.userService.getUserById(authInfo.id).then(
        (res) => {
          this.user = res;
          this.isLoading = false;
          loading.dismiss();
        }).catch(
        () => {
          this.isLoading = false;
          loading.dismiss();
        }
      );
    }
  }
}