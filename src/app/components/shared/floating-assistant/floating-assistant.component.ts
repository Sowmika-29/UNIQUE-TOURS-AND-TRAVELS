import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  time: Date;
}

@Component({
  selector: 'app-floating-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed right-4 z-[9999] flex flex-col items-end gap-3 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
         [ngClass]="isVisible ? 'bottom-4 opacity-100 scale-100' : '-bottom-20 opacity-0 scale-90'">
      
      <!-- Chat Window -->
      <div *ngIf="isChatOpen" 
           class="w-[320px] md:w-[380px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col pointer-events-auto animate-slide-up border border-slate-100">
        
        <!-- Header -->
        <div class="bg-brand p-4 text-white relative">
          <div class="flex items-center gap-3 pr-8">
            <div class="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4-4-1.79-4-4-4z" opacity=".3"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <div>
              <h3 class="font-black text-sm uppercase tracking-widest">Unique Assistant</h3>
              <p class="text-[10px] text-white/80 font-medium">Ask about packages, rates or support</p>
            </div>
          </div>
          <button (click)="toggleChat()" class="absolute top-5 right-5 hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Messages Area -->
        <div class="h-[280px] md:h-[350px] overflow-y-auto p-4 space-y-4 bg-slate-50/50" id="chatMessagesArea">
          <div *ngFor="let msg of messages" 
               [ngClass]="msg.sender === 'ai' ? 'justify-start' : 'justify-end'" 
               class="flex w-full animate-fade-in-content">
            <div [ngClass]="msg.sender === 'ai' ? 'bg-white text-slate-700 rounded-bl-none shadow-sm' : 'bg-brand text-white rounded-br-none shadow-brand/20'"
                 class="max-w-[80%] p-3.5 rounded-2xl text-[13px] font-medium leading-relaxed">
              {{ msg.text }}
            </div>
          </div>
          <div *ngIf="isTyping" class="flex justify-start animate-fade-in-content">
            <div class="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
              <span class="w-1.5 h-1.5 bg-brand/40 rounded-full animate-bounce"></span>
              <span class="w-1.5 h-1.5 bg-brand/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span class="w-1.5 h-1.5 bg-brand/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        </div>

        <!-- Suggestions -->
        <div class="px-4 py-2 flex flex-wrap gap-2 border-t border-slate-50 bg-white">
          <button *ngFor="let suggestion of suggestions" 
                  (click)="sendSuggestion(suggestion)"
                  class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-100 hover:border-brand hover:text-brand transition-all bg-white whitespace-nowrap">
            {{ suggestion }}
          </button>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white border-t border-slate-50 flex gap-2">
          <input type="text" 
                 [(ngModel)]="userInput" 
                 (keyup.enter)="sendMessage()"
                 placeholder="Type your message..." 
                 class="flex-1 bg-slate-50 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-brand/20 outline-none font-medium h-11">
          <button (click)="sendMessage()" 
                  [disabled]="!userInput.trim()"
                  class="w-11 h-11 bg-brand text-white rounded-xl flex items-center justify-center hover:bg-brand-light transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-brand/20">
            <svg class="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-3 pointer-events-auto">
        <!-- WhatsApp Button -->
        <a href="https://wa.me/919597371949" 
           target="_blank"
           class="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:-translate-y-1 transition-all group relative">
          <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.485 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.448-4.437-9.887-9.885-9.887-2.639 0-5.117 1.026-6.983 2.893-1.867 1.867-2.892 4.345-2.893 6.984 0 2.142.603 4.068 1.649 5.868l-1.047 3.824 3.913-1.026z"/></svg>
          <span class="absolute right-[120%] bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl">
            Chat on WhatsApp
          </span>
        </a>

        <!-- AI Toggle Button -->
        <button (click)="toggleChat()" 
                [ngClass]="isChatOpen ? 'bg-rose-500 shadow-rose-500/30' : 'bg-brand shadow-brand/30'"
                class="w-14 h-14 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:-translate-y-1 transition-all group relative">
          <svg *ngIf="!isChatOpen" class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-4.97 0-9 4.03-9 9 0 2.32.88 4.42 2.33 6.02L4 21l3.98-1.33C9.42 20.12 10.68 20.5 12 20.5c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-1.1 0-2.12-.3-3-.82l-.2-.11-2.11.7.71-2.01-.13-.21C6.73 13.52 6.5 12.31 6.5 11c0-3.03 2.47-5.5 5.5-5.5s5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5z"/></svg>
          <svg *ngIf="isChatOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          <span *ngIf="!isChatOpen" class="absolute right-[120%] bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl">
            AI Assistant
          </span>
        </button>
      </div>

    </div>
  `,
  styles: [`
    .animate-slide-up {
      animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(40px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-fade-in-content {
      animation: fade-in-content 0.4s ease-out forwards;
    }
    @keyframes fade-in-content {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class FloatingAssistantComponent implements OnInit {
  @Input() isVisible = true;
  isChatOpen = false;
  userInput = '';
  isTyping = false;
  messages: Message[] = [
    { text: 'Hello! I am your Unique AI assistant. How can I help you plan your dream trip today?', sender: 'ai', time: new Date() }
  ];
  suggestions = ['Best Packages', 'Kerala Tour', 'Dubai Trip', 'Contact Agent'];

  ngOnInit() {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendSuggestion(text: string) {
    this.userInput = text;
    this.sendMessage();
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg: Message = { text: this.userInput, sender: 'user', time: new Date() };
    this.messages.push(userMsg);
    const context = this.userInput.toLowerCase();
    this.userInput = '';

    this.isTyping = true;
    
    // Simulate AI response delay
    setTimeout(() => {
      this.isTyping = false;
      this.messages.push({
        text: this.getAIResponse(context),
        sender: 'ai',
        time: new Date()
      });
      this.scrollToBottom();
    }, 1000);

    this.scrollToBottom();
  }

  private getAIResponse(input: string): string {
    if (input.includes('package') || input.includes('rate')) {
      return "We offer premium packages for both domestic and international trips. Which destination are you looking for?";
    } else if (input.includes('kerala')) {
      return "Kerala is our bestseller! We have customizable packages covering Munnar, Thekkady, and Alleppey. Would you like to see the itinerary?";
    } else if (input.includes('dubai')) {
      return "Dubai is amazing! Our curated packages include Burj Khalifa visit, Desert Safari and Dhow Cruise. Shall I connect you with an expert?";
    } else if (input.includes('contact') || input.includes('agent') || input.includes('speak')) {
      return "Sure! You can reach our travel experts directly on WhatsApp or call us at +91 95973 71949.";
    } else if (input.includes('bali')) {
        return "Bali is a tropical paradise! We have special honeymoon and family packages. Would you like me to share details?";
    }
    return "That sounds interesting! I'd love to help you with that. Could you tell me more about your travel plans?";
  }

  private scrollToBottom() {
    setTimeout(() => {
      const area = document.getElementById('chatMessagesArea');
      if (area) area.scrollTop = area.scrollHeight;
    }, 100);
  }
}
