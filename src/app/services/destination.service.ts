import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface SubPlace {
  name: string;
  image: string;
  location: string;
  description: string;
}

export interface Place {
  name: string;
  image: string;
  description?: string;
  subPlaces?: SubPlace[];
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  type: 'Domestic' | 'International';
  image: string;
  places: Place[];
}

export interface DestinationsData {
  domestic: Destination[];
  international: Destination[];
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private cachedData: DestinationsData | null = null;
  private readonly dataUrl = '/assets/data/destinations.json';
  private http = inject(HttpClient);

  constructor() {}

  private fetchPromise: Promise<DestinationsData> | null = null;

  private fetchDestinations(): Promise<DestinationsData> {
    if (this.cachedData) return Promise.resolve(this.cachedData);
    if (this.fetchPromise) return this.fetchPromise;

    this.fetchPromise = firstValueFrom(
      this.http.get<DestinationsData>(this.dataUrl + '?t=' + new Date().getTime())
    ).then(data => {
      this.cachedData = data;
      return data;
    }).catch(error => {
      console.error('Error fetching destinations:', error);
      return { domestic: [], international: [] };
    }).finally(() => {
      this.fetchPromise = null;
    });

    return this.fetchPromise;
  }

  async getDomesticDestinations(): Promise<Destination[]> {
    const data = await this.fetchDestinations();
    return data?.domestic || [];
  }

  async getInternationalDestinations(): Promise<Destination[]> {
    const data = await this.fetchDestinations();
    return data?.international || [];
  }

  async getDestinationById(id: string): Promise<Destination | null> {
    const data = await this.fetchDestinations();
    const all = [...(data.domestic || []), ...(data.international || [])];
    return all.find(d => d.id === id) || null;
  }

  async getSubPlace(category: string, destinationId: string, placeName: string): Promise<Place | null> {
    const data = await this.fetchDestinations();
    const destinations = category.toLowerCase() === 'domestic' ? data.domestic : data.international;
    const dest = destinations.find(d => d.id === destinationId);
    if (!dest) return null;
    return dest.places.find(p => p.name.toLowerCase() === placeName.toLowerCase()) || null;
  }

  private readonly blogCategoryMap: Record<string, string[]> = {
    "Top 10 Travel Tips for First-Time Travelers": ["budget", "city", "popular"],
    "Best Beach Destinations to Relax": ["beach"],
    "Hill Stations You Must Visit in India": ["hill"],
    "How to Plan a Budget-Friendly Trip": ["budget"],
    "Exploring the Hidden Gems of Southeast Asia": ["international", "culture"],
    "The Ultimate Wildlife Safari Guide": ["wildlife", "nature"]
  };

  async getRelatedPlaces(blogTitle: string): Promise<any[]> {
    const categories = this.blogCategoryMap[blogTitle] || [];
    const data = await this.fetchDestinations();
    if (!data) return [];
    
    const all = [...(data.domestic || []), ...(data.international || [])];
    let results: any[] = [];

    for (const region of all) {
      // Logic: Also allow matching by region type if requested (e.g. "international")
      const isInternationalMatch = categories.includes('international') && region.type.toLowerCase() === 'international';

      for (const place of region.places) {
        const hasTagMatch = (place as any).tags?.some((tag: string) => 
          categories.some(cat => cat.toLowerCase() === tag.toLowerCase())
        );

        if (hasTagMatch || (isInternationalMatch && (place as any).tags)) {
          results.push({
            ...place,
            parent: region.id,
            type: region.type.toLowerCase()
          });
        }
      }
    }

    // Shuffle results for variety and take 6
    return results.sort(() => Math.random() - 0.5).slice(0, 6);
  }

  async findPlaceOrSubPlace(name: string): Promise<any | null> {
    const data = await this.fetchDestinations();
    if (!data) return null;
    
    const all = [...(data.domestic || []), ...(data.international || [])];

    for (const region of all) {
      for (const place of region.places) {
        // 1. Match main place (e.g., Munnar, Palolem)
        if (place.name.toLowerCase() === name.toLowerCase()) {
          return {
            type: region.type.toLowerCase(),
            parent: region.id,
            place: place.name,
            data: place
          };
        }

        // 2. Match sub-place (e.g., Echo Point, Baga Beach)
        if (place.subPlaces) {
          const sub = place.subPlaces.find(s => s.name.toLowerCase() === name.toLowerCase());
          if (sub) {
            return {
              type: region.type.toLowerCase(),
              parent: region.id,
              place: place.name,
              subPlace: sub.name,
              data: sub
            };
          }
        }
      }
    }

    // 3. Fallback: Match Destination Category (e.g., Kerala, Goa)
    const destMatch = all.find(d => d.name.toLowerCase() === name.toLowerCase());
    if (destMatch) {
      return {
        type: destMatch.type.toLowerCase(),
        parent: destMatch.id,
        data: destMatch
      };
    }

    return null;
  }
}
