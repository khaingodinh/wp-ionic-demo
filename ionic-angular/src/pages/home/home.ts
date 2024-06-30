import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SessionService } from '../../utils/sessionStore';
import { UsersPage } from '../users/users';
import { ProfilePage } from '../profile/profile';
// import { UsersPage } from './users.page'; // Adjust path as needed
// import { ProfilePage } from './profile.page'; // Adjust path as needed

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private session: SessionService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('document', 'click', (event: any) => this.onDocumentClick(event));
  }
  @ViewChild('avatar') avatarRef: any;
  @ViewChild('profileMenu') profileMenuRef: any;
  rootPage: any = UsersPage;
  isMenuOpen = false;

  toggleProfileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onDocumentClick(event: any) {
    if (this.avatarRef._elementRef.nativeElement.contains(event.target)) {
      return;
    }
    if (this.profileMenuRef.nativeElement.contains(event.target)) {
      return;
    }
    this.isMenuOpen = false;
  }

  goToUsers() {
    this.rootPage = UsersPage;
  }

  goToProfile() {
    this.toggleProfileMenu();
    this.navCtrl.push(ProfilePage);
  }

  logout() {
    this.session.removeSession()
    window.location.reload();
  }
}