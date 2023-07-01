export const IGNORE_DRAG = 'data-ignore-drag';
/**
 * @hidden
 */
export class IgcDragService {
  constructor(element) {
    this.element = element;
    this.dragTolerance = 5;
    this.dragEdgeTolerance = 0;
    this.handleWheel = (event) => {
      event.preventDefault();
    };
    this.handlePointerDown = (event) => {
      let targets = event.composedPath();
      targets = targets.slice(0, targets.indexOf(event.currentTarget));
      for (const target of targets) {
        if (target instanceof Element
          && target.hasAttribute(IGNORE_DRAG)) {
          return;
        }
      }
      // TODO Not sure if we need this
      // this.element.focus();
      // event.preventDefault();
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.lastX = this.startX;
      this.lastY = this.startY;
      this.captureTarget = event.target;
      this.captureTarget.setPointerCapture(event.pointerId);
      this.subscribeDragEvents();
    };
    this.handlePointerMove = (event) => {
      event.preventDefault();
      const maxHeight = document.documentElement.clientHeight;
      const maxWidth = document.documentElement.clientWidth;
      if (event.clientX < this.dragEdgeTolerance) {
        this.currentX = this.dragEdgeTolerance;
      }
      else if (event.clientX > maxWidth - this.dragEdgeTolerance) {
        this.currentX = maxWidth - this.dragEdgeTolerance;
      }
      else {
        this.currentX = event.clientX;
      }
      if (event.clientY < this.dragEdgeTolerance) {
        this.currentY = this.dragEdgeTolerance;
      }
      else if (event.clientY > maxHeight - this.dragEdgeTolerance) {
        this.currentY = maxHeight - this.dragEdgeTolerance;
      }
      else {
        this.currentY = event.clientY;
      }
      if (!this.dragStarted) {
        if (this.forcedDrag) {
          this.forcedDrag = false;
          this.startX = this.currentX;
          this.startY = this.currentY;
          this.lastX = this.startX;
          this.lastY = this.startY;
          this.captureTarget.setPointerCapture(event.pointerId);
          this.triggerDragStart();
        }
        else {
          const offsetX = this.currentX - this.lastX;
          const offsetY = this.currentY - this.lastY;
          if (Math.abs(offsetX) > this.dragTolerance || Math.abs(offsetY) > this.dragTolerance) {
            this.triggerDragStart();
          }
        }
      }
      if (!this.dragStarted) {
        return;
      }
      if (this.dragMove) {
        const args = {
          offsetX: this.currentX - this.lastX,
          offsetY: this.currentY - this.lastY,
          totalOffsetX: this.currentX - this.startX,
          totalOffsetY: this.currentY - this.startY,
          clientX: this.currentX,
          clientY: this.currentY
        };
        this.dragMove(args);
        if (args.cancel) {
          this.unsubscribeDragEvents();
        }
      }
      this.lastX = this.currentX;
      this.lastY = this.currentY;
    };
    this.handlePointerUp = (event) => {
      this.unsubscribeDragEvents();
      this.captureTarget.releasePointerCapture(event.pointerId);
      if (this.dragStarted && this.dragEnd) {
        this.dragEnd({
          offsetX: this.currentX - this.startX,
          offsetY: this.currentY - this.startY,
          clientX: event.clientX,
          clientY: event.clientY
        });
      }
    };
    this.element.addEventListener('pointerdown', this.handlePointerDown, false);
  }
  get captureTarget() {
    return this._capturedElement || this.element;
  }
  set captureTarget(val) {
    this._capturedElement = val;
  }
  triggerDragStart() {
    if (this.dragStart) {
      const args = {
        clientX: this.startX,
        clientY: this.startY
      };
      this.dragStart(args);
      if (args.cancel) {
        this.unsubscribeDragEvents();
        return;
      }
    }
    this.dragStarted = true;
  }
  subscribeDragEvents() {
    this.dragStarted = false;
    document.addEventListener('pointermove', this.handlePointerMove, false);
    document.addEventListener('pointerup', this.handlePointerUp, false);
    document.addEventListener('wheel', this.handleWheel, { passive: false });
  }
  unsubscribeDragEvents() {
    document.removeEventListener('pointermove', this.handlePointerMove);
    document.removeEventListener('pointerup', this.handlePointerUp);
    document.removeEventListener('wheel', this.handleWheel);
  }
  destroy() {
    this.element.removeEventListener('pointerdown', this.handlePointerDown);
    this.unsubscribeDragEvents();
    this.element = null;
    this.dragStart = null;
    this.dragEnd = null;
    this.dragMove = null;
  }
  forceDragging() {
    this.forcedDrag = true;
    this.subscribeDragEvents();
  }
}
