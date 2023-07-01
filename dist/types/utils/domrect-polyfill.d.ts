/**
 * @hidden
 */
export declare class DOMRectPolyfill {
  x: number;
  y: number;
  width: number;
  height: number;
  static fromRect(rect?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }): DOMRectPolyfill;
  constructor(x?: number, y?: number, width?: number, height?: number);
  get top(): number;
  get right(): number;
  get bottom(): number;
  get left(): number;
  toJSON(): {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}
