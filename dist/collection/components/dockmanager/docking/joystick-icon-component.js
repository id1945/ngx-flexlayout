import { Component, Host, Prop, h } from '@stencil/core';
import { IgcDockingIndicatorPosition } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export class IgcJoystickIconComponent {
  resolveIconDivClass() {
    let positionClass;
    switch (this.position) {
      case IgcDockingIndicatorPosition.outerTop:
        positionClass = 'outer-top';
        break;
      case IgcDockingIndicatorPosition.outerBottom:
        positionClass = 'outer-bottom';
        break;
      case IgcDockingIndicatorPosition.outerLeft:
        positionClass = 'outer-start';
        break;
      case IgcDockingIndicatorPosition.outerRight:
        positionClass = 'outer-end';
        break;
      case IgcDockingIndicatorPosition.top:
        positionClass = 'inner-top';
        break;
      case IgcDockingIndicatorPosition.bottom:
        positionClass = 'inner-bottom';
        break;
      case IgcDockingIndicatorPosition.left:
        positionClass = 'inner-start';
        break;
      case IgcDockingIndicatorPosition.right:
        positionClass = 'inner-end';
        break;
      case IgcDockingIndicatorPosition.center:
        positionClass = 'inner-center';
        break;
    }
    const classes = {};
    if (positionClass) {
      classes[positionClass] = true;
    }
    return classes;
  }
  resolveMargin() {
    switch (this.position) {
      case IgcDockingIndicatorPosition.outerTop:
        return '0px 0px 10px 0px';
      case IgcDockingIndicatorPosition.outerRight:
        return '0px 0px 0px 10px';
      case IgcDockingIndicatorPosition.outerLeft:
        return '0px 10px 0px 0px';
      case IgcDockingIndicatorPosition.outerBottom:
        return '10px 0px 0px 0px';
      default:
        return '0px';
    }
  }
  resolveGridRow() {
    switch (this.position) {
      case IgcDockingIndicatorPosition.outerTop:
        return '1';
      case IgcDockingIndicatorPosition.top:
        return this.isDocHost ? '2' : '1';
      case IgcDockingIndicatorPosition.center:
        return this.isDocHost ? '3' : '2';
      case IgcDockingIndicatorPosition.outerRight:
      case IgcDockingIndicatorPosition.outerLeft:
        return '3';
      case IgcDockingIndicatorPosition.right:
      case IgcDockingIndicatorPosition.left:
        return this.isDocHost ? '3' : '2';
      case IgcDockingIndicatorPosition.outerBottom:
        return '5';
      case IgcDockingIndicatorPosition.bottom:
        return this.isDocHost ? '4' : '3';
    }
  }
  resolveGridColumn() {
    switch (this.position) {
      case IgcDockingIndicatorPosition.outerLeft:
        return this.direction !== 'rtl' ? '1' : '5';
      case IgcDockingIndicatorPosition.left:
        if (this.direction !== 'rtl') {
          return this.isDocHost ? '2' : '1';
        }
        else {
          return this.isDocHost ? '4' : '3';
        }
      case IgcDockingIndicatorPosition.center:
        return this.isDocHost ? '3' : '2';
      case IgcDockingIndicatorPosition.outerTop:
      case IgcDockingIndicatorPosition.outerBottom:
        return '3';
      case IgcDockingIndicatorPosition.top:
      case IgcDockingIndicatorPosition.bottom:
        return this.isDocHost ? '3' : '2';
      case IgcDockingIndicatorPosition.outerRight:
        return this.direction !== 'rtl' ? '5' : '1';
      case IgcDockingIndicatorPosition.right:
        if (this.direction !== 'rtl') {
          return this.isDocHost ? '4' : '3';
        }
        else {
          return this.isDocHost ? '2' : '1';
        }
    }
  }
  renderIcon() {
    const position = this.position;
    if (position === IgcDockingIndicatorPosition.outerLeft ||
      (position === IgcDockingIndicatorPosition.left && !this.isDocHost)) {
      return h("igc-icon-component", { name: "chevron_left" });
    }
    else if (position === IgcDockingIndicatorPosition.left) {
      return (h("igc-icon-component", { name: "flip", style: { transform: 'rotate(180deg)' } }));
    }
    else if (position === IgcDockingIndicatorPosition.outerTop ||
      (position === IgcDockingIndicatorPosition.top && !this.isDocHost)) {
      return (h("igc-icon-component", { name: "chevron_left", style: { transform: 'rotate(90deg)' } }));
    }
    else if (position === IgcDockingIndicatorPosition.top) {
      return (h("igc-icon-component", { name: "flip", style: { transform: 'rotate(270deg)' } }));
    }
    else if (position === IgcDockingIndicatorPosition.center) {
      return h("igc-icon-component", { name: "crop_square" });
    }
    else if (position === IgcDockingIndicatorPosition.outerRight ||
      (position === IgcDockingIndicatorPosition.right && !this.isDocHost)) {
      return (h("igc-icon-component", { name: "chevron_left", style: { transform: 'rotate(180deg)' } }));
    }
    else if (position === IgcDockingIndicatorPosition.right) {
      return h("igc-icon-component", { name: "flip" });
    }
    else if (position === IgcDockingIndicatorPosition.outerBottom ||
      (position === IgcDockingIndicatorPosition.bottom && !this.isDocHost)) {
      return (h("igc-icon-component", { name: "chevron_left", style: { transform: 'rotate(270deg)' } }));
    }
    else if (position === IgcDockingIndicatorPosition.bottom) {
      return (h("igc-icon-component", { name: "flip", style: { transform: 'rotate(90deg)' } }));
    }
  }
  render() {
    return (h(Host, { part: "docking-indicator", class: this.resolveIconDivClass(), style: {
        gridRow: this.resolveGridRow(),
        gridColumn: this.resolveGridColumn(),
        margin: this.resolveMargin()
      } }, !this.empty && this.renderIcon()));
  }
  static get is() { return "igc-joystick-icon-component"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["joystick-icon-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["joystick-icon-component.css"]
  }; }
  static get properties() { return {
    "isDocHost": {
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
      "attribute": "is-doc-host",
      "reflect": false
    },
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
    },
    "direction": {
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
      "attribute": "direction",
      "reflect": false
    },
    "empty": {
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
      "attribute": "empty",
      "reflect": false
    }
  }; }
}
