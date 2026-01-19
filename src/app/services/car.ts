import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  inventory = [
    { 
      id: 1, 
      make: 'Toyota Fortuner', 
      model: 'G Variant', 
      year: 2018, 
      type: 'Suv', 
      price: '₱1,048,000', 
      image: '/Cars/fortuner2018_2.jpg', 
      gallery: [
        '/Cars/fortuner2018.jpg', 
        '/Cars/fortuner2018_2.jpg', 
        '/Cars/fortuner2018_3.jpg', 
        '/Cars/fortuner2018_4.jpg'
      ],
      isAvailable: true,
      description: 'The Toyota Fortuner 2.4G is a reliable and powerful SUV, offering a perfect balance of city comfort and off-road capability.',
      gearbox: 'Automatic',
      fuel: 'Diesel',
      engine: '1.8L',
      ac: 'Yes',
      seats: 7,
      distance: '53,000 km',
      equipment: ['ABS', 'Air Bags', 'Cruise Control', 'Air Conditioner', 'Leather Seats', 'Reverse Camera']
    },
    { 
      id: 2, 
      make: 'Ford Everest', 
      model: 'Everest 2018', 
      year: 2018, 
      type: 'Suv', 
      price: '₱895,000', 
      image: '/Cars/fordeverest.jpg', 
      gallery: ['/Cars/fordeverest.jpg', '/Cars/fordeverest2.jpg','/Cars/fordeverest3.jpg', '/Cars/fordeverest4.jpg'],
      isAvailable: true,
      description: 'The Ford Everest is a robust and sophisticated family SUV, engineered to deliver exceptional off-road capability without compromising on-road comfort and safety.',
      gearbox: 'Automatic',
      fuel: 'Diesel',
      engine: '1.8L',
      ac: 'Yes',
      seats: 7,
      distance: '82,000 km',
      equipment: ['ABS', 'Air Bags', 'Cruise Control', 'Air Conditioner', 'Power Windows', 'Parking Sensors']
    },
    { 
      id: 3, 
      make: 'Vespa Primavera', 
      model: '150 i-Get ABS', 
      year: 2021, 
      type: 'Motor', 
      price: '₱170,000', 
      image: '/Cars/vespa2.jpg', 
      gallery: ['/Cars/vespa.jpg', '/Cars/vespa2.jpg', '/Cars/vespa3.jpg', '/Cars/vespa4.jpg'],
      isAvailable: true,
      description: 'An icon of Italian style and elegance. This Vespa Primavera 150 offers a smooth, quiet ride with its i-Get engine, making it the perfect companion for stylish city cruising.',
      gearbox: 'CVT Automatic',
      fuel: 'Gasoline',
      engine: '150cc',
      ac: 'No',
      seats: 2,
      distance: '3,800 km',
      equipment: ['ABS Braking', 'LED Headlights', 'Electric Start', 'Underseat Storage', 'USB Charging Port', 'Anti-theft Immobilizer']
    },
    { 
      id: 4, 
      make: 'Toyota Hilux SR5', 
      model: 'Hilux SR5 4x4', 
      year: 2002, 
      type: 'Pickup', 
      price: '₱170,000', 
      image: '/Cars/hilux_2002.jpg', 
      gallery: ['/Cars/hilux_2002.jpg', '/Cars/hilux_2002_2.jpg', '/Cars/hilux_2002_3.jpg', '/Cars/hilux_2002_4.jpg'],
      isAvailable: true,
      description: 'A legendary workhorse known for its bulletproof reliability. This 2002 Toyota Hilux SR5 features a capable 4x4 drivetrain and a robust diesel engine, making it perfect for both heavy-duty hauling and off-road adventures in Pampanga.',
      gearbox: 'Manual',
      fuel: 'Diesel',
      engine: '1.8L', 
      ac: 'Yes',
      seats: 5,
      distance: '180,000 km',
      equipment: [
        '4WD Selector', 
        'Power Steering', 
        'Bull Bar Ready', 
        'Step Board', 
        'Overfenders', 
        'Original SR5 Interior', 
        'Cargo Bed Liner'
      ]
    }

    
    

  ];

  getCars() { return this.inventory; }

  getCarById(id: number) {
    return this.inventory.find(car => car.id === id);
  }
}