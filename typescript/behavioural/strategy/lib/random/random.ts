import data from './data.json';

export const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export const randomArrayElement = <T>(array: T[]): T | undefined => {
    const index = randomInteger(0, array.length - 1);
    return array[index] || array[0];
}

export const randomUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

export const randomName = (): string => {
    const index = randomInteger(0, data.names.length -1);
    return data.names[index] || 'No Name Given';
}

export const randomBoolean = (weight: number = 0.5): boolean => {
    const rand = Math.random();
    return rand < weight;
}

export const randomEnumValue = <T>(enumObj: T): T[keyof T] => {
    const enumValues = Object.values(enumObj).filter(i => typeof i === 'string');
    const i = Math.floor(Math.random() * enumValues.length);
    return enumValues[i];
  }

