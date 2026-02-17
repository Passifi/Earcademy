export class RandomGenerator {

  static randomValueFromSet(values: any[]) {
    var valueIndex = Math.floor(Math.random() * values.length);
    return values[valueIndex];
  }

  static randomValue(min: number, max: number) {
    let range = max - min;
    return Math.floor(min + Math.random() * range)
  }

};
