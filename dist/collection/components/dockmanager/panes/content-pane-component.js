import { Component, Event, Host, Prop, h } from '@stencil/core';
import { Utils } from '../../../utils/utils';
import { IGC_DEFAULT_PANE_SIZE, IGC_DEFAULT_UNPIN_PANE_SIZE } from '../dockmanager.interfaces';
/**
 * @hidden
 */
export class IgcContentPaneComponent {
  constructor() {
    this.disabled = false;
    this.isSingleFloating = false;
  }
  componentDidRender() {
    this.rendered.emit();
  }
  render() {
    const size = this.size || this.size === 0 ? this.size : IGC_DEFAULT_PANE_SIZE;
    const unpinnedSize = this.unpinnedSize ? this.unpinnedSize : IGC_DEFAULT_UNPIN_PANE_SIZE;
    const parts = Utils.partNameMap({
      'content-pane': true,
      disabled: this.disabled,
      'single-floating': this.isSingleFloating
    });
    return (h(Host, { role: "group", "aria-label": this.header, "aria-disabled": this.disabled ? 'true' : 'false', tabindex: this.disabled ? -1 : 0, style: {
        flex: this.isFlyout ? `0 1 ${unpinnedSize}px` : `${size} 1 ${size}px`
      }, part: parts },
      h("slot", { name: "header" }),
      h("slot", null)));
  }
  static get is() { return "igc-content-pane-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["content-pane-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-pane-component.css"]
  }; }
  static get properties() { return {
    "size": {
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
      "attribute": "size",
      "reflect": false
    },
    "isFlyout": {
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
      "attribute": "is-flyout",
      "reflect": false
    },
    "unpinnedSize": {
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
      "attribute": "unpinned-size",
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
    "isSingleFloating": {
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
      "attribute": "is-single-floating",
      "reflect": false,
      "defaultValue": "false"
    }
  }; }
  static get events() { return [{
      "method": "rendered",
      "name": "rendered",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "HTMLIgcContentPaneComponentElement",
        "resolved": "HTMLIgcContentPaneComponentElement",
        "references": {
          "HTMLIgcContentPaneComponentElement": {
            "location": "global"
          }
        }
      }
    }]; }
}
