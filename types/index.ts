export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    contact: string;
    cover: string;
    status: 'available' | 'rented';
    ownerId: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    mobile: string;
    role: 'owner' | 'seeker';
  }
  