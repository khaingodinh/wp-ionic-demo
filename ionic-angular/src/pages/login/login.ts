import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { SessionService } from '../../utils/sessionStore';
import { LoginService } from '../../services/authService';
import { HomePage } from '../home/home';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  isShowMsg: boolean = false;
  msg: string = '';
  isLoading: boolean = false;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private session: SessionService,
    private loginService: LoginService,
  ) {}

  handleLogin() {
    if (!this.username || !this.password) {
      this.presentToast('Please enter username or password');
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Loading...'
      });
      loading.present();

      this.loginService.login({ username: this.username, password: this.password })
        .then((res) => {
          loading.dismiss();
          this.session.setSession({
            accessToken: res.token,
            email: res.user_email,
            name: res.user_display_name
          });
          this.navCtrl.setRoot(HomePage);
        })
        .catch(() => {
          loading.dismiss();
          this.presentToast('Wrong username or password');
        });
    }
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      cssClass: 'toast-warning'
    });
    toast.present();
  }
}