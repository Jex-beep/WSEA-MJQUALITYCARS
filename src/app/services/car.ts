import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  inventory = [
    { 
      id: 1, 
      make: 'Ford Everest Titanium', 
      model: 'Everest', 
      year: 2021, 
      type: 'Pickup', 
      price: '₱1,250,000', 
      image: '/Cars/everesttitanium.jpg', 
      // Image Gallery: Main + 3 angles
      gallery: ['/Cars/everesttitanium.jpg', '/Cars/everesttitanium2.jpg', '/Cars/everesttitanium3.jpg', '/Cars/everesttitanium4.jpg'],
      isAvailable: true,
      description: 'The Ford Everest Titanium is a premium pickup designed for both comfort and rugged performance.',
      gearbox: 'Automatic',
      fuel: 'Diesel',
      doors: 5,
      ac: 'Yes',
      seats: 7,
      distance: '25,000 km',
      equipment: ['ABS', 'Air Bags', 'Cruise Control', 'Air Conditioner', 'Leather Seats', 'Reverse Camera']
    },
    { 
      id: 2, 
      make: 'Toyota Innova E', 
      model: 'Innova', 
      year: 2019, 
      type: 'Suv', 
      price: '₱980,000', 
      image: '/Cars/innovae.jpg', 
      gallery: ['/Cars/innovae.jpg', '/Cars/innovae2.jpg','/Cars/innovae3.jpg', '/Cars/innovae4.jpg'],
      isAvailable: true,
      description: 'A reliable family SUV known for its durability and spacious interior.',
      gearbox: 'Manual',
      fuel: 'Diesel',
      doors: 5,
      ac: 'Yes',
      seats: 8,
      distance: '45,000 km',
      equipment: ['ABS', 'Air Bags', 'Cruise Control', 'Air Conditioner', 'Power Windows', 'Parking Sensors']
    },
    { 
      id: 3, 
      make: 'Toyota Land Cruiser Prado', 
      model: 'Prado', 
      year: 2011, 
      type: 'Suv', 
      price: '₱2,100,000', 
      image: '/Cars/landcruiser.jpg', 
      gallery: ['/Cars/landcruiser.jpg', '/Cars/landcruiser2.jpg', '/Cars/landcruiser3.jpg', '/Cars/landcruiser4.jpg'],
      isAvailable: true,
      description: 'Luxury meets off-road capability in this iconic Toyota Land Cruiser Prado.',
      gearbox: 'Automatic',
      fuel: 'Gasoline',
      doors: 5,
      ac: 'Yes',
      seats: 7,
      distance: '80,000 km',
      equipment: ['ABS', 'Air Bags', 'Cruise Control', 'Sunroof', '4x4 Drive', 'Heated Seats']
    },
    

  ];

  getCars() { return this.inventory; }

  getCarById(id: number) {
    return this.inventory.find(car => car.id === id);
  }
}