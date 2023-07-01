import { Component, Element, Event, Host, Listen, Prop, Watch, h } from '@stencil/core';
import { Utils } from '../../utils/utils';
import { IgcTabHeadersPosition } from '../dockmanager/dockmanager.interfaces';
import { IGNORE_DRAG, IgcDragService } from '../drag-drop/drag.service';
/**
 * @hidden
 */
export class IgcTabHeaderComponent {
  constructor() {
    this.selected = false;
    this.hovered = false;
    this.position = IgcTabHeadersPosition.top;
    this.disabled = false;
    this.iconClick = (ev) => {
      this.iconClicked.emit(ev);
    };
    this.keyDown = (ev) => {
      this.iconKeyDown.emit(ev);
    };
  }
  connectedCallback() {
    this.dragService = new IgcDragService(this.element);
    this.dragService.dragStart = args => {
      this.dragStarted.emit(args);
    };
    this.dragService.dragMove = args => {
      this.dragMoved.emit(args);
    };
    this.dragService.dragEnd = args => {
      this.dragEnded.emit(args);
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
  handleMouseDown(ev) {
    const iconSlot = this.element.shadowRoot.querySelector('div[part*="tab-header-more-options"]');
    const isIconClicked = ev.composedPath().filter(p => p === iconSlot).length > 0;
    this.tabMouseDown.emit({ showHeaderIconOnHover: this.showHeaderIconOnHover, isIconClicked });
  }
  handleMouseEnter() {
    this.hovered = true;
  }
  handleMouseLeave() {
    this.hovered = false;
  }
  forcedDragChanged() {
    this.forceDragging();
  }
  forceDragging() {
    if (this.forcedDrag) {
      this.dragService.forceDragging();
    }
  }
  activeChanged() {
    const queryButton = 'tab-header-close-button';
    const button = this.element.querySelector(`[part^=${queryButton}]`);
    const parts = Utils.partNameMap({
      [queryButton]: true,
      active: this.isActive,
      selected: this.selected,
      hovered: this.hovered
    });
    button === null || button === void 0 ? void 0 : button.setAttribute('part', parts);
  }
  renderCloseButton() {
    const showHeaderIconOnHover = this.showHeaderIconOnHover && (this.showHeaderIconOnHover === 'closeOnly' || this.showHeaderIconOnHover === 'all');
    const shouldShowButton = this.selected || showHeaderIconOnHover;
    const pointerEvents = (this.selected && !this.disabled) || this.showHeaderIconOnHover ? 'all' : 'none';
    return (shouldShowButton && h("slot", { name: "tabHeaderCloseButton" },
      h("igc-button-component", { part: "tab-header-close-button", style: {
          pointerEvents
        } },
        h("igc-icon-component", { name: this.iconName, "aria-label": this.resourceStrings.close, title: this.resourceStrings.close }))));
  }
  renderMoreOptionsButton() {
    const showHeaderIconOnHover = this.showHeaderIconOnHover && (this.showHeaderIconOnHover === 'moreOptionsOnly' || this.showHeaderIconOnHover === 'all');
    const shouldShowButton = this.selected || showHeaderIconOnHover;
    const pointerEvents = (this.selected && !this.disabled) || this.showHeaderIconOnHover ? 'all' : 'none';
    return (shouldShowButton && h("slot", { name: "tabHeaderMoreOptionsButton" },
      h("igc-button-component", { part: "tab-header-more-options-button", style: {
          pointerEvents
        } },
        h("igc-icon-component", { name: this.iconName, "aria-label": this.resourceStrings.moreOptions, title: this.resourceStrings.moreOptions }))));
  }
  render() {
    const showCloseOnHover = this.iconName === 'close' && this.showHeaderIconOnHover && (this.showHeaderIconOnHover === 'closeOnly' || this.showHeaderIconOnHover === 'all');
    const showMoreOptionsOnHover = this.iconName !== 'close' && this.showHeaderIconOnHover && (this.showHeaderIconOnHover === 'moreOptionsOnly' || this.showHeaderIconOnHover === 'all');
    const parts = Utils.partNameMap({
      'tab-header': true,
      top: this.position === IgcTabHeadersPosition.top,
      active: this.isActive,
      selected: this.selected,
      disabled: this.disabled,
      'hover-preview-close': showCloseOnHover,
      'hover-preview-options': showMoreOptionsOnHover,
      bottom: this.position === IgcTabHeadersPosition.bottom,
    });
    const tabParts = Utils.partNameMap({
      'tab-header-more-options': true,
      'floating': !this.selected && (showCloseOnHover || showMoreOptionsOnHover),
      'selected': this.selected
    });
    const exportparts = Utils.partNameMap({
      'tab-header-close-button': true,
      'tab-header-more-options': true,
      'tab-header-more-options-button': true,
      'floating': true,
      'selected': true,
      'active': true
    }, ',');
    return (h(Host, { role: "tab", part: parts, exportparts: exportparts, "aria-label": this.header, "aria-selected": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : 'false', tabIndex: !this.selected || this.disabled ? -1 : 0 },
      h("slot", null),
      this.iconName &&
        h("div", Object.assign({ part: tabParts, onClick: this.iconClick, onKeyDown: this.keyDown }, { [IGNORE_DRAG]: true }), this.iconName === 'close' ? this.renderCloseButton() : this.renderMoreOptionsButton())));
  }
  static get is() { return "igc-tab-header-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["tab-header-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["tab-header-component.css"]
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
            "path": "../drag-drop/drag.service"
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
    "selected": {
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
      "attribute": "selected",
      "reflect": false,
      "defaultValue": "false"
    },
    "hovered": {
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
      "attribute": "hovered",
      "reflect": false,
      "defaultValue": "false"
    },
    "position": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "IgcTabHeadersPosition",
        "resolved": "IgcTabHeadersPosition.bottom | IgcTabHeadersPosition.top",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "position",
      "reflect": false,
      "defaultValue": "IgcTabHeadersPosition.top"
    },
    "iconName": {
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
      "attribute": "icon-name",
      "reflect": false
    },
    "header": {
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
      "attribute": "header",
      "reflect": false
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
    "resourceStrings": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IgcDockManagerResourceStrings",
        "resolved": "IgcDockManagerResourceStrings",
        "references": {
          "IgcDockManagerResourceStrings": {
            "location": "import",
            "path": "../dockmanager/dockmanager.public-interfaces"
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
    "showHeaderIconOnHover": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'closeOnly' | 'moreOptionsOnly' | 'all'",
        "resolved": "\"all\" | \"closeOnly\" | \"moreOptionsOnly\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "show-header-icon-on-hover",
      "reflect": false
    }
  }; }
  static get events() { return [{
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
            "path": "../drag-drop/drag.service"
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
            "path": "../drag-drop/drag.service"
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
            "path": "../drag-drop/drag.service"
          }
        }
      }
    }, {
      "method": "tabMouseDown",
      "name": "tabMouseDown",
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
      "method": "iconClicked",
      "name": "iconClicked",
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
      "method": "iconKeyDown",
      "name": "iconKeyDown",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "KeyboardEvent",
        "resolved": "KeyboardEvent",
        "references": {
          "KeyboardEvent": {
            "location": "global"
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
        "original": "HTMLIgcTabHeaderComponentElement",
        "resolved": "HTMLIgcTabHeaderComponentElement",
        "references": {
          "HTMLIgcTabHeaderComponentElement": {
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
        "original": "HTMLIgcTabHeaderComponentElement",
        "resolved": "HTMLIgcTabHeaderComponentElement",
        "references": {
          "HTMLIgcTabHeaderComponentElement": {
            "location": "global"
          }
        }
      }
    }]; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "forcedDrag",
      "methodName": "forcedDragChanged"
    }, {
      "propName": "isActive",
      "methodName": "activeChanged"
    }, {
      "propName": "selected",
      "methodName": "activeChanged"
    }, {
      "propName": "hovered",
      "methodName": "activeChanged"
    }]; }
  static get listeners() { return [{
      "name": "mousedown",
      "method": "handleMouseDown",
      "target": undefined,
      "capture": false,
      "passive": true
    }, {
      "name": "mouseenter",
      "method": "handleMouseEnter",
      "target": undefined,
      "capture": false,
      "passive": true
    }, {
      "name": "mouseleave",
      "method": "handleMouseLeave",
      "target": undefined,
      "capture": false,
      "passive": true
    }]; }
}
