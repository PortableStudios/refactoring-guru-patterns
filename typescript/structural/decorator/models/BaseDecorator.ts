import Coffee from './Coffee';

class BaseDecorator implements Coffee {

    private instance: Coffee;
    constructor(instance: Coffee) {
        this.instance = instance;
    }

    cost(): number {
        return this.instance.cost();
    }
  
    description(): string {
        return this.instance.description();
    }

    /*
    // e.g.: MilkDecorator ( SugarDecorator ( InstantCoffee ) )
    removeSugar(): Coffee {
        if (this instanceof SugarDecorator) {
            return this.instance;
        }
        if (this.instance instanceof BaseDecorator) {
            return this.instance.removeSugar();
        }
        return this;
    }
    */
}

export default BaseDecorator;
