/**
 * @hidden
 */
export declare class TwoWayMap<K, V> {
  private map;
  private reversedMap;
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  getByValue(value: V): K | undefined;
  delete(key: K): void;
  has(key: K): boolean;
  hasValue(value: V): boolean;
}
