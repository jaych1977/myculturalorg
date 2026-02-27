import { Dimensions } from 'react-native';

// Colors
export const Colors = {
  primary: '#8B4513', // Brown color for cultural org
  secondary: '#D2691E', // Chocolate
  accent: '#FFD700', // Gold
  background: '#FFF8DC', // Cornsilk
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  lightGray: '#F5F5F5',
  red: '#FF6B6B',
  green: '#51CF66',
  blue: '#4C6EF5',
};

// Typography
export const Typography = {
  h1: { fontSize: 28, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: '600' },
  h3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 14, fontWeight: '400' },
  small: { fontSize: 12, fontWeight: '400' },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Screen dimensions
export const ScreenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

// Default events for the cultural organization
export const DefaultEvents = [
  {
    id: '1',
    name: 'Diwali Festival Celebration',
    date: new Date(2026, 9, 25), // October 25
    description: 'Join us for a grand Diwali celebration with traditional performances, food, and festivities.',
    location: 'Main Hall',
  },
  {
    id: '2',
    name: 'Holi Color Festival',
    date: new Date(2026, 2, 14), // March 14
    description: 'Experience the vibrant colors of Holi with music, dance, and traditional sweets.',
    location: 'Outdoor Grounds',
  },
  {
    id: '3',
    name: 'Navratri Celebration',
    date: new Date(2026, 8, 15), // September 15
    description: 'Nine-day festival celebrating the divine feminine with cultural performances.',
    location: 'Main Hall',
  },
  {
    id: '4',
    name: 'New Year Cultural Night',
    date: new Date(2026, 0, 1), // January 1
    description: 'Ring in the new year with traditional music and cultural performances.',
    location: 'Auditorium',
  },
];

// Payment methods
export const PaymentMethods = [
  { label: 'UPI', value: 'UPI' },
  { label: 'Debit Card', value: 'DEBIT_CARD' },
  { label: 'Credit Card', value: 'CREDIT_CARD' },
  { label: 'Bank Transfer', value: 'BANK_TRANSFER' },
];

// About Us content
export const AboutUsContent = {
  title: 'My Cultural Organisation',
  subtitle: 'Preserving and Promoting Cultural Heritage',
  description: `Welcome to My Cultural Organisation, a dedicated non-profit dedicated to preserving, promoting, and celebrating our rich cultural heritage.

Our mission is to:
• Showcase traditional arts, music, and dance
• Organize cultural events and festivals
• Foster community engagement and appreciation
• Support talented artists and performers
• Bridge cultural gaps through educational programs

Founded with a passion for cultural excellence, we have been serving the community for many years. Our events bring together people from different backgrounds to celebrate diversity and unity.`,
  vision: 'To be the leading cultural organization fostering appreciation for traditional arts and heritage while building inclusive communities.',
  mission: 'Promoting cultural awareness, preserving traditions, and providing platforms for artistic expression.',
};

// Currency settings
export const Currency = {
  symbol: '₹',
  code: 'INR',
  name: 'Indian Rupee',
};
