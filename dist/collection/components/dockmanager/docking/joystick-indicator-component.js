import { Component, Element, Host, Prop, h } from '@stencil/core';
import { Utils } from '../../../utils/utils';
import { IgcDockManagerPaneType, IgcDockingIndicatorPosition } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export class IgcJoystickIndicatorComponent {
  isEmptyCenter(position) {
    return this.documentOnlyDrag
      && position === IgcDockingIndicatorPosition.center
      && this.dropTargetPaneInfo.floatingPaneWithoutDocHost;
  }
  isEmptyEdge(position) {
    return this.documentOnlyDrag
      && position !== IgcDockingIndicatorPosition.center
      && this.dropTargetPaneInfo.pane.type === IgcDockManagerPaneType.documentHost;
  }
  closestElement(selector, el) {
    return ((el && el.closest(selector)) ||
      this.closestElement(selector, el.getRootNode().host));
  }
  renderIndicator(position) {
    return (h("igc-joystick-icon-component", { isDocHost: this.isDocHost, position: position, direction: Utils.getDirection(this.closestElement('ngx-flexlayout', this.element)), empty: this.isEmptyCenter(position) || this.isEmptyEdge(position) }));
  }
  render() {
    this.isDocHost = !!this.dropTargetPaneInfo.docHost;
    return (h(Host, { style: {
        top: `${this.dropTargetPaneInfo.targetRect.y}px`,
        left: `${this.dropTargetPaneInfo.targetRect.x}px`,
        width: `${this.dropTargetPaneInfo.targetRect.width}px`,
        height: `${this.dropTargetPaneInfo.targetRect.height}px`,
      } },
      h("div", { class: {
          'indicators-container': true,
          'indicators-container--doc-host': this.isDocHost
        } },
        this.isDocHost && !this.documentOnlyDrag && this.renderIndicator(IgcDockingIndicatorPosition.outerLeft),
        this.renderIndicator(IgcDockingIndicatorPosition.left),
        this.isDocHost && !this.documentOnlyDrag && this.renderIndicator(IgcDockingIndicatorPosition.outerTop),
        this.renderIndicator(IgcDockingIndicatorPosition.top),
        this.renderIndicator(IgcDockingIndicatorPosition.center),
        this.renderIndicator(IgcDockingIndicatorPosition.right),
        this.isDocHost && !this.documentOnlyDrag && this.renderIndicator(IgcDockingIndicatorPosition.outerRight),
        this.renderIndicator(IgcDockingIndicatorPosition.bottom),
        this.isDocHost && !this.documentOnlyDrag && this.renderIndicator(IgcDockingIndicatorPosition.outerBottom))));
  }
  static get is() { return "igc-joystick-indicator-component"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() { return {
    "$": ["joystick-indicator-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["joystick-indicator-component.css"]
  }; }
  static get properties() { return {
    "dropTargetPaneInfo": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IgcDropTargetPaneInfo",
        "resolved": "IgcDropTargetPaneInfo",
        "references": {
          "IgcDropTargetPaneInfo": {
            "location": "import",
            "path": "../dockmanager.interfaces"
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
    "documentOnlyDrag": {
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
      "attribute": "document-only-drag",
      "reflect": false
    }
  }; }
  static get elementRef() { return "element"; }
}
