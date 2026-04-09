import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BlogPost {
  title: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 pt-32 pb-20 relative overflow-hidden">
      
      <!-- Background elements -->
      <div class="absolute inset-0 pointer-events-none opacity-20">
        <div class="absolute top-40 right-10 w-64 h-64 bg-sky-200 rounded-full blur-3xl"></div>
        <div class="absolute bottom-40 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Header -->
        <div class="text-center mb-16 animate-fade-in">
          <span class="text-sky-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Travel Diaries</span>
          <h1 class="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Travel Tips & Blogs</h1>
          <div class="w-20 h-1.5 bg-sky-500 mx-auto rounded-full shadow-lg shadow-sky-100"></div>
        </div>

        <!-- Blog Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let blog of blogs; let i = index" 
               class="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-up border border-slate-100"
               [style.animation-delay]="i * 100 + 'ms'">
            
            <!-- Image with zoom effect -->
            <div class="h-60 overflow-hidden relative">
              <img [src]="blog.image" [alt]="blog.title + ' - Travel Blog Post'" 
                   loading="lazy"
                   class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110">
              <div class="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>

            <!-- Content -->
            <div class="p-8 pb-10">
              <h3 class="text-2xl font-black text-slate-900 mb-4 group-hover:text-sky-600 transition-colors leading-tight tracking-tight">
                {{blog.title}}
              </h3>
              <p class="text-slate-500 font-medium leading-[1.8] text-sm md:text-base">
                {{blog.description}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.8s ease-out forwards;
    }
    .animate-slide-up {
      animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class BlogComponent {
  blogs: BlogPost[] = [
    {
      title: 'Top 10 Travel Tips for First-Time Travelers',
      description: 'Essential tips to make your first journey smooth and enjoyable, from packing light to navigating new cultures. We cover everything from organizing your documents to staying safe in unfamiliar environments. Learn the secrets of effortless travel and how to embrace spontaneous moments without the stress.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?fm=webp&fit=crop&w=1200&q=50'
    },
    {
      title: 'Best Beach Destinations to Relax',
      description: 'Discover peaceful beach locations for a perfect vacation. Crystal clear waters and golden sands await in these hidden tropical paradises. Whether you are looking for luxury resorts or secluded shores, our curated list identifies the most serene coastal escapes for your next restorative getaway.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=webp&fit=crop&w=1200&q=50'
    },
    {
      title: 'Hill Stations You Must Visit in India',
      description: 'Explore the most scenic hill stations across India, where misty peaks and tea gardens touch the sky. From the colonial charm of Shimla to the serene valleys of Coorg, discover locations that offer breathtaking panoramas and a cool respite from the tropical heat. Experience local culture and mountain hospitality.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?fm=webp&fit=crop&w=1200&q=50'
    },
    {
      title: 'How to Plan a Budget-Friendly Trip',
      description: 'Smart ways to travel without overspending. Learn to find the best deals and hidden gems on a budget. We share professional insights on booking flights during off-peaks, choosing affordable but high-quality local stays, and maximizing your experiences without draining your savings.',
      image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?fm=webp&fit=crop&w=1200&q=50'
    },
    {
      title: 'Exploring the Hidden Gems of Southeast Asia',
      description: 'Beyond the crowded tourist trails lie mystical temples, emerald rice terraces, and untouched islands. Discover the local secrets of Vietnam, Laos, and Cambodia that offer authentic cultural immersion and stunning landscapes away from the typical backpacker route.',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?fm=webp&fit=crop&w=1200&q=50'
    },
    {
      title: 'The Ultimate Wildlife Safari Guide',
      description: 'Prepare for a thrilling adventure in the wild. From the vast plains of the Serengeti to the dense jungles of India, we provide essential tips on documentation, best viewing seasons, and ethical wildlife encounters that support conservation efforts while providing lifelong memories.',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?fm=webp&fit=crop&w=1200&q=50'
    }
  ];
}

