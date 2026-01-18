import { Component, OnInit } from '@angular/core';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [Nav, Footer, FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  form: ContactForm = { name: '', email: '', phone: '', message: '' };
  isSending = false; // Track loading state

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit() {
    emailjs.init('fdKiUJiJkms7lnJ1D');
    this.updateContactSEO();
  }

  updateContactSEO() {

    this.title.setTitle('Contact M&J Quality Used Cars | Mabalacat City');
    this.meta.updateTag({ name: 'description', content: 'Contact JM Punsalan at M&J Quality Used Cars Mabalacat. Get the best secondhand car deals in Pampanga.' });
    this.meta.updateTag({ name: 'keywords', content: 'Mabalacat car dealer, contact M&J, buy used cars Pampanga' });

  }

  // Check if walang laman yung input fields
  send() {
    if (!this.form.email || !this.form.name || !this.form.message) {
      alert("Please fill in all required fields.");
      return;
    }

    this.isSending = true;

    const templateParams = {
      name: this.form.name,
      email: this.form.email,
      phone: this.form.phone,
      message: this.form.message,
      to_name: 'M&J Admin'

    };

    emailjs.send('service_h64pn57', 'template_gdfdmqa', templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message Sent Successfully!');
        this.resetForm();
      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert(`Failed to send. Error: ${err.text || 'Check console'}`);
      })
      .finally(() => {
        // This is the "magic" line that resets the button no matter what happens
        this.isSending = false;
      });

  }

  resetForm() {
    this.form = { name: '', email: '', phone: '', message: '' };
  }
}