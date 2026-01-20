import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CarService } from '../../services/car';
import { Nav } from '../../nav/nav';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, Nav, Footer,RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  car: any;
  mainDisplayImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.carService.getCarById(id);

    if (this.car) {
      this.mainDisplayImage = this.car.image;
      this.titleService.setTitle(`${this.car.year} ${this.car.make} for Sale | M&J Quality Cars`);
      this.updateDetailSEO();
    }
  }

  setMainImage(imagePath: string): void {
    this.mainDisplayImage = imagePath;
  }

  updateDetailSEO(): void {
    const fullDesc = `Buy this ${this.car.year} ${this.car.make}. Specs: ${this.car.gearbox} transmission, ${this.car.fuel} fuel, and ${this.car.distance} mileage. Available at M&J Quality Used Cars Mabalacat.`;

    // Primary Meta Tags
    this.metaService.updateTag({ name: 'description', content: fullDesc });
    this.metaService.updateTag({ name: 'keywords', content: `${this.car.make} for sale, used ${this.car.type} Mabalacat, ${this.car.gearbox} cars Pampanga, second hand ${this.car.model}` });
    this.metaService.updateTag({ name: 'author', content: 'M&J Quality Used Cars' });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });

    // Social Media (Open Graph)
    this.metaService.updateTag({ property: 'og:title', content: `${this.car.make} - ${this.car.price}` });
    this.metaService.updateTag({ property: 'og:description', content: fullDesc });
    this.metaService.updateTag({ property: 'og:image', content: `https://mjqualitycars.com${this.car.image}` });
    this.metaService.updateTag({ property: 'og:type', content: 'product' });
    this.metaService.updateTag({ property: 'og:url', content: window.location.href });

    // Geographical Tags
    this.metaService.updateTag({ name: 'geo.region', content: 'PH-PAM' });
    this.metaService.updateTag({ name: 'geo.placename', content: 'Mabalacat, Pampanga' });
    this.metaService.updateTag({ name: 'geo.position', content: '15.2150;120.5753' });
    this.metaService.updateTag({ name: 'ICBM', content: '15.2150, 120.5753' });

    // Additional SEO
    this.metaService.updateTag({ name: 'revisit-after', content: '7 days' });
    this.metaService.updateTag({ name: 'rating', content: 'General' });
  }
}
