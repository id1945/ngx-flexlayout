import { Component, Host, Prop, h } from '@stencil/core';
import { IGC_DEFAULT_PANE_SIZE } from '../dockmanager.interfaces';
/**
 * @hidden
 */
export class IgcDocumentHostComponent {
  render() {
    const size = this.size || this.size === 0 ? this.size : IGC_DEFAULT_PANE_SIZE;
    return (h(Host, { role: "group", style: {
        flex: `${size} 1 ${size}px`
      } }));
  }
  static get is() { return "igc-document-host-component"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["document-host-component.css"]
  }; }
  static get styleUrls() { return {
    "$": ["document-host-component.css"]
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
    }
  }; }
}
