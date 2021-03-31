import { Order } from './order';

export class OrderRejected {
    constructor (public readonly order: Order, public readonly reason: string) {

    }
}
