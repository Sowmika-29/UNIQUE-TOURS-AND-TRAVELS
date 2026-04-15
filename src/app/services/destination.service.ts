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
  private dataCache: DestinationsData | null = null;
  private readonly dataUrl = '/assets/data/destinations.json';
  private http = inject(HttpClient);

  constructor() {}

  async fetchDestinations(): Promise<DestinationsData> {
    if (this.dataCache) {
      return this.dataCache;
    }
    try {
      this.dataCache = await firstValueFrom(
        this.http.get<DestinationsData>(this.dataUrl + '?t=' + new Date().getTime())
      );
      return this.dataCache!;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return { domestic: [], international: [] };
    }
  }

  async getDomesticDestinations(): Promise<Destination[]> {
    const data = await this.fetchDestinations();
    return data.domestic;
  }

  async getInternationalDestinations(): Promise<Destination[]> {
    const data = await this.fetchDestinations();
    return data.international;
  }

  async getDestinationById(id: string): Promise<Destination | null> {
    const data = await this.fetchDestinations();
    const all = [...data.domestic, ...data.international];
    return all.find(d => d.id === id) || null;
  }

  async getSubPlace(category: string, destinationId: string, placeName: string): Promise<Place | null> {
    const data = await this.fetchDestinations();
    const destinations = category.toLowerCase() === 'domestic' ? data.domestic : data.international;
    const dest = destinations.find(d => d.id === destinationId);
    if (!dest) return null;
    return dest.places.find(p => p.name.toLowerCase() === placeName.toLowerCase()) || null;
  }
}
