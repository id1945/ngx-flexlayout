import { IgcDockManagerService } from '../components/dockmanager/dockmanager.service';
import { IgcDockManagerKeyboardService } from '../components/dockmanager/keyboard/keyboard.service';
/**
 * @hidden
 */
class EventEmitterMock {
  addEventListener(callback) {
    this.callback = callback;
  }
  emit(data) {
    const event = new CustomEvent('mock', { detail: data });
    if (this.callback) {
      this.callback(event);
    }
    return event;
  }
}
/**
 * @hidden
 */
export class IgcDockManagerComponentMock {
  constructor() {
    this.documentOnlyDrag = false;
    this.isValidDrop = true;
    this.allowMaximize = true;
    this.disableKeyboardNavigation = false;
    this.dir = '';
    this.paneClose = new EventEmitterMock();
    this.panePinnedToggle = new EventEmitterMock();
    this.paneDragStart = new EventEmitterMock();
    this.paneDragOver = new EventEmitterMock();
    this.paneDragEnd = new EventEmitterMock();
    this.floatingPaneZIndicesMap = new Map();
    this.floatingPaneResizeStart = new EventEmitterMock();
    this.floatingPaneResizeMove = new EventEmitterMock();
    this.floatingPaneResizeEnd = new EventEmitterMock();
    this.layoutChange = new EventEmitterMock();
    this.service = new IgcDockManagerService(this);
    this.keyboardService = new IgcDockManagerKeyboardService(this.service);
  }
  /* tslint:disable:no-empty */
  focusElement() {
  }
  get layout() {
    return this._layout;
  }
  set layout(value) {
    this._layout = value;
    this.service.processLayout();
    this.layoutChange.emit(value);
  }
}
