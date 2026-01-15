import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

interface Car {
  id: number;
  make: string;
  model: string;
  type: string;
  price: string;
  image: string;
  isAvailable: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, Nav, Footer],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  // Track the current filter
  selectedCategory: string = 'All';

  inventory: Car[] = [
    { id: 1, 
      make: 'Mercedes', 
      model: 'Sedan', 
      type: 'Sedan', 
      price: '₱1,250,000', 
      image: 'assets/cars/mercedes.png', 
      isAvailable: true 
    },
    { id: 2, 
      make: 'Toyota', 
      model: 'Hilux', 
      type: 'Pickup', 
      price: '₱980,000', 
      image: 'assets/cars/hilux.png', 
      isAvailable: true 
    },

    { id: 3, 
      make: 'Honda BRV', 
      model: '2022', 
      type: 'Suv', 
      price: '₱980,000', 
      image: 'assets/cars/hilux.png', 
      isAvailable: true 
    },
    
    // Add more cars here (ensure 'type' matches the filter button names)
  ];

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Our Inventory | M&J Quality Used Cars Mabalacat');
    this.updateSEO('All');
  }

  // Action called when clicking a filter button
  filterCars(category: string): void {
    this.selectedCategory = category;
    this.updateSEO(category);
  }

  // Dynamic getter that calculates which cars to show
  get availableCars() {
    if (this.selectedCategory === 'All') {
      return this.inventory.filter(car => car.isAvailable);
    }
    return this.inventory.filter(car => 
      car.isAvailable && car.type.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  // SEO Management
  updateSEO(category: string): void {
    const description = category === 'All' 
      ? 'Explore the best pre-owned vehicles in Pampanga. M&J Quality Used Cars offers high-quality Sedans, Pickups, and SUVs.' 
      : `Find the best deals on used ${category}s in Mabalacat City at M&J Quality Used Cars.`;
    
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: `used ${category} Mabalacat, second hand cars Pampanga, M&J quality cars` });
    this.metaService.updateTag({ property: 'og:title', content: `M&J Quality Used Cars - ${category} Inventory` });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    this.metaService.updateTag({ name: 'geo.region', content: 'PH-PAM' });
    this.metaService.updateTag({ name: 'geo.placename', content: 'Mabalacat, Pampanga' });
  }
}