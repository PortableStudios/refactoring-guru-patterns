import { BeverageSize } from '../../enums/BeverageSize';
import { BeverageType } from '../../enums/BeverageType';
import { MilkType } from '../../enums/MilkType';
import { Order } from '../../types/Order';
import { randomArrayElement, randomBoolean, randomInteger, randomName, randomUUID, randomEnumValue } from '../random/random';


export const makeCoffeeOrder = (): Order => {
    return {
        id: randomUUID(),
        type: BeverageType.COFFEE,
        size: randomEnumValue(BeverageSize),
        customer: randomName(),
        customisation: {
            sugar: randomInteger(0, 10),
            milk: randomEnumValue(MilkType),
            whippedCream: randomBoolean()
        }
    }
}

export const makeEspressoOrder = (): Order => {
    return {
        id: randomUUID(),
        type: BeverageType.ESPRESSO,
        size: BeverageSize.SMALL,
        customer: randomName(),
        customisation: {
            sugar:0,
            milk: MilkType.NONE,
            whippedCream: false
        }
    }
}

export const makeLatteOrder = (): Order => {
    return {
        id: randomUUID(),
        type: BeverageType.LATTE,
        size: randomEnumValue(BeverageSize),
        customer: randomName(),
        customisation: {
            sugar: randomInteger(0, 10),
            milk: randomArrayElement([ MilkType.MILK, MilkType.SOY, MilkType.OAT ]) || MilkType.NONE,
            whippedCream: randomBoolean()
        }
    }
}

export const makeGreenTeaOrder = (): Order => {
    return {
        id: randomUUID(),
        type: BeverageType.GREEN_TEA,
        size: randomEnumValue(BeverageSize),
        customer: randomName(),
        customisation: {
            sugar: 0,
            milk: MilkType.NONE,
            whippedCream: false
        }
    }
}

export const makeTeaOrder = (): Order => {
    return {
        id: randomUUID(),
        type: BeverageType.TEA,
        size: randomEnumValue(BeverageSize),
        customer: randomName(),
        customisation: {
            sugar: randomInteger(0, 10),
            milk: randomEnumValue(MilkType),
            whippedCream: false
        }
    }
}
