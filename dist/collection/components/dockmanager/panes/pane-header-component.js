import { Component, Element, Event, Fragment, Host, Prop, Watch, h } from '@stencil/core';
import { Utils } from '../../../utils/utils';
import { IGNORE_DRAG, IgcDragService } from '../../drag-drop/drag.service';
/**
 * @hidden
 */
export class IgcPaneHeaderComponent {
  constructor() {
    this.allowClose = true;
    this.allowMaximize = true;
    this.allowPinning = true;
    this.disabled = false;
    this.pinButtonClick = () => {
      this.pinToggle.emit();
    };
    this.maximizeButtonClick = () => {
      this.maximize.emit();
    };
    this.closeButtonClick = () => {
      this.close.emit();
    };
  }
  connectedCallback() {
    this.dragService = new IgcDragService(this.element);
    this.dragService.dragEdgeTolerance = 3;
    this.dragService.dragStart = args => {
      this.dragStarted.emit(args);
    };
    this.dragService.dragEnd = args => {
      this.dragEnded.emit(args);
    };
    this.dragService.dragMove = args => {
      this.dragMoved.emit(args);
    };
    this.forceDragging();
    this.elementConnected.emit(this.element);
  }
  disconnectedCallback() {
    if (this.dragService) {
      this.dragService.destroy();
    }
    this.elementDisconnected.emit(this.element);
  }
  forcedDragChanged() {
    this.forceDragging();
  }
  forceDragging() {
    if (this.forcedDrag) {
      this.dragService.forceDragging();
    }
  }
  renderCloseButton() {
    return (h("slot", { name: "paneHeaderCloseButton" },
      h("igc-button-component", { part: "pane-header-close-button" },
        h("igc-icon-component", { name: "close", "aria-label": this.resourceStrings.close, title: this.resourceStrings.close }))));
  }
  renderMaximizeButton() {
    return (h("slot", { name: "paneHeaderMaximizeButton" },
      h("igc-button-component", { part: "pane-header-maximize-button" },
        h("igc-icon-component", { name: "maximize", "aria-label": this.resourceStrings.maximize, title: this.resourceStrings.maximize }))));
  }
  renderMinimizeButton() {
    return (h("div", null,
      h("slot", { name: "paneHeaderMinimizeButton" },
        h("igc-button-component", { part: "pane-header-minimize-button" },
          h("igc-icon-component", { name: "minimize", "aria-label": this.resourceStrings.minimize, title: this.resourceStrings.minimize })))));
  }
  renderPinButton() {
    return (h(Fragment, null, !this.isFloating && h("slot", { name: "paneHeaderPinButton" },
      h("igc-button-component", { part: "pane-header-pin-button", style: { display: this.isFloating ? 'none' : 'flex' } },
        h("igc-icon-component", { name: "pin", "aria-label": this.resourceStrings.pin, title: this.resourceStrings.pin })),
      " ")));
  }
  renderUnpinButton() {
    return (h(Fragment, null, !this.isFloating && h("slot", { name: "paneHeaderUnpinButton" },
      h("igc-button-component", { part: "pane-header-unpin-button", style: { display: this.isFloating ? 'none' : 'flex' } },
        h("igc-icon-component", { name: "unpin", "aria-label": this.resourceStrings.unpin, title: this.resourceStrings.unpin })))));
  }
  render() {
    const commonParts = {
      active: this.isActive,
      disabled: this.disabled,
      floating: this.isFloating,
      window: this.isFloatingPaneHeader,
    };
    const paneHeaderParts = Utils.partNameMap(Object.assign({ 'pane-header': true }, commonParts));
    const paneHeaderContentParts = Utils.partNameMap(Object.assign({ 'pane-header-content': true }, commonParts));
    const paneHeaderActionsParts = Utils.partNameMap(Object.assign({ 'pane-header-actions': true }, commonParts));
    const exportParts = Utils.partNameMap(Object.assign({ 'pane-header': true, 'pane-header-actions': true, 'pane-header-content': true, 'pane-header-close-button': true, 'pane-header-maximize-button': true, 'pane-header-minimize-button': true, 'pane-header-pin-button': true, 'pane-header-unpin-button': true }, commonParts), ',');
    return (h(Host, { part: paneHeaderParts, exportparts: exportParts },
      h("div", { part: paneHeaderContentParts, class: "header-text" },
        h("slot", null)),
      h("div", Object.assign({ part: paneHeaderActionsParts, class: "header-actions" }, { [IGNORE_DRAG]: true }),
        this.allowPinning &&
          h("div", { onClick: this.pinButtonClick }, this.pinned ? this.renderUnpinButton() : this.renderPinButton()),
        this.allowMaximize &&
          h("div", { onClick: this.maximizeButtonClick }, this.maximized ? this.renderMinimizeButton() : this.renderMaximizeButton()),
        this.allowClose &&
          h("div", { onClick: this.closeButtonClick }, this.renderCloseButton()))));
  }
  static get is() { return "igc-pane-header-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["pane-header-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["pane-header-component.css"]
  }; }
  static get properties() { return {
    "dragService": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "IgcDragService",
        "resolved": "IgcDragService",
        "references": {
          "IgcDragService": {
            "location": "import",
            "path": "../../drag-drop/drag.service"
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
    "pinned": {
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
      "attribute": "pinned",
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
    "isFloating": {
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
      "attribute": "is-floating",
      "reflect": false
    },
    "forcedDrag": {
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
      "attribute": "forced-drag",
      "reflect": false
    },
    "isFloatingPaneHeader": {
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
      "attribute": "is-floating-pane-header",
      "reflect": false
    },
    "allowClose": {
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
      "attribute": "allow-close",
      "reflect": false,
      "defaultValue": "true"
    },
    "allowMaximize": {
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
      "attribute": "allow-maximize",
      "reflect": false,
      "defaultValue": "true"
    },
    "allowPinning": {
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
      "attribute": "allow-pinning",
      "reflect": false,
      "defaultValue": "true"
    },
    "pane": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IgcContentPane",
        "resolved": "IgcContentPane",
        "references": {
          "IgcContentPane": {
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
    "isActive": {
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
      "attribute": "is-active",
      "reflect": false
    },
    "disabled": {
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
      "attribute": "disabled",
      "reflect": false,
      "defaultValue": "false"
    },
    "resourceStrings": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IgcDockManagerResourceStrings",
        "resolved": "IgcDockManagerResourceStrings",
        "references": {
          "IgcDockManagerResourceStrings": {
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
    }
  }; }
  static get events() { return [{
      "method": "pinToggle",
      "name": "pinToggle",
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
      "method": "maximize",
      "name": "maximize",
      "bubbles": false,
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
      "method": "close",
      "name": "close",
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
      "method": "dragStarted",
      "name": "dragStarted",
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
      "method": "dragEnded",
      "name": "dragEnded",
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
    }, {
      "method": "dragMoved",
      "name": "dragMoved",
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
      "method": "elementConnected",
      "name": "elementConnected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "HTMLIgcPaneHeaderComponentElement",
        "resolved": "HTMLIgcPaneHeaderComponentElement",
        "references": {
          "HTMLIgcPaneHeaderComponentElement": {
            "location": "global"
          }
        }
      }
    }, {
      "method": "elementDisconnected",
      "name": "elementDisconnected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "HTMLIgcPaneHeaderComponentElement",
        "resolved": "HTMLIgcPaneHeaderComponentElement",
        "references": {
          "HTMLIgcPaneHeaderComponentElement": {
            "location": "global"
          }
        }
      }
    }]; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "forcedDrag",
      "methodName": "forcedDragChanged"
    }]; }
}
