import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { BlogService } from '../../services/blogs';
import { Nav } from '../../nav/nav';
import { Footer } from '../../footer/footer';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, Nav, Footer, RouterLink],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css'
})
export class BlogDetail implements OnInit {
  blog: any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blog = this.blogService.getBlogById(id);

    if (this.blog) {
      // Sets the Exact Title you requested
      this.titleService.setTitle('Best Places to Buy Used Cars in Mabalacat City | M&J Automotive Guide');
      this.updateDetailSEO();
    }
  }

updateDetailSEO(): void {
    // Use the specific blog data for the Title and Description
    const blogTitle = `${this.blog.title} | M&J Automotive Guide`;
    const blogDesc = this.blog.description; // Pulls from your blog object
    const blogImage = `https://mjqualityusedcars.com${this.blog.image}`;
    const currentUrl = `https://mjqualityusedcars.com/blog/${this.blog.id}`;

    // 1. Primary Tags (Now Dynamic!)
    this.titleService.setTitle(blogTitle);
    this.metaService.updateTag({ name: 'title', content: blogTitle });
    this.metaService.updateTag({ name: 'description', content: blogDesc });
    
    // Keywords can still include the category dynamically
    this.metaService.updateTag({ 
      name: 'keywords', 
      content: `used cars Mabalacat City, M & J Quality Used Cars, ${this.blog.category}, Pampanga cars 2026` 
    });
    
    this.metaService.updateTag({ name: 'author', content: 'JM Punsalan' });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });

    // 2. Social Media (Open Graph - Now Dynamic!)
    this.metaService.updateTag({ property: 'og:type', content: 'article' });
    this.metaService.updateTag({ property: 'og:url', content: currentUrl });
    this.metaService.updateTag({ property: 'og:title', content: this.blog.title });
    this.metaService.updateTag({ property: 'og:description', content: blogDesc });
    this.metaService.updateTag({ property: 'og:image', content: blogImage });

    // 3. Geographic Tags (Stay the same because your business location doesn't move)
    this.metaService.updateTag({ name: 'geo.region', content: 'PH-PAM' });
    this.metaService.updateTag({ name: 'geo.placename', content: 'Mabalacat City' });
    this.metaService.updateTag({ name: 'geo.position', content: '15.2246;120.5746' });
    this.metaService.updateTag({ name: 'ICBM', content: '15.2246, 120.5746' });
    
    // Twitter / X Social Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: this.blog.title });
    this.metaService.updateTag({ name: 'twitter:description', content: blogDesc });
    this.metaService.updateTag({ name: 'twitter:image', content: blogImage });
    this.metaService.updateTag({ name: 'twitter:site', content: '@YourTwitterHandle' }); // If you have one   
  }
  injectSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": this.blog.title,
    "image": `https://mjqualitycars.com${this.blog.image}`,
    "author": {
      "@type": "Person",
      "name": "JM Punsalan",
      "url": "https://mjqualitycars.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "M&J Quality Cars",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mjqualitycars.com/logo.png"
      }
    },
    "datePublished": "2026-01-17",
    "description": this.blog.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mjqualitycars.com/blog/${this.blog.id}`
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}
}