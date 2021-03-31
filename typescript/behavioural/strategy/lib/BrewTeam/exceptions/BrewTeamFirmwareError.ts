import { BrewTeamError } from './BrewTeamError';

export class BrewTeamFirmwareError extends BrewTeamError {
    public message: string = 'My firmware is updating. Please come back later.';
}
