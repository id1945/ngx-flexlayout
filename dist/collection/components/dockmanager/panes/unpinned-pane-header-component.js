import { Component, Host, Prop, h } from '@stencil/core';
import { Utils } from '../../../utils/utils';
import { IgcUnpinnedLocation } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export class IgcUnpinnedPaneHeaderComponent {
  constructor() {
    this.disabled = false;
  }
  render() {
    const isHorizontal = this.location === IgcUnpinnedLocation.top || this.location === IgcUnpinnedLocation.bottom;
    const isLeft = this.location === IgcUnpinnedLocation.left;
    const isRight = this.location === IgcUnpinnedLocation.right;
    const isTop = this.location === IgcUnpinnedLocation.top;
    const isBottom = this.location === IgcUnpinnedLocation.bottom;
    const parts = Utils.partNameMap({
      'unpinned-pane-header': true,
      horizontal: isHorizontal,
      vertical: !isHorizontal,
      start: isLeft || isTop,
      end: isRight || isBottom,
      active: this.isActive,
      disabled: this.disabled,
    });
    return (h(Host, { part: parts, role: "tab", "aria-disabled": this.disabled ? 'true' : 'false', tabindex: this.disabled ? -1 : 0 },
      h("slot", null)));
  }
  static get is() { return "igc-unpinned-pane-header-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["unpinned-pane-header-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["unpinned-pane-header-component.css"]
  }; }
  static get properties() { return {
    "location": {
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
      "attribute": "location",
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
    }
  }; }
}
