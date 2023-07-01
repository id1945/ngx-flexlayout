import { Component, Element, Event, Fragment, Host, Listen, Prop, h } from '@stencil/core';
import { Utils } from '../../utils/utils';
import { IgcContextMenuOrientation } from '../dockmanager/dockmanager.interfaces';
/**
 * @hidden
 */
export class IgcContextMenuComponent {
  constructor() {
    this.activeIndex = 0;
    this.handleDocumentResize = () => {
      this.menuClosed.emit();
    };
    this.handleDocumentMouseDown = (ev) => {
      if (ev.composedPath().every(el => el !== this.elem)) {
        // mousedown outside of context menu
        this.menuClosed.emit();
      }
    };
  }
  emitMenuClosed() {
    this.menuClosed.emit();
  }
  connectedCallback() {
    document.defaultView.addEventListener('resize', this.handleDocumentResize, false);
    document.defaultView.addEventListener('mousedown', this.handleDocumentMouseDown, false);
  }
  disconnectedCallback() {
    document.defaultView.removeEventListener('resize', this.handleDocumentResize, false);
    document.defaultView.removeEventListener('mousedown', this.handleDocumentMouseDown, false);
  }
  componentDidLoad() {
    const isTabsMoreButton = this.target.querySelector('slot[name="tabsMoreButton"]') !== null;
    const menuItemsDivRect = this.menuItemsDiv.getBoundingClientRect();
    const hostRect = this.elem.getBoundingClientRect();
    const rootNodeShadowHost = this.target.getRootNode();
    const rootHostRect = rootNodeShadowHost.host.getBoundingClientRect();
    const isTabs = rootNodeShadowHost.host.tagName.toLowerCase() === 'igc-tab-header-component';
    const tabsContentHost = isTabs ? rootNodeShadowHost.host.parentElement.shadowRoot : rootNodeShadowHost;
    const tabRect = tabsContentHost.host.getBoundingClientRect();
    const tabsContentRect = tabsContentHost.querySelector('div[part~="tabs-content"]').getBoundingClientRect();
    const isRTL = rootHostRect.right - menuItemsDivRect.right <= 0;
    const shouldChangeOpenOrientation = tabRect.bottom + menuItemsDivRect.bottom >= window.innerHeight
      || tabRect.height + menuItemsDivRect.bottom >= window.innerHeight
      || (isTabsMoreButton && tabsContentRect.height - menuItemsDivRect.height > 0);
    const menuToBottom = shouldChangeOpenOrientation
      ? tabsContentRect.top + (tabsContentRect.height - menuItemsDivRect.bottom)
      : rootHostRect.top - menuItemsDivRect.top + rootHostRect.height;
    const menuToTop = tabsContentRect.top - menuItemsDivRect.top;
    const menuToStart = isRTL ? rootHostRect.right - menuItemsDivRect.width : rootHostRect.left;
    const menuToEnd = isRTL ? rootHostRect.left : rootHostRect.right - menuItemsDivRect.width;
    const menuToCenter = rootHostRect.left + (rootHostRect.width - menuItemsDivRect.width) / 2;
    let menuLeft = !isRTL ? menuToStart : menuToEnd;
    let menuTop = this.orientation === IgcContextMenuOrientation.bottom
      ? isTabs
        ? menuToBottom
        : menuToTop
      : menuToBottom;
    const menuBottom = menuTop + menuItemsDivRect.height;
    menuTop = menuTop >= 0 ? menuTop : menuToBottom;
    switch (this.position) {
      case 'start':
        menuLeft = menuToStart;
        break;
      case 'center':
        menuLeft = rootHostRect.width > menuItemsDivRect.width && menuToCenter;
        break;
      case 'stretch':
        this.menuItemsDiv.style.width = rootHostRect.width > menuItemsDivRect.width && `${rootHostRect.width}px`;
        break;
      case 'end':
      default:
        menuLeft = menuToEnd;
    }
    if (this.orientation === IgcContextMenuOrientation.bottom && menuBottom > hostRect.height) {
      menuTop = menuToTop;
    }
    menuLeft = menuLeft - menuItemsDivRect.left;
    this.menuItemsDiv.style.left = `${menuLeft}px`;
    this.menuItemsDiv.style.top = `${menuTop}px`;
    this.menuItemsDiv.style.visibility = 'visible';
    this.focusItemAndSetActiveIndex();
  }
  focusItemAndSetActiveIndex() {
    var _a;
    const firstMenuItem = this.menuItemsDiv.querySelector('div[part="menu-item"]');
    (_a = firstMenuItem) === null || _a === void 0 ? void 0 : _a.focus();
  }
  handleKeyboardEvents(item, ev) {
    const menuItemChildren = this.menuItemsDiv.querySelectorAll('div[part="menu-item"]');
    if (ev.key === 'ArrowDown') {
      if (this.activeIndex < menuItemChildren.length - 1) {
        this.activeIndex++;
        menuItemChildren[this.activeIndex].focus();
      }
    }
    else if (ev.key === 'ArrowUp') {
      if (this.activeIndex > 0) {
        this.activeIndex--;
        menuItemChildren[this.activeIndex].focus();
      }
    }
    else if (ev.key === 'Enter' || ev.key === ' ') {
      item.clickHandler();
      this.emitMenuClosed();
    }
    else if (ev.key === 'Escape') {
      this.emitMenuClosed();
    }
  }
  handleMenuItemClick(item) {
    item.clickHandler();
    this.emitMenuClosed();
  }
  renderItemIcon(item) {
    return (h(Fragment, null,
      item.iconName === 'close' && this.renderCloseButton(),
      item.iconName === 'unpin' && this.renderUnpinButton(),
      item.iconName !== null && item.iconName !== 'close' && item.iconName !== 'unpin' &&
        h("igc-icon-component", { name: item.iconName })));
  }
  renderCloseButton() {
    return (h("slot", { name: "contextMenuCloseButton" },
      h("igc-icon-component", { part: "context-menu-close-button", name: "close" })));
  }
  renderUnpinButton() {
    return (h("slot", { name: "contextMenuUnpinButton" },
      h("igc-icon-component", { part: "context-menu-unpin-button", name: "unpin" })));
  }
  render() {
    return (h(Host, { part: "context-menu", exportparts: "context-menu,\r\n        menu-item: context-menu-item,\r\n        menu-content: context-menu-content,\r\n        context-menu-close-button,\r\n        context-menu-unpin-button" },
      h("div", { role: "menu", part: "menu-content", ref: el => this.menuItemsDiv = el, onMouseDown: ev => {
          ev.preventDefault();
        } }, this.items.map(item => {
        const parts = Utils.partNameMap({
          'menu-item': true,
          disabled: item.disabled
        });
        return (h("div", { role: "menuitem", part: parts, tabindex: "-1", onKeyDown: this.handleKeyboardEvents.bind(this, item), onClick: this.handleMenuItemClick.bind(this, item) },
          h("span", { style: {
              flexGrow: '1',
              userSelect: 'none',
            } }, item.displayText),
          this.renderItemIcon(item)));
      }))));
  }
  static get is() { return "igc-context-menu-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["context-menu-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["context-menu-component.css"]
  }; }
  static get properties() { return {
    "orientation": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "IgcContextMenuOrientation",
        "resolved": "IgcContextMenuOrientation.bottom | IgcContextMenuOrientation.top",
        "references": {
          "IgcContextMenuOrientation": {
            "location": "import",
            "path": "../dockmanager/dockmanager.interfaces"
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
    "position": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "IgcContextMenuPosition",
        "resolved": "\"center\" | \"end\" | \"start\" | \"stretch\"",
        "references": {
          "IgcContextMenuPosition": {
            "location": "import",
            "path": "../dockmanager/dockmanager.interfaces"
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
    "target": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "HTMLElement",
        "resolved": "HTMLElement",
        "references": {
          "HTMLElement": {
            "location": "global"
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
    "items": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IgcContextMenuItem[]",
        "resolved": "IgcContextMenuItem[]",
        "references": {
          "IgcContextMenuItem": {
            "location": "import",
            "path": "../dockmanager/dockmanager.interfaces"
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
    "activeIndex": {
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
      "attribute": "active-index",
      "reflect": false,
      "defaultValue": "0"
    }
  }; }
  static get events() { return [{
      "method": "menuClosed",
      "name": "menuClosed",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "elem"; }
  static get listeners() { return [{
      "name": "focusout",
      "method": "emitMenuClosed",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
