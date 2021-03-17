import checkout from '../views/checkout'
import { render } from '../helpers/rendering'
import Order from '../models/Order'
import MilkDecorator from '../models/MilkDecorator'
import InstantCoffee from '../models/InstantCoffee'
import SugarDecorator from '../models/SugarDecorator'
import RoastedCoffee from '../models/RoastedCoffee'

export default class CoffeeController {
  index() {
    render('Taking orders...')

    // Great! We can take coffee orders!
    const order: Order = new Order

    order.add(new MilkDecorator(new InstantCoffee()))
    order.add(new SugarDecorator(new InstantCoffee()))
    order.add(new MilkDecorator(new SugarDecorator(new InstantCoffee())))

    // A revolutionary customer decides they want Milk and Sugar with their coffee... wuuuttt?
    // ...Should we create a new concrete class InstantCoffeeWithMilkAndSugar? Ah ah ah
    
    // order.add(...)
    order.add(new SugarDecorator(new MilkDecorator(new RoastedCoffee())))

    // The same customer now wants Roasted coffee with their Milk and Sugar coffee instead of Instant?!?
    // What now... do we create RoastedCoffeeWithMilkAndSugar and so on?
    
    // order.add(...)

    // TODO: Implement the decorator pattern:
    // * Identify the primary component that has optional layers
    // * Identify the methods in common to both the primary component and the optional layers
    // * Create the component interface and declare the common methods
    // * Create the concrete component class and define the base behavior
    // * Create the base decorator class. It should have a property for referencing the base or decorated object
    // * Create concrete decorators by extending them from the base decorator
    // * Compose!

    render('Paying the barista...')
    const view = checkout(order)

    render(view)
  }
}
