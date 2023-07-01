import { Component, Element, Event, Host, Prop, State, h } from '@stencil/core';
import { IgcDragService } from '../../drag-drop/drag.service';
import { IgcResizerLocation } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export class IgcResizerComponent {
  constructor() {
    this.dragStart = (args) => {
      this.resizerDragStart.emit(args);
    };
    this.dragEnd = (args) => {
      this.resizerDragEnd.emit(args);
    };
    this.dragMove = (args) => {
      this.resizerMoved.emit(args);
    };
  }
  get isCornerResizer() {
    return this.orientation === IgcResizerLocation.bottomLeft || this.orientation === IgcResizerLocation.bottomRight ||
      this.orientation === IgcResizerLocation.topLeft || this.orientation === IgcResizerLocation.topRight;
  }
  connectedCallback() {
    this.dragService = new IgcDragService(this.element);
    this.dragService.dragStart = this.dragStart;
    this.dragService.dragEnd = this.dragEnd;
    this.dragService.dragMove = this.dragMove;
  }
  disconnectedCallback() {
    this.dragService.destroy();
  }
  render() {
    return (h(Host, { style: {
        position: 'absolute',
        pointerEvents: 'all',
        height: (this.orientation === IgcResizerLocation.left || this.orientation === IgcResizerLocation.right) ?
          '100%' : this.isCornerResizer ? '10px' : '5px',
        width: (this.orientation === IgcResizerLocation.left || this.orientation === IgcResizerLocation.right) ? '5px' :
          this.isCornerResizer ? '10px' : '100%',
        cursor: this.orientation === IgcResizerLocation.left || this.orientation === IgcResizerLocation.right ?
          'ew-resize' : (this.orientation === IgcResizerLocation.bottomLeft || this.orientation === IgcResizerLocation.topRight) ?
          'ne-resize' : (this.orientation === IgcResizerLocation.bottomRight || this.orientation === IgcResizerLocation.topLeft) ?
          'nw-resize' : 'ns-resize',
        left: this.orientation === IgcResizerLocation.left || this.orientation === IgcResizerLocation.topLeft ||
          this.orientation === IgcResizerLocation.bottomLeft ? '-3px' : null,
        top: this.orientation === IgcResizerLocation.top || this.orientation === IgcResizerLocation.topLeft ||
          this.orientation === IgcResizerLocation.topRight ? '0px' : null,
        right: this.orientation === IgcResizerLocation.right || this.orientation === IgcResizerLocation.bottomRight ||
          this.orientation === IgcResizerLocation.topRight ? '-3px' : null,
        bottom: this.orientation === IgcResizerLocation.bottom || this.orientation === IgcResizerLocation.bottomRight ||
          this.orientation === IgcResizerLocation.bottomLeft ? '-3px' : null,
        zIndex: '10002'
      } }));
  }
  static get is() { return "igc-resizer-component"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["resizer-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["resizer-component.css"]
  }; }
  static get properties() { return {
    "orientation": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "IgcResizerLocation",
        "resolved": "IgcResizerLocation.bottom | IgcResizerLocation.bottomLeft | IgcResizerLocation.bottomRight | IgcResizerLocation.left | IgcResizerLocation.right | IgcResizerLocation.top | IgcResizerLocation.topLeft | IgcResizerLocation.topRight",
        "references": {
          "IgcResizerLocation": {
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
      "attribute": "orientation",
      "reflect": false
    }
  }; }
  static get states() { return {
    "dragOffsetX": {},
    "dragOffsetY": {}
  }; }
  static get events() { return [{
      "method": "resizerMoved",
      "name": "resizerMoved",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcDragMoveEventArguments",
        "resolved": "IgcDragMoveEventArguments",
        "references": {
          "IgcDragMoveEventArguments": {
            "location": "import",
            "path": "../../drag-drop/drag.service"
          }
        }
      }
    }, {
      "method": "resizerDragStart",
      "name": "resizerDragStart",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcDragStartEventArguments",
        "resolved": "IgcDragStartEventArguments",
        "references": {
          "IgcDragStartEventArguments": {
            "location": "import",
            "path": "../../drag-drop/drag.service"
          }
        }
      }
    }, {
      "method": "resizerDragEnd",
      "name": "resizerDragEnd",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcDragEventArguments",
        "resolved": "IgcDragEventArguments",
        "references": {
          "IgcDragEventArguments": {
            "location": "import",
            "path": "../../drag-drop/drag.service"
          }
        }
      }
    }]; }
  static get elementRef() { return "element"; }
}
