import { Component, Input, ViewChild } from '@angular/core';
import { NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { UserService } from '../../services/userService';

@Component({
  selector: 'user-modal',
  templateUrl: 'user-modal.html'
})
export class UserModalComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  description: string = '';
  isLoading: boolean = false;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  showErrorToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  validateForm(): boolean {
    if (!this.firstName.trim()) {
      this.showErrorToast('First name is required');
      return false;
    }
    if (!this.lastName.trim()) {
      this.showErrorToast('Last name is required');
      return false;
    }
    if (!this.email.trim()) {
      this.showErrorToast('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.showErrorToast('Email is invalid');
      return false;
    }
    if (!this.username.trim()) {
      this.showErrorToast('Username is required');
      return false;
    }
    if (!this.password) {
      this.showErrorToast('Password is required');
      return false;
    }
    if (!this.confirmPassword) {
      this.showErrorToast('Confirm password is required');
      return false;
    } else if (this.password !== this.confirmPassword) {
      this.showErrorToast('Passwords do not match');
      return false;
    }

    return true;
  }

  submit() {
    if (this.validateForm()) {
      const loading = this.loadingCtrl.create({
        content: 'Saving...',
        spinner: 'circles'
      });
      loading.present();

      this.userService.createUser({
        username: this.username,
        password: this.password,
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        description: this.description,
        roles: ['administrator']
      }).then(() => {
        loading.dismiss();
        this.viewCtrl.dismiss({ success: true });
      }).catch(() => {
        loading.dismiss();
        this.showErrorToast('Error saving user');
      });
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
