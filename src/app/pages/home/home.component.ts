import { Component } from '@angular/core';
import { HeroSliderComponent } from '../../components/home/hero-slider/hero-slider.component';
import { CategoryCardsComponent } from '../../components/home/category-cards/category-cards.component';
import { TopDestinationsComponent } from '../../components/home/top-destinations/top-destinations.component';
import { WhyChooseUsComponent } from '../../components/home/why-choose-us/why-choose-us.component';
import { ReviewSliderComponent } from '../../components/home/review-slider/review-slider.component';
import { StatsCounterComponent } from '../../components/home/stats-counter/stats-counter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSliderComponent, 
    CategoryCardsComponent, 
    TopDestinationsComponent, 
    WhyChooseUsComponent, 
    StatsCounterComponent,
    ReviewSliderComponent
  ],
  template: `
    <app-hero-slider></app-hero-slider>
    <app-category-cards></app-category-cards>
    <app-top-destinations></app-top-destinations>
    <app-why-choose-us></app-why-choose-us>
    <app-stats-counter></app-stats-counter>
    <app-review-slider></app-review-slider>
  `
})
export class HomeComponent {}
