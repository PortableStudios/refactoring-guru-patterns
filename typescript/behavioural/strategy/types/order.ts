import { BeverageSize } from '../enums/beverageSize';
import { BeverageType } from '../enums/beverageType';
import { MilkType } from '../enums/milkType';

export interface Order {
    id: string;
    type: BeverageType,
    size: BeverageSize,
    customer: string,
    customisation: {
        sugar: number;
        milk: MilkType;
        whippedCream: boolean,
    }
}
