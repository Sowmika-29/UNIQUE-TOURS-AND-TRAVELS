import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteName = 'Unique Tours & Travels';
  private readonly baseUrl = 'https://uniquetours.in'; // Replace with actual domain

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
    const fullTitle = config.title ? `${config.title} | ${this.siteName}` : this.siteName;
    const description = config.description || 'Unique Tours & Travels offers curated domestic and international travel packages specializing in Kerala, Goa, Dubai, Bali, and more.';
    const image = config.image || `${this.baseUrl}/assets/images/og-default.webp`;
    const url = config.url ? `${this.baseUrl}${config.url}` : this.baseUrl;
    const type = config.type || 'website';

    // Standard Meta Tags
    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph (Facebook / WhatsApp)
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });

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

  setStructuredData(data: any) {
    const scriptId = 'structured-data-script';
    let script = this.document.getElementById(scriptId) as HTMLScriptElement;
    
    if (script) {
      script.text = JSON.stringify(data);
    } else {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      this.document.head.appendChild(script);
    }
  }
}
