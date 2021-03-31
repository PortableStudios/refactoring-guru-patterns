import { Order } from '../../types/Order';
import { noop } from '../helpers/noop';

export class GreenTeaService {
    public async make(order: Order): Promise<boolean> {
        noop(order);
        return Promise.resolve(true);
    }
}
