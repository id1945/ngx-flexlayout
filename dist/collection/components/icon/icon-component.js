import { Component, Host, Prop, h } from '@stencil/core';
import { icons } from './icons';
/**
 * @hidden
 */
export class IgcIconComponent {
  render() {
    return (h(Host, { innerHTML: icons[this.name] }));
  }
  static get is() { return "igc-icon-component"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["icon-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["icon-component.css"]
  }; }
  static get properties() { return {
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
      "reflect": false
    }
  }; }
}
