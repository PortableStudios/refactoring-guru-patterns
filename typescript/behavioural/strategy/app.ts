import { OrderHandler } from './handlers/OrderHandler';
import { OrderGenerator } from './lib/generators/OrderGenerator';
import { randomInteger } from './lib/random/random';
import { Order } from './types/Order';
import { OrderFullfilled } from './types/OrderFulfilled';

export default class Application {
  run() {
    const orderGenerator = new OrderGenerator();
    const orderHandler = new OrderHandler();
    const generator = orderGenerator.generateOrder();

    setTimeout(() => fakeSubscription(generator, orderHandler), 0);
  }
}

const fakeSubscription = async (generator: IterableIterator<Order>, handler: OrderHandler) => {

    const order = generator.next().value;
    console.log(`\x1b[36m New order from ${order.customer}`);
    console.log('-------------------------');
    const result = await handler.handle(order);

    if (result instanceof OrderFullfilled) {
        console.log(`\x1b[32m Order #${result.order.id} for ${result.order.customer} has been successfully fulfilled :)`, result.order);
    } else {
        console.error(`\x1b[31m Order #${result.order.id} for ${result.order.customer} has been rejected because: ${result.reason} :(`, result.order);
    }

    console.log('-------------------------');
    setTimeout(() => fakeSubscription(generator, handler), randomInteger(500, 2000));
};
