import { BeverageSize } from '../../enums/beverageSize';
import { BeverageType } from '../../enums/beverageType';
import { MilkType } from '../../enums/milkType';
import { noop } from '../helpers/noop';
import { randomArrayElement, randomBoolean } from '../random/random';
import { BrewTeamAPIError } from './exceptions/BrewTeamAPIError';
import { BrewTeamError } from './exceptions/BrewTeamError';
import { BrewTeamFirmwareError } from './exceptions/BrewTeamFirmwareError';
import { BrewTeamTeapotError } from './exceptions/BrewTeamTeapotError';

export class BrewTeam3000 {
    private constructor() {}

    static getInstance(): BrewTeam3000 {
        // fake it till you make it
        return new BrewTeam3000();
    }

    useDefaults(): void {

    }

    setSize(size: BeverageSize): void {
        noop(size);
    }

    setType(type: BeverageType): void {
        noop(type);
    }

    setMilkType(type: MilkType): void {
        noop(type);
    }

    setMilkUnits(unit: string): void {
        noop(unit);
    }

    setMilkAmount(milk: number): void {
        noop(milk);
    }

    setSugarUnits(units: string): void {
        noop(units);
    }

    setSugarAmount(sugar: number): void {
        noop(sugar);
    }
    addExtras(extra: string): void {
        noop(extra);
    }

    updateCleaningSchedule(time: string): void {
        noop(time);
    }

    async updateLoyalty(customer: string): Promise<void> {
        noop(customer);
        const chaos = [BrewTeamFirmwareError, BrewTeamAPIError, BrewTeamTeapotError];
        return new Promise((resolve) => {
            if (randomBoolean(0.1)) {
                const error = randomArrayElement(chaos);

                if (error) {
                    throw new error();
                }
            }

            else resolve();
        });
    }

    async brew(): Promise<boolean> {
        const chaos = [BrewTeamFirmwareError, BrewTeamAPIError, BrewTeamTeapotError];
        return new Promise((resolve) => {
            if (randomBoolean(0.1)) {
                const error = randomArrayElement(chaos);

                if (error) {
                    throw new error();
                }
            }

            else resolve(true);
        });
    }
}

export const notifyBrewTeamSupport = async (error: BrewTeamError): Promise<void> => {
    noop(error);
    return Promise.resolve();
}

export const MILLILITRES = 'MILLILITRES';
export const TEASPOON = 'TEASPOON';
export const WHIPPED_CREAM = 'WHIPPED_CREAM';
export const NOW = 'NOW';
