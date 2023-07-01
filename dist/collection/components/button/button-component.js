import { Component, Host, Prop, h } from '@stencil/core';
/**
 * @hidden
 */
export class IgcButtonComponent {
  render() {
    return (h(Host, { disabled: this.disabled },
      h("button", { name: this.name, type: this.type, value: this.value, "aria-disabled": this.disabled ? 'true' : null },
        h("slot", null))));
  }
  static get is() { return "igc-button-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["button-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["button-component.css"]
  }; }
  static get properties() { return {
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
      "reflect": false
    },
    "name": {
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
      "attribute": "name",
      "reflect": true
    },
    "type": {
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
      "attribute": "type",
      "reflect": true
    },
    "value": {
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
      "attribute": "value",
      "reflect": true
    }
  }; }
}
