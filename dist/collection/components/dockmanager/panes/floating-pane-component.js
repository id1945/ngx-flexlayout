import { Component, Element, Event, Fragment, Host, Prop, h } from '@stencil/core';
import { IGC_DEFAULT_PANE_SIZE } from '../dockmanager.interfaces';
import { IgcResizerLocation } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export class IgcFloatingPaneComponent {
  constructor() {
    this.allowResize = true;
    this.floatingMinHeight = IGC_DEFAULT_PANE_SIZE;
    this.floatingMinWidth = IGC_DEFAULT_PANE_SIZE;
  }
  handleResizerMove(event) {
    const el = event.target;
    this.wndResizeMove.emit({
      dragMoveArgs: event.detail,
      resizerLocation: el.orientation
    });
  }
  handleResizeStart(event) {
    const el = event.target;
    const args = {
      dragMoveArgs: Object.assign(Object.assign({}, event.detail), { offsetX: 0, offsetY: 0 }),
      resizerLocation: el.orientation
    };
    this.wndResizeStart.emit(args);
    if (args.dragMoveArgs.cancel) {
      event.detail.cancel = true;
    }
  }
  handleResizeEnd(event) {
    const el = event.target;
    this.wndResizeEnd.emit({
      dragMoveArgs: event.detail,
      resizerLocation: el.orientation
    });
  }
  render() {
    const styles = {
      position: 'absolute',
      left: this.floatingLocation.x + 'px',
      top: this.floatingLocation.y + 'px',
      minWidth: this.floatingMinWidth + 'px',
      minHeight: this.floatingMinHeight + 'px',
      width: this.floatingWidth + 'px',
      height: this.floatingHeight + 'px',
    };
    return (h(Host, { style: this.maximized ? {} : styles, role: "dialog", "aria-label": "dialog", part: "floating-window" },
      this.allowResize &&
        h(Fragment, null,
          h("igc-resizer-component", { orientation: IgcResizerLocation.left, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }),
          h("igc-resizer-component", { orientation: IgcResizerLocation.top, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }),
          h("igc-resizer-component", { orientation: IgcResizerLocation.right, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }),
          h("igc-resizer-component", { orientation: IgcResizerLocation.bottom, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) })),
      h("slot", { name: "header" }),
      h("slot", null),
      this.allowResize &&
        h(Fragment, null,
          h("igc-resizer-component", { orientation: IgcResizerLocation.topRight, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }),
          h("igc-resizer-component", { orientation: IgcResizerLocation.topLeft, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }),
          h("igc-resizer-component", { orientation: IgcResizerLocation.bottomRight, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }),
          h("igc-resizer-component", { orientation: IgcResizerLocation.bottomLeft, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }))));
  }
  static get is() { return "igc-floating-pane-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["floating-pane-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["floating-pane-component.css"]
  }; }
  static get properties() { return {
    "allowResize": {
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
      "attribute": "allow-resize",
      "reflect": false,
      "defaultValue": "true"
    },
    "floatingLocation": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IgcDockManagerPoint",
        "resolved": "IgcDockManagerPoint",
        "references": {
          "IgcDockManagerPoint": {
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
      }
    },
    "floatingWidth": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "floating-width",
      "reflect": false
    },
    "floatingHeight": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "floating-height",
      "reflect": false
    },
    "hasHeader": {
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
      "attribute": "has-header",
      "reflect": false
    },
    "maximized": {
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
      "attribute": "maximized",
      "reflect": false
    },
    "floatingMinHeight": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "floating-min-height",
      "reflect": false,
      "defaultValue": "IGC_DEFAULT_PANE_SIZE"
    },
    "floatingMinWidth": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "floating-min-width",
      "reflect": false,
      "defaultValue": "IGC_DEFAULT_PANE_SIZE"
    },
    "floatingId": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "floating-id",
      "reflect": false
    }
  }; }
  static get events() { return [{
      "method": "wndResizeStart",
      "name": "wndResizeStart",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcDragResizeEventArguments",
        "resolved": "IgcDragResizeEventArguments",
        "references": {
          "IgcDragResizeEventArguments": {
            "location": "import",
            "path": "../../drag-drop/drag.service"
          }
        }
      }
    }, {
      "method": "wndResizeMove",
      "name": "wndResizeMove",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcDragResizeEventArguments",
        "resolved": "IgcDragResizeEventArguments",
        "references": {
          "IgcDragResizeEventArguments": {
            "location": "import",
            "path": "../../drag-drop/drag.service"
          }
        }
      }
    }, {
      "method": "wndResizeEnd",
      "name": "wndResizeEnd",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcDragResizeEventArguments",
        "resolved": "IgcDragResizeEventArguments",
        "references": {
          "IgcDragResizeEventArguments": {
            "location": "import",
            "path": "../../drag-drop/drag.service"
          }
        }
      }
    }]; }
  static get elementRef() { return "elem"; }
}
