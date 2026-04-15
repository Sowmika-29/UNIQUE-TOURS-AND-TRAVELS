import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryFormComponent } from '../../components/shared/enquiry-form/enquiry-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, EnquiryFormComponent],
  template: `
    <div class="pt-24 min-h-screen bg-slate-50">
      <!-- Full Page Version centered -->
      <app-enquiry-form [isFullPage]="true"></app-enquiry-form>
    </div>
  `
})
export class ContactComponent {}
