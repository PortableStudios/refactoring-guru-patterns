import BaseDecorator from './BaseDecorator';

class MilkDecorator extends BaseDecorator {

    cost(): number {
        return super.cost() + 0.50;
    }
  
    description(): string {
        return `${super.description()} + milk`;
    }

}

export default MilkDecorator;
