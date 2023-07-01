import { Component, Event, Host, Prop, h } from '@stencil/core';
import { IGC_DEFAULT_PANE_SIZE } from '../dockmanager.interfaces';
import { IgcSplitPaneOrientation } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export class IgcSplitPaneComponent {
  componentDidRender() {
    this.rendered.emit();
  }
  render() {
    const size = this.size || this.size === 0 ? this.size : IGC_DEFAULT_PANE_SIZE;
    return (h(Host, { role: "group", style: {
        flexDirection: this.orientation === IgcSplitPaneOrientation.horizontal ? 'row' : 'column',
        flex: `${size} 1 ${size}px`
      }, part: "split-pane" }));
  }
  static get is() { return "igc-split-pane-component"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["split-pane-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["split-pane-component.css"]
  }; }
  static get properties() { return {
    "orientation": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "IgcSplitPaneOrientation",
        "resolved": "IgcSplitPaneOrientation.horizontal | IgcSplitPaneOrientation.vertical",
        "references": {
          "IgcSplitPaneOrientation": {
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
    },
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
        "original": "HTMLIgcSplitPaneComponentElement",
        "resolved": "HTMLIgcSplitPaneComponentElement",
        "references": {
          "HTMLIgcSplitPaneComponentElement": {
            "location": "global"
          }
        }
      }
    }]; }
}
