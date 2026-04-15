import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { EnquiryFormComponent } from './components/shared/enquiry-form/enquiry-form.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, EnquiryFormComponent, CommonModule], 
  template: `
    <div class="min-h-screen flex flex-col">
      <app-navbar></app-navbar>
      
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <!-- Global Enquiry Form (Hidden on Contact page to avoid duplication) -->
      <app-enquiry-form *ngIf="!isContactPage"></app-enquiry-form>

      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent {
  title = 'unique-tours';
  isContactPage = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isContactPage = event.urlAfterRedirects.includes('/contact');
    });
  }
}
