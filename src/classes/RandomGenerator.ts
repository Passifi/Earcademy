export class RandomGenerator {

  static randomValueFromSet(values: any[]) {
    return values[Math.floor(Math.random() * values.length)]
  }

  static randomValue(min: number, max: number) {
    let range = max - min;
    return Math.floor(min + Math.random() * range)
  }

};
