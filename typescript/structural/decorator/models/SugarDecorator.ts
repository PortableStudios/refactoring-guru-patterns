import BaseDecorator from './BaseDecorator';

class SugarDecorator extends BaseDecorator {

    cost(): number {
        return super.cost() + 0.25;
    }
  
    description(): string {
        return `${super.description()} + sugar`;
    }

}

export default SugarDecorator;
