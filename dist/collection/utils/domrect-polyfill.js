/**
 * @hidden
 */
export class DOMRectPolyfill {
  constructor(x, y, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    if (x != null) {
      this.x = x;
    }
    if (y != null) {
      this.y = y;
    }
    if (width != null) {
      this.width = width;
    }
    if (height != null) {
      this.height = height;
    }
  }
  static fromRect(rect = {}) {
    var _a, _b, _c, _d;
    return new this((_a = rect.x) !== null && _a !== void 0 ? _a : 0, (_b = rect.y) !== null && _b !== void 0 ? _b : 0, (_c = rect.width) !== null && _c !== void 0 ? _c : 0, (_d = rect.height) !== null && _d !== void 0 ? _d : 0);
  }
  get top() {
    return this.y;
  }
  get right() {
    return this.x + this.width;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  toJSON() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
    };
  }
}
