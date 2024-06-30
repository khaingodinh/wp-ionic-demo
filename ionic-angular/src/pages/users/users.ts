import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { UserResult } from '../../typings/api/results/UserResult';
import { UserService } from '../../services/userService';
import { UserModalComponent } from '../../components/user-modal/user-modal';
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage implements OnInit {
  users: UserResult[] = [];
  isLoading: boolean = true;

  constructor(
    public navCtrl: NavController,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const loading = this.loadingCtrl.create({
      content: 'Loading...',
      spinner: 'circles'
    });
    loading.present();

    this.userService.getUsers().then(
      (res) => {
        this.users = res;
        this.isLoading = false;
        loading.dismiss();
      }
    ).catch(
      () => {
        this.isLoading = false;
        loading.dismiss();
      }
    );
  }

  openModal() {
    const modal = this.modalCtrl.create(UserModalComponent);
    modal.onDidDismiss(data => {
      if (data && data.success) {
        this.userService.getUsers().then(
          (res) => {
            this.users = res;
          }
        )
      }
    });
    modal.present();
  }
}
