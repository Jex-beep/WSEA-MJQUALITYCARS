import { Component } from '@angular/core';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-blog',
  imports: [Nav, Footer],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog {

}
