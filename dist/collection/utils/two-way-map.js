/**
 * @hidden
 */
export class TwoWayMap {
  constructor() {
    this.map = new Map();
    this.reversedMap = new Map();
  }
  set(key, value) {
    this.map.set(key, value);
    this.reversedMap.set(value, key);
  }
  get(key) {
    return this.map.get(key);
  }
  getByValue(value) {
    return this.reversedMap.get(value);
  }
  delete(key) {
    const value = this.map.get(key);
    this.map.delete(key);
    this.reversedMap.delete(value);
  }
  has(key) {
    return this.map.has(key);
  }
  hasValue(value) {
    return this.reversedMap.has(value);
  }
}
