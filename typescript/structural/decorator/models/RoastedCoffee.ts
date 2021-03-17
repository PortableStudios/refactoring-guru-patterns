import Coffee from './Coffee';

class RoastedCoffee implements Coffee {
  cost(): number {
      return 2;
  }
  
  description(): string {
      return 'Roasted Coffee';
  }
}

export default RoastedCoffee;