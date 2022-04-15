import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Tle',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Dear',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Jamille Sets',
      slug: 'jamille-sets',
      category: 'sets',
      image: '/images/jamille-brown.jpg',
      price: 790,
      brand: 'Glamclothes',
      rating: '4.9',
      numReviews: 30,
      stock: 40,
      description: 'A popular sets',
    },
    {
      name: 'Caesar Sets',
      slug: 'caesar-sets',
      category: 'sets',
      image: '/images/caesar-brown.jpg',
      price: 590,
      brand: 'Glamclothes',
      rating: '4.9',
      numReviews: 10,
      stock: 40,
      description: 'A popular sets',
    },
    {
      name: 'Laday Linen Sets',
      slug: 'lady-linen-sets',
      category: 'sets',
      image: '/images/lady-cream.jpg',
      price: 590,
      brand: 'Glamclothes',
      rating: '3.5',
      numReviews: 10,
      stock: 0,
      description: 'A popular sets',
    },
    {
      name: 'Blazer G4 Sets',
      slug: 'blazer-g4-sets',
      category: 'sets',
      image: '/images/g4-lemon.jpg',
      price: 590,
      brand: 'Glamclothes',
      rating: '5',
      numReviews: 5,
      stock: 40,
      description: 'A popular sets',
    },
  ],
};

export default data;
