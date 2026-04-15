import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './enquiry-form.component.html',
  styleUrl: './enquiry-form.component.css'
})
export class EnquiryFormComponent {
  @Input() isFullPage: boolean = false;
  enquiryForm: FormGroup;

  vacationTypes = [
    'Honeymoon Trip',
    'Family Trip',
    'Student/College Tour',
    'Corporate/Incentive Tour',
    'Adventure Trip',
    'Weekend Getaway',
    'Devotional Tour',
    'Customized/Group Tour'
  ];

  constructor(private fb: FormBuilder) {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      people: ['', [Validators.required, Validators.min(1)]],
      vacationType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.enquiryForm.valid) {
      const data = this.enquiryForm.value;
      const message = `Hello,

I’m interested in booking a trip with Unique Tours & Travels.

Here are my travel preferences:

• Name: ${data.name}
• Location: ${data.city}
• Contact (WhatsApp): ${data.whatsapp}
• Email: ${data.email}

Trip Details:
• Destination: ${data.destination}
• Travel Date: ${data.date}
• Number of Travelers: ${data.people}
• Travel Type: ${data.vacationType}

Kindly suggest suitable packages and pricing.

Looking forward to your response.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/919597371949?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      this.enquiryForm.reset();
    } else {
      Object.keys(this.enquiryForm.controls).forEach(key => {
        const control = this.enquiryForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
