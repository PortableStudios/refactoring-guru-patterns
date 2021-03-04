import Coffee from './Coffee';

export default class Order {  
  private coffees: Coffee[] = []
  
  add(coffee: Coffee): Coffee[] {
    this.coffees.push(coffee)

    return this.all()
  }

  all(): Coffee[] {
    return this.coffees
  }
}
