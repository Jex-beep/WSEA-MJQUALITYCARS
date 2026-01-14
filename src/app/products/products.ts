import { Component } from '@angular/core';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-products',
  imports: [Nav, Footer],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {

}
