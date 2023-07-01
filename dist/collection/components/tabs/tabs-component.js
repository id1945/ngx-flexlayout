import { Component, Element, Event, Host, Listen, Prop, State, Watch, forceUpdate, h } from '@stencil/core';
import { Utils } from '../../utils/utils';
import { IGC_DEFAULT_PANE_SIZE, IgcContextMenuOrientation, IgcTabHeadersPosition } from '../dockmanager/dockmanager.interfaces';
/**
 * @hidden
 */
let NEXT_TAB_ID = 0;
/**
 * @hidden
 */
export class IgcTabsComponent {
  constructor() {
    this.forcedUpdate = false;
    this.hasHiddenTabs = false;
    this.allowMaximize = true;
    this.tabHeadersPosition = IgcTabHeadersPosition.top;
    this.hasHeaders = true;
    this.showHiddenTabsMenu = true;
    this.resizeObserver = new ResizeObserver(this.tabHeadersDivResized.bind(this));
    this.slotChanged = () => {
      this.updateSelectedIndex();
      this.setTabsAttributes();
      this.forceUpdate();
    };
    this.onTabKeyDown = (ev) => {
      const tabHeaders = this.tabHeaders;
      if (Utils.isAltPressed(ev) || Utils.isControlOrMetaPressed(ev) || ev.shiftKey) {
        return;
      }
      if (ev.key === 'ArrowRight') {
        for (let i = this.selectedIndex; i < tabHeaders.length - this.hiddenTabHeaders.length - 1; i++) {
          if (!tabHeaders[i + 1].disabled) {
            this.selectedIndex = i + 1;
            tabHeaders[i + 1].focus();
            return;
          }
        }
      }
      else if (ev.key === 'ArrowLeft') {
        for (let i = this.selectedIndex; i > 0; i--) {
          if (!tabHeaders[i - 1].disabled) {
            this.selectedIndex = i - 1;
            tabHeaders[i - 1].focus();
            return;
          }
        }
      }
    };
    this.maximizeButtonClick = () => {
      this.maximize.emit();
    };
    this.handleMaximizeMinimizeFocus = () => {
      this.maximizeMinimizeFocus.emit();
    };
  }
  selectedIndexPropertyChanged(newValue) {
    this.handleSelectedIndexChanged(newValue);
    this.selectedIndexChanged.emit(newValue);
  }
  componentWillLoad() {
    this.hiddenTabsMenuMeta = null;
    this.updateSelectedIndex();
    this.checkForActivePane();
  }
  componentDidRender() {
    this.rendered.emit();
  }
  componentDidLoad() {
    this.setTabsAttributes();
    this.tabHeadersDiv = this.el.shadowRoot.querySelector('div.tabs');
    if (this.tabHeadersDiv) {
      this.resizeObserver.observe(this.tabHeadersDiv);
    }
  }
  componentDidUpdate() {
    if (this.forcedUpdate) {
      this.forcedUpdate = false;
      this.checkForActivePane();
    }
    this.setHasHiddenTabs();
  }
  setTabsAttributes() {
    const tabHeaders = this.tabHeaders;
    const tabPanels = this.tabPanels;
    for (let i = 0; i < tabHeaders.length; i++) {
      if (!tabHeaders[i].getAttribute('id')) {
        const tabHeaderId = `tab-item-${NEXT_TAB_ID}`;
        const tabPanelId = `tab-panel-${NEXT_TAB_ID++}`;
        tabPanels[i].setAttribute('id', tabPanelId);
        tabHeaders[i].setAttribute('id', tabHeaderId);
        tabPanels[i].setAttribute('aria-labelledby', tabHeaderId);
        tabHeaders[i].setAttribute('aria-controls', tabPanelId);
      }
    }
  }
  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
  forceUpdate() {
    this.forcedUpdate = true;
    forceUpdate(this);
  }
  updateSelectedIndex() {
    const tabPanels = this.tabPanels;
    if (tabPanels.length === 0) {
      return;
    }
    if (this.selectedIndex > tabPanels.length - 1) {
      this.selectedIndex = tabPanels.length - 1;
    }
    else {
      this.handleSelectedIndexChanged(this.selectedIndex);
    }
  }
  get tabPanels() {
    return Array.from(this.el.querySelectorAll('igc-tab-panel-component'));
  }
  get tabHeaders() {
    return Array.from(this.el.querySelectorAll('igc-tab-header-component'));
  }
  get hiddenTabHeaders() {
    var _a;
    const containerTop = (_a = this.tabHeaders[0]) === null || _a === void 0 ? void 0 : _a.offsetTop;
    return this.tabHeaders.filter(t => t.offsetTop !== containerTop);
  }
  handleSelectedIndexChanged(newValue) {
    const tabHeaders = this.tabHeaders;
    const tabPanels = this.tabPanels;
    tabHeaders.forEach((t, i) => {
      t.selected = i === newValue;
    });
    tabPanels.forEach((t, i) => {
      t.selected = i === newValue;
    });
  }
  handleTabMouseDown(ev) {
    const tabHeader = ev.target;
    const tabHeaders = this.tabHeaders;
    const headerIndex = tabHeaders.indexOf(tabHeader);
    if (headerIndex >= 0 && (!ev.detail.showHeaderIconOnHover || !ev.detail.isIconClicked)) {
      this.selectedIndex = headerIndex;
    }
  }
  tabHeadersDivResized() {
    var _a;
    const containerTop = (_a = this.tabHeaders[0]) === null || _a === void 0 ? void 0 : _a.offsetTop;
    const selectedTabHeader = this.tabHeaders.filter(t => t.selected)[0];
    if ((selectedTabHeader === null || selectedTabHeader === void 0 ? void 0 : selectedTabHeader.offsetTop) !== containerTop) {
      const index = this.selectedIndex;
      this.selectedTabOutOfView.emit(index);
    }
    this.setHasHiddenTabs();
  }
  setHasHiddenTabs() {
    this.hasHiddenTabs = this.hiddenTabHeaders.length > 0;
  }
  checkForActivePane() {
    const activeTabHeader = this.tabHeaders.filter(t => t.isActive);
    if (activeTabHeader.length > 0) {
      const hiddenActiveTabIndex = this.hiddenTabHeaders.indexOf(activeTabHeader[0]);
      const activeTabIndex = this.tabHeaders.indexOf(activeTabHeader[0]);
      if (hiddenActiveTabIndex >= 0) {
        this.selectedTabOutOfView.emit(activeTabIndex);
      }
      else if (activeTabIndex >= 0) {
        this.selectedIndex = activeTabIndex;
      }
    }
  }
  handleHiddenTabsMenuClick(ev) {
    const button = ev.currentTarget;
    const items = this.hiddenTabHeaders.map(header => ({
      displayText: header.header,
      disabled: header.disabled,
      iconName: null,
      clickHandler: () => {
        const index = this.tabHeaders.indexOf(header);
        this.hiddenTabSelected.emit(index);
      }
    }));
    this.hiddenTabsMenuMeta = { target: button, menuItems: items, position: 'end' };
  }
  handleContextMenuClosed() {
    this.hiddenTabsMenuMeta = null;
  }
  renderHiddenTabsMenu() {
    return this.hiddenTabsMenuMeta && (h("igc-context-menu-component", { onMenuClosed: this.handleContextMenuClosed.bind(this), orientation: this.tabHeadersPosition === IgcTabHeadersPosition.top ? IgcContextMenuOrientation.bottom : IgcContextMenuOrientation.top, items: this.hiddenTabsMenuMeta.menuItems, target: this.hiddenTabsMenuMeta.target, position: this.hiddenTabsMenuMeta.position }));
  }
  renderTabHeaders(top) {
    const classes = {
      'tabs': true,
      'tabs--top': top,
      'tabs--bottom': !top
    };
    const commontParts = { top, bottom: !top };
    const tabStripParts = Utils.partNameMap(Object.assign({ 'tab-strip-area': true }, commontParts));
    const tabStripActionsParts = Utils.partNameMap(Object.assign({ 'tab-strip-actions': true }, commontParts));
    return (h("div", { part: tabStripParts, style: {
        display: this.hasHeaders ? 'flex' : 'none'
      }, class: classes, onKeyDown: this.onTabKeyDown },
      h("div", { class: {
          'tab-headers-container': true,
          'tab-headers-container--wrapped': this.showHiddenTabsMenu
        } },
        h("slot", { name: "tabHeader" })),
      h("div", { part: tabStripActionsParts, class: "tab-header-icon-container" },
        this.showHiddenTabsMenu && this.hasHiddenTabs &&
          h("div", { onClick: this.handleHiddenTabsMenuClick.bind(this) }, this.renderMoreTabsButton()),
        !(this.showHiddenTabsMenu && this.hasHiddenTabs) &&
          h("span", { style: { width: '25px' } }),
        this.allowMaximize &&
          h("div", { onClick: this.maximizeButtonClick, onFocusin: this.handleMaximizeMinimizeFocus }, this.maximized ? this.renderMinimizeButton() : this.renderMaximizeButton()))));
  }
  renderMoreTabsButton() {
    return (h("span", null,
      h("slot", { name: "tabsMoreButton" },
        h("igc-button-component", { part: "tabs-more-button" },
          h("igc-icon-component", { name: "more", "aria-label": this.resourceStrings.moreTabs, title: this.resourceStrings.moreTabs, style: {
              display: 'block'
            } })))));
  }
  renderMaximizeButton() {
    return (h("div", null,
      h("slot", { name: "tabsMaximizeButton" },
        h("igc-button-component", { part: "tabs-maximize-button" },
          h("igc-icon-component", { name: "maximize", "aria-label": this.resourceStrings.maximize, title: this.resourceStrings.maximize })))));
  }
  renderMinimizeButton() {
    return (h("slot", { name: "tabsMinimizeButton" },
      h("igc-button-component", { part: "tabs-minimize-button" },
        h("igc-icon-component", { name: "minimize", "aria-label": this.resourceStrings.minimize, title: this.resourceStrings.minimize }))));
  }
  render() {
    const size = this.size || this.size === 0 ? this.size : IGC_DEFAULT_PANE_SIZE;
    const top = this.tabHeadersPosition === IgcTabHeadersPosition.top;
    const bottom = this.tabHeadersPosition === IgcTabHeadersPosition.bottom;
    const tabsContentParts = Utils.partNameMap({ 'tabs-content': true, document: top });
    const exportParts = Utils.partNameMap({
      'tab-strip-area': true,
      'tab-strip-actions': true,
      'tabs-content': true,
      'tabs-more-button': true,
      'tabs-maximize-button': true,
      'tabs-minimize-button': true,
      'context-menu-content: tabs-more-menu-content': true,
      'context-menu-item: tabs-more-menu-item': true,
      document: top,
      top,
      bottom
    }, ',');
    return (h(Host, { role: "tablist", style: {
        flex: `${size} 1 ${size}px`
      }, exportparts: exportParts, part: "tabs-container" },
      top && this.renderTabHeaders(top),
      h("div", { part: tabsContentParts, class: "content" },
        h("slot", { onSlotchange: this.slotChanged.bind(this) })),
      bottom && this.renderTabHeaders(top),
      this.renderHiddenTabsMenu()));
  }
  static get is() { return "igc-tabs-component"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["tabs-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["tabs-component.css"]
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
    },
    "maximized": {
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
      "attribute": "maximized",
      "reflect": false
    },
    "allowMaximize": {
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
      "attribute": "allow-maximize",
      "reflect": false,
      "defaultValue": "true"
    },
    "tabHeadersPosition": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "IgcTabHeadersPosition",
        "resolved": "IgcTabHeadersPosition.bottom | IgcTabHeadersPosition.top",
        "references": {
          "IgcTabHeadersPosition": {
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
      "attribute": "tab-headers-position",
      "reflect": false,
      "defaultValue": "IgcTabHeadersPosition.top"
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
    "hasHeaders": {
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
      "attribute": "has-headers",
      "reflect": false,
      "defaultValue": "true"
    },
    "showHiddenTabsMenu": {
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
      "attribute": "show-hidden-tabs-menu",
      "reflect": false,
      "defaultValue": "true"
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
            "path": "../dockmanager/dockmanager.public-interfaces"
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
  static get states() { return {
    "hiddenTabsMenuMeta": {},
    "hasHiddenTabs": {}
  }; }
  static get events() { return [{
      "method": "maximize",
      "name": "maximize",
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
    }, {
      "method": "maximizeMinimizeFocus",
      "name": "maximizeMinimizeFocus",
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
    }, {
      "method": "selectedIndexChanged",
      "name": "selectedIndexChanged",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }, {
      "method": "hiddenTabSelected",
      "name": "hiddenTabSelected",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }, {
      "method": "selectedTabOutOfView",
      "name": "selectedTabOutOfView",
      "bubbles": false,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }, {
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
        "original": "HTMLIgcTabsComponentElement",
        "resolved": "HTMLIgcTabsComponentElement",
        "references": {
          "HTMLIgcTabsComponentElement": {
            "location": "global"
          }
        }
      }
    }]; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "selectedIndex",
      "methodName": "selectedIndexPropertyChanged"
    }]; }
  static get listeners() { return [{
      "name": "tabMouseDown",
      "method": "handleTabMouseDown",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
