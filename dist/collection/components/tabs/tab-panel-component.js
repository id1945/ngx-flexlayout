import { Component, Element, Event, Host, Prop, Watch, h } from '@stencil/core';
import { Utils } from '../../utils/utils';
/**
 * @hidden
 */
export class IgcTabPanelComponent {
  constructor() {
    this.emitSelectedChanged = false;
    this.selected = false;
    this.disabled = false;
  }
  selectedPropChange() {
    this.emitSelectedChanged = true;
  }
  componentDidUpdate() {
    if (this.emitSelectedChanged) {
      this.emitSelectedChanged = false;
      this.selectedChanged.emit(this.selected);
    }
  }
  render() {
    const parts = Utils.partNameMap({
      'tab-panel': true,
      selected: this.selected,
      disabled: this.disabled
    });
    return (h(Host, { role: "tabpanel", part: parts, style: {
        display: this.selected ? 'block' : 'none'
      } },
      h("slot", null)));
  }
  static get is() { return "igc-tab-panel-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["tab-panel-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["tab-panel-component.css"]
  }; }
  static get properties() { return {
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
  static get events() { return [{
      "method": "selectedChanged",
      "name": "selectedChanged",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      }
    }]; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "selected",
      "methodName": "selectedPropChange"
    }]; }
}
