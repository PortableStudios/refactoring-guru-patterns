import { Order } from './Order';

export class OrderRejected {
    constructor (public readonly order: Order, public readonly reason: string) {

    }
}
