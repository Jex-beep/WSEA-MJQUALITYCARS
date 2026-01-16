import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { BlogService } from '../services/blogs'; 

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, Nav, Footer, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit {
  selectedCategory: string = 'All';
  blogs: any[] = [];

  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private blogService: BlogService 
  ) {}

  ngOnInit(): void {
    this.blogs = this.blogService.getBlogs();
    this.titleService.setTitle('Automotive Blog & Guides | M&J Quality Used Cars');
    this.updateSEO('All');
  }

  filterBlogs(category: string): void {
    this.selectedCategory = category;
    this.updateSEO(category);
  }

  get availableBlogs() {
    if (this.selectedCategory === 'All') {
      return this.blogs;
    }
    return this.blogs.filter(post => 
      post.category.toLowerCase() === this.selectedCategory.toLowerCase()
    );
  }

  updateSEO(category: string): void {
    const description = category === 'All' 
      ? 'Expert car buying guides and automotive news in Mabalacat City.' 
      : `Latest ${category} news and tips from M&J Quality Used Cars.`;
    
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: `used cars Mabalacat blog, Pampanga car guides, M&J automotive news` });
    this.metaService.updateTag({ property: 'og:title', content: `M&J Quality Used Cars Blog - ${category}` });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
    this.metaService.updateTag({ name: 'geo.placename', content: 'Mabalacat, Pampanga' });
  }
}