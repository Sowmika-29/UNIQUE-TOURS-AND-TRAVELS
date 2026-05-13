import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteName = 'Unique Tours & Travels';
  private readonly baseUrl = 'https://uniquetours.in';

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateMetadata(config: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string;
  }) {
    // Title: Keep under 60 chars for optimal SERP display
    const fullTitle = config.title
      ? `${config.title} | ${this.siteName}`
      : `Explore Tour Packages India | ${this.siteName}`;

    // Description: Keep under 155 chars for optimal SERP display
    const description = config.description ||
      'Book affordable domestic & international tour packages. Kerala, Goa, Dubai, Bali & more. Trusted travel agency in Karur, Tamil Nadu.';

    const image = config.image || `${this.baseUrl}/assets/images/og-default.webp`;
    const url = config.url ? `${this.baseUrl}${config.url}` : this.baseUrl;
    const type = config.type || 'website';

    // Standard Meta Tags
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph (Facebook / WhatsApp / LinkedIn)
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'en_IN' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Canonical Link
    this.updateCanonicalUrl(url);
  }

  private updateCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /**
   * Supports multiple JSON-LD scripts on the same page by using unique IDs.
   * Call with different `id` values for TravelAgency, FAQ, Breadcrumb, etc.
   */
  setStructuredData(data: any, id = 'structured-data-script') {
    let script = this.document.getElementById(id) as HTMLScriptElement;

    if (script) {
      script.text = JSON.stringify(data);
    } else {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      this.document.head.appendChild(script);
    }
  }

  /**
   * Remove a specific JSON-LD script (useful on route change)
   */
  removeStructuredData(id: string) {
    const el = this.document.getElementById(id);
    if (el) el.remove();
  }
}
