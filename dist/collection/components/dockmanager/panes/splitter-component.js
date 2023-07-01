import { Component, Element, Event, Host, Listen, Prop, State, h } from '@stencil/core';
import { Utils } from '../../../utils/utils';
import { IgcDragService } from '../../drag-drop/drag.service';
import { IGC_DEFAULT_RESIZE, IGC_RESIZING_MIN_SIZE } from '../dockmanager.interfaces';
import { IgcSplitPaneOrientation, IgcUnpinnedLocation } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export class IgcSplitterComponent {
  constructor() {
    this.handleMouseUp = () => {
      document.documentElement.removeEventListener('mouseup', this.handleMouseUp, false);
      this.showDragGhost = false;
    };
    this.dragStart = () => {
      this.dragStartHelper(0);
    };
    this.dragEnd = () => {
      this.dragEndHelper();
    };
    this.dragMove = (args) => {
      if (!this.ghostElement) {
        return;
      }
      const rect = this.ghostElement.getBoundingClientRect();
      const isHorizontal = this.splitPaneOrientation === IgcSplitPaneOrientation.horizontal;
      const clientCoordinate = isHorizontal ? args.clientX : args.clientY;
      const offset = isHorizontal ? args.offsetX : args.offsetY;
      const startCoordinate = isHorizontal ? rect.left : rect.top;
      const endCoordinate = isHorizontal ? rect.right : rect.bottom;
      if (offset <= 0 && startCoordinate < clientCoordinate) {
        return;
      }
      if (offset >= 0 && endCoordinate > clientCoordinate) {
        return;
      }
      this.dragOffset += offset;
      if (this.flyoutLocation) {
        this.constrainFlyoutResize();
      }
      else {
        this.constrainSplitPaneResize();
      }
    };
  }
  connectedCallback() {
    this.dragService = new IgcDragService(this.element);
    this.dragService.dragStart = this.dragStart;
    this.dragService.dragEnd = this.dragEnd;
    this.dragService.dragMove = this.dragMove;
  }
  disconnectedCallback() {
    this.dragService.destroy();
    document.documentElement.removeEventListener('mouseup', this.handleMouseUp, false);
  }
  calculateOffset(event) {
    if (this.isArrowUp(event) || this.isArrowLeft(event)) {
      return -IGC_DEFAULT_RESIZE;
    }
    else if (this.isArrowDown(event) || this.isArrowRight(event)) {
      return IGC_DEFAULT_RESIZE;
    }
  }
  isArrowUp(event) {
    return event.key === 'ArrowUp';
  }
  isArrowDown(event) {
    return event.key === 'ArrowDown';
  }
  isArrowLeft(event) {
    return event.key === 'ArrowLeft';
  }
  isArrowRight(event) {
    return event.key === 'ArrowRight';
  }
  handleKeydownEvent(event) {
    if (this.splitPaneOrientation === IgcSplitPaneOrientation.horizontal &&
      (!this.isArrowLeft(event) && !this.isArrowRight(event))) {
      return;
    }
    if (this.splitPaneOrientation === IgcSplitPaneOrientation.vertical &&
      (!this.isArrowUp(event) && !this.isArrowDown(event))) {
      return;
    }
    this.showDragGhost = false;
    this.dragStartHelper(this.calculateOffset(event));
    if (this.flyoutLocation) {
      this.constrainFlyoutResize();
    }
    else {
      this.constrainSplitPaneResize();
    }
    this.dragEndHelper();
  }
  handleMouseDown() {
    this.showDragGhost = true;
    document.documentElement.addEventListener('mouseup', this.handleMouseUp, false);
    this.resizeStart.emit();
  }
  dragStartHelper(dragOffset) {
    this.dragOffset = dragOffset;
    const parent = this.element.parentElement;
    const children = Array.from(parent.children);
    if (this.flyoutLocation) {
      const pane = children[0];
      this.paneSizes = [this.splitPaneOrientation === IgcSplitPaneOrientation.horizontal ?
          pane.offsetWidth : pane.offsetHeight];
      this.flyoutMaxSize = this.splitPaneOrientation === IgcSplitPaneOrientation.horizontal ?
        parent.offsetWidth - IGC_RESIZING_MIN_SIZE :
        parent.offsetHeight - IGC_RESIZING_MIN_SIZE;
    }
    else {
      const index = children.indexOf(this.element);
      const panes = [children[index - 1], children[index + 1]];
      this.paneSizes = panes.map(p => this.splitPaneOrientation === IgcSplitPaneOrientation.horizontal ?
        p.offsetWidth : p.offsetHeight);
    }
  }
  dragEndHelper() {
    const dragOffset = this.dragOffset;
    this.showDragGhost = false;
    this.dragOffset = 0;
    this.paneSizes = null;
    this.resizeEnd.emit(dragOffset);
  }
  constrainFlyoutResize() {
    const paneSize = this.paneSizes[0];
    const isStartLocation = this.flyoutLocation === IgcUnpinnedLocation.left || this.flyoutLocation === IgcUnpinnedLocation.top;
    const offset = isStartLocation ?
      this.dragOffset :
      -this.dragOffset;
    if (paneSize + offset < IGC_RESIZING_MIN_SIZE) {
      const minOffset = paneSize - IGC_RESIZING_MIN_SIZE;
      this.dragOffset = isStartLocation ? -minOffset : minOffset;
    }
    else if (paneSize + offset > this.flyoutMaxSize) {
      const maxOffset = this.flyoutMaxSize - paneSize;
      this.dragOffset = isStartLocation ? maxOffset : -maxOffset;
    }
  }
  constrainSplitPaneResize() {
    let rtl = false;
    const dockmanager = this.closestElement('ngx-flexlayout', this.element);
    if (dockmanager.dir !== '') {
      rtl = dockmanager.dir === 'rtl';
    }
    else {
      let parent = dockmanager.parentElement;
      while (parent) {
        if (parent.dir !== '') {
          rtl = parent.dir === 'rtl';
          break;
        }
        parent = parent.parentElement;
      }
    }
    const isVertical = this.splitPaneOrientation === IgcSplitPaneOrientation.vertical;
    if (this.dragOffset < 0) {
      const referencePaneSize = !rtl || isVertical ? this.paneSizes[0] : this.paneSizes[1];
      if (referencePaneSize > IGC_RESIZING_MIN_SIZE) {
        if (referencePaneSize + this.dragOffset < IGC_RESIZING_MIN_SIZE) {
          this.dragOffset = -(referencePaneSize - IGC_RESIZING_MIN_SIZE);
        }
      }
      else {
        this.dragOffset = 0;
      }
    }
    else {
      const referencePaneSize = !rtl || isVertical ? this.paneSizes[1] : this.paneSizes[0];
      if (referencePaneSize > IGC_RESIZING_MIN_SIZE) {
        if (referencePaneSize - this.dragOffset < IGC_RESIZING_MIN_SIZE) {
          this.dragOffset = referencePaneSize - IGC_RESIZING_MIN_SIZE;
        }
      }
      else {
        this.dragOffset = 0;
      }
    }
  }
  closestElement(selector, el) {
    return ((el && el.closest(selector)) ||
      this.closestElement(selector, el.getRootNode().host));
  }
  handleSlotChange() {
    const handleSlot = this.element.shadowRoot.querySelector('slot[name="splitterHandle"]');
    const isVertical = this.splitPaneOrientation === IgcSplitPaneOrientation.vertical;
    this.hasCustomSplitterHandle = handleSlot.assignedElements().length > 0;
    if (this.hasCustomSplitterHandle) {
      const handle = this.element.querySelector('[part="splitter-handle"]');
      const parts = Utils.partNameMap({
        'splitter-handle': true,
        'vertical': isVertical,
        'horizontal': !isVertical
      });
      handle.setAttribute('part', parts);
    }
  }
  render() {
    const isVertical = this.splitPaneOrientation === IgcSplitPaneOrientation.vertical;
    const splitterClasses = {
      'splitter': true,
      'splitter--vertical': isVertical,
      'splitter--custom-handle': this.hasCustomSplitterHandle
    };
    const ghostClasses = {
      'splitter-ghost': true,
      'splitter-ghost--vertical': isVertical
    };
    return (h(Host, { part: "splitter", exportparts: "splitter,\r\n        splitter-base,\r\n        splitter-ghost" },
      h("div", { part: "splitter-base", class: splitterClasses, tabIndex: 0, role: "separator", "aria-orientation": this.splitPaneOrientation.toString() },
        h("slot", { name: "splitterHandle", onSlotchange: this.handleSlotChange.bind(this) })),
      this.showDragGhost &&
        h("div", { part: "splitter-ghost", class: ghostClasses, style: {
            left: `${isVertical ? 0 : this.dragOffset}px`,
            top: `${isVertical ? this.dragOffset : 0}px`
          }, ref: el => this.ghostElement = el })));
  }
  static get is() { return "igc-splitter-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["splitter-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["splitter-component.css"]
  }; }
  static get properties() { return {
    "showDragGhost": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "show-drag-ghost",
      "reflect": false
    },
    "splitPaneOrientation": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "IgcSplitPaneOrientation",
        "resolved": "IgcSplitPaneOrientation.horizontal | IgcSplitPaneOrientation.vertical",
        "references": {
          "IgcSplitPaneOrientation": {
            "location": "import",
            "path": "../dockmanager.public-interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "split-pane-orientation",
      "reflect": false
    },
    "flyoutLocation": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "IgcUnpinnedLocation",
        "resolved": "IgcUnpinnedLocation.bottom | IgcUnpinnedLocation.left | IgcUnpinnedLocation.right | IgcUnpinnedLocation.top",
        "references": {
          "IgcUnpinnedLocation": {
            "location": "import",
            "path": "../dockmanager.public-interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "flyout-location",
      "reflect": false
    }
  }; }
  static get states() { return {
    "dragOffset": {},
    "hasCustomSplitterHandle": {}
  }; }
  static get events() { return [{
      "method": "resizeStart",
      "name": "resizeStart",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "resizeEnd",
      "name": "resizeEnd",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }]; }
  static get elementRef() { return "element"; }
  static get listeners() { return [{
      "name": "keydown",
      "method": "handleKeydownEvent",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "mousedown",
      "method": "handleMouseDown",
      "target": undefined,
      "capture": false,
      "passive": true
    }]; }
}
