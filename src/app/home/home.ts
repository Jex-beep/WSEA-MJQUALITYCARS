import { Component } from '@angular/core';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-home',
  imports: [Nav, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
