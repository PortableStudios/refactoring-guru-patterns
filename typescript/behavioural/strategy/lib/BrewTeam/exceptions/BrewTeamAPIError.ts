import { BrewTeamError } from './BrewTeamError';

export class BrewTeamAPIError extends BrewTeamError {
    public message: string = "I can't call home, do you have the internet?";
}
