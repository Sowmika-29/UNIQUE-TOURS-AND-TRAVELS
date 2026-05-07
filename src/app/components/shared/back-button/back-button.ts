import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navigation } from '../../../services/navigation';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-button.html',
  styleUrl: './back-button.css',
})
export class BackButton {
  isHome: boolean = true;

  constructor(private navigation: Navigation, private router: Router) {
    const initialPath = this.router.url.split('?')[0];
    this.isHome = initialPath === '/' || initialPath === '/home';

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const basePath = event.urlAfterRedirects.split('?')[0];
        this.isHome = basePath === '/' || basePath === '/home';
      }
    });
  }

  goBack(): void {
    this.navigation.back();
  }
}
