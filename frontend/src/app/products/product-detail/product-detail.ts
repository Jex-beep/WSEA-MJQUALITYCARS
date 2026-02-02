import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CarService } from '../../services/car';
import { Nav } from '../../nav/nav';
import { Footer } from '../../footer/footer';
import { Observable, tap, map } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, Nav, Footer, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  // Use a '$' suffix for Observables
  car$: Observable<any> | undefined;
  mainDisplayImage: string = '';

  private route = inject(ActivatedRoute);
  private carService = inject(CarService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // We assign the observable directly to car$
      this.car$ = this.carService.getCarById(id).pipe(
        // Extract data if nested, otherwise return response
        map(res => res.data ? res.data : res),
        tap(car => {
          if (car) {
            this.mainDisplayImage = car.image;
            this.updateDetailSEO(car);
          }
        })
      );
    }
  }

  setMainImage(imagePath: string): void {
    this.mainDisplayImage = imagePath;
  }

  updateDetailSEO(car: any): void {
    const priceVal = car.price ? Number(car.price) : 0;
    const formattedPrice = new Intl.NumberFormat('en-PH', {
      style: 'currency', currency: 'PHP', maximumFractionDigits: 0
    }).format(priceVal);

    this.titleService.setTitle(`${car.year || ''} ${car.make} ${car.model || ''} | M&J Quality Cars`);

    const fullDesc = `Buy this ${car.make} ${car.model} for ${formattedPrice}. Specs: ${car.gearbox}, ${car.fuel}. Located in Mabalacat, Pampanga.`;

    // SEO Meta Tags
    this.metaService.updateTag({ name: 'description', content: fullDesc });
    this.metaService.updateTag({ name: 'keywords', content: `${car.make}, ${car.model}, used cars Mabalacat, second hand cars Pampanga` });
    this.metaService.updateTag({ property: 'og:title', content: `${car.make} ${car.model} - ${formattedPrice}` });
    this.metaService.updateTag({ property: 'og:image', content: car.image || '' });
    this.metaService.updateTag({ property: 'og:url', content: window.location.href });
    this.metaService.updateTag({ name: 'geo.region', content: 'PH-PAM' });
    this.metaService.updateTag({ name: 'geo.placename', content: 'Mabalacat, Pampanga' });
  }
}