import { Component } from '@angular/core';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-about',
  imports: [Nav, Footer],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

}
