import Coffee from './Coffee';

class InstantCoffee implements Coffee {
  cost(): number {
      return 1;
  }
  
  description(): string {
      return 'Instant Coffee';
  }
}

export default InstantCoffee;