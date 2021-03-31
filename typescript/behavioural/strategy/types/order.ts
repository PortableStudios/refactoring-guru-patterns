import { BeverageSize } from '../enums/BeverageSize';
import { BeverageType } from '../enums/BeverageType';
import { MilkType } from '../enums/MilkType';

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
