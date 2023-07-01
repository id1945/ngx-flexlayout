import { Component, Event, Host, Listen, Prop, h } from '@stencil/core';
import { Utils } from '../../../utils/utils';
/**
 * @hidden
 */
export class IgcPaneNavigatorComponent {
  scrollItemToView() {
    const selectedItem = this.allItemsElement[this.selectedIndex];
    const selectedItemRect = selectedItem.getBoundingClientRect();
    const itemsContainerRect = selectedItem.parentElement.getBoundingClientRect();
    if (selectedItemRect.top < itemsContainerRect.top) {
      this.allItemsElement[this.selectedIndex].parentElement.scrollTop -= itemsContainerRect.top - selectedItemRect.top;
    }
    if (selectedItemRect.bottom > itemsContainerRect.bottom) {
      this.allItemsElement[this.selectedIndex].parentElement.scrollTop += selectedItemRect.bottom - itemsContainerRect.bottom;
    }
  }
  handleKeyUp(event) {
    if (event.code === 'AltLeft' || event.code === 'AltRight' || event.key === 'Control' || event.key === 'OS' || event.key === 'Meta') {
      this.closed.emit(this.allItems[this.selectedIndex]);
    }
  }
  handleKeydown(event) {
    event.stopPropagation();
    const isShiftPressed = event.shiftKey;
    let index;
    if (Utils.isControlOrMetaPressed(event) && !event.altKey) {
      switch (event.key) {
        case 'ArrowUp':
          this.decreaseSelectedIndex();
          break;
        case 'ArrowDown':
          this.increaseSelectedIndex();
          break;
        case 'ArrowRight':
        case 'ArrowLeft': {
          if (this.activePanes.length === 0 || this.activeDocuments.length === 0) {
            return;
          }
          if (this.selectedIndex >= 0 && this.selectedIndex < this.activePanes.length) {
            index = this.selectedIndex + this.activePanes.length;
            this.navigateToIndex(index >= this.allItems.length ? this.allItems.length - 1 : index, 'next');
          }
          else if (this.selectedIndex >= this.activePanes.length && this.selectedIndex < this.allItems.length) {
            index = this.selectedIndex - this.activePanes.length;
            this.navigateToIndex(index > this.activePanes.length - 1 ? this.activePanes.length - 1 : index, 'previous');
          }
        }
      }
    }
    if (event.key === 'F7' || event.key === 'F8') {
      if (isShiftPressed) {
        this.decreaseSelectedIndex();
      }
      else {
        this.increaseSelectedIndex();
      }
    }
    this.scrollItemToView();
  }
  navigateToIndex(index, direction) {
    if (index === -1) {
      index = this.allItems.length - 1;
    }
    else if (index === this.allItems.length) {
      index = 0;
    }
    let counter = 0;
    while (this.allItems[index].disabled && counter <= this.allItems.length) {
      counter++;
      index = index + (direction === 'next' ? 1 : -1);
      if (index === -1) {
        index = this.allItems.length - 1;
      }
      else if (index === this.allItems.length) {
        index = 0;
      }
    }
    this.selectedIndex = index;
  }
  increaseSelectedIndex(amount = 1) {
    const newValue = this.selectedIndex + amount;
    this.navigateToIndex(newValue, 'next');
  }
  decreaseSelectedIndex(amount = 1) {
    const newValue = this.selectedIndex - amount;
    this.navigateToIndex(newValue, 'previous');
  }
  connectedCallback() {
    this.allItems = [...this.activePanes, ...this.activeDocuments];
  }
  componentDidLoad() {
    this.paneNav.focus();
    this.allItemsElement = Array.from(this.paneNav.querySelectorAll('[part~=item]'));
    this.navigateToIndex(this.selectedIndex, 'next');
    this.scrollItemToView();
  }
  resolveItemPart(item, index, isDocHost) {
    const part = Utils.partNameMap({
      item: true,
      selected: isDocHost ? index === this.selectedIndex - this.activePanes.length : index === this.selectedIndex,
      disabled: item.disabled
    });
    return part;
  }
  selectItem(index, isDocHost) {
    this.selectedIndex = !isDocHost ? index : this.activePanes.length + index;
  }
  renderItems(title, items, isDocHost) {
    return (h("article", { part: "group", class: "group" },
      h("h4", { part: "title", class: "title" }, title),
      h("section", { class: "items" }, items === null || items === void 0 ? void 0 : items.map((item, index) => {
        return (h("div", { part: this.resolveItemPart(item, index, isDocHost), onMouseDown: () => this.selectItem(index, isDocHost), onMouseUp: () => this.closed.emit(this.allItems[this.selectedIndex]) }, item.header));
      }))));
  }
  render() {
    var _a;
    return (h(Host, { onClick: () => this.closed.emit(this.allItems[this.previousActivePaneIndex]), exportparts: "base: pane-navigator, header: pane-navigator-header, body: pane-navigator-body,\r\n                     group: pane-navigator-items-group, title: pane-navigator-items-group-title, item: pane-navigator-item, selected, disabled" },
      h("article", { part: "base", class: "pane-navigator", ref: el => this.paneNav = el, tabIndex: 0, onClick: ev => ev.stopPropagation() },
        h("header", { part: "header" },
          h("h3", null, (_a = this.allItems[this.selectedIndex]) === null || _a === void 0 ? void 0 : _a.header)),
        h("section", { part: "body", class: "body" },
          this.renderItems(this.resourceStrings.panes, this.activePanes, false),
          this.renderItems(this.resourceStrings.documents, this.activeDocuments, true)))));
  }
  static get is() { return "igc-pane-navigator-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["pane-navigator-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["pane-navigator-component.css"]
  }; }
  static get properties() { return {
    "activeDocuments": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IgcContentPane[]",
        "resolved": "IgcContentPane[]",
        "references": {
          "IgcContentPane": {
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
      }
    },
    "activePanes": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IgcContentPane[]",
        "resolved": "IgcContentPane[]",
        "references": {
          "IgcContentPane": {
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
      }
    },
    "selectedIndex": {
      "type": "number",
      "mutable": true,
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
      "attribute": "selected-index",
      "reflect": false
    },
    "previousActivePaneIndex": {
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
      "attribute": "previous-active-pane-index",
      "reflect": false
    },
    "resourceStrings": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IgcDockManagerResourceStrings",
        "resolved": "IgcDockManagerResourceStrings",
        "references": {
          "IgcDockManagerResourceStrings": {
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
      }
    }
  }; }
  static get events() { return [{
      "method": "closed",
      "name": "closed",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcContentPane",
        "resolved": "IgcContentPane",
        "references": {
          "IgcContentPane": {
            "location": "import",
            "path": "../dockmanager.public-interfaces"
          }
        }
      }
    }]; }
  static get listeners() { return [{
      "name": "keyup",
      "method": "handleKeyUp",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "keydown",
      "method": "handleKeydown",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
