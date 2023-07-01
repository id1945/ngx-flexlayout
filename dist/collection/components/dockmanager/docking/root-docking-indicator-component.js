import { Component, Host, Prop, h } from '@stencil/core';
import { IgcDockingIndicatorPosition } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export class IgcRootDockingIndicatorComponent {
  render() {
    return (h(Host, { part: "root-docking-indicator" },
      h("igc-icon-component", { name: "first_page", style: {
          transform: this.position === IgcDockingIndicatorPosition.top ? 'rotate(90deg)' :
            this.position === IgcDockingIndicatorPosition.right ? 'rotate(180deg)' :
              this.position === IgcDockingIndicatorPosition.bottom ? 'rotate(270deg)' : 'rotate(0deg)'
        } })));
  }
  static get is() { return "igc-root-docking-indicator-component"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["root-docking-indicator-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["root-docking-indicator-component.css"]
  }; }
  static get properties() { return {
    "position": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "IgcDockingIndicatorPosition",
        "resolved": "IgcDockingIndicatorPosition.bottom | IgcDockingIndicatorPosition.center | IgcDockingIndicatorPosition.left | IgcDockingIndicatorPosition.outerBottom | IgcDockingIndicatorPosition.outerLeft | IgcDockingIndicatorPosition.outerRight | IgcDockingIndicatorPosition.outerTop | IgcDockingIndicatorPosition.right | IgcDockingIndicatorPosition.top",
        "references": {
          "IgcDockingIndicatorPosition": {
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
      "attribute": "position",
      "reflect": false
    }
  }; }
}
