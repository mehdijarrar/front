import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  constructor(public authService: AuthService) { }
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.authService.doLogout()
  }
}
