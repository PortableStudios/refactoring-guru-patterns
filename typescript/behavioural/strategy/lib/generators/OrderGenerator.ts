import { BeverageType } from '../../enums/BeverageType';
import { Order } from '../../types/Order';

import {
    makeCoffeeOrder,
    makeEspressoOrder,
    makeLatteOrder,
    makeGreenTeaOrder,
    makeTeaOrder
} from '../helpers/orderMakers';

import { randomEnumValue } from '../random/random';

const orderMap: { [key in keyof typeof BeverageType]: () => Order } = {
    [BeverageType.COFFEE]: makeCoffeeOrder,
    [BeverageType.ESPRESSO]: makeEspressoOrder,
    [BeverageType.LATTE]: makeLatteOrder,
    [BeverageType.GREEN_TEA]: makeGreenTeaOrder,
    [BeverageType.TEA]: makeTeaOrder,
}

export class OrderGenerator {

    public *generateOrder(): IterableIterator<Order> {
        while(true) {
            const randomType = randomEnumValue(BeverageType);

            // bad practice i know, but I defined all of these so i know it'll patten match
            const orderMaker = orderMap[randomType] as () => Order
            yield orderMaker();
        }
    }
}
