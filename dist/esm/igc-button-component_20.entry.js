import { r as registerInstance, h, H as Host, c as createEvent, F as Fragment, g as getElement, f as forceUpdate } from './index-cbe7fc41.js';
import { h as IgcDockingIndicatorPosition, f as IgcSplitPaneOrientation, e as IgcDockManagerPaneType, g as IgcUnpinnedLocation, i as IgcPaneDragActionType, k as IgcResizerLocation, r as resourceStringsMap, d as addResourceStrings } from './locale-7d22d721.js';

const buttonComponentCss = "button{position:static;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;height:100%;min-width:10px;padding:2px 4px;border-radius:2px;color:var(--igc-button-text, rgba(0, 0, 0, 0.72));cursor:pointer;outline-style:none;font-size:14px;font-family:inherit;background:transparent;border:none;-webkit-tap-highlight-color:transparent;opacity:0.7;-webkit-transition:background 0.25s ease-out, opacity 0.25s ease-out, -webkit-box-shadow 0.25s ease-out;transition:background 0.25s ease-out, opacity 0.25s ease-out, -webkit-box-shadow 0.25s ease-out;transition:background 0.25s ease-out, opacity 0.25s ease-out, box-shadow 0.25s ease-out;transition:background 0.25s ease-out, opacity 0.25s ease-out, box-shadow 0.25s ease-out, -webkit-box-shadow 0.25s ease-out}:host([disabled]){pointer-events:none}:host{display:-ms-flexbox;display:flex}button{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}button:hover{opacity:1}button:focus{background:var(--igc-accent-color, #fff);-webkit-box-shadow:inset 0 0 0 1px var(--igc-active-color, cornflowerblue);box-shadow:inset 0 0 0 1px var(--igc-active-color, cornflowerblue);opacity:1}button[disabled]{opacity:0.54}";

let IgcButtonComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { disabled: this.disabled }, h("button", { name: this.name, type: this.type, value: this.value, "aria-disabled": this.disabled ? 'true' : null }, h("slot", null))));
  }
};
IgcButtonComponent.style = buttonComponentCss;

/**
 * @hidden
 */
class Utils {
  static isDockingIndicatorVertical(position) {
    return position === IgcDockingIndicatorPosition.top ||
      position === IgcDockingIndicatorPosition.bottom ||
      position === IgcDockingIndicatorPosition.outerTop ||
      position === IgcDockingIndicatorPosition.outerBottom;
  }
  static isDockingIndicatorBefore(position) {
    return position === IgcDockingIndicatorPosition.top ||
      position === IgcDockingIndicatorPosition.left ||
      position === IgcDockingIndicatorPosition.outerTop ||
      position === IgcDockingIndicatorPosition.outerLeft;
  }
  static isDockingIndicatorBeforeRTL(position) {
    return position === IgcDockingIndicatorPosition.top ||
      position === IgcDockingIndicatorPosition.right ||
      position === IgcDockingIndicatorPosition.outerTop ||
      position === IgcDockingIndicatorPosition.outerRight;
  }
  static isDockingIndicatorOuter(position) {
    return position === IgcDockingIndicatorPosition.outerLeft ||
      position === IgcDockingIndicatorPosition.outerRight ||
      position === IgcDockingIndicatorPosition.outerTop ||
      position === IgcDockingIndicatorPosition.outerBottom;
  }
  static isSplitPaneVertical(splitPane) {
    return splitPane.orientation === IgcSplitPaneOrientation.vertical;
  }
  static isAltPressed(event) {
    return event.altKey || event.getModifierState('Alt') || event.getModifierState('AltGraph');
  }
  static isControlOrMetaPressed(event) {
    return event.ctrlKey || event.metaKey || event.getModifierState('Meta') || event.getModifierState('OS');
  }
  static partNameMap(partNameInfo, delimiter = ' ') {
    return Object.keys(partNameInfo)
      .filter(key => partNameInfo[key])
      .join(delimiter);
  }
  static getDirection(element) {
    let direction = '';
    if (element.dir !== '') {
      direction = element.dir;
    }
    else {
      let parent = element.parentElement;
      while (parent) {
        if (parent.dir !== '') {
          direction = parent.dir;
          break;
        }
        parent = parent.parentElement;
      }
    }
    return direction;
  }
}

/**
 * @hidden
 */
const IGC_DEFAULT_PANE_SIZE = 100;
/**
 * @hidden
 */
const IGC_DEFAULT_UNPIN_PANE_SIZE = 200;
/**
 * @hidden
 */
const IGC_RESIZING_MIN_SIZE = 42;
/**
 * @hidden
 */
const IGC_DEFAULT_RESIZE = 10;
/**
 * @hidden
 */
const IGC_DRAG_FLYOUT_THRESHOLD = 50;
/**
 * @hidden
 */
var IgcTabHeadersPosition;
(function (IgcTabHeadersPosition) {
  IgcTabHeadersPosition["top"] = "top";
  IgcTabHeadersPosition["bottom"] = "bottom";
})(IgcTabHeadersPosition || (IgcTabHeadersPosition = {}));
/**
 * @hidden
 */
var IgcContextMenuOrientation;
(function (IgcContextMenuOrientation) {
  IgcContextMenuOrientation["top"] = "top";
  IgcContextMenuOrientation["bottom"] = "bottom";
})(IgcContextMenuOrientation || (IgcContextMenuOrientation = {}));
/**
 * @hidden
 */
var IgcPinBehavior;
(function (IgcPinBehavior) {
  IgcPinBehavior["allPanes"] = "allPanes";
  IgcPinBehavior["selectedPane"] = "selectedPane";
})(IgcPinBehavior || (IgcPinBehavior = {}));

const contentPaneComponentCss = ":host{--min-pane-size:0px;position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden;width:100%;height:100%;min-width:var(--min-pane-size);min-height:var(--min-pane-size);-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:all}:host(:focus){outline-style:none}:host([part~=disabled]:not([part~=single-floating])),:host([part~=disabled])>slot:not([name]){pointer-events:none}";

let IgcContentPaneComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.rendered = createEvent(this, "rendered", 7);
    this.disabled = false;
    this.isSingleFloating = false;
  }
  componentDidRender() {
    this.rendered.emit();
  }
  render() {
    const size = this.size || this.size === 0 ? this.size : IGC_DEFAULT_PANE_SIZE;
    const unpinnedSize = this.unpinnedSize ? this.unpinnedSize : IGC_DEFAULT_UNPIN_PANE_SIZE;
    const parts = Utils.partNameMap({
      'content-pane': true,
      disabled: this.disabled,
      'single-floating': this.isSingleFloating
    });
    return (h(Host, { role: "group", "aria-label": this.header, "aria-disabled": this.disabled ? 'true' : 'false', tabindex: this.disabled ? -1 : 0, style: {
        flex: this.isFlyout ? `0 1 ${unpinnedSize}px` : `${size} 1 ${size}px`
      }, part: parts }, h("slot", { name: "header" }), h("slot", null)));
  }
};
IgcContentPaneComponent.style = contentPaneComponentCss;

const contextMenuComponentCss = ":host{position:absolute;display:block;-webkit-box-sizing:border-box;box-sizing:border-box;top:0;left:0;bottom:0;right:0;z-index:10002;pointer-events:none}:host igc-icon-component svg{width:17px;height:17px}:host igc-icon-component{margin-left:8px}[part=menu-content]{position:absolute;visibility:hidden;color:var(--igc-context-menu-color, var(--igc-text-color, rgba(0, 0, 0, 0.72)));background:var(--igc-context-menu-background, var(--igc-accent-color, #fff));border:1px solid var(--igc-context-menu-background, var(--igc-accent-color, #fff));pointer-events:all;-webkit-box-shadow:0 5px 22px rgba(0, 0, 0, 0.08), 0 12px 17px 2px rgba(0, 0, 0, 0.12), 0 7px 8px -4px rgba(0, 0, 0, 0.26);box-shadow:0 5px 22px rgba(0, 0, 0, 0.08), 0 12px 17px 2px rgba(0, 0, 0, 0.12), 0 7px 8px -4px rgba(0, 0, 0, 0.26);-webkit-box-sizing:border-box;box-sizing:border-box}[part~=menu-item]{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding:6px 8px;font-size:0.75em;line-height:1.7;cursor:pointer;-webkit-transition:background 0.25s ease-out, color 0.25s ease-out;transition:background 0.25s ease-out, color 0.25s ease-out;outline-style:none}[part~=menu-item]:hover{background:var(--igc-context-menu-background-active, var(--igc-border-color, #F3F5F7));color:var(--igc-context-menu-color-active, #000)}[part~=menu-item]:focus{background:var(--igc-context-menu-background-active, var(--igc-border-color, #F3F5F7));color:var(--igc-context-menu-color-active, #000)}[part~=disabled]{pointer-events:none;color:var(--igc-disabled-color, rgba(0, 0, 0, 0.38))}";

let IgcContextMenuComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.menuClosed = createEvent(this, "menuClosed", 7);
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
    return (h(Fragment, null, item.iconName === 'close' && this.renderCloseButton(), item.iconName === 'unpin' && this.renderUnpinButton(), item.iconName !== null && item.iconName !== 'close' && item.iconName !== 'unpin' &&
      h("igc-icon-component", { name: item.iconName })));
  }
  renderCloseButton() {
    return (h("slot", { name: "contextMenuCloseButton" }, h("igc-icon-component", { part: "context-menu-close-button", name: "close" })));
  }
  renderUnpinButton() {
    return (h("slot", { name: "contextMenuUnpinButton" }, h("igc-icon-component", { part: "context-menu-unpin-button", name: "unpin" })));
  }
  render() {
    return (h(Host, { part: "context-menu", exportparts: "context-menu,\r\n        menu-item: context-menu-item,\r\n        menu-content: context-menu-content,\r\n        context-menu-close-button,\r\n        context-menu-unpin-button" }, h("div", { role: "menu", part: "menu-content", ref: el => this.menuItemsDiv = el, onMouseDown: ev => {
        ev.preventDefault();
      } }, this.items.map(item => {
      const parts = Utils.partNameMap({
        'menu-item': true,
        disabled: item.disabled
      });
      return (h("div", { role: "menuitem", part: parts, tabindex: "-1", onKeyDown: this.handleKeyboardEvents.bind(this, item), onClick: this.handleMenuItemClick.bind(this, item) }, h("span", { style: {
          flexGrow: '1',
          userSelect: 'none',
        } }, item.displayText), this.renderItemIcon(item)));
    }))));
  }
  get elem() { return getElement(this); }
};
IgcContextMenuComponent.style = contextMenuComponentCss;

function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var r=0;r<e.length;r++){var o=e[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _createClass(t,e,r){return e&&_defineProperties(t.prototype,e),r&&_defineProperties(t,r),t}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_setPrototypeOf(t,e)}function _createSuper(t){var e=_isNativeReflectConstruct();return function(){var r,o=_getPrototypeOf(t);if(e){var n=_getPrototypeOf(this).constructor;r=Reflect.construct(o,arguments,n)}else r=o.apply(this,arguments);return _possibleConstructorReturn(this,r)}}function _possibleConstructorReturn(t,e){return!e||"object"!==_typeof(e)&&"function"!=typeof e?_assertThisInitialized(t):e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _wrapNativeSuper(t){var e="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(t){if(null===t||!_isNativeFunction(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return _construct(t,arguments,_getPrototypeOf(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(r,t)},_wrapNativeSuper(t)}function _construct(t,e,r){return _construct=_isNativeReflectConstruct()?Reflect.construct:function(t,e,r){var o=[null];o.push.apply(o,e);var n=new(Function.bind.apply(t,o));return r&&_setPrototypeOf(n,r.prototype),n},_construct.apply(null,arguments)}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function _isNativeFunction(t){return-1!==Function.toString.call(t).indexOf("[native code]")}function _setPrototypeOf(t,e){return _setPrototypeOf=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},_setPrototypeOf(t,e)}function _getPrototypeOf(t){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},_getPrototypeOf(t)}

/**
 * @hidden
 */
class TwoWayMap {
  constructor() {
    this.map = new Map();
    this.reversedMap = new Map();
  }
  set(key, value) {
    this.map.set(key, value);
    this.reversedMap.set(value, key);
  }
  get(key) {
    return this.map.get(key);
  }
  getByValue(value) {
    return this.reversedMap.get(value);
  }
  delete(key) {
    const value = this.map.get(key);
    this.map.delete(key);
    this.reversedMap.delete(value);
  }
  has(key) {
    return this.map.has(key);
  }
  hasValue(value) {
    return this.reversedMap.has(value);
  }
}

/**
 * @hidden
 */
class IgcDockManagerService {
  constructor(dockManager) {
    this.dockManager = dockManager;
    this.unpinnedLocationMap = new Map();
  }
  getContent(contentId) {
    return this.clientContentPanesMap.get(contentId);
  }
  generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  populatePaneParents(splitPane, isRoot, isInDocHost) {
    if (!splitPane) {
      return;
    }
    if (!splitPane.id) {
      splitPane.id = this.generateUuid();
    }
    for (const pane of splitPane.panes) {
      this.paneParentMap.set(pane, splitPane);
      if (!pane.id) {
        pane.id = this.generateUuid();
      }
      if (pane.type === IgcDockManagerPaneType.contentPane && !pane.hidden) {
        this.clientContentPanesMap.set(pane.contentId, pane);
        if (isInDocHost) {
          this.visibleDocuments.push(pane);
        }
        else {
          this.visibleContentPanes.push(pane);
        }
      }
      else if (pane.type === IgcDockManagerPaneType.splitPane) {
        this.populatePaneParents(pane, isRoot, isInDocHost);
      }
      else if (pane.type === IgcDockManagerPaneType.tabGroupPane) {
        for (const cp of pane.panes) {
          if (!cp.id) {
            cp.id = this.generateUuid();
          }
          this.paneParentMap.set(cp, pane);
          if (!cp.hidden) {
            this.clientContentPanesMap.set(cp.contentId, cp);
            if (isInDocHost) {
              this.visibleDocuments.push(cp);
            }
            else {
              this.visibleContentPanes.push(cp);
            }
          }
        }
      }
      else if (pane.type === IgcDockManagerPaneType.documentHost) {
        if (isRoot) {
          this.documentHosts.push(pane);
        }
        this.paneParentMap.set(pane.rootPane, pane);
        this.populatePaneParents(pane.rootPane, isRoot, true);
      }
    }
  }
  populatePinLocations(splitPane) {
    if (!splitPane) {
      return;
    }
    for (const pane of splitPane.panes) {
      if (pane.type === IgcDockManagerPaneType.splitPane) {
        this.populatePinLocations(pane);
      }
      else if (pane.type === IgcDockManagerPaneType.tabGroupPane) {
        for (const cp of pane.panes) {
          this.addContentPanePinLocation(cp);
          this.paneParentMap.set(cp, pane);
        }
      }
      else if (pane.type === IgcDockManagerPaneType.contentPane) {
        this.addContentPanePinLocation(pane);
      }
    }
  }
  resolvePaneUnpinLocation(pane) {
    let unpinnedLocation;
    if (pane.unpinnedLocation) {
      unpinnedLocation = pane.unpinnedLocation;
    }
    else {
      const documentHost = this.findClosestDocumentHost(pane);
      // TODO Implement an auto-detect algorithm for unpinned location when there is no document host
      unpinnedLocation = documentHost ? this.findPaneUnpinLocation(pane, documentHost) : IgcUnpinnedLocation.left;
    }
    return unpinnedLocation;
  }
  addContentPanePinLocation(pane) {
    if (pane.isPinned === false) {
      const unpinnedLocation = this.resolvePaneUnpinLocation(pane);
      this.unpinnedLocationMap.set(pane, unpinnedLocation);
    }
  }
  findClosestDocumentHost(pane) {
    const panePath = this.getPanePath(pane);
    let maxCommonParents = -1;
    let closestDocHost;
    for (const docHost of this.documentHosts) {
      const docHostPath = this.getPanePath(docHost);
      let i;
      for (i = 0; i < panePath.length; i++) {
        const paneParent = panePath[i];
        const docHostParent = docHostPath[i];
        if (paneParent !== docHostParent) {
          break;
        }
      }
      if (i > maxCommonParents) {
        maxCommonParents = i;
        closestDocHost = docHost;
      }
    }
    return closestDocHost;
  }
  findPaneUnpinLocation(pane, docHost) {
    const panePath = this.getPanePath(pane);
    const docHostPath = this.getPanePath(docHost);
    let commonParentIndex = -1;
    for (let i = 0; i < panePath.length; i++) {
      const paneParent = panePath[i];
      const docHostParent = docHostPath[i];
      if (paneParent === docHostParent) {
        commonParentIndex = i;
      }
      else {
        break;
      }
    }
    if (commonParentIndex >= 0) {
      const commonParent = panePath[commonParentIndex];
      const paneIndex = commonParent.panes.indexOf(panePath[commonParentIndex + 1]);
      const docHostIndex = commonParent.panes.indexOf(docHostPath[commonParentIndex + 1]);
      return commonParent.orientation === IgcSplitPaneOrientation.horizontal ?
        paneIndex < docHostIndex ? IgcUnpinnedLocation.left : IgcUnpinnedLocation.right :
        paneIndex < docHostIndex ? IgcUnpinnedLocation.top : IgcUnpinnedLocation.bottom;
    }
    return IgcUnpinnedLocation.left;
  }
  removePane(pane) {
    if (pane === this.dockManager.maximizedPane) {
      this.dockManager.maximizedPane = null;
    }
    const parent = this.paneParentMap.get(pane);
    if (!parent) {
      if (this.dockManager.layout.floatingPanes) {
        const floatingIndex = this.dockManager.layout.floatingPanes.indexOf(pane);
        if (floatingIndex > -1) {
          this.dockManager.layout.floatingPanes.splice(floatingIndex, 1);
        }
      }
      return;
    }
    if (parent.type === IgcDockManagerPaneType.splitPane ||
      parent.type === IgcDockManagerPaneType.tabGroupPane) {
      const index = parent.panes.indexOf(pane);
      parent.panes.splice(index, 1);
      if (parent.panes.length === 0) {
        if (parent.allowEmpty) {
          const rootParent = this.getRootParent(pane);
          if (this.isFloatingPane(rootParent)) {
            this.removeFloatingPaneIfEmpty(rootParent);
          }
        }
        else {
          this.removePane(parent);
        }
      }
      else if (parent.type === IgcDockManagerPaneType.splitPane) {
        const rootParent = this.getRootParent(parent);
        if (this.isFloatingPane(rootParent)) {
          this.removeFloatingPaneIfEmpty(parent);
        }
      }
    }
    else if (parent.type === IgcDockManagerPaneType.documentHost) {
      parent.rootPane = null;
      this.removePane(parent);
    }
  }
  removeFloatingPaneIfEmpty(pane) {
    const childPanes = this.getChildContentPanes(pane);
    if (childPanes.length === 0) {
      this.removePane(pane);
    }
  }
  isFloatingPane(pane) {
    if (!this.dockManager.layout.floatingPanes) {
      return false;
    }
    return this.dockManager.layout.floatingPanes.indexOf(pane) > -1;
  }
  addFloatingPane(content, location, width, height) {
    const floatingPane = {
      type: IgcDockManagerPaneType.splitPane,
      orientation: IgcSplitPaneOrientation.vertical,
      panes: [content]
    };
    floatingPane.floatingLocation = location;
    floatingPane.floatingWidth = width;
    floatingPane.floatingHeight = height;
    if (!this.dockManager.layout.floatingPanes) {
      this.dockManager.layout.floatingPanes = [];
    }
    this.dockManager.layout.floatingPanes.push(floatingPane);
    this.dockManager.draggedPane = floatingPane;
    this.initialFloatingPaneLocation = floatingPane.floatingLocation;
    this.forceDragPane = floatingPane;
  }
  getChildContentPanes(pane) {
    const panes = [];
    this.getChildContentPanesRecursive(pane, panes);
    return panes;
  }
  getChildContentPanesRecursive(pane, children) {
    for (const child of pane.panes) {
      if (child.type === IgcDockManagerPaneType.contentPane) {
        children.push(child);
      }
      else if (child.type === IgcDockManagerPaneType.tabGroupPane ||
        child.type === IgcDockManagerPaneType.splitPane) {
        this.getChildContentPanesRecursive(child, children);
      }
      else if (child.type === IgcDockManagerPaneType.documentHost) {
        this.getChildContentPanesRecursive(child.rootPane, children);
      }
    }
  }
  getChildDocHostRecursive(pane) {
    for (const child of pane.panes) {
      if (child.type === IgcDockManagerPaneType.documentHost) {
        return child;
      }
      else if (child.type === IgcDockManagerPaneType.splitPane) {
        const result = this.getChildDocHostRecursive(child);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }
  getVisibleContentPanes(parent) {
    return parent.panes.filter(t => this.isContentPaneVisible(t));
  }
  getPaneToDock(draggedPane) {
    return draggedPane.type === IgcDockManagerPaneType.contentPane ? draggedPane :
      draggedPane.type === IgcDockManagerPaneType.tabGroupPane || draggedPane.type === IgcDockManagerPaneType.splitPane ?
        draggedPane.panes.length === 1 ?
          draggedPane.panes[0] :
          draggedPane :
        draggedPane;
  }
  removeDocumentHost(pane) {
    const docHost = this.getChildDocHostRecursive(pane);
    if (docHost) {
      const parent = this.getParent(docHost);
      const index = parent.panes.indexOf(docHost);
      parent.panes[index] = docHost.rootPane.panes.length === 1 ?
        docHost.rootPane.panes[0] :
        docHost.rootPane;
    }
  }
  dockToCenter(targetPane, draggedPane) {
    let targetContainer;
    if (targetPane.type === IgcDockManagerPaneType.tabGroupPane) {
      targetContainer = targetPane;
    }
    else if (targetPane.type === IgcDockManagerPaneType.contentPane) {
      targetContainer = {
        type: IgcDockManagerPaneType.tabGroupPane,
        size: targetPane.size,
        panes: [targetPane]
      };
      const targetParent = this.paneParentMap.get(targetPane);
      const index = targetParent.panes.indexOf(targetPane);
      targetParent.panes[index] = targetContainer;
    }
    else if (targetPane.type === IgcDockManagerPaneType.splitPane) {
      targetContainer = targetPane;
    }
    else if (targetPane.type === IgcDockManagerPaneType.documentHost) {
      targetContainer = targetPane.rootPane;
    }
    if (targetContainer.type === IgcDockManagerPaneType.tabGroupPane) {
      const panesToDock = (draggedPane.type === IgcDockManagerPaneType.contentPane) ?
        [draggedPane] :
        this.getChildContentPanes(draggedPane);
      targetContainer.panes.push(...panesToDock);
    }
    else if (targetContainer.type === IgcDockManagerPaneType.splitPane) {
      let paneToDock = draggedPane;
      if ((draggedPane === null || draggedPane === void 0 ? void 0 : draggedPane.type) === IgcDockManagerPaneType.splitPane && this.dockManager.documentOnlyDrag) {
        this.removeDocumentHost(draggedPane);
        const childPanes = this.getChildContentPanes(draggedPane);
        paneToDock = childPanes.length === 1 ? childPanes[0] : paneToDock;
      }
      targetContainer.panes.push(paneToDock);
    }
  }
  dockToEdge(targetPane, position) {
    const targetParent = this.getParent(targetPane);
    const paneIndex = targetParent.panes.indexOf(targetPane);
    const isIndicatorVertical = Utils.isDockingIndicatorVertical(position);
    const isSplitPaneVertical = Utils.isSplitPaneVertical(targetParent);
    const isRTL = this.dockingIndicator && this.dockingIndicator.direction === 'rtl';
    let draggedPane = this.dockManager.draggedPane;
    if ((draggedPane === null || draggedPane === void 0 ? void 0 : draggedPane.type) === IgcDockManagerPaneType.splitPane &&
      this.dockManager.documentOnlyDrag &&
      !this.dockManager.dropTargetPaneInfo.floatingPaneWithoutDocHost) {
      this.removeDocumentHost(draggedPane);
    }
    else if ((draggedPane === null || draggedPane === void 0 ? void 0 : draggedPane.type) === IgcDockManagerPaneType.contentPane &&
      this.dockManager.documentOnlyDrag &&
      this.dockManager.dropTargetPaneInfo.floatingPaneWithoutDocHost) {
      draggedPane = {
        type: IgcDockManagerPaneType.documentHost,
        rootPane: {
          type: IgcDockManagerPaneType.splitPane,
          orientation: IgcSplitPaneOrientation.horizontal,
          panes: [draggedPane]
        }
      };
    }
    const paneToDock = draggedPane ? this.getPaneToDock(draggedPane) : this.dockManager.activePane;
    if ((isIndicatorVertical && isSplitPaneVertical) || (!isIndicatorVertical && !isSplitPaneVertical)) {
      const insertIndex = Utils.isDockingIndicatorBefore(position) && !isRTL ||
        Utils.isDockingIndicatorBeforeRTL(position) && isRTL ?
        paneIndex :
        paneIndex + 1;
      targetParent.panes.splice(insertIndex, 0, paneToDock);
    }
    else {
      const newSplitPane = {
        type: IgcDockManagerPaneType.splitPane,
        orientation: isSplitPaneVertical ? IgcSplitPaneOrientation.horizontal : IgcSplitPaneOrientation.vertical,
        panes: Utils.isDockingIndicatorBefore(position) && !isRTL ||
          Utils.isDockingIndicatorBeforeRTL(position) && isRTL ?
          [paneToDock, targetPane] :
          [targetPane, paneToDock],
        size: targetPane.size
      };
      targetPane.size = undefined;
      paneToDock.size = undefined;
      targetParent.panes[paneIndex] = newSplitPane;
    }
  }
  updateLayout() {
    this.dockManager.layout = Object.assign({}, this.dockManager.layout);
  }
  processLayout() {
    this.paneParentMap = new Map();
    this.unpinnedLocationMap = new Map();
    this.clientContentPanesMap = new Map();
    this.documentHosts = [];
    this.visibleContentPanes = [];
    this.visibleDocuments = [];
    const layout = this.dockManager.layout;
    if (layout) {
      this.populatePaneParents(layout.rootPane, true, false);
      if (layout.floatingPanes) {
        const indicesToDelete = new Map(this.dockManager.floatingPaneZIndicesMap);
        for (let i = 0; i < layout.floatingPanes.length; i++) {
          const pane = layout.floatingPanes[i];
          this.populatePaneParents(pane, false, false);
          if (this.dockManager.floatingPaneZIndicesMap.has(pane)) {
            indicesToDelete.delete(pane);
          }
          else {
            this.dockManager.floatingPaneZIndicesMap.set(pane, i);
          }
        }
        for (const key of indicesToDelete.keys()) {
          this.dockManager.floatingPaneZIndicesMap.delete(key);
        }
      }
      this.populatePinLocations(layout.rootPane);
      if (this.dockManager.flyoutPane && !this.unpinnedLocationMap.has(this.dockManager.flyoutPane)) {
        this.dockManager.flyoutPane = null;
      }
    }
  }
  getParent(pane) {
    return this.paneParentMap.get(pane);
  }
  getRootParent(pane) {
    return this.getPanePath(pane)[0];
  }
  getPanePath(pane) {
    const path = [];
    let currentPane = pane;
    while (currentPane) {
      path.splice(0, 0, currentPane);
      currentPane = this.paneParentMap.get(currentPane);
    }
    return path;
  }
  getDocHostParent(pane) {
    let parent = pane;
    do {
      parent = this.paneParentMap.get(parent);
    } while (parent && parent.type !== IgcDockManagerPaneType.documentHost);
    return parent;
  }
  resizeFlyoutPane(delta) {
    const pane = this.dockManager.flyoutPane;
    const location = this.unpinnedLocationMap.get(pane);
    const paneSize = pane.unpinnedSize ? pane.unpinnedSize : IGC_DEFAULT_UNPIN_PANE_SIZE;
    const newSize = location === IgcUnpinnedLocation.left || location === IgcUnpinnedLocation.top ?
      paneSize + delta :
      paneSize - delta;
    pane.unpinnedSize = newSize;
    this.updateLayout();
  }
  resizePane(pane, deltaPercentage) {
    const parentPane = this.getParent(pane);
    const childPanes = this.getSplitPaneVisibleChildren(parentPane);
    const paneIndex = childPanes.indexOf(pane);
    const paneSizes = childPanes.map(p => p.size || p.size === 0 ? p.size : IGC_DEFAULT_PANE_SIZE);
    const sizeSum = paneSizes.reduce((p, c) => c + p, 0);
    const calcDelta = deltaPercentage * sizeSum;
    childPanes[paneIndex - 1].size = paneSizes[paneIndex - 1] + calcDelta;
    childPanes[paneIndex].size = paneSizes[paneIndex] - calcDelta;
    this.updateLayout();
  }
  togglePin(pane, pinBehavior = IgcPinBehavior.allPanes) {
    const newValue = !this.getActualIsPinned(pane);
    const parent = this.paneParentMap.get(pane);
    const panes = parent.type === IgcDockManagerPaneType.tabGroupPane && pinBehavior === IgcPinBehavior.allPanes ?
      parent.panes.filter(p => p.allowPinning !== false) :
      [pane];
    const location = this.resolvePaneUnpinLocation(pane);
    const args = {
      sourcePane: pane,
      panes,
      newValue,
      location
    };
    const event = this.dockManager.panePinnedToggle.emit(args);
    if (!event.defaultPrevented) {
      for (const cp of args.panes) {
        cp.isPinned = newValue;
      }
      if (this.dockManager.maximizedPane) {
        this.dockManager.maximizedPane = null;
        newValue ?
          this.dockManager.flyoutPane = null :
          this.flyoutPane(pane);
      }
      else if (newValue) {
        this.dockManager.flyoutPane = null;
      }
      this.updateLayout();
    }
  }
  closePane(pane) {
    let paneToRemove = pane;
    if (pane.type === IgcDockManagerPaneType.contentPane && pane !== this.dockManager.flyoutPane) {
      const parent = this.paneParentMap.get(pane);
      if (parent.type === IgcDockManagerPaneType.tabGroupPane) {
        paneToRemove = parent;
      }
    }
    const paneRemoved = paneToRemove.type === IgcDockManagerPaneType.tabGroupPane ?
      this.removeAllowedPanes(pane, paneToRemove) :
      this.emitPaneClose(pane, [paneToRemove]);
    if ((paneRemoved || pane.hidden) && pane === this.dockManager.flyoutPane) {
      this.dockManager.flyoutPane = null;
    }
    this.updateLayout();
  }
  closeFloatingPane(pane) {
    this.removeAllowedPanes(pane, pane);
    this.updateLayout();
  }
  emitPaneClose(sourcePane, panes) {
    let paneRemoved = false;
    const args = { sourcePane, panes };
    const event = this.dockManager.paneClose.emit(args);
    if (!event.defaultPrevented) {
      for (const pane of args.panes) {
        this.removePane(pane);
        paneRemoved = true;
      }
    }
    return paneRemoved;
  }
  removeAllowedPanes(sourcePane, pane) {
    let paneRemoved = false;
    const panes = this.getChildContentPanes(pane)
      .filter(p => this.getActualAllowClose(p))
      .filter(p => pane.type === IgcDockManagerPaneType.tabGroupPane && sourcePane.type === IgcDockManagerPaneType.contentPane
      ? p.isPinned !== false
      : true);
    paneRemoved = this.emitPaneClose(sourcePane, panes);
    return paneRemoved;
  }
  flyoutPane(pane) {
    this.dockManager.flyoutPane = this.dockManager.flyoutPane === pane ? null : pane;
  }
  maximizePane(pane) {
    const parent = this.getParent(pane);
    const targetPane = parent && parent.type === IgcDockManagerPaneType.tabGroupPane && pane !== this.dockManager.flyoutPane ? parent : pane;
    this.dockManager.maximizedPane = this.dockManager.maximizedPane === targetPane ? null : targetPane;
  }
  moveFloatingPane(pane, location) {
    pane.floatingLocation = location;
    this.updateLayout();
  }
  resizeFloatingPaneStart(pane, resizerLocation) {
    var _a, _b, _c;
    const resizeArgs = {
      sourcePane: pane,
      resizerLocation
    };
    const resizeStartEvent = this.dockManager.floatingPaneResizeStart.emit(resizeArgs);
    if (resizeStartEvent.defaultPrevented) {
      return false;
    }
    this.initialFloatingPaneLocation = (_a = pane.floatingLocation) !== null && _a !== void 0 ? _a : { x: 0, y: 0 };
    this.initialFloatingPaneWidth = (_b = pane.floatingWidth) !== null && _b !== void 0 ? _b : IGC_DEFAULT_PANE_SIZE;
    this.initialFloatingPaneHeight = (_c = pane.floatingHeight) !== null && _c !== void 0 ? _c : IGC_DEFAULT_PANE_SIZE;
    return true;
  }
  resizeFloatingPane(pane, args) {
    const currX = pane.floatingLocation ? pane.floatingLocation.x : 0;
    const currY = pane.floatingLocation ? pane.floatingLocation.y : 0;
    const currW = pane.floatingWidth ? pane.floatingWidth : IGC_DEFAULT_PANE_SIZE;
    const currH = pane.floatingHeight ? pane.floatingHeight : IGC_DEFAULT_PANE_SIZE;
    const minW = IGC_DEFAULT_PANE_SIZE;
    const minH = IGC_DEFAULT_PANE_SIZE;
    const initialWidth = this.initialFloatingPaneWidth;
    const initialHeight = this.initialFloatingPaneHeight;
    const initialLocation = this.initialFloatingPaneLocation;
    let totalOffsetY = args.dragMoveArgs.totalOffsetY;
    let totalOffsetX = args.dragMoveArgs.totalOffsetX;
    let newX = currX;
    let newY = currY;
    let newWidth = currW;
    let newHeight = currH;
    const maxHeight = document.documentElement.clientHeight;
    const maxWidth = document.documentElement.clientWidth;
    switch (args.resizerLocation) {
      case (IgcResizerLocation.top):
      case (IgcResizerLocation.topLeft):
      case (IgcResizerLocation.topRight):
        newHeight = initialHeight - totalOffsetY;
        if (newHeight < minH) {
          totalOffsetY = initialHeight - minH;
          newHeight = minH;
        }
        newY = initialLocation.y + totalOffsetY;
        if (newY < 0) {
          newHeight += newY;
          newY = 0;
        }
        else if (newY >= maxHeight - 1) {
          newY = maxHeight - 1;
        }
        break;
      case (IgcResizerLocation.bottom):
      case (IgcResizerLocation.bottomLeft):
      case (IgcResizerLocation.bottomRight):
        newHeight = initialHeight + totalOffsetY;
        if (newHeight < minH) {
          newHeight = minH;
        }
        if (newY + newHeight > maxHeight) {
          newHeight = maxHeight - newY;
        }
        break;
    }
    switch (args.resizerLocation) {
      case (IgcResizerLocation.left):
      case (IgcResizerLocation.topLeft):
      case (IgcResizerLocation.bottomLeft):
        newWidth = initialWidth - totalOffsetX;
        if (newWidth < minW) {
          totalOffsetX = initialWidth - minW;
          newWidth = minW;
        }
        newX = initialLocation.x + totalOffsetX;
        if (newX < 0) {
          newWidth += newX;
          newX = 0;
        }
        else if (newX >= maxWidth) {
          newX = maxWidth;
        }
        break;
      case (IgcResizerLocation.right):
      case (IgcResizerLocation.topRight):
      case (IgcResizerLocation.bottomRight):
        newWidth = initialWidth + totalOffsetX;
        if (newWidth < minW) {
          newWidth = minW;
        }
        if (newX + newWidth > maxWidth) {
          newWidth = maxWidth - newX;
        }
        break;
    }
    if (currX === newX && currY === newY && currW === newWidth && currH === newHeight) {
      return;
    }
    const resizingArgs = {
      sourcePane: pane,
      oldWidth: currW,
      newWidth,
      oldHeight: currH,
      newHeight,
      oldLocation: { x: currX, y: currY },
      newLocation: { x: newX, y: newY },
      resizerLocation: args.resizerLocation
    };
    const resizingEvent = this.dockManager.floatingPaneResizeMove.emit(resizingArgs);
    if (resizingEvent.defaultPrevented) {
      args.dragMoveArgs.cancel = true;
      return;
    }
    else {
      pane.floatingLocation = resizingArgs.newLocation;
      pane.floatingWidth = resizingArgs.newWidth;
      pane.floatingHeight = resizingArgs.newHeight;
      this.updateLayout();
    }
  }
  resizeFloatingPaneEnd(pane, resizerLocation) {
    this.dockManager.floatingPaneResizeEnd.emit({
      sourcePane: pane,
      resizerLocation
    });
    this.dockManager.layoutChange.emit();
  }
  floatPane(pane, x, y, width, height) {
    let panesToRemove = [pane];
    let paneToAdd = pane;
    const parent = this.paneParentMap.get(pane);
    if (pane !== this.dockManager.flyoutPane && parent.type === IgcDockManagerPaneType.tabGroupPane) {
      if (parent.allowEmpty) {
        const panes = [...parent.panes];
        panesToRemove = panes;
        paneToAdd = parent.panes.length === 1 ?
          pane :
          {
            type: IgcDockManagerPaneType.tabGroupPane,
            panes,
            selectedIndex: parent.selectedIndex
          };
      }
      else {
        panesToRemove = [parent];
        paneToAdd = parent;
      }
    }
    panesToRemove.forEach(p => this.removePane(p));
    this.addFloatingPane(paneToAdd, { x, y }, width, height);
    if (pane === this.dockManager.flyoutPane) {
      pane.isPinned = true;
      this.dockManager.flyoutPane = null;
    }
    this.updateLayout();
  }
  floatTab(pane, x, y, width, height) {
    this.removePane(pane);
    const isInDocHost = !!this.getDocHostParent(pane);
    let content;
    if (isInDocHost && pane.documentOnly) {
      const docHost = {
        type: IgcDockManagerPaneType.documentHost,
        rootPane: {
          type: IgcDockManagerPaneType.splitPane,
          orientation: IgcSplitPaneOrientation.vertical,
          panes: [pane]
        }
      };
      content = docHost;
    }
    else {
      content = pane;
    }
    this.addFloatingPane(content, { x, y }, width, height);
    this.updateLayout();
  }
  hasFloatingPaneHeader(pane) {
    const panes = this.getSplitPaneVisibleChildren(pane);
    if (panes && panes.length) {
      if (panes.length > 1) {
        return true;
      }
      const childPane = panes[0];
      if (childPane.type === IgcDockManagerPaneType.splitPane) {
        return this.hasFloatingPaneHeader(childPane);
      }
      else if (childPane.type === IgcDockManagerPaneType.documentHost) {
        return true;
      }
    }
    return false;
  }
  rootDockPane(position) {
    const layout = this.dockManager.layout;
    const rootPane = layout.rootPane;
    const paneToDock = this.dockManager.draggedPane ? this.getPaneToDock(this.dockManager.draggedPane) : this.dockManager.activePane;
    this.removePane(paneToDock);
    const isIndicatorVertical = position === IgcDockingIndicatorPosition.top || position === IgcDockingIndicatorPosition.bottom;
    const isSplitPaneVertical = Utils.isSplitPaneVertical(rootPane);
    const isRTL = this.dockingIndicator && this.dockingIndicator.direction === 'rtl';
    if ((isIndicatorVertical && isSplitPaneVertical) || (!isIndicatorVertical && !isSplitPaneVertical)) {
      const insertIndex = position === IgcDockingIndicatorPosition.left && !isRTL ||
        position === IgcDockingIndicatorPosition.right && isRTL ||
        position === IgcDockingIndicatorPosition.top ?
        0 :
        rootPane.panes.length;
      rootPane.panes.splice(insertIndex, 0, paneToDock);
    }
    else {
      const newRootPane = {
        type: IgcDockManagerPaneType.splitPane,
        orientation: isSplitPaneVertical ? IgcSplitPaneOrientation.horizontal : IgcSplitPaneOrientation.vertical,
        panes: position === IgcDockingIndicatorPosition.left && !isRTL ||
          position === IgcDockingIndicatorPosition.right && isRTL ||
          position === IgcDockingIndicatorPosition.top ?
          [paneToDock, rootPane] :
          [rootPane, paneToDock],
      };
      rootPane.size = undefined;
      paneToDock.size = undefined;
      layout.rootPane = newRootPane;
    }
    this.updateLayout();
  }
  dockPane(position) {
    var _a;
    const draggedFloatingPane = (_a = this.dockManager.draggedPane) !== null && _a !== void 0 ? _a : this.dockManager.activePane;
    const dropTargetPaneInfo = this.dockManager.dropTargetPaneInfo;
    this.removePane(draggedFloatingPane);
    const targetPane = this.dockManager.draggedPane ? dropTargetPaneInfo.pane : this.getParent(this.dockManager.activePane);
    switch (position) {
      case IgcDockingIndicatorPosition.center:
        this.dockToCenter(targetPane, draggedFloatingPane);
        break;
      case IgcDockingIndicatorPosition.left:
      case IgcDockingIndicatorPosition.top:
      case IgcDockingIndicatorPosition.right:
      case IgcDockingIndicatorPosition.bottom:
        this.dockToEdge(targetPane, position);
        break;
      case IgcDockingIndicatorPosition.outerLeft:
      case IgcDockingIndicatorPosition.outerTop:
      case IgcDockingIndicatorPosition.outerRight:
      case IgcDockingIndicatorPosition.outerBottom:
        const docHost = this.dockManager.dropTargetPaneInfo.docHost;
        this.dockToEdge(docHost, position);
        break;
    }
    this.updateLayout();
  }
  getActualIsPinned(pane) {
    return pane.isPinned !== false;
  }
  getActualAllowClose(pane) {
    return pane.allowClose !== false;
  }
  isContentPaneVisible(pane) {
    return pane.isPinned !== false && pane.hidden !== true;
  }
  getSplitPaneVisibleChildren(pane) {
    return pane.panes.filter(p => {
      if (p.type === IgcDockManagerPaneType.contentPane) {
        return this.isContentPaneVisible(p);
      }
      else if (p.type === IgcDockManagerPaneType.splitPane) {
        return p.allowEmpty || this.getSplitPaneVisibleChildren(p).length;
      }
      else if (p.type === IgcDockManagerPaneType.tabGroupPane) {
        return p.allowEmpty || p.panes.some(cp => this.isContentPaneVisible(cp));
      }
      else if (p.type === IgcDockManagerPaneType.documentHost) {
        return p.rootPane.allowEmpty || this.getSplitPaneVisibleChildren(p.rootPane).length;
      }
    });
  }
  closeTabPane(pane) {
    this.emitPaneClose(pane, [pane]);
    this.updateLayout();
  }
  bringFloatingPaneOnTop(pane) {
    const floatingPanes = this.dockManager.layout.floatingPanes;
    const floatingPaneZIndicesMap = this.dockManager.floatingPaneZIndicesMap;
    const oldZIndex = floatingPaneZIndicesMap.get(pane);
    for (const p of floatingPanes) {
      const zIndex = floatingPaneZIndicesMap.get(p);
      if (zIndex < oldZIndex) {
        continue;
      }
      else if (zIndex > oldZIndex) {
        floatingPaneZIndicesMap.set(p, zIndex - 1);
      }
      else {
        floatingPaneZIndicesMap.set(p, floatingPanes.length - 1);
      }
    }
    this.dockManager.floatingPaneZIndicesMap = new Map(floatingPaneZIndicesMap);
  }
  createContextMenuItems(pane) {
    const items = [];
    if (this.getActualAllowClose(pane)) {
      items.push({ displayText: this.dockManager.resourceStrings.close, iconName: 'close', clickHandler: () => this.closeTabPane(pane) });
    }
    if (pane.allowPinning !== false) {
      items.push({ displayText: this.dockManager.resourceStrings.unpin, iconName: 'unpin', clickHandler: () => this.togglePin(pane, IgcPinBehavior.selectedPane) });
    }
    return items;
  }
  dragPaneStart(pane, rect, clientX, clientY) {
    var _a;
    if (this.dockManager.maximizedPane) {
      return false;
    }
    let panes;
    let parent;
    if (pane.type === IgcDockManagerPaneType.contentPane) {
      parent = this.getParent(pane);
      panes = parent.type === IgcDockManagerPaneType.tabGroupPane && pane !== this.dockManager.flyoutPane ?
        parent.panes :
        [pane];
    }
    else {
      if (this.dockManager.draggedPane === pane) {
        return true;
      }
      panes = this.getChildContentPanes(pane);
    }
    const disableDockingAndFloating = panes.some(p => p.allowDocking === false) && panes.some(p => p.allowFloating === false);
    if (pane.type === IgcDockManagerPaneType.contentPane && disableDockingAndFloating) {
      return false;
    }
    const dragStartEvent = this.dockManager.paneDragStart.emit({ sourcePane: pane, panes });
    if (dragStartEvent.defaultPrevented) {
      return false;
    }
    this.draggedPanes = panes;
    this.initialDragClientPoint = {
      x: clientX,
      y: clientY
    };
    if (pane.type === IgcDockManagerPaneType.splitPane) {
      this.dockManager.draggedPane = pane;
      this.initialFloatingPaneLocation = (_a = pane.floatingLocation) !== null && _a !== void 0 ? _a : { x: 0, y: 0 };
    }
    else {
      if (this.draggedPanes.some(p => p.allowFloating === false)) {
        this.dockManager.draggedPane = panes.length > 1 ? parent : pane;
        return true;
      }
      const action = {
        type: IgcPaneDragActionType.floatPane,
        location: { x: rect.x, y: rect.y },
        width: rect.width,
        height: rect.height
      };
      const dragOverEvent = this.dockManager.paneDragOver.emit({
        sourcePane: pane,
        panes,
        action,
        isValid: true
      });
      if (dragOverEvent.defaultPrevented) {
        return false;
      }
      if (!dragOverEvent.detail.isValid) {
        this.dockManager.draggedPane = panes.length > 1 ? parent : pane;
        return true;
      }
      this.floatPane(pane, rect.x, rect.y, action.width, action.height);
      return false;
    }
    return true;
  }
  dragPaneMove(clientX, clientY) {
    const draggedPane = this.dockManager.draggedPane;
    if (draggedPane.type === IgcDockManagerPaneType.splitPane) {
      const oldLocation = draggedPane.floatingLocation ? draggedPane.floatingLocation : { x: 0, y: 0 };
      const newLocation = {
        x: this.initialFloatingPaneLocation.x + clientX - this.initialDragClientPoint.x,
        y: this.initialFloatingPaneLocation.y + clientY - this.initialDragClientPoint.y,
      };
      const dragOverEvent = this.dockManager.paneDragOver.emit({
        sourcePane: draggedPane,
        panes: this.draggedPanes,
        action: {
          type: IgcPaneDragActionType.moveFloatingPane,
          oldLocation,
          newLocation
        },
        isValid: true
      });
      if (dragOverEvent.defaultPrevented) {
        return false;
      }
      else {
        if (dragOverEvent.detail.isValid) {
          this.moveFloatingPane(draggedPane, newLocation);
        }
        this.dockManager.isValidDrop = dragOverEvent.detail.isValid;
      }
    }
    return this.dragOver();
  }
  dragPaneEnd() {
    var _a;
    const dockingIndicator = this.dockingIndicator;
    const draggedPane = (_a = this.dockManager.draggedPane) !== null && _a !== void 0 ? _a : this.draggedTab;
    let docked = false;
    this.dockManager.paneDragEnd.emit({
      sourcePane: draggedPane,
      panes: this.draggedPanes
    });
    if (dockingIndicator && this.dockManager.isValidDrop) {
      if (draggedPane.type === IgcDockManagerPaneType.contentPane) {
        if (draggedPane.isPinned === false) {
          draggedPane.isPinned = true;
          if (draggedPane === this.dockManager.flyoutPane) {
            this.dockManager.flyoutPane = null;
          }
        }
      }
      if (dockingIndicator.isRoot) {
        this.rootDockPane(dockingIndicator.position);
      }
      else {
        this.dockPane(dockingIndicator.position);
      }
      docked = true;
    }
    this.draggedPanes = null;
    this.draggedTab = null;
    this.dockManager.draggedPane = null;
    this.dockManager.dropTargetPaneInfo = null;
    this.dockManager.dropShadowRect = null;
    this.dockManager.isValidDrop = true;
    this.dockManager.layoutChange.emit();
    return docked;
  }
  dragOver() {
    var _a;
    if (this.dockingIndicator) {
      const dragOverEvent = this.dockManager.paneDragOver.emit({
        sourcePane: this.dockManager.draggedPane,
        panes: this.draggedPanes,
        action: {
          type: IgcPaneDragActionType.dockPane,
          dockingIndicator: this.dockingIndicator,
          targetPane: (_a = this.dockManager.dropTargetPaneInfo) === null || _a === void 0 ? void 0 : _a.pane
        },
        isValid: true
      });
      if (dragOverEvent.defaultPrevented) {
        return false;
      }
      else {
        this.dockManager.isValidDrop = dragOverEvent.detail.isValid;
        this.dockManager.dropShadowRect = this.dockManager.isValidDrop ?
          this.dockingIndicator.isRoot ? this.getDropShadowRectRoot() : this.getDropShadowRect() :
          null;
      }
    }
    else {
      this.dockManager.dropShadowRect = null;
      if (this.dockManager.draggedPane.type !== IgcDockManagerPaneType.splitPane) {
        this.dockManager.isValidDrop = false;
      }
    }
    return true;
  }
  dragTabStart(pane) {
    this.shiftLeftThreshold = Number.MAX_VALUE;
    this.shiftRightThreshold = 0;
    if (this.dockManager.draggedPane === pane) {
      return true;
    }
    const dragStartEvent = this.dockManager.paneDragStart.emit({
      sourcePane: pane,
      panes: [pane]
    });
    if (dragStartEvent.defaultPrevented) {
      return false;
    }
    this.initialTabHeaderClickOffset = null;
    this.draggedTab = pane;
    this.draggedPanes = [pane];
    return true;
  }
  dragTabMove(pane, args, rects) {
    const clientX = args.clientX;
    const clientY = args.clientY;
    const offsetX = args.offsetX;
    const totalOffsetX = args.totalOffsetX;
    const totalOffsetY = args.totalOffsetY;
    const headerRect = rects.headerRect;
    const prevHeaderRect = rects.prevHeaderRect;
    const nextHeaderRect = rects.nextHeaderRect;
    const lastVisibleHeaderRect = rects.lastVisibleHeaderRect;
    const tabsRect = rects.tabsRect;
    if (!this.initialTabHeaderClickOffset) {
      const clickOffsetX = clientX - totalOffsetX - headerRect.left;
      const clickOffsetY = clientY - totalOffsetY - headerRect.top;
      this.initialTabHeaderClickOffset = { x: clickOffsetX, y: clickOffsetY };
    }
    if (pane.allowFloating === false
      && (clientX < tabsRect.left || clientX > tabsRect.right || clientY < headerRect.top || clientY > headerRect.bottom)) {
      this.dockManager.draggedPane = pane;
      return this.dragOver();
    }
    this.dockManager.draggedPane = null;
    this.dockManager.isValidDrop = true;
    const paneIndex = this.getParent(pane).panes.indexOf(pane);
    if (prevHeaderRect
      && clientX < headerRect.left
      && clientX < this.shiftLeftThreshold
      && offsetX < 0) {
      this.shiftLeftThreshold = prevHeaderRect.left;
      const action = {
        type: IgcPaneDragActionType.moveTab,
        oldIndex: paneIndex,
        newIndex: paneIndex - 1
      };
      const dragOverEvent = this.dockManager.paneDragOver.emit({
        sourcePane: pane,
        panes: [pane],
        action,
        isValid: true
      });
      if (dragOverEvent.defaultPrevented) {
        return false;
      }
      else if (!dragOverEvent.detail.isValid) {
        return true;
      }
      this.shiftTabLeft(pane);
    }
    else if (nextHeaderRect
      && clientX > headerRect.right
      && clientX > this.shiftRightThreshold
      && offsetX > 0) {
      this.shiftRightThreshold = nextHeaderRect.right;
      if (headerRect.top === nextHeaderRect.top) {
        const action = {
          type: IgcPaneDragActionType.moveTab,
          oldIndex: paneIndex,
          newIndex: paneIndex + 1
        };
        const dragOverEvent = this.dockManager.paneDragOver.emit({
          sourcePane: pane,
          panes: [pane],
          action,
          isValid: true
        });
        if (dragOverEvent.defaultPrevented) {
          return false;
        }
        else if (!dragOverEvent.detail.isValid) {
          return true;
        }
        this.shiftTabRight(pane);
      }
    }
    if (Math.abs(totalOffsetY) > IGC_DRAG_FLYOUT_THRESHOLD
      || tabsRect.left - clientX > IGC_DRAG_FLYOUT_THRESHOLD
      || clientX - lastVisibleHeaderRect.right > IGC_DRAG_FLYOUT_THRESHOLD) {
      if (pane.allowFloating !== false && !this.dockManager.maximizedPane) {
        return this.floatTabHeader(pane, clientX, clientY, tabsRect);
      }
    }
    return true;
  }
  floatTabHeader(pane, clientX, clientY, tabsRect) {
    const rect = new DOMRect(clientX - this.initialTabHeaderClickOffset.x, clientY - this.initialTabHeaderClickOffset.y, tabsRect.width, tabsRect.height);
    let panes;
    let parent;
    if (pane.type === IgcDockManagerPaneType.contentPane) {
      parent = this.getParent(pane);
      panes = parent.type === IgcDockManagerPaneType.tabGroupPane && pane !== this.dockManager.flyoutPane ?
        parent.panes :
        [pane];
    }
    this.draggedTab = null;
    const action = {
      type: IgcPaneDragActionType.floatPane,
      location: { x: rect.x, y: rect.y },
      width: rect.width,
      height: rect.height
    };
    const dragOverEvent = this.dockManager.paneDragOver.emit({
      sourcePane: pane,
      panes,
      action,
      isValid: true
    });
    if (dragOverEvent.defaultPrevented) {
      return false;
    }
    else if (!dragOverEvent.detail.isValid) {
      return true;
    }
    this.initialDragClientPoint = {
      x: clientX,
      y: clientY
    };
    this.floatTab(pane, rect.x, rect.y, action.width, action.height);
    return false;
  }
  resolveChildPanesAllowMaximize(pane) {
    const panes = this.getChildContentPanes(pane);
    const visiblePanes = panes.filter(p => this.isContentPaneVisible(p));
    return visiblePanes.every(p => { var _a; return (_a = p.allowMaximize) !== null && _a !== void 0 ? _a : this.dockManager.allowMaximize; });
  }
  normalizeMaximizedPane(pane) {
    if (this.dockManager.maximizedPane) {
      const panes = this.dockManager.maximizedPane.type === IgcDockManagerPaneType.splitPane || this.dockManager.maximizedPane.type === IgcDockManagerPaneType.tabGroupPane
        ? this.getChildContentPanes(this.dockManager.maximizedPane)
        : [this.dockManager.maximizedPane];
      if (panes.every(p => p !== pane)) {
        this.maximizePane(this.dockManager.maximizedPane);
      }
    }
  }
  resolveAllowMaximize(pane) {
    var _a, _b;
    if (pane.type === IgcDockManagerPaneType.splitPane || pane.type === IgcDockManagerPaneType.tabGroupPane) {
      return this.resolveChildPanesAllowMaximize(pane);
    }
    else if (pane.type === IgcDockManagerPaneType.contentPane) {
      if (!this.getActualIsPinned(pane)) {
        return (_a = pane.allowMaximize) !== null && _a !== void 0 ? _a : this.dockManager.allowMaximize;
      }
      const parent = this.getParent(pane);
      return parent.type === IgcDockManagerPaneType.tabGroupPane
        ? this.resolveChildPanesAllowMaximize(parent)
        : (_b = pane.allowMaximize) !== null && _b !== void 0 ? _b : this.dockManager.allowMaximize;
    }
  }
  getDropShadowRect() {
    var _a;
    const parentRect = this.dropTargetParentRect;
    const dropTargetPaneInfo = this.dockManager.dropTargetPaneInfo;
    if (!dropTargetPaneInfo) {
      return;
    }
    const shadowRect = new DOMRect();
    const draggedPaneSize = (_a = this.getPaneToDock(this.dockManager.draggedPane).size) !== null && _a !== void 0 ? _a : IGC_DEFAULT_PANE_SIZE;
    const isOuter = Utils.isDockingIndicatorOuter(this.dockingIndicator.position);
    const baseRect = isOuter ? parentRect : dropTargetPaneInfo.targetRect;
    if (this.dockingIndicator.position === IgcDockingIndicatorPosition.center) {
      shadowRect.x = baseRect.x;
      shadowRect.y = baseRect.y;
      shadowRect.width = baseRect.width;
      shadowRect.height = baseRect.height;
      return shadowRect;
    }
    const targetPane = isOuter ? dropTargetPaneInfo.docHost : dropTargetPaneInfo.pane;
    const targetParent = this.getParent(targetPane);
    const panes = this.getSplitPaneVisibleChildren(targetParent);
    const draggedPaneIndex = panes.indexOf(this.dockManager.draggedPane);
    if (draggedPaneIndex > -1) {
      panes.splice(draggedPaneIndex, 1);
    }
    const dropTargetIndex = panes.indexOf(targetPane);
    const isIndicatorVertical = Utils.isDockingIndicatorVertical(this.dockingIndicator.position);
    const isSplitPaneVertical = Utils.isSplitPaneVertical(targetParent);
    const isSameSplitPane = ((isIndicatorVertical && isSplitPaneVertical) || (!isIndicatorVertical && !isSplitPaneVertical));
    const isRTL = this.dockingIndicator.direction === 'rtl';
    const panesTotalSize = panes.reduce((a, b) => a + (b.size || IGC_DEFAULT_PANE_SIZE), 0);
    const beforePanesTotalSize = !isRTL || isIndicatorVertical
      ? panes.slice(0, dropTargetIndex).reduce((a, b) => a + (b.size || IGC_DEFAULT_PANE_SIZE), 0)
      : panes.slice(dropTargetIndex, panes.length).reduce((a, b) => a + (b.size || IGC_DEFAULT_PANE_SIZE), 0);
    const afterPanesTotalSize = !isRTL || isIndicatorVertical
      ? panes.slice(0, dropTargetIndex + 1).reduce((a, b) => a + (b.size || IGC_DEFAULT_PANE_SIZE), 0)
      : panes.slice(dropTargetIndex + 1, panes.length).reduce((a, b) => a + (b.size || IGC_DEFAULT_PANE_SIZE), 0);
    switch (this.dockingIndicator.position) {
      case IgcDockingIndicatorPosition.left:
      case IgcDockingIndicatorPosition.outerLeft:
        shadowRect.x = baseRect.x;
        shadowRect.y = baseRect.y;
        shadowRect.height = baseRect.height;
        if (isSameSplitPane) {
          shadowRect.width = (draggedPaneSize / (draggedPaneSize + panesTotalSize)) * parentRect.width;
          !isRTL
            ? shadowRect.x = parentRect.left + beforePanesTotalSize / (draggedPaneSize + panesTotalSize) * parentRect.width
            : shadowRect.x = parentRect.left + afterPanesTotalSize / (draggedPaneSize + panesTotalSize) * parentRect.width;
        }
        else {
          shadowRect.width = parentRect.width / 2;
        }
        break;
      case IgcDockingIndicatorPosition.right:
      case IgcDockingIndicatorPosition.outerRight:
        shadowRect.y = baseRect.y;
        shadowRect.height = baseRect.height;
        if (isSameSplitPane) {
          shadowRect.width = (draggedPaneSize / (draggedPaneSize + panesTotalSize)) * parentRect.width;
          !isRTL
            ? shadowRect.x = parentRect.left + afterPanesTotalSize / (draggedPaneSize + panesTotalSize) * parentRect.width
            : shadowRect.x = parentRect.left + beforePanesTotalSize / (draggedPaneSize + panesTotalSize) * parentRect.width;
        }
        else {
          shadowRect.width = parentRect.width / 2;
          shadowRect.x = parentRect.right - shadowRect.width;
        }
        break;
      case IgcDockingIndicatorPosition.top:
      case IgcDockingIndicatorPosition.outerTop:
        shadowRect.x = baseRect.x;
        shadowRect.y = baseRect.y;
        shadowRect.width = baseRect.width;
        if (isSameSplitPane) {
          shadowRect.height = (draggedPaneSize / (draggedPaneSize + panesTotalSize)) * parentRect.height;
          shadowRect.y = parentRect.top + beforePanesTotalSize / (draggedPaneSize + panesTotalSize) * parentRect.height;
        }
        else {
          shadowRect.height = parentRect.height / 2;
        }
        break;
      case IgcDockingIndicatorPosition.bottom:
      case IgcDockingIndicatorPosition.outerBottom:
        shadowRect.x = baseRect.x;
        shadowRect.width = baseRect.width;
        if (isSameSplitPane) {
          shadowRect.height = (draggedPaneSize / (draggedPaneSize + panesTotalSize)) * parentRect.height;
          shadowRect.y = parentRect.top + afterPanesTotalSize / (draggedPaneSize + panesTotalSize) * parentRect.height;
        }
        else {
          shadowRect.height = parentRect.height / 2;
          shadowRect.y = parentRect.bottom - shadowRect.height;
        }
        break;
    }
    return shadowRect;
  }
  getDropShadowRectRoot() {
    var _a;
    const rootRect = this.dropTargetParentRect;
    const shadowRect = new DOMRect();
    const draggedPaneSize = (_a = this.getPaneToDock(this.dockManager.draggedPane).size) !== null && _a !== void 0 ? _a : IGC_DEFAULT_PANE_SIZE;
    const panes = this.getSplitPaneVisibleChildren(this.dockManager.layout.rootPane);
    const draggedPaneIndex = panes.indexOf(this.dockManager.draggedPane);
    if (draggedPaneIndex > -1) {
      panes.splice(draggedPaneIndex, 1);
    }
    const panesTotalSize = panes.reduce((a, b) => a + (b.size || IGC_DEFAULT_PANE_SIZE), 0);
    const isIndicatorVertical = Utils.isDockingIndicatorVertical(this.dockingIndicator.position);
    const isSplitPaneVertical = Utils.isSplitPaneVertical(this.dockManager.layout.rootPane);
    const isSameSplitPane = (isIndicatorVertical && isSplitPaneVertical) || (!isIndicatorVertical && !isSplitPaneVertical);
    const isEmptyDockManager = panes.length === 0;
    switch (this.dockingIndicator.position) {
      case IgcDockingIndicatorPosition.left:
        shadowRect.x = rootRect.x;
        shadowRect.y = rootRect.y;
        shadowRect.height = rootRect.height;
        shadowRect.width = isSameSplitPane || isEmptyDockManager ? (draggedPaneSize / (draggedPaneSize + panesTotalSize) * rootRect.width) : (rootRect.width / 2);
        break;
      case IgcDockingIndicatorPosition.right:
        shadowRect.y = rootRect.y;
        shadowRect.height = rootRect.height;
        shadowRect.width = isSameSplitPane || isEmptyDockManager ? (shadowRect.width = draggedPaneSize / (draggedPaneSize + panesTotalSize) * rootRect.width) : (rootRect.width / 2);
        shadowRect.x = rootRect.right - shadowRect.width;
        break;
      case IgcDockingIndicatorPosition.top:
        shadowRect.x = rootRect.x;
        shadowRect.y = rootRect.y;
        shadowRect.width = rootRect.width;
        shadowRect.height = isSameSplitPane || isEmptyDockManager ? (draggedPaneSize / (draggedPaneSize + panesTotalSize) * rootRect.height) : (rootRect.height / 2);
        break;
      case IgcDockingIndicatorPosition.bottom:
        shadowRect.x = rootRect.x;
        shadowRect.width = rootRect.width;
        shadowRect.height = isSameSplitPane || isEmptyDockManager ? (draggedPaneSize / (draggedPaneSize + panesTotalSize) * rootRect.height) : (rootRect.height / 2);
        shadowRect.y = rootRect.bottom - shadowRect.height;
        break;
    }
    return shadowRect;
  }
  selectHiddenTab(tabGroup, pane) {
    const index = tabGroup.panes.indexOf(pane);
    tabGroup.panes.splice(index, 1);
    tabGroup.panes.splice(0, 0, pane);
    tabGroup.selectedIndex = 0;
    this.updateLayout();
  }
  shiftTabLeft(pane) {
    const tabGroup = this.getParent(pane);
    const draggedIndex = tabGroup.panes.indexOf(pane);
    if (draggedIndex > 0) {
      tabGroup.panes.splice(draggedIndex, 1);
      tabGroup.panes.splice(draggedIndex - 1, 0, pane);
      tabGroup.selectedIndex = draggedIndex - 1;
      this.updateLayout();
    }
    this.forceDragTabHeader = pane;
  }
  shiftTabRight(pane) {
    const tabGroup = this.getParent(pane);
    const draggedIndex = tabGroup.panes.indexOf(pane);
    if (draggedIndex < tabGroup.panes.length - 1) {
      tabGroup.panes.splice(draggedIndex, 1);
      tabGroup.panes.splice(draggedIndex + 1, 0, pane);
      tabGroup.selectedIndex = draggedIndex + 1;
      this.updateLayout();
    }
    this.forceDragTabHeader = pane;
  }
  cacheDocumentsOrder() {
    this.documentsCache = this.visibleDocuments.filter(c => !c.disabled);
  }
  cacheContentPanesOrder() {
    this.contentPanesCache = this.visibleContentPanes.filter(c => !c.disabled);
  }
  focusPrevContentPane(isInDocHost) {
    const contentPanesCache = isInDocHost ? this.documentsCache : this.contentPanesCache;
    const activePaneIndex = contentPanesCache.indexOf(this.dockManager.activePane);
    const prevPane = activePaneIndex > 0 ?
      contentPanesCache[activePaneIndex - 1] :
      contentPanesCache[contentPanesCache.length - 1];
    this.normalizeMaximizedPane(prevPane);
    this.dockManager.activePane = prevPane;
  }
  focusNextContentPane(isInDocHost) {
    const contentPanesCache = isInDocHost ? this.documentsCache : this.contentPanesCache;
    const activePaneIndex = contentPanesCache.indexOf(this.dockManager.activePane);
    const nextPane = (activePaneIndex >= 0 && activePaneIndex < contentPanesCache.length - 1) ?
      contentPanesCache[activePaneIndex + 1] :
      contentPanesCache[0];
    this.normalizeMaximizedPane(nextPane);
    this.dockManager.activePane = nextPane;
  }
}

/**
 * @hidden
 */
class IgcDockManagerKeyboardService {
  constructor(service) {
    this.service = service;
  }
  handleKeydown(event) {
    if (this.service.dockManager.disableKeyboardNavigation) {
      return;
    }
    const activePane = this.service.dockManager.activePane;
    const ctrlOrMetaKey = Utils.isControlOrMetaPressed(event);
    const altKey = Utils.isAltPressed(event);
    const shiftKey = event.shiftKey;
    if (event.key === 'Control' || event.key === 'Meta' || event.key === 'OS') {
      this.service.cacheDocumentsOrder();
    }
    else if (event.key === 'Alt' || event.key === 'AltGraph') {
      this.service.cacheContentPanesOrder();
    }
    else if (event.key === 'F6' || (event.key.startsWith('Arrow') && !shiftKey && ctrlOrMetaKey)) {
      this.handleFocusPane(event);
      event.stopPropagation();
    }
    else if (event.key === 'F3' && altKey && activePane) {
      this.service.dockManager.focusElement();
      this.service.closePane(activePane);
      event.stopPropagation();
    }
    else if (event.key.startsWith('Arrow') && shiftKey && activePane) {
      this.service.dockManager.focusElement();
      this.handleDockPane(event);
      event.stopPropagation();
    }
    else if ((event.key === 'F7' || event.key === 'F8') && (altKey || ctrlOrMetaKey)) {
      this.setPaneNavigatorMeta(altKey, ctrlOrMetaKey, shiftKey);
      event.stopPropagation();
    }
    else {
      return;
    }
  }
  handleFocusPane(event) {
    const altKey = Utils.isAltPressed(event);
    const ctrlOrMetaKey = Utils.isControlOrMetaPressed(event);
    const shiftKey = event.shiftKey;
    const f6 = event.key === 'F6';
    const arrowLeft = event.key === 'ArrowLeft';
    const arrowRight = event.key === 'ArrowRight';
    if (altKey && shiftKey && f6) {
      this.service.focusPrevContentPane(false);
    }
    else if (altKey && f6) {
      this.service.focusNextContentPane(false);
    }
    else if ((ctrlOrMetaKey && shiftKey && f6) || (ctrlOrMetaKey && arrowLeft)) {
      this.service.focusPrevContentPane(true);
    }
    else if ((ctrlOrMetaKey && f6) || (ctrlOrMetaKey && arrowRight)) {
      this.service.focusNextContentPane(true);
    }
  }
  handleDockPane(event) {
    const key = event.key;
    const ctrlOrMetaKey = Utils.isControlOrMetaPressed(event);
    const shiftKey = event.shiftKey;
    if (ctrlOrMetaKey && shiftKey) {
      this.handleRootDockPane(key);
    }
    else if (shiftKey) {
      const activePane = this.service.dockManager.activePane;
      const activePaneParent = this.service.getParent(activePane);
      if (activePaneParent.type === IgcDockManagerPaneType.tabGroupPane && activePaneParent.panes.length > 1) {
        this.handleInnerDockPane(key);
      }
    }
  }
  handleRootDockPane(key) {
    switch (key) {
      case 'ArrowUp':
        this.service.rootDockPane(IgcDockingIndicatorPosition.top);
        break;
      case 'ArrowDown':
        this.service.rootDockPane(IgcDockingIndicatorPosition.bottom);
        break;
      case 'ArrowLeft':
        this.service.rootDockPane(IgcDockingIndicatorPosition.left);
        break;
      case 'ArrowRight':
        this.service.rootDockPane(IgcDockingIndicatorPosition.right);
        break;
    }
  }
  handleInnerDockPane(key) {
    switch (key) {
      case 'ArrowUp':
        this.service.dockPane(IgcDockingIndicatorPosition.top);
        break;
      case 'ArrowDown':
        this.service.dockPane(IgcDockingIndicatorPosition.bottom);
        break;
      case 'ArrowLeft':
        this.service.dockPane(IgcDockingIndicatorPosition.left);
        break;
      case 'ArrowRight':
        this.service.dockPane(IgcDockingIndicatorPosition.right);
        break;
    }
  }
  setPaneNavigatorMeta(altKey, ctrlOrMetaKey, shiftKey) {
    let initIndex = 0;
    const allItems = this.service.visibleContentPanes.concat(this.service.visibleDocuments);
    if (allItems.length > 0) {
      if (ctrlOrMetaKey) {
        if (this.service.visibleDocuments.length > 0) {
          initIndex = shiftKey ?
            this.service.visibleContentPanes.length + this.service.visibleDocuments.length - 1 :
            this.service.visibleContentPanes.length;
        }
        else {
          initIndex = shiftKey ? this.service.visibleContentPanes.length - 1 : 0;
        }
      }
      else if (altKey) {
        initIndex = shiftKey ?
          this.service.visibleContentPanes.length > 0 ?
            this.service.visibleContentPanes.length - 1 :
            this.service.visibleDocuments.length - 1 :
          0;
      }
      const metadata = {
        activePanes: this.service.visibleContentPanes,
        activeDocuments: this.service.visibleDocuments,
        initialIndex: initIndex,
        previousActivePaneIndex: allItems.indexOf(this.service.dockManager.activePane)
      };
      this.service.dockManager.activePane = null;
      this.service.dockManager.navigationPaneMeta = metadata;
    }
  }
}

const dockmanagerComponentCss = ":host{position:relative;display:-ms-flexbox;display:flex;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;height:100%;background:var(--igc-dock-background, var(--igc-background-color, #E5E7E9));color:var(--igc-dock-text, var(--igc-text-color, rgba(0, 0, 0, 0.72)));font-family:var(--igc-font-family, \"Titillium Web\", \"Roboto\", \"Helvetica Neue\", sans-serif);outline-style:none;--unpinned-tab-area-size:30px}:host igc-icon-component svg{width:17px;height:17px}.pane-container--vertical,.pane-container--horizontal,.pane-container{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;height:100%;width:100%;overflow:hidden}.pane-container--vertical{-ms-flex-direction:column;flex-direction:column}.unpinned-tab-area{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:var(--unpinned-tab-area-size);height:auto}.unpinned-tab-area--left{padding:8px 8px 8px 0}.unpinned-tab-area--right{padding:8px 0 8px 8px}.unpinned-tab-area--bottom{padding-top:8px}.unpinned-tab-area--horizontal{-ms-flex-direction:row;flex-direction:row;width:auto;height:var(--unpinned-tab-area-size)}.unpinned-tab-area--hidden{display:none}.flyout-pane{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:absolute;width:100%;height:100%;pointer-events:none;z-index:2}.flyout-pane igc-content-pane-component{-webkit-box-shadow:0 12px 8px var(--igc-flyout-shadow-color, rgba(0, 0, 0, 0.08));box-shadow:0 12px 8px var(--igc-flyout-shadow-color, rgba(0, 0, 0, 0.08))}.flyout-pane--right{-ms-flex-direction:row-reverse;flex-direction:row-reverse}.flyout-pane--right igc-content-pane-component{-webkit-box-shadow:-12px 0px 8px var(--igc-flyout-shadow-color, rgba(0, 0, 0, 0.08));box-shadow:-12px 0px 8px var(--igc-flyout-shadow-color, rgba(0, 0, 0, 0.08))}.flyout-pane--bottom{-ms-flex-direction:column-reverse;flex-direction:column-reverse}.flyout-pane--bottom igc-content-pane-component{-webkit-box-shadow:0 -12px 8px var(--igc-flyout-shadow-color, rgba(0, 0, 0, 0.08));box-shadow:0 -12px 8px var(--igc-flyout-shadow-color, rgba(0, 0, 0, 0.08))}.flyout-pane--left{-ms-flex-direction:row;flex-direction:row}.flyout-pane--left igc-content-pane-component{-webkit-box-shadow:12px 0px 8px var(--igc-flyout-shadow-color, rgba(0, 0, 0, 0.08));box-shadow:12px 0px 8px var(--igc-flyout-shadow-color, rgba(0, 0, 0, 0.08))}.floating-panes{position:fixed;top:0;left:0;bottom:0;right:0;pointer-events:none;z-index:10000}.docking-indicators-container{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;pointer-events:none;z-index:10004}.content{overflow:auto;height:100%;-ms-flex-positive:1;flex-grow:1;color:var(--igc-pane-content-text, var(--igc-text-color, rgba(0, 0, 0, 0.72)));background:var(--igc-pane-content-background, var(--igc-border-color, #F3F5F7))}.maximized{position:absolute;top:0;bottom:0;left:0;right:0;z-index:10002}.drop-shadow{background-color:var(--igc-drop-shadow-background, rgba(100, 149, 237, 0.2));position:fixed;z-index:10003;display:block;pointer-events:none}";

var ActionReason;
(function (ActionReason) {
  ActionReason["click"] = "click";
  ActionReason["drop"] = "drop";
  ActionReason["maximizeOrMinimize"] = "maximizeOrMinimize";
})(ActionReason || (ActionReason = {}));
let IgcDockManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.paneHeaderConnected = createEvent(this, "paneHeaderConnected", 7);
    this.paneHeaderDisconnected = createEvent(this, "paneHeaderDisconnected", 7);
    this.tabHeaderConnected = createEvent(this, "tabHeaderConnected", 7);
    this.tabHeaderDisconnected = createEvent(this, "tabHeaderDisconnected", 7);
    this.splitterResizeStart = createEvent(this, "splitterResizeStart", 7);
    this.splitterResizeEnd = createEvent(this, "splitterResizeEnd", 7);
    this.paneClose = createEvent(this, "paneClose", 7);
    this.panePinnedToggle = createEvent(this, "panePinnedToggle", 7);
    this.activePaneChanged = createEvent(this, "activePaneChanged", 7);
    this.paneDragStart = createEvent(this, "paneDragStart", 7);
    this.paneDragOver = createEvent(this, "paneDragOver", 7);
    this.paneDragEnd = createEvent(this, "paneDragEnd", 7);
    this.floatingPaneResizeMove = createEvent(this, "floatingPaneResizeMove", 7);
    this.floatingPaneResizeEnd = createEvent(this, "floatingPaneResizeEnd", 7);
    this.floatingPaneResizeStart = createEvent(this, "floatingPaneResizeStart", 7);
    this.layoutChange = createEvent(this, "layoutChange", 7);
    this._tabHeaderIconClicked = false;
    this.service = new IgcDockManagerService(this);
    this.keyboardService = new IgcDockManagerKeyboardService(this.service);
    this.activePaneInternalSet = false;
    this.domObserver = new MutationObserver(this.mutationCallback.bind(this));
    this.shouldMovePane = false;
    this.scheduledCallbacks = [];
    this.shouldClearActivePane = true;
    this.isDragging = false;
    this.splitterOffset = 1;
    this.templatableComponents = [
      {
        slot: 'paneHeaderCloseButton',
        targetName: 'igc-pane-header-component',
        targetSlot: 'paneHeaderCloseButton',
        targetPart: 'pane-header-close-button'
      },
      {
        slot: 'tabHeaderCloseButton',
        targetName: 'igc-tab-header-component',
        targetSlot: 'tabHeaderCloseButton',
        targetPart: 'tab-header-close-button'
      },
      {
        slot: 'tabHeaderCloseButton',
        targetName: 'igc-context-menu-component',
        targetSlot: 'contextMenuCloseButton',
        targetPart: 'context-menu-close-button'
      },
      {
        slot: 'closeButton',
        targetName: 'igc-pane-header-component',
        targetSlot: 'paneHeaderCloseButton',
        targetPart: 'pane-header-close-button'
      },
      {
        slot: 'closeButton',
        targetName: 'igc-tab-header-component',
        targetSlot: 'tabHeaderCloseButton',
        targetPart: 'tab-header-close-button'
      },
      {
        slot: 'closeButton',
        targetName: 'igc-context-menu-component',
        targetSlot: 'contextMenuCloseButton',
        targetPart: 'context-menu-close-button'
      },
      {
        slot: 'moreTabsButton',
        targetName: 'igc-tabs-component',
        targetSlot: 'tabsMoreButton',
        targetPart: 'tabs-more-button'
      },
      {
        slot: 'maximizeButton',
        targetName: 'igc-pane-header-component',
        targetSlot: 'paneHeaderMaximizeButton',
        targetPart: 'pane-header-maximize-button'
      },
      {
        slot: 'maximizeButton',
        targetName: 'igc-tabs-component',
        targetSlot: 'tabsMaximizeButton',
        targetPart: 'tabs-maximize-button'
      },
      {
        slot: 'minimizeButton',
        targetName: 'igc-pane-header-component',
        targetSlot: 'paneHeaderMinimizeButton',
        targetPart: 'pane-header-minimize-button'
      },
      {
        slot: 'minimizeButton',
        targetName: 'igc-tabs-component',
        targetSlot: 'tabsMinimizeButton',
        targetPart: 'tabs-minimize-button'
      },
      {
        slot: 'pinButton',
        targetName: 'igc-pane-header-component',
        targetSlot: 'paneHeaderPinButton',
        targetPart: 'pane-header-pin-button'
      },
      {
        slot: 'unpinButton',
        targetName: 'igc-pane-header-component',
        targetSlot: 'paneHeaderUnpinButton',
        targetPart: 'pane-header-unpin-button'
      },
      {
        slot: 'unpinButton',
        targetName: 'igc-context-menu-component',
        targetSlot: 'contextMenuUnpinButton',
        targetPart: 'context-menu-unpin-button'
      },
      {
        slot: 'moreOptionsButton',
        targetName: 'igc-tab-header-component',
        targetSlot: 'tabHeaderMoreOptionsButton',
        targetPart: 'tab-header-more-options-button'
      },
      {
        slot: 'splitterHandle',
        targetName: 'igc-splitter-component',
        targetSlot: 'splitterHandle',
        targetPart: 'splitter-handle'
      },
    ];
    this.floatingPaneZIndicesMap = new Map();
    this.templates = new Map();
    this.allowMaximize = true;
    this.allowFloatingPanesResize = true;
    this.disableKeyboardNavigation = false;
    this.activePane = null;
    this.updateTemplates = () => {
      if (this.templates.size > 0) {
        return;
      }
      const slotted = this.element.shadowRoot.querySelectorAll('slot');
      const slottedArray = Array.from(slotted);
      const usedTemplates = new Map();
      const templatableSlots = this.templatableComponents.map(comp => comp.slot);
      templatableSlots.forEach(slot => {
        const matchedSlots = slottedArray.filter((s) => s.name === slot);
        if (!this.templates.get(slot) && matchedSlots.length > 0 && matchedSlots[0].assignedElements().length > 0) {
          usedTemplates.set(slot, matchedSlots[0].assignedElements()[0]);
        }
      });
      this.templates = usedTemplates;
    };
    this.handleCustomContentFocusIn = (eventArgs) => {
      const parent = eventArgs.currentTarget;
      if (parent) {
        const contentPane = this.service.clientContentPanesMap.get(parent.slot);
        if (!contentPane) {
          return;
        }
        this.setActivePane(contentPane);
      }
    };
    this._isValidDrop = true;
    this.handleShadowRootFocusOut = () => {
      if (this.paneToFocus) {
        return;
      }
      const rootNode = this.getRootNode();
      requestAnimationFrame(() => {
        if (!this.element.shadowRoot.activeElement && rootNode.activeElement === this.element && this.reason !== ActionReason.maximizeOrMinimize) {
          this.clearActivePane();
        }
      });
    };
  }
  flyoutPaneChanged(newValue) {
    if (newValue) {
      this.scheduleAfterRender(() => {
        this.setFocus(newValue);
      });
    }
  }
  layoutChanged() {
    this.service.processLayout();
    if (!this.isDragging) {
      this.layoutChange.emit();
    }
  }
  draggedPaneChanged() {
    if (this.draggedPane) {
      const panes = this.draggedPane.type === IgcDockManagerPaneType.contentPane ?
        [this.draggedPane] :
        this.service.getChildContentPanes(this.draggedPane);
      this.showDockingIndicators = panes.every(p => p.allowDocking !== false);
      this.documentOnlyDrag = panes.some(p => p.documentOnly);
    }
    else {
      this.showDockingIndicators = false;
      this.documentOnlyDrag = false;
    }
  }
  dropPositionChanged() {
    var _a, _b;
    this.paneDragMoved((_a = this.dropPosition) === null || _a === void 0 ? void 0 : _a.x, (_b = this.dropPosition) === null || _b === void 0 ? void 0 : _b.y);
  }
  activePaneChange(newValue, oldValue) {
    var _a;
    const args = { newPane: newValue, oldPane: oldValue };
    if (this.flyoutPane && newValue && newValue !== this.flyoutPane) {
      this.service.flyoutPane(this.flyoutPane);
    }
    this.activePaneChanged.emit(args);
    this.contentPaneId = (newValue === null || newValue === void 0 ? void 0 : newValue.contentId) || this.contentPaneId;
    if (this.activePaneInternalSet) {
      this.activePaneInternalSet = false;
      return;
    }
    if (newValue) {
      if (newValue.isPinned === false) {
        requestAnimationFrame(() => {
          this.service.flyoutPane(newValue);
        });
        // return because setFocus will be called in flyoutPaneChanged
        this.paneToFocus = newValue;
        return;
      }
      else {
        const parent = this.service.getParent(newValue);
        if (parent.type === IgcDockManagerPaneType.tabGroupPane && parent.panes.length > 1) {
          const visibleTabs = this.service.getVisibleContentPanes(parent);
          const tabHeaderElement = this.tabHeadersMap.get(newValue);
          const firstTabRect = this.tabHeadersMap
            .get(visibleTabs[0])
            .getBoundingClientRect();
          const headerRect = tabHeaderElement.getBoundingClientRect();
          // return if the selected index is changed because setFocus will be called in handleTabSelectedChanged
          if (headerRect.top !== firstTabRect.top) { // header is hidden
            this.service.selectHiddenTab(parent, newValue);
            this.paneToFocus = newValue;
            return;
          }
          else {
            const visibleIndex = visibleTabs.indexOf(newValue);
            const selectedIndex = (_a = parent.selectedIndex) !== null && _a !== void 0 ? _a : 0;
            if (selectedIndex !== visibleIndex) {
              parent.selectedIndex = visibleIndex;
              this.paneToFocus = newValue;
              return;
            }
          }
        }
      }
    }
    this.scheduleAfterRender(() => {
      this.setFocus(newValue);
    });
  }
  handleFocusOut(_event) {
    if (this.paneToFocus) {
      return;
    }
    const rootNode = this.getRootNode();
    if (!this._tabHeaderIconClicked && !this.isDragging) {
      requestAnimationFrame(() => {
        if (!this.element.contains(rootNode.activeElement)) {
          this.clearActivePane();
        }
      });
    }
    this._tabHeaderIconClicked = false;
  }
  handleKeyDown(event) {
    this.keyboardService.handleKeydown(event);
  }
  handlePointerDown(event) {
    const pathHTMLElements = event.composedPath().filter(e => e instanceof HTMLElement).map(e => e);
    const isMaximizeOrMinimize = pathHTMLElements.filter(e => e.attributes.getNamedItem('part') &&
      (e.attributes.getNamedItem('part').value === 'tabs-minimize-button' || e.attributes.getNamedItem('part').value === 'tabs-maximize-button')).length > 0;
    if (isMaximizeOrMinimize) {
      this.reason = ActionReason.maximizeOrMinimize;
    }
  }
  handlePointerUp() {
    this.reason = null;
  }
  async dropPane() {
    const docked = this.handlePaneDragEnd();
    return Promise.resolve(docked);
  }
  async removePane(pane) {
    this.service.removePane(pane);
  }
  connectedCallback() {
    this.element.shadowRoot.addEventListener('focusout', this.handleShadowRootFocusOut);
    this.domObserver.observe(this.element, { attributes: true, subtree: true, childList: true });
    const dockManagerChildren = Array.from(this.element.children);
    for (const htmlElem of dockManagerChildren) {
      const elem = htmlElem;
      elem === null || elem === void 0 ? void 0 : elem.addEventListener('focusin', this.handleCustomContentFocusIn);
    }
  }
  componentWillLoad() {
    this.contextMenuMeta = null;
    this.navigationPaneMeta = null;
    if (this.layout) {
      this.layoutChanged();
    }
    if (!this.resourceStrings) {
      const closestElement = this.element.closest('[lang]');
      const lang = closestElement ? closestElement.lang.toLowerCase() : 'en';
      this.resourceStrings = resourceStringsMap.has(lang) ? resourceStringsMap.get(lang) : resourceStringsMap.get('en');
    }
  }
  componentDidRender() {
    while (this.scheduledCallbacks.length) {
      const callback = this.scheduledCallbacks.shift();
      callback();
    }
    this.processTemplates();
  }
  disconnectedCallback() {
    this.element.shadowRoot.removeEventListener('focusout', this.handleShadowRootFocusOut);
    this.removeCustomContentEventListeners();
    this.domObserver.disconnect();
  }
  focusElement() {
    this.element.focus();
  }
  handleTabsRendered(pane) {
    var _a;
    if (this.reason !== ActionReason.drop) {
      return;
    }
    if (((_a = pane.panes) === null || _a === void 0 ? void 0 : _a.length) > 0) {
      const focusablePane = this.findFocusablePane(pane.panes);
      if ((focusablePane === null || focusablePane === void 0 ? void 0 : focusablePane.contentId) === this.contentPaneId) {
        pane.selectedIndex = pane.panes.indexOf(focusablePane);
        this.setActivePane(focusablePane);
        this.setFocus(focusablePane);
      }
    }
  }
  handleSplitPaneRendered(panes) {
    if (this.reason !== ActionReason.drop) {
      return;
    }
    const focusablePane = this.findFocusablePane(panes);
    if ((focusablePane === null || focusablePane === void 0 ? void 0 : focusablePane.contentId) === this.contentPaneId) {
      this.setActivePane(focusablePane);
      this.setFocus(focusablePane);
    }
  }
  findFocusablePane(panes, candidate) {
    const splitPanes = panes.filter(p => p.type === IgcDockManagerPaneType.splitPane);
    for (const pane of splitPanes) {
      if (candidate) {
        return candidate;
      }
      const splitPane = pane;
      candidate = this.findFocusablePane(splitPane.panes);
    }
    const tabGroupPanes = panes.filter(p => p.type === IgcDockManagerPaneType.tabGroupPane);
    for (const pane of tabGroupPanes) {
      if (candidate) {
        return candidate;
      }
      const tabGroupPane = pane;
      candidate = tabGroupPane.selectedIndex ? tabGroupPane.panes[tabGroupPane.selectedIndex] : this.findFocusablePane(tabGroupPane.panes);
    }
    const docHost = panes.filter(p => p.type === IgcDockManagerPaneType.documentHost);
    for (const pane of docHost) {
      if (candidate) {
        return candidate;
      }
      const docHostPane = pane;
      candidate = this.findFocusablePane([docHostPane.rootPane]);
    }
    candidate = panes.find(p => p.type === IgcDockManagerPaneType.contentPane
      && p.contentId === this.contentPaneId) || candidate;
    if (candidate) {
      return candidate;
    }
    return panes.find(p => p.type === IgcDockManagerPaneType.contentPane);
  }
  processTemplates() {
    if (this.templates.size === 0) {
      return;
    }
    this.templatableComponents.forEach(component => {
      const template = this.templates.get(component.slot);
      if (template) {
        template.setAttribute('slot', component.targetSlot);
        template.setAttribute('part', component.targetPart);
        const componentMatches = this.element.shadowRoot.querySelectorAll(component.targetName);
        componentMatches.forEach(match => {
          const slottedClose = match.querySelectorAll('[slot="' + component.targetSlot + '"]');
          if (slottedClose.length === 0) {
            match.appendChild(template.cloneNode(true));
          }
        });
      }
    });
  }
  getRootNode() {
    return this.element.getRootNode();
  }
  scheduleAfterRender(callback) {
    this.scheduledCallbacks.push(callback);
  }
  handleTabHeaderFocus(pane) {
    if (!this._tabHeaderIconClicked) {
      this.setActivePane(pane);
    }
  }
  handleContentPaneFocus(pane) {
    this.setActivePane(pane);
  }
  handleUnpinnedHeaderFocus(pane) {
    // delay the setting of the active pane, in case the unpinned tab is clicked it should focus the content pane first
    requestAnimationFrame(() => {
      this.setActivePane(pane);
    });
  }
  setFocus(pane) {
    if (!pane) {
      return;
    }
    this.paneToFocus = null;
    let elemToFocus = this.contentPanesElementMap.get(pane);
    if (!elemToFocus) {
      elemToFocus = this.tabHeadersMap.get(pane);
    }
    if (!elemToFocus) {
      elemToFocus = this.unpinnedHeadersMap.get(pane);
    }
    if (!elemToFocus) {
      throw new Error('No matching pane!');
    }
    elemToFocus.focus();
  }
  setActivePane(pane) {
    if (this.activePane !== pane) {
      this.activePaneInternalSet = true;
      this.activePane = pane;
    }
  }
  removeCustomContentEventListeners() {
    const dockManagerChildren = Array.from(this.element.children);
    dockManagerChildren.forEach(child => {
      child.removeEventListener('focusin', this.handleCustomContentFocusIn);
    });
  }
  mutationCallback(records) {
    records.filter(rec => rec.type === 'childList').forEach(child => {
      child.addedNodes.forEach(c => {
        c.addEventListener('focusin', this.handleCustomContentFocusIn);
      });
      child.removedNodes.forEach(r => {
        r.removeEventListener('focusin', this.handleCustomContentFocusIn);
      });
    });
  }
  get isValidDrop() {
    return this._isValidDrop;
  }
  set isValidDrop(value) {
    if (this._isValidDrop !== value) {
      this._isValidDrop = value;
      document.body.style.cursor = this._isValidDrop ? 'default' : 'not-allowed';
    }
  }
  handleFlyoutSplitterResizeEnd(pane, orientation, event) {
    this.service.resizeFlyoutPane(event.detail);
    let offset = this.splitterOffset * event.detail;
    let rect;
    const splitter = event.target;
    rect = splitter.previousElementSibling.getBoundingClientRect();
    const paneWidth = orientation === IgcSplitPaneOrientation.horizontal ? rect.width + offset : rect.width;
    const paneHeight = orientation === IgcSplitPaneOrientation.vertical ? rect.height + offset : rect.height;
    this.splitterResizeEnd.emit({ pane, orientation, paneWidth, paneHeight });
  }
  handleSplitterResizeStart(pane, event) {
    const splitter = event.target;
    const orientation = splitter.splitPaneOrientation;
    let rect;
    const splitterEl = event.target;
    rect = pane === this.flyoutPane ? splitterEl.previousElementSibling.getBoundingClientRect() : splitterEl.nextElementSibling.getBoundingClientRect();
    const paneWidth = rect.width;
    const paneHeight = rect.height;
    const resizeStartEvent = this.splitterResizeStart.emit({ pane, orientation, paneWidth, paneHeight });
    if (resizeStartEvent.defaultPrevented) {
      this.splitterOffset = 0;
      splitter.showDragGhost = false;
    }
    else {
      this.splitterOffset = 1;
      splitter.showDragGhost = true;
    }
  }
  handleSplitterResizeEnd(parentPane, pane, event) {
    const splitter = event.target;
    const splitPane = splitter.parentElement;
    const splitPaneChildren = Array.from(splitPane.children);
    const paneComponents = splitPaneChildren.filter(c => c.tagName.toLowerCase() !== 'igc-splitter-component');
    const sizeProperty = parentPane.orientation === IgcSplitPaneOrientation.horizontal ? 'offsetWidth' : 'offsetHeight';
    const sizeSum = paneComponents.reduce((s, p) => p[sizeProperty] + s, 0);
    let offsetPercentage = this.splitterOffset * event.detail / sizeSum;
    let rtl = false;
    if (this.element.dir !== '') {
      rtl = this.element.dir === 'rtl';
    }
    else {
      let parent = this.element.parentElement;
      while (parent) {
        if (parent.dir !== '') {
          rtl = parent.dir === 'rtl';
          break;
        }
        parent = parent.parentElement;
      }
    }
    if (rtl && parentPane.orientation === IgcSplitPaneOrientation.horizontal) {
      offsetPercentage *= -1;
    }
    this.service.resizePane(pane, offsetPercentage);
    const orientation = parentPane.orientation;
    let rect;
    rect = splitter.nextElementSibling.getBoundingClientRect();
    const paneWidth = orientation === IgcSplitPaneOrientation.horizontal ? rect.width - offsetPercentage * sizeSum : rect.width;
    const paneHeight = orientation === IgcSplitPaneOrientation.vertical ? rect.height - offsetPercentage * sizeSum : rect.height;
    this.splitterResizeEnd.emit({ pane, orientation, paneWidth, paneHeight });
  }
  clearActivePane() {
    if (this.activePane && this.shouldClearActivePane && this.reason !== ActionReason.drop) {
      this.setActivePane(null);
    }
  }
  handlePinToggle(pane) {
    this.shouldClearActivePane = false;
    this.service.togglePin(pane);
    this.scheduleAfterRender(() => {
      this.shouldClearActivePane = true;
      this.setFocus(pane);
    });
  }
  handlePaneClose(pane) {
    this.focusElement();
    this.service.closePane(pane);
  }
  handleFloatingPaneClose(pane) {
    this.focusElement();
    this.service.closeFloatingPane(pane);
  }
  handleMaximize(pane) {
    this.service.maximizePane(pane);
    this.scheduleAfterRender(() => {
      const paneToFocus = this.findFocusablePane([pane]);
      this.setFocus(paneToFocus);
    });
  }
  handleUnpinnedTabMouseDown(pane, event) {
    const target = event.currentTarget;
    const rootNode = this.getRootNode();
    this.contentPaneId = pane.id;
    requestAnimationFrame(() => {
      if (this.element === rootNode.activeElement || !this.element.contains(rootNode.activeElement)) {
        target.focus();
      }
      this.handlePaneFlyout(pane);
    });
  }
  handlePaneFlyout(pane) {
    this.service.flyoutPane(pane);
  }
  handleUnpinnedTabKeyDown(pane, event) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handlePaneFlyout(pane);
    }
  }
  handlePaneDragStart(pane, event) {
    let rect;
    if (pane.type === IgcDockManagerPaneType.contentPane) {
      const header = event.target;
      const parent = this.service.getParent(pane);
      rect = (pane !== this.flyoutPane && parent.type === IgcDockManagerPaneType.tabGroupPane) ?
        header.closest('igc-tabs-component').getBoundingClientRect() :
        header.parentElement.getBoundingClientRect();
      this.contentPaneId = pane.contentId;
    }
    this.shouldClearActivePane = false;
    this.focusElement();
    const dragStarted = this.service.dragPaneStart(pane, rect, event.detail.clientX, event.detail.clientY);
    this.isDragging = true;
    this.scheduleAfterRender(() => {
      this.shouldClearActivePane = true;
      if (pane.type === IgcDockManagerPaneType.contentPane) {
        this.contentPaneId = pane.contentId;
        return;
      }
      if (pane.type === IgcDockManagerPaneType.splitPane) {
        const targetPane = this.findFocusablePane(pane.panes);
        if (targetPane) {
          this.contentPaneId = targetPane.contentId;
          this.setActivePane(targetPane);
        }
      }
    });
    if (!dragStarted) {
      this.isDragging = false;
      event.detail.cancel = true;
    }
  }
  handlePaneDragMove(event) {
    this.paneDragMoved(event.detail.clientX, event.detail.clientY, event);
  }
  paneDragMoved(clientX, clientY, event) {
    this.handleDropPositionChange(clientX, clientY, event === null || event === void 0 ? void 0 : event.target);
    const dragMoved = this.service.dragPaneMove(event === null || event === void 0 ? void 0 : event.detail.clientX, event === null || event === void 0 ? void 0 : event.detail.clientY);
    if (event && !dragMoved) {
      event.detail.cancel = true;
    }
  }
  handlePaneDragEnd() {
    const docked = this.service.dragPaneEnd();
    this.isDragging = false;
    if (docked) {
      const activePane = this.activePane;
      this.shouldClearActivePane = false;
      this.reason = ActionReason.drop;
      this.focusElement();
      if (activePane) {
        this.scheduleAfterRender(() => {
          this.setActivePane(activePane);
        });
      }
      this.scheduleAfterRender(() => {
        this.shouldClearActivePane = true;
      });
    }
    if (this.activePane) {
      this.setFocus(this.activePane);
    }
    return docked;
  }
  handleTabHeaderDragStart(pane, event) {
    this.shouldMovePane = false;
    const path = this.service.getPanePath(pane);
    const rootParent = path[0];
    if (rootParent !== this.layout.rootPane &&
      path.some(p => p.type === IgcDockManagerPaneType.documentHost)) {
      const childPanes = this.service.getChildContentPanes(rootParent);
      if (childPanes.length === 1) {
        // pane is a single document host tab in a floating pane
        this.shouldMovePane = true;
        return this.handlePaneDragStart(rootParent, event);
      }
    }
    this.shouldClearActivePane = false;
    this.focusElement();
    const dragStarted = this.service.dragTabStart(pane);
    this.isDragging = true;
    this.scheduleAfterRender(() => {
      this.shouldClearActivePane = true;
    });
    if (!dragStarted) {
      this.isDragging = false;
      event.detail.cancel = true;
    }
  }
  handleTabHeaderDragMove(pane, event) {
    if (this.shouldMovePane) {
      return this.handlePaneDragMove(event);
    }
    const header = event.target;
    const headerRect = header.getBoundingClientRect();
    const tabs = header.closest('igc-tabs-component');
    const tabsRect = tabs.getBoundingClientRect();
    const tabHeaders = Array.from(tabs.querySelectorAll('igc-tab-header-component'));
    const headerIndex = tabHeaders.indexOf(header);
    const prevHeaderRect = headerIndex > 0 ? tabHeaders[headerIndex - 1].getBoundingClientRect() : null;
    const nextHeaderRect = headerIndex < tabHeaders.length - 1 ? tabHeaders[headerIndex + 1].getBoundingClientRect() : null;
    const lastVisibleHeaderRect = tabHeaders.filter(th => th.getBoundingClientRect().top === headerRect.top).slice(-1)[0].getBoundingClientRect();
    const tabRectsInfo = {
      headerRect,
      prevHeaderRect,
      nextHeaderRect,
      lastVisibleHeaderRect,
      tabsRect
    };
    this.handleDropPositionChange(event.detail.clientX, event.detail.clientY, event === null || event === void 0 ? void 0 : event.target);
    const tabMoved = this.service.dragTabMove(pane, event.detail, tabRectsInfo);
    if (event && !tabMoved) {
      event.detail.cancel = true;
    }
  }
  handleTabHeaderDragEnd(pane) {
    const docked = this.handlePaneDragEnd();
    if (!docked) {
      this.activePane = pane;
    }
  }
  handleFloatingPaneResizeStart(pane, event) {
    const args = event.detail;
    this.isDragging = true;
    const resizeStarted = this.service.resizeFloatingPaneStart(pane, args.resizerLocation);
    if (!resizeStarted) {
      this.isDragging = false;
      args.dragMoveArgs.cancel = true;
    }
  }
  handleFloatingPaneResizeMove(pane, event) {
    this.service.resizeFloatingPane(pane, event.detail);
  }
  handleFloatingPaneResizeEnd(pane, event) {
    this.isDragging = false;
    this.service.resizeFloatingPaneEnd(pane, event.detail.resizerLocation);
  }
  handleDropPositionChange(clientX, clientY, target) {
    const elements = clientX && clientY ?
      this.element.shadowRoot.elementsFromPoint(clientX, clientY) :
      null;
    let isOverSplitter = false;
    const splitter = elements ? elements.filter(e => e.tagName.toLowerCase() === 'igc-splitter-component') : [];
    if (splitter.length > 0) {
      const splitterIndex = elements.indexOf(splitter[0]);
      const adjacentElement = elements[splitterIndex - 1];
      isOverSplitter = adjacentElement &&
        adjacentElement.tagName.toLowerCase() === 'igc-floating-pane-component' &&
        adjacentElement.floatingId === this.draggedPane.id; // if not equal - splitter is below another element, not directly over
    }
    if (!elements || !elements.length || isOverSplitter) {
      this.service.dockingIndicator = null;
      this.dropTargetPaneInfo = null;
      return;
    }
    const topElement = elements[0];
    let indicatorTarget = null;
    let dockingIndicatorElement = topElement.closest('igc-root-docking-indicator-component');
    if (dockingIndicatorElement) {
      this.service.dockingIndicator = {
        position: dockingIndicatorElement.position,
        isRoot: true,
        direction: Utils.getDirection(this.element)
      };
    }
    if (!dockingIndicatorElement) {
      const joystickIcon = topElement.closest('igc-joystick-icon-component');
      if (joystickIcon && !joystickIcon.empty) {
        dockingIndicatorElement = joystickIcon;
        this.service.dockingIndicator = {
          position: joystickIcon.position,
          isRoot: false,
          direction: Utils.getDirection(this.element)
        };
        const joystickIndicator = joystickIcon.closest('igc-joystick-indicator-component');
        indicatorTarget = joystickIndicator.dropTargetPaneInfo;
      }
    }
    if (dockingIndicatorElement &&
      (this.service.dockingIndicator.isRoot || this.dropTargetPaneInfo === indicatorTarget)) {
      this.service.dropTargetParentRect = this.getDropTargetParentRect();
      return;
    }
    this.service.dockingIndicator = null;
    if (target) {
      const draggedHeader = target;
      const draggedFloatingPane = draggedHeader.closest('igc-floating-pane-component');
      const topFloatingPane = elements.find(e => e.tagName.toLowerCase() === 'igc-floating-pane-component');
      if (topFloatingPane === draggedFloatingPane) {
        const index = elements.lastIndexOf(draggedFloatingPane);
        elements.splice(0, index + 1);
      }
    }
    let paneElement;
    for (const element of elements) {
      const tagName = element.tagName.toLowerCase();
      if (tagName === 'igc-content-pane-component' || tagName === 'igc-split-pane-component') {
        if (paneElement) {
          break;
        }
        paneElement = element;
      }
      else if (tagName === 'igc-tabs-component' || tagName === 'igc-document-host-component') {
        paneElement = element;
        break;
      }
      else if (tagName === 'igc-floating-pane-component') {
        break;
      }
    }
    if (paneElement) {
      const dropPane = this.panesElementMap.getByValue(paneElement);
      if ((!this.dropTargetPaneInfo || this.dropTargetPaneInfo.pane !== dropPane) && dropPane !== this.draggedPane) {
        const docHost = this.service.getDocHostParent(dropPane);
        const dropPaneRoot = this.service.getRootParent(dropPane);
        const floatingPaneWithoutDocHost = this.layout.floatingPanes
          ? this.layout.floatingPanes.indexOf(dropPaneRoot) !== -1 &&
            !this.service.getChildDocHostRecursive(dropPaneRoot)
          : false;
        if (!this.documentOnlyDrag
          || docHost
          || floatingPaneWithoutDocHost
          || dropPane.type === IgcDockManagerPaneType.documentHost) {
          this.dropTargetPaneInfo = {
            pane: dropPane,
            targetRect: paneElement.getBoundingClientRect(),
            docHost,
            floatingPaneWithoutDocHost
          };
        }
        else {
          this.dropTargetPaneInfo = null;
        }
      }
    }
    else {
      this.dropTargetPaneInfo = null;
    }
  }
  getDropTargetParentRect() {
    const position = this.service.dockingIndicator.position;
    let rect;
    if (this.service.dockingIndicator.isRoot) {
      rect = this.dockedPanesContainer.getBoundingClientRect();
    }
    else {
      if (Utils.isDockingIndicatorOuter(position)) {
        const targetDocHostParent = this.service.getParent(this.dropTargetPaneInfo.docHost);
        const isIndicatorVertical = Utils.isDockingIndicatorVertical(position);
        const isSplitPaneVertical = Utils.isSplitPaneVertical(targetDocHostParent);
        const isSameSplitPane = ((isIndicatorVertical && isSplitPaneVertical) || (!isIndicatorVertical && !isSplitPaneVertical));
        const outerParent = isSameSplitPane ? targetDocHostParent : this.dropTargetPaneInfo.docHost.rootPane;
        const outerParentRect = this.panesElementMap.has(outerParent) ? this.panesElementMap.get(outerParent).getBoundingClientRect() : null;
        rect = outerParentRect;
      }
      else {
        const targetPaneParent = this.service.getParent(this.dropTargetPaneInfo.pane);
        const targetPaneParentRect = this.panesElementMap.has(targetPaneParent) ? this.panesElementMap.get(targetPaneParent).getBoundingClientRect() : null;
        rect = targetPaneParentRect;
      }
    }
    return rect;
  }
  handlePaneContentMouseDown(pane) {
    requestAnimationFrame(() => {
      const rootNode = this.getRootNode();
      if (this.element === rootNode.activeElement || !this.element.contains(rootNode.activeElement)) {
        this.setFocus(pane);
        this.contentPaneId = pane.contentId;
      }
    });
  }
  handlePaneHeaderMouseDown(pane) {
    const rootNode = this.getRootNode();
    requestAnimationFrame(() => {
      this.contentPaneId = pane.contentId;
      if (this.element === rootNode.activeElement || !this.element.contains(rootNode.activeElement)) {
        const paneElement = this.contentPanesElementMap.get(pane);
        paneElement.focus();
      }
      else {
        this.setActivePane(pane);
      }
    });
  }
  handleTabHeaderMouseDown(pane, event) {
    const target = event.currentTarget;
    const rootNode = this.getRootNode();
    const pathHTMLElements = event.composedPath().filter(et => et instanceof HTMLElement).map(et => et);
    this._tabHeaderIconClicked = this.showHeaderIconOnHover &&
      pathHTMLElements.filter(el => el.attributes.getNamedItem('part') && el.attributes.getNamedItem('part').value === 'tab-header-more-options floating').length > 0;
    requestAnimationFrame(() => {
      this.contentPaneId = pane.contentId;
      this.reason = ActionReason.click;
      if (this.element === rootNode.activeElement || !this.element.contains(rootNode.activeElement)) {
        target.focus();
      }
      else {
        this.setActivePane(pane);
      }
    });
  }
  handleFloatingPaneMouseDown(pane, event) {
    const pathHTMLElements = event.composedPath().filter(e => e instanceof HTMLElement).map(e => e);
    const isContextMenu = pathHTMLElements.filter(e => e.attributes.getNamedItem('part') && e.attributes.getNamedItem('part').value === 'context-menu').length > 0;
    if (isContextMenu) {
      return;
    }
    this.service.bringFloatingPaneOnTop(pane);
    requestAnimationFrame(() => {
      let targetPane = this.findFocusablePane(pane.panes);
      if (!targetPane) {
        targetPane = pane.panes[0];
      }
      const nodeName = event.target.nodeName.toLowerCase();
      if (nodeName === 'ngx-flexlayout') {
        this.setActivePane(targetPane);
        this.setFocus(targetPane);
      }
      this.contentPaneId = targetPane.contentId;
    });
  }
  handleTabIconClick(p, position, isFloating, event) {
    if (!this.showHeaderIconOnHover) {
      this.focusElement();
    }
    if (!isFloating && position === IgcTabHeadersPosition.bottom) {
      const elem = event.detail.target;
      const tabHeader = elem.closest('igc-tab-header-component');
      const moreOptionsContainer = tabHeader ?
        tabHeader.shadowRoot.querySelector('div[part*="tab-header-more-options"]') :
        elem.closest('div[part*="tab-header-more-options"]');
      this.contextMenuMeta = { target: moreOptionsContainer, menuItems: this.service.createContextMenuItems(p), position: this.contextMenuPosition };
    }
    else {
      this.contextMenuMeta = null;
      this.service.closeTabPane(p);
    }
  }
  handleContextMenuClosed() {
    this.contextMenuMeta = null;
  }
  handleTabSelectedIndexChanged(pane, event) {
    pane.selectedIndex = event.detail;
  }
  handleHiddenTabSelected(pane, event) {
    this.activePane = this.service.getVisibleContentPanes(pane)[event.detail];
  }
  handleSelectedTabOutOfView(pane, event) {
    const cp = this.service.getVisibleContentPanes(pane)[event.detail];
    this.service.selectHiddenTab(pane, cp);
  }
  handleTabIconKeyDown(iconName, p, ev) {
    if (iconName === 'arrow_drop_down' && ev.detail.key === 'ArrowDown') {
      const targetElem = ev.detail.target;
      const tabHeader = targetElem.closest('igc-tab-header-component');
      const moreOptionsContainer = tabHeader ?
        tabHeader.shadowRoot.querySelector('div[part="tab-header-more-options"]') :
        targetElem.closest('div[part="tab-header-more-options"]');
      this.contextMenuMeta = { target: moreOptionsContainer, menuItems: this.service.createContextMenuItems(p), position: this.contextMenuPosition };
    }
  }
  handleTabSelectedChanged(pane, ev) {
    if (ev.detail && pane === this.paneToFocus) {
      this.setFocus(pane);
    }
  }
  emitPaneHeaderConnected(pane, event) {
    this.paneHeaderConnected.emit({
      pane,
      element: event.detail
    });
  }
  emitPaneHeaderDisconnected(pane, event) {
    this.paneHeaderDisconnected.emit({
      pane,
      element: event.detail
    });
  }
  emitTabHeaderConnected(pane, event) {
    this.tabHeaderConnected.emit({
      pane,
      element: event.detail
    });
  }
  emitTabHeaderDisconnected(pane, event) {
    this.tabHeaderDisconnected.emit({
      pane,
      element: event.detail
    });
  }
  resolveAllowMaximize(pane) {
    return this.service.resolveAllowMaximize(pane);
  }
  renderButtonsTemplates() {
    return (h("template", null, h("slot", { name: "paneHeaderCloseButton", onSlotchange: this.updateTemplates }), h("slot", { name: "tabHeaderCloseButton", onSlotchange: this.updateTemplates }), h("slot", { name: "closeButton", onSlotchange: this.updateTemplates }), h("slot", { name: "moreTabsButton", onSlotchange: this.updateTemplates }), h("slot", { name: "maximizeButton", onSlotchange: this.updateTemplates }), h("slot", { name: "minimizeButton", onSlotchange: this.updateTemplates }), h("slot", { name: "pinButton", onSlotchange: this.updateTemplates }), h("slot", { name: "unpinButton", onSlotchange: this.updateTemplates }), h("slot", { name: "moreOptionsButton", onSlotchange: this.updateTemplates }), h("slot", { name: "splitterHandle", onSlotchange: this.updateTemplates })));
  }
  renderContentPane(pane, isFloating, isFlyout) {
    const parentPane = this.service.getParent(pane);
    let forceDrag = false;
    let isSingleFloatingContentPane = false;
    let floatingPane;
    if (isFloating) {
      floatingPane = this.service.getRootParent(pane);
      const hasHeader = this.service.hasFloatingPaneHeader(floatingPane);
      if (!hasHeader) {
        isSingleFloatingContentPane = true;
        if (this.service.forceDragPane === floatingPane) {
          this.service.forceDragPane = null;
          forceDrag = true;
        }
      }
    }
    const maximized = this.maximizedPane === pane ||
      (parentPane.type === IgcDockManagerPaneType.tabGroupPane && this.maximizedPane === parentPane) ||
      isFloating && isSingleFloatingContentPane && floatingPane === this.maximizedPane;
    return (h("igc-content-pane-component", { key: pane.id, size: pane.size, isFlyout: isFlyout, unpinnedSize: pane.unpinnedSize, disabled: pane.disabled, isSingleFloating: isSingleFloatingContentPane, ref: el => {
        if (el) {
          this.panesElementMap.set(pane, el);
          this.contentPanesElementMap.set(pane, el);
        }
      }, class: {
        'maximized': this.maximizedPane === pane
      }, header: pane.header, onFocusin: this.handleContentPaneFocus.bind(this, pane) }, h("igc-pane-header-component", { slot: "header", pane: pane, isActive: pane === this.activePane, disabled: pane.disabled && !isSingleFloatingContentPane, pinned: this.service.getActualIsPinned(pane), allowMaximize: this.resolveAllowMaximize(pane), maximized: maximized, allowClose: this.service.getActualAllowClose(pane), allowPinning: pane.allowPinning !== false, isFloating: isFloating, forcedDrag: forceDrag, resourceStrings: this.resourceStrings, onPinToggle: this.handlePinToggle.bind(this, pane), onMaximize: this.handleMaximize.bind(this, pane), onDragMoved: this.handlePaneDragMove.bind(this), onDragStarted: this.handlePaneDragStart.bind(this, isSingleFloatingContentPane ? floatingPane : pane), onDragEnded: this.handlePaneDragEnd.bind(this), onClose: this.handlePaneClose.bind(this, pane), onElementConnected: this.emitPaneHeaderConnected.bind(this, pane), onElementDisconnected: this.emitPaneHeaderDisconnected.bind(this, pane), onMouseDown: this.handlePaneHeaderMouseDown.bind(this, pane) }, (isFloating && pane.floatingHeaderId) ? h("slot", { name: pane.floatingHeaderId }) :
      pane.headerId ? h("slot", { name: pane.headerId }) :
        pane.header), h("div", { class: "content", onMouseDown: this.handlePaneContentMouseDown.bind(this, pane) }, h("slot", { name: pane.contentId }))));
  }
  renderSplitter(parentPane, pane) {
    return (h("igc-splitter-component", { splitPaneOrientation: parentPane.orientation, onResizeStart: this.handleSplitterResizeStart.bind(this, pane), onResizeEnd: this.handleSplitterResizeEnd.bind(this, parentPane, pane), onFocusin: this.clearActivePane.bind(this) }));
  }
  renderDocumentHost(docHost) {
    return (h("igc-document-host-component", { key: docHost.id, size: docHost.size, ref: el => {
        if (el) {
          this.panesElementMap.set(docHost, el);
        }
      } }, this.renderSplitPane(docHost.rootPane, false, true)));
  }
  renderTabGroup(pane, isFloating, isInDocumentHost) {
    let tabs = pane.type === IgcDockManagerPaneType.tabGroupPane ? pane.panes : [pane];
    tabs = tabs.filter(t => this.service.isContentPaneVisible(t));
    const selectedIndex = pane.type === IgcDockManagerPaneType.tabGroupPane && pane.selectedIndex ?
      pane.selectedIndex : 0;
    const position = isInDocumentHost ? IgcTabHeadersPosition.top : IgcTabHeadersPosition.bottom;
    const isSingleTab = tabs.length === 1 && position === IgcTabHeadersPosition.bottom;
    const allowEmpty = pane.type === IgcDockManagerPaneType.tabGroupPane ? pane.allowEmpty : false;
    const allowMaximize = this.resolveAllowMaximize(pane);
    return (allowEmpty || tabs.length > 0) && (h("igc-tabs-component", { key: pane.id, size: pane.size, selectedIndex: selectedIndex, hasHeaders: !isSingleTab, maximized: this.maximizedPane === pane, allowMaximize: position === IgcTabHeadersPosition.top && allowMaximize, onMaximizeMinimizeFocus: this.clearActivePane.bind(this), onMaximize: this.handleMaximize.bind(this, pane), onSelectedIndexChanged: this.handleTabSelectedIndexChanged.bind(this, pane), onHiddenTabSelected: this.handleHiddenTabSelected.bind(this, pane), onSelectedTabOutOfView: this.handleSelectedTabOutOfView.bind(this, pane), onRendered: this.handleTabsRendered.bind(this, pane), tabHeadersPosition: position, resourceStrings: this.resourceStrings, ref: el => {
        if (el) {
          this.panesElementMap.set(pane, el);
        }
      }, class: {
        'maximized': this.maximizedPane === pane,
      } }, isSingleTab ?
      this.renderTabPanel(tabs[0], false, isFloating) :
      tabs.map(p => {
        return [
          this.renderTabHeader(p, position, isFloating),
          this.renderTabPanel(p, isInDocumentHost, isFloating)
        ];
      })));
  }
  renderTabPanel(pane, isInDocumentHost, isFloating) {
    return (h("igc-tab-panel-component", { key: pane.id, disabled: pane.disabled, onMouseDown: isInDocumentHost ? this.handlePaneContentMouseDown.bind(this, pane) : null, onSelectedChanged: this.handleTabSelectedChanged.bind(this, pane) }, isInDocumentHost ?
      h("slot", { name: pane.contentId }) :
      this.renderContentPane(pane, isFloating, false)));
  }
  renderTabHeader(pane, position, isFloating) {
    let forceDrag = false;
    const allowClose = this.service.getActualAllowClose(pane);
    const allowPinning = pane.allowPinning !== false;
    const iconName = isFloating ?
      allowClose ? 'close' : null :
      position === IgcTabHeadersPosition.bottom ?
        allowClose || allowPinning ? 'arrow_drop_down' : null :
        allowClose ? 'close' : null;
    if (this.service.forceDragTabHeader === pane) {
      this.service.forceDragTabHeader = null;
      forceDrag = true;
    }
    return (h("igc-tab-header-component", { key: pane.id, slot: "tabHeader", isActive: pane === this.activePane, disabled: pane.disabled, showHeaderIconOnHover: this.showHeaderIconOnHover, header: pane.header, resourceStrings: this.resourceStrings, onDragStarted: this.handleTabHeaderDragStart.bind(this, pane), onDragMoved: this.handleTabHeaderDragMove.bind(this, pane), onDragEnded: this.handleTabHeaderDragEnd.bind(this, pane), onMouseDown: this.handleTabHeaderMouseDown.bind(this, pane), onIconKeyDown: this.handleTabIconKeyDown.bind(this, iconName, pane), position: position, onIconClicked: this.handleTabIconClick.bind(this, pane, position, isFloating), iconName: iconName, forcedDrag: forceDrag, onElementConnected: this.emitTabHeaderConnected.bind(this, pane), onElementDisconnected: this.emitTabHeaderDisconnected.bind(this, pane), ref: el => {
        if (el) {
          this.tabHeadersMap.set(pane, el);
        }
      }, onFocusin: this.handleTabHeaderFocus.bind(this, pane) }, pane.tabHeaderId ?
      h("slot", { name: pane.tabHeaderId }) :
      h("span", { part: "header-title", title: pane.header }, pane.header)));
  }
  renderSplitPane(splitPane, isFloating, isInDocumentHost) {
    const panes = this.service.getSplitPaneVisibleChildren(splitPane);
    return (splitPane.allowEmpty || panes.length > 0) && (h("igc-split-pane-component", { key: splitPane.id, orientation: splitPane.orientation, size: splitPane.size, onRendered: this.handleSplitPaneRendered.bind(this, panes), ref: el => {
        if (el) {
          this.panesElementMap.set(splitPane, el);
        }
      } }, panes.map((p, i) => {
      let paneComponent;
      if (p.type === IgcDockManagerPaneType.splitPane) {
        paneComponent = this.renderSplitPane(p, isFloating, isInDocumentHost);
      }
      else if (p.type === IgcDockManagerPaneType.contentPane) {
        paneComponent = isInDocumentHost ?
          this.renderTabGroup(p, isFloating, true) :
          this.renderContentPane(p, isFloating, false);
      }
      else if (p.type === IgcDockManagerPaneType.documentHost) {
        paneComponent = this.renderDocumentHost(p);
      }
      else if (p.type === IgcDockManagerPaneType.tabGroupPane) {
        paneComponent = this.renderTabGroup(p, isFloating, isInDocumentHost);
      }
      return i > 0 ?
        [this.renderSplitter(splitPane, p), paneComponent] :
        paneComponent;
    })));
  }
  renderUnpinnedTabArea(location) {
    const panes = [];
    const isHorizontal = location === IgcUnpinnedLocation.top || location === IgcUnpinnedLocation.bottom;
    const isLeft = location === IgcUnpinnedLocation.left;
    const isRight = location === IgcUnpinnedLocation.right;
    const isBottom = location === IgcUnpinnedLocation.bottom;
    this.service.unpinnedLocationMap.forEach((l, p) => {
      if (l === location && p.hidden !== true) {
        panes.push(p);
      }
    });
    const tabAreaClasses = {
      'unpinned-tab-area': true,
      'unpinned-tab-area--left': isLeft,
      'unpinned-tab-area--right': isRight,
      'unpinned-tab-area--bottom': isBottom,
      'unpinned-tab-area--horizontal': isHorizontal,
      'unpinned-tab-area--hidden': panes.length === 0
    };
    return (h("div", { class: tabAreaClasses, part: Utils.partNameMap(tabAreaClasses), role: "tablist", "aria-orientation": isHorizontal ? 'horizontal' : 'vertical' }, panes.map(p => (h("igc-unpinned-pane-header-component", { location: location, isActive: p === this.activePane, disabled: p.disabled, onMouseDown: this.handleUnpinnedTabMouseDown.bind(this, p), onKeyDown: this.handleUnpinnedTabKeyDown.bind(this, p), onFocus: this.handleUnpinnedHeaderFocus.bind(this, p), ref: el => {
        if (el) {
          const slot = el.querySelector('slot');
          if (slot && p.unpinnedHeaderId) {
            slot.name = p.unpinnedHeaderId;
          }
          this.unpinnedHeadersMap.set(p, el);
        }
      } }, p.unpinnedHeaderId ? h("slot", { name: p.unpinnedHeaderId }) : p.header)))));
  }
  renderFlyoutPane() {
    const location = this.service.unpinnedLocationMap.get(this.flyoutPane);
    const flyoutClasses = {
      'flyout-pane': true,
      'flyout-pane--right': location === IgcUnpinnedLocation.right,
      'flyout-pane--bottom': location === IgcUnpinnedLocation.bottom,
      'flyout-pane--left': location === IgcUnpinnedLocation.left,
    };
    let splitPaneOrientation = IgcSplitPaneOrientation.vertical;
    if (location === IgcUnpinnedLocation.left || location === IgcUnpinnedLocation.right) {
      splitPaneOrientation = IgcSplitPaneOrientation.horizontal;
    }
    const maximized = this.maximizedPane === this.flyoutPane;
    return this.flyoutPane && (h("div", { class: flyoutClasses, style: { 'z-index': maximized ? '10002' : '2' } }, this.renderContentPane(this.flyoutPane, false, true), h("igc-splitter-component", { flyoutLocation: location, splitPaneOrientation: splitPaneOrientation, onResizeStart: this.handleSplitterResizeStart.bind(this, this.flyoutPane), onResizeEnd: this.handleFlyoutSplitterResizeEnd.bind(this, this.flyoutPane, splitPaneOrientation) })));
  }
  renderFloatingPanes() {
    var _a, _b;
    return (h("div", { class: "floating-panes", style: { position: this.maximizedPane ? 'absolute' : 'fixed' } }, (_b = (_a = this.layout) === null || _a === void 0 ? void 0 : _a.floatingPanes) === null || _b === void 0 ? void 0 : _b.map(p => {
      var _a;
      const panes = this.service.getSplitPaneVisibleChildren(p);
      if (panes.length === 0) {
        return null;
      }
      const hasHeader = this.service.hasFloatingPaneHeader(p);
      let forceDrag = false;
      if (p === this.service.forceDragPane && hasHeader) {
        this.service.forceDragPane = null;
        forceDrag = true;
      }
      const containsMaximizedPane = this.maximizedPane && this.service.getRootParent(this.maximizedPane) === p;
      return (h("igc-floating-pane-component", { key: p.id, floatingId: p.id, style: { zIndex: this.floatingPaneZIndicesMap.get(p).toString() }, floatingLocation: p.floatingLocation ? p.floatingLocation : { x: 0, y: 0 }, floatingWidth: p.floatingWidth ? p.floatingWidth : IGC_DEFAULT_PANE_SIZE, floatingHeight: p.floatingHeight ? p.floatingHeight : IGC_DEFAULT_PANE_SIZE, hasHeader: hasHeader, onWndResizeStart: this.handleFloatingPaneResizeStart.bind(this, p), onWndResizeMove: this.handleFloatingPaneResizeMove.bind(this, p), onWndResizeEnd: this.handleFloatingPaneResizeEnd.bind(this, p), onMouseDown: this.handleFloatingPaneMouseDown.bind(this, p), class: {
          'maximized': this.maximizedPane === p
        }, maximized: this.maximizedPane === p || containsMaximizedPane, allowResize: (_a = p.floatingResizable) !== null && _a !== void 0 ? _a : this.allowFloatingPanesResize }, hasHeader ?
        h("igc-pane-header-component", { slot: "header", isFloating: true, isFloatingPaneHeader: true, forcedDrag: forceDrag, allowMaximize: this.resolveAllowMaximize(p), maximized: this.maximizedPane === p, resourceStrings: this.resourceStrings, onDragStarted: this.handlePaneDragStart.bind(this, p), onDragMoved: this.handlePaneDragMove.bind(this), onDragEnded: this.handlePaneDragEnd.bind(this), onClose: this.handleFloatingPaneClose.bind(this, p), onMaximize: this.handleMaximize.bind(this, p), onFocusin: (this.clearActivePane.bind(this)) }) : null, this.renderSplitPane(p, true, false)));
    })));
  }
  renderRootDockingIndicator(position) {
    return (h("igc-root-docking-indicator-component", { position: position }));
  }
  renderDockingIndicators() {
    const startPosition = Utils.getDirection(this.element) !== 'rtl' ? IgcDockingIndicatorPosition.left : IgcDockingIndicatorPosition.right;
    const endPosition = Utils.getDirection(this.element) !== 'rtl' ? IgcDockingIndicatorPosition.right : IgcDockingIndicatorPosition.left;
    return (h("div", { class: "docking-indicators-container", style: {
        display: this.showDockingIndicators ? 'flex' : 'none'
      } }, !this.documentOnlyDrag && this.renderRootDockingIndicator(IgcDockingIndicatorPosition.top), h("div", { style: {
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      } }, !this.documentOnlyDrag && this.renderRootDockingIndicator(startPosition), !this.documentOnlyDrag && this.renderRootDockingIndicator(endPosition)), !this.documentOnlyDrag && this.renderRootDockingIndicator(IgcDockingIndicatorPosition.bottom), this.dropTargetPaneInfo &&
      h("igc-joystick-indicator-component", { dropTargetPaneInfo: this.dropTargetPaneInfo, documentOnlyDrag: this.documentOnlyDrag })));
  }
  renderContextMenu() {
    return this.contextMenuMeta && (h("igc-context-menu-component", { onMenuClosed: this.handleContextMenuClosed.bind(this), orientation: IgcContextMenuOrientation.bottom, items: this.contextMenuMeta.menuItems, target: this.contextMenuMeta.target, position: this.contextMenuMeta.position }));
  }
  renderDropShadow() {
    var _a, _b, _c, _d;
    return this.dropShadowRect && (h("div", { part: "docking-preview", class: "drop-shadow", style: {
        top: `${(_a = this.dropShadowRect) === null || _a === void 0 ? void 0 : _a.y}px`,
        left: `${(_b = this.dropShadowRect) === null || _b === void 0 ? void 0 : _b.x}px`,
        width: `${(_c = this.dropShadowRect) === null || _c === void 0 ? void 0 : _c.width}px`,
        height: `${(_d = this.dropShadowRect) === null || _d === void 0 ? void 0 : _d.height}px`,
      } }));
  }
  handlePaneNavigatorClosed(ev) {
    this.service.normalizeMaximizedPane(ev.detail);
    const parent = this.service.getRootParent(ev.detail);
    const isParentFloating = this.service.isFloatingPane(parent);
    if (isParentFloating) {
      this.service.bringFloatingPaneOnTop(parent);
    }
    if (ev.detail && this.activePane !== ev.detail) {
      this.activePane = ev.detail;
    }
    this.navigationPaneMeta = null;
  }
  renderPaneNavigator() {
    return this.navigationPaneMeta &&
      h("igc-pane-navigator-component", { onClosed: this.handlePaneNavigatorClosed.bind(this), activePanes: this.navigationPaneMeta.activePanes, activeDocuments: this.navigationPaneMeta.activeDocuments, selectedIndex: this.navigationPaneMeta.initialIndex, previousActivePaneIndex: this.navigationPaneMeta.previousActivePaneIndex, resourceStrings: this.resourceStrings });
  }
  render() {
    var _a;
    this.panesElementMap = new TwoWayMap();
    this.tabHeadersMap = new Map();
    this.unpinnedHeadersMap = new Map();
    this.contentPanesElementMap = new Map();
    return (h(Host, {
      tabindex: "0",
      role: "group"
  }, this.renderButtonsTemplates(), this.renderUnpinnedTabArea(IgcUnpinnedLocation.left), h("div", {
      class: "pane-container--vertical",
      style: {
          position: this.maximizedPane ? 'absolute' : 'relative'
      }
  }, this.renderUnpinnedTabArea(IgcUnpinnedLocation.top), h("div", {
      ref: el => this.dockedPanesContainer = el,
      class: "pane-container--horizontal",
      style: {
          position: this.maximizedPane ? 'absolute' : 'relative'
      }
  }, ((_a = this.layout) === null || _a === void 0 ? void 0 : _a.rootPane) && this.renderSplitPane(this.layout.rootPane, false, false), this.renderFlyoutPane(), this.renderDockingIndicators()), this.renderUnpinnedTabArea(IgcUnpinnedLocation.bottom)), this.renderUnpinnedTabArea(IgcUnpinnedLocation.right), this.renderFloatingPanes(), this.renderContextMenu(), this.renderPaneNavigator(), this.renderDropShadow()));  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "flyoutPane": ["flyoutPaneChanged"],
    "layout": ["layoutChanged"],
    "draggedPane": ["draggedPaneChanged"],
    "dropPosition": ["dropPositionChanged"],
    "activePane": ["activePaneChange"]
  }; }
};
IgcDockManager.style = dockmanagerComponentCss;

const documentHostComponentCss = ".sc-igc-document-host-component-h{display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:0px;min-height:0px}";

let IgcDocumentHostComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const size = this.size || this.size === 0 ? this.size : IGC_DEFAULT_PANE_SIZE;
    return (h(Host, { role: "group", style: {
        flex: `${size} 1 ${size}px`
      } }));
  }
};
IgcDocumentHostComponent.style = documentHostComponentCss;

const floatingPaneComponentCss = ":host{--min-pane-size:30px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:visible;min-width:var(--min-pane-size);min-height:var(--min-pane-size);-webkit-box-sizing:border-box;box-sizing:border-box;color:var(--igc-dock-text, var(--igc-text-color, rgba(0, 0, 0, 0.72)));background:var(--igc-dock-background, var(--igc-background-color, #E5E7E9));pointer-events:all;border:1px solid var(--igc-floating-pane-border-color, var(--igc-border-color, #F3F5F7));-webkit-box-shadow:0 4px 16px rgba(0, 0, 0, 0.24);box-shadow:0 4px 16px rgba(0, 0, 0, 0.24);z-index:0}";

let IgcFloatingPaneComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wndResizeStart = createEvent(this, "wndResizeStart", 7);
    this.wndResizeMove = createEvent(this, "wndResizeMove", 7);
    this.wndResizeEnd = createEvent(this, "wndResizeEnd", 7);
    this.allowResize = true;
    this.floatingMinHeight = IGC_DEFAULT_PANE_SIZE;
    this.floatingMinWidth = IGC_DEFAULT_PANE_SIZE;
  }
  handleResizerMove(event) {
    const el = event.target;
    this.wndResizeMove.emit({
      dragMoveArgs: event.detail,
      resizerLocation: el.orientation
    });
  }
  handleResizeStart(event) {
    const el = event.target;
    const args = {
      dragMoveArgs: Object.assign(Object.assign({}, event.detail), { offsetX: 0, offsetY: 0 }),
      resizerLocation: el.orientation
    };
    this.wndResizeStart.emit(args);
    if (args.dragMoveArgs.cancel) {
      event.detail.cancel = true;
    }
  }
  handleResizeEnd(event) {
    const el = event.target;
    this.wndResizeEnd.emit({
      dragMoveArgs: event.detail,
      resizerLocation: el.orientation
    });
  }
  render() {
    const styles = {
      position: 'absolute',
      left: this.floatingLocation.x + 'px',
      top: this.floatingLocation.y + 'px',
      minWidth: this.floatingMinWidth + 'px',
      minHeight: this.floatingMinHeight + 'px',
      width: this.floatingWidth + 'px',
      height: this.floatingHeight + 'px',
    };
    return (h(Host, { style: this.maximized ? {} : styles, role: "dialog", "aria-label": "dialog", part: "floating-window" }, this.allowResize &&
      h(Fragment, null, h("igc-resizer-component", { orientation: IgcResizerLocation.left, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }), h("igc-resizer-component", { orientation: IgcResizerLocation.top, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }), h("igc-resizer-component", { orientation: IgcResizerLocation.right, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }), h("igc-resizer-component", { orientation: IgcResizerLocation.bottom, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) })), h("slot", { name: "header" }), h("slot", null), this.allowResize &&
      h(Fragment, null, h("igc-resizer-component", { orientation: IgcResizerLocation.topRight, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }), h("igc-resizer-component", { orientation: IgcResizerLocation.topLeft, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }), h("igc-resizer-component", { orientation: IgcResizerLocation.bottomRight, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }), h("igc-resizer-component", { orientation: IgcResizerLocation.bottomLeft, onResizerDragStart: this.handleResizeStart.bind(this), onResizerMoved: this.handleResizerMove.bind(this), onResizerDragEnd: this.handleResizeEnd.bind(this) }))));
  }
  get elem() { return getElement(this); }
};
IgcFloatingPaneComponent.style = floatingPaneComponentCss;

/**
 * @hidden
 */
const icons = {
  close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>`,
  pin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.18 2.25l7.07 7.07-2.83-.01-3.54 3.55.01 4.24-3.53-3.54-5.66 5.66H5.28V17.8l5.66-5.66L7.4 8.61l4.24.01 3.55-3.54-.01-2.83z"/>
    </svg>`,
  unpin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v25H0V0z"/>
      <path d="M11.84 14.08L6.7 19.22H5.28V17.8l5.14-5.14L2 4.26 3.29 3l18 18L20 22.21zm4-.49l-5-5h.73l3.55-3.54v-2.8l7.07 7.07h-2.77l-3.54 3.54z" />
    </svg>`,
  first_page: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>
      <path fill="none" d="M24 24H0V0h24v24z"/>
    </svg>`,
  chevron_left: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>`,
  flip: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"/>
    </svg>`,
  crop_square: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"/>
    </svg>
    `,
  arrow_drop_down: `<svg class="icon icon-arrow_drop_down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5z"></path>
    </svg>`,
  maximize: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"/>
    </svg>`,
  minimize: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M6 19h12v2H6z"/>
    </svg>`,
  more: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>`
};

const iconComponentCss = ".sc-igc-icon-component-h{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:17px;height:17px;fill:currentColor}";

let IgcIconComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { innerHTML: icons[this.name] }));
  }
};
IgcIconComponent.style = iconComponentCss;

const joystickIconComponentCss = ".sc-igc-joystick-icon-component-h{display:-ms-flexbox;display:flex;width:30px;height:30px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--igc-joystick-icon-color, var(--igc-text-color, rgba(0, 0, 0, 0.72)));background:var(--igc-joystick-background, var(--igc-accent-color, #fff));border:1px solid var(--igc-joystick-border-color, var(--igc-accent-color, #fff))}.inner-top.sc-igc-joystick-icon-component-h{border-bottom:none}.inner-start.sc-igc-joystick-icon-component-h{border-right:none}.inner-end.sc-igc-joystick-icon-component-h{border-left:none}.inner-bottom.sc-igc-joystick-icon-component-h{border-top:none}.inner-center.sc-igc-joystick-icon-component-h{border:1px solid var(--igc-joystick-background, var(--igc-accent-color, #fff))}.sc-igc-joystick-icon-component-h:hover{background:var(--igc-joystick-background-active, var(--igc-accent-color, #fff));color:var(--igc-joystick-icon-color-active, #000)}";

let IgcJoystickIconComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
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
};
IgcJoystickIconComponent.style = joystickIconComponentCss;

const joystickIndicatorComponentCss = ".sc-igc-joystick-indicator-component-h{position:fixed;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.indicators-container.sc-igc-joystick-indicator-component{display:grid;grid-template-columns:repeat(3, auto);grid-template-rows:repeat(3, auto);-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:all}.indicators-container--doc-host.sc-igc-joystick-indicator-component{grid-template-columns:repeat(5, auto);grid-template-rows:repeat(5, auto)}";

let IgcJoystickIndicatorComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
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
      } }, h("div", { class: {
        'indicators-container': true,
        'indicators-container--doc-host': this.isDocHost
      } }, this.isDocHost && !this.documentOnlyDrag && this.renderIndicator(IgcDockingIndicatorPosition.outerLeft), this.renderIndicator(IgcDockingIndicatorPosition.left), this.isDocHost && !this.documentOnlyDrag && this.renderIndicator(IgcDockingIndicatorPosition.outerTop), this.renderIndicator(IgcDockingIndicatorPosition.top), this.renderIndicator(IgcDockingIndicatorPosition.center), this.renderIndicator(IgcDockingIndicatorPosition.right), this.isDocHost && !this.documentOnlyDrag && this.renderIndicator(IgcDockingIndicatorPosition.outerRight), this.renderIndicator(IgcDockingIndicatorPosition.bottom), this.isDocHost && !this.documentOnlyDrag && this.renderIndicator(IgcDockingIndicatorPosition.outerBottom))));
  }
  get element() { return getElement(this); }
};
IgcJoystickIndicatorComponent.style = joystickIndicatorComponentCss;

const IGNORE_DRAG = 'data-ignore-drag';
/**
 * @hidden
 */
class IgcDragService {
  constructor(element) {
    this.element = element;
    this.dragTolerance = 5;
    this.dragEdgeTolerance = 0;
    this.handleWheel = (event) => {
      event.preventDefault();
    };
    this.handlePointerDown = (event) => {
      let targets = event.composedPath();
      targets = targets.slice(0, targets.indexOf(event.currentTarget));
      for (const target of targets) {
        if (target instanceof Element
          && target.hasAttribute(IGNORE_DRAG)) {
          return;
        }
      }
      // TODO Not sure if we need this
      // this.element.focus();
      // event.preventDefault();
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.lastX = this.startX;
      this.lastY = this.startY;
      this.captureTarget = event.target;
      this.captureTarget.setPointerCapture(event.pointerId);
      this.subscribeDragEvents();
    };
    this.handlePointerMove = (event) => {
      event.preventDefault();
      const maxHeight = document.documentElement.clientHeight;
      const maxWidth = document.documentElement.clientWidth;
      if (event.clientX < this.dragEdgeTolerance) {
        this.currentX = this.dragEdgeTolerance;
      }
      else if (event.clientX > maxWidth - this.dragEdgeTolerance) {
        this.currentX = maxWidth - this.dragEdgeTolerance;
      }
      else {
        this.currentX = event.clientX;
      }
      if (event.clientY < this.dragEdgeTolerance) {
        this.currentY = this.dragEdgeTolerance;
      }
      else if (event.clientY > maxHeight - this.dragEdgeTolerance) {
        this.currentY = maxHeight - this.dragEdgeTolerance;
      }
      else {
        this.currentY = event.clientY;
      }
      if (!this.dragStarted) {
        if (this.forcedDrag) {
          this.forcedDrag = false;
          this.startX = this.currentX;
          this.startY = this.currentY;
          this.lastX = this.startX;
          this.lastY = this.startY;
          this.captureTarget.setPointerCapture(event.pointerId);
          this.triggerDragStart();
        }
        else {
          const offsetX = this.currentX - this.lastX;
          const offsetY = this.currentY - this.lastY;
          if (Math.abs(offsetX) > this.dragTolerance || Math.abs(offsetY) > this.dragTolerance) {
            this.triggerDragStart();
          }
        }
      }
      if (!this.dragStarted) {
        return;
      }
      if (this.dragMove) {
        const args = {
          offsetX: this.currentX - this.lastX,
          offsetY: this.currentY - this.lastY,
          totalOffsetX: this.currentX - this.startX,
          totalOffsetY: this.currentY - this.startY,
          clientX: this.currentX,
          clientY: this.currentY
        };
        this.dragMove(args);
        if (args.cancel) {
          this.unsubscribeDragEvents();
        }
      }
      this.lastX = this.currentX;
      this.lastY = this.currentY;
    };
    this.handlePointerUp = (event) => {
      this.unsubscribeDragEvents();
      this.captureTarget.releasePointerCapture(event.pointerId);
      if (this.dragStarted && this.dragEnd) {
        this.dragEnd({
          offsetX: this.currentX - this.startX,
          offsetY: this.currentY - this.startY,
          clientX: event.clientX,
          clientY: event.clientY
        });
      }
    };
    this.element.addEventListener('pointerdown', this.handlePointerDown, false);
  }
  get captureTarget() {
    return this._capturedElement || this.element;
  }
  set captureTarget(val) {
    this._capturedElement = val;
  }
  triggerDragStart() {
    if (this.dragStart) {
      const args = {
        clientX: this.startX,
        clientY: this.startY
      };
      this.dragStart(args);
      if (args.cancel) {
        this.unsubscribeDragEvents();
        return;
      }
    }
    this.dragStarted = true;
  }
  subscribeDragEvents() {
    this.dragStarted = false;
    document.addEventListener('pointermove', this.handlePointerMove, false);
    document.addEventListener('pointerup', this.handlePointerUp, false);
    document.addEventListener('wheel', this.handleWheel, { passive: false });
  }
  unsubscribeDragEvents() {
    document.removeEventListener('pointermove', this.handlePointerMove);
    document.removeEventListener('pointerup', this.handlePointerUp);
    document.removeEventListener('wheel', this.handleWheel);
  }
  destroy() {
    this.element.removeEventListener('pointerdown', this.handlePointerDown);
    this.unsubscribeDragEvents();
    this.element = null;
    this.dragStart = null;
    this.dragEnd = null;
    this.dragMove = null;
  }
  forceDragging() {
    this.forcedDrag = true;
    this.subscribeDragEvents();
  }
}

const paneHeaderComponentCss = ":host{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:4px 8px;font-size:14px;font-weight:400;color:var(--igc-pane-header-text, var(--igc-text-color, rgba(0, 0, 0, 0.72)));background:var(--igc-pane-header-background, var(--igc-background-color, #E5E7E9));min-height:40px}:host igc-icon-component svg{width:17px;height:17px}:host([part~=window]){border-bottom:1px solid var(--igc-border-color, #F3F5F7);min-height:auto}.header-text{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-ms-flex:1 1 100%;flex:1 1 100%;line-height:2.3}.header-actions{display:-ms-flexbox;display:flex}.header-actions igc-button-component+igc-button-component{margin-left:4px}:host([part~=active]){-webkit-box-shadow:inset 0 -2px 0 0 var(--igc-active-color, cornflowerblue);box-shadow:inset 0 -2px 0 0 var(--igc-active-color, cornflowerblue);color:var(--igc-active-color, cornflowerblue)}:host([part~=disabled]){pointer-events:none;color:var(--igc-disabled-color, rgba(0, 0, 0, 0.38))}";

let IgcPaneHeaderComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.pinToggle = createEvent(this, "pinToggle", 7);
    this.maximize = createEvent(this, "maximize", 3);
    this.close = createEvent(this, "close", 7);
    this.dragStarted = createEvent(this, "dragStarted", 7);
    this.dragEnded = createEvent(this, "dragEnded", 7);
    this.dragMoved = createEvent(this, "dragMoved", 7);
    this.elementConnected = createEvent(this, "elementConnected", 7);
    this.elementDisconnected = createEvent(this, "elementDisconnected", 7);
    this.allowClose = true;
    this.allowMaximize = true;
    this.allowPinning = true;
    this.disabled = false;
    this.pinButtonClick = () => {
      this.pinToggle.emit();
    };
    this.maximizeButtonClick = () => {
      this.maximize.emit();
    };
    this.closeButtonClick = () => {
      this.close.emit();
    };
  }
  connectedCallback() {
    this.dragService = new IgcDragService(this.element);
    this.dragService.dragEdgeTolerance = 3;
    this.dragService.dragStart = args => {
      this.dragStarted.emit(args);
    };
    this.dragService.dragEnd = args => {
      this.dragEnded.emit(args);
    };
    this.dragService.dragMove = args => {
      this.dragMoved.emit(args);
    };
    this.forceDragging();
    this.elementConnected.emit(this.element);
  }
  disconnectedCallback() {
    if (this.dragService) {
      this.dragService.destroy();
    }
    this.elementDisconnected.emit(this.element);
  }
  forcedDragChanged() {
    this.forceDragging();
  }
  forceDragging() {
    if (this.forcedDrag) {
      this.dragService.forceDragging();
    }
  }
  renderCloseButton() {
    return (h("slot", { name: "paneHeaderCloseButton" }, h("igc-button-component", { part: "pane-header-close-button" }, h("igc-icon-component", { name: "close", "aria-label": this.resourceStrings.close, title: this.resourceStrings.close }))));
  }
  renderMaximizeButton() {
    return (h("slot", { name: "paneHeaderMaximizeButton" }, h("igc-button-component", { part: "pane-header-maximize-button" }, h("igc-icon-component", { name: "maximize", "aria-label": this.resourceStrings.maximize, title: this.resourceStrings.maximize }))));
  }
  renderMinimizeButton() {
    return (h("div", null, h("slot", { name: "paneHeaderMinimizeButton" }, h("igc-button-component", { part: "pane-header-minimize-button" }, h("igc-icon-component", { name: "minimize", "aria-label": this.resourceStrings.minimize, title: this.resourceStrings.minimize })))));
  }
  renderPinButton() {
    return (h(Fragment, null, !this.isFloating && h("slot", { name: "paneHeaderPinButton" }, h("igc-button-component", { part: "pane-header-pin-button", style: { display: this.isFloating ? 'none' : 'flex' } }, h("igc-icon-component", { name: "pin", "aria-label": this.resourceStrings.pin, title: this.resourceStrings.pin })), " ")));
  }
  renderUnpinButton() {
    return (h(Fragment, null, !this.isFloating && h("slot", { name: "paneHeaderUnpinButton" }, h("igc-button-component", { part: "pane-header-unpin-button", style: { display: this.isFloating ? 'none' : 'flex' } }, h("igc-icon-component", { name: "unpin", "aria-label": this.resourceStrings.unpin, title: this.resourceStrings.unpin })))));
  }
  render() {
    const commonParts = {
      active: this.isActive,
      disabled: this.disabled,
      floating: this.isFloating,
      window: this.isFloatingPaneHeader,
    };
    const paneHeaderParts = Utils.partNameMap(Object.assign({ 'pane-header': true }, commonParts));
    const paneHeaderContentParts = Utils.partNameMap(Object.assign({ 'pane-header-content': true }, commonParts));
    const paneHeaderActionsParts = Utils.partNameMap(Object.assign({ 'pane-header-actions': true }, commonParts));
    const exportParts = Utils.partNameMap(Object.assign({ 'pane-header': true, 'pane-header-actions': true, 'pane-header-content': true, 'pane-header-close-button': true, 'pane-header-maximize-button': true, 'pane-header-minimize-button': true, 'pane-header-pin-button': true, 'pane-header-unpin-button': true }, commonParts), ',');
    return (h(Host, { part: paneHeaderParts, exportparts: exportParts }, h("div", { part: paneHeaderContentParts, class: "header-text" }, h("slot", null)), h("div", Object.assign({ part: paneHeaderActionsParts, class: "header-actions" }, { [IGNORE_DRAG]: true }), this.allowPinning &&
      h("div", { onClick: this.pinButtonClick }, this.pinned ? this.renderUnpinButton() : this.renderPinButton()), this.allowMaximize &&
      h("div", { onClick: this.maximizeButtonClick }, this.maximized ? this.renderMinimizeButton() : this.renderMaximizeButton()), this.allowClose &&
      h("div", { onClick: this.closeButtonClick }, this.renderCloseButton()))));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "forcedDrag": ["forcedDragChanged"]
  }; }
};
IgcPaneHeaderComponent.style = paneHeaderComponentCss;

const paneNavigatorComponentCss = ":host,:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:host{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;width:100%;height:100%;z-index:10002}.pane-navigator{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background:var(--igc-pane-content-background, var(--igc-border-color, #F3F5F7));width:350px;height:auto;max-height:336px;overflow:hidden;line-height:24px;z-index:10002;-webkit-box-shadow:0 9px 46px 8px rgba(0, 0, 0, 0.08), 0 24px 38px 3px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.26);box-shadow:0 9px 46px 8px rgba(0, 0, 0, 0.08), 0 24px 38px 3px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.26)}.pane-navigator:focus{outline-style:none}header{background:var(--igc-background-color, #E5E7E9);min-height:40px;height:40px}header h3{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;margin:unset;font-size:0.875em;padding:8px}.body{display:-ms-flexbox;display:flex;overflow:auto}.group{display:-ms-flexbox;display:flex;-ms-flex:1 0 50%;flex:1 0 50%;-ms-flex-direction:column;flex-direction:column;overflow:hidden;padding:16px}.title{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;position:-webkit-sticky;position:sticky;top:0;background:var(--igc-pane-content-background, var(--igc-border-color, #F3F5F7));font-size:0.875em;margin:unset;-ms-flex-negative:0;flex-shrink:0}.items{overflow:auto;scrollbar-width:none}.items::-webkit-scrollbar{display:none}[part~=item]{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;font-size:16px;padding:8px 0}[part~=item][part~=selected]{color:var(--igc-active-color, cornflowerblue)}[part~=item][part~=disabled]{pointer-events:none;color:var(--igc-disabled-color, rgba(0, 0, 0, 0.38))}";

let IgcPaneNavigatorComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.closed = createEvent(this, "closed", 7);
  }
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
    return (h("article", { part: "group", class: "group" }, h("h4", { part: "title", class: "title" }, title), h("section", { class: "items" }, items === null || items === void 0 ? void 0 : items.map((item, index) => {
      return (h("div", { part: this.resolveItemPart(item, index, isDocHost), onMouseDown: () => this.selectItem(index, isDocHost), onMouseUp: () => this.closed.emit(this.allItems[this.selectedIndex]) }, item.header));
    }))));
  }
  render() {
    var _a;
    return (h(Host, { onClick: () => this.closed.emit(this.allItems[this.previousActivePaneIndex]), exportparts: "base: pane-navigator, header: pane-navigator-header, body: pane-navigator-body,\r\n                     group: pane-navigator-items-group, title: pane-navigator-items-group-title, item: pane-navigator-item, selected, disabled" }, h("article", { part: "base", class: "pane-navigator", ref: el => this.paneNav = el, tabIndex: 0, onClick: ev => ev.stopPropagation() }, h("header", { part: "header" }, h("h3", null, (_a = this.allItems[this.selectedIndex]) === null || _a === void 0 ? void 0 : _a.header)), h("section", { part: "body", class: "body" }, this.renderItems(this.resourceStrings.panes, this.activePanes, false), this.renderItems(this.resourceStrings.documents, this.activeDocuments, true)))));
  }
};
IgcPaneNavigatorComponent.style = paneNavigatorComponentCss;

const resizerComponentCss = "";

let IgcResizerComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.resizerMoved = createEvent(this, "resizerMoved", 7);
    this.resizerDragStart = createEvent(this, "resizerDragStart", 7);
    this.resizerDragEnd = createEvent(this, "resizerDragEnd", 7);
    this.dragStart = (args) => {
      this.resizerDragStart.emit(args);
    };
    this.dragEnd = (args) => {
      this.resizerDragEnd.emit(args);
    };
    this.dragMove = (args) => {
      this.resizerMoved.emit(args);
    };
  }
  get isCornerResizer() {
    return this.orientation === IgcResizerLocation.bottomLeft || this.orientation === IgcResizerLocation.bottomRight ||
      this.orientation === IgcResizerLocation.topLeft || this.orientation === IgcResizerLocation.topRight;
  }
  connectedCallback() {
    this.dragService = new IgcDragService(this.element);
    this.dragService.dragStart = this.dragStart;
    this.dragService.dragEnd = this.dragEnd;
    this.dragService.dragMove = this.dragMove;
  }
  disconnectedCallback() {
    this.dragService.destroy();
  }
  render() {
    return (h(Host, { style: {
        position: 'absolute',
        pointerEvents: 'all',
        height: (this.orientation === IgcResizerLocation.left || this.orientation === IgcResizerLocation.right) ?
          '100%' : this.isCornerResizer ? '10px' : '5px',
        width: (this.orientation === IgcResizerLocation.left || this.orientation === IgcResizerLocation.right) ? '5px' :
          this.isCornerResizer ? '10px' : '100%',
        cursor: this.orientation === IgcResizerLocation.left || this.orientation === IgcResizerLocation.right ?
          'ew-resize' : (this.orientation === IgcResizerLocation.bottomLeft || this.orientation === IgcResizerLocation.topRight) ?
          'ne-resize' : (this.orientation === IgcResizerLocation.bottomRight || this.orientation === IgcResizerLocation.topLeft) ?
          'nw-resize' : 'ns-resize',
        left: this.orientation === IgcResizerLocation.left || this.orientation === IgcResizerLocation.topLeft ||
          this.orientation === IgcResizerLocation.bottomLeft ? '-3px' : null,
        top: this.orientation === IgcResizerLocation.top || this.orientation === IgcResizerLocation.topLeft ||
          this.orientation === IgcResizerLocation.topRight ? '0px' : null,
        right: this.orientation === IgcResizerLocation.right || this.orientation === IgcResizerLocation.bottomRight ||
          this.orientation === IgcResizerLocation.topRight ? '-3px' : null,
        bottom: this.orientation === IgcResizerLocation.bottom || this.orientation === IgcResizerLocation.bottomRight ||
          this.orientation === IgcResizerLocation.bottomLeft ? '-3px' : null,
        zIndex: '10002'
      } }));
  }
  get element() { return getElement(this); }
};
IgcResizerComponent.style = resizerComponentCss;

const rootDockingIndicatorComponentCss = ".sc-igc-root-docking-indicator-component-h{display:-ms-flexbox;display:flex;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-item-align:center;align-self:center;pointer-events:all;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;margin:10px;width:30px;height:30px;color:var(--igc-joystick-icon-color, var(--igc-text-color, rgba(0, 0, 0, 0.72)));background:var(--igc-joystick-background, var(--igc-accent-color, #fff));-webkit-transition:color 0.25s ease-out, background 0.25s ease-out;transition:color 0.25s ease-out, background 0.25s ease-out;border:1px solid var(--igc-joystick-border-color, var(--igc-accent-color, #fff))}.sc-igc-root-docking-indicator-component-h:hover{color:var(--igc-joystick-icon-color-active, #000);background:var(--igc-joystick-background-active, var(--igc-accent-color, #fff))}";

let IgcRootDockingIndicatorComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h(Host, { part: "root-docking-indicator" }, h("igc-icon-component", { name: "first_page", style: {
        transform: this.position === IgcDockingIndicatorPosition.top ? 'rotate(90deg)' :
          this.position === IgcDockingIndicatorPosition.right ? 'rotate(180deg)' :
            this.position === IgcDockingIndicatorPosition.bottom ? 'rotate(270deg)' : 'rotate(0deg)'
      } })));
  }
};
IgcRootDockingIndicatorComponent.style = rootDockingIndicatorComponentCss;

const splitPaneComponentCss = ".sc-igc-split-pane-component-h{height:100%;display:-ms-flexbox;display:flex;-ms-flex-align:stretch;align-items:stretch;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:0;min-height:0;border:none}";

let IgcSplitPaneComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.rendered = createEvent(this, "rendered", 7);
  }
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
};
IgcSplitPaneComponent.style = splitPaneComponentCss;

const splitterComponentCss = ":host{position:relative;display:-ms-flexbox;display:flex;-ms-flex:0 0 4px;flex:0 0 4px;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:all}.splitter{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;width:100%;height:100%;cursor:ew-resize;background:var(--igc-splitter-background, #D3D6D9);--resize-handle-width:2px;--resize-handle-height:80px;outline-style:none}.splitter:not(.splitter--custom-handle)::after{position:absolute;content:\"\";background:var(--igc-splitter-handle, var(--igc-accent-color, #fff));top:50%;left:50%;width:var(--resize-handle-width);height:var(--resize-handle-height);max-height:100%;max-width:100%;border-radius:1px;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.splitter:focus-within{background-color:var(--igc-active-color, cornflowerblue)}.splitter--vertical{cursor:ns-resize}.splitter--vertical:not(.splitter--custom-handle)::after{width:var(--resize-handle-height);height:var(--resize-handle-width)}.splitter-ghost{position:absolute;cursor:ew-resize;opacity:0.3;background:black;width:100%;height:100%;z-index:5}.splitter-ghost--vertical{cursor:ns-resize}";

let IgcSplitterComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.resizeStart = createEvent(this, "resizeStart", 7);
    this.resizeEnd = createEvent(this, "resizeEnd", 7);
    this.handleMouseUp = () => {
      document.documentElement.removeEventListener('mouseup', this.handleMouseUp, false);
      this.showDragGhost = false;
    };
    this.dragStart = () => {
      this.dragStartHelper(0);
    };
    this.dragEnd = () => {
      this.dragEndHelper();
    };
    this.dragMove = (args) => {
      if (!this.ghostElement) {
        return;
      }
      const rect = this.ghostElement.getBoundingClientRect();
      const isHorizontal = this.splitPaneOrientation === IgcSplitPaneOrientation.horizontal;
      const clientCoordinate = isHorizontal ? args.clientX : args.clientY;
      const offset = isHorizontal ? args.offsetX : args.offsetY;
      const startCoordinate = isHorizontal ? rect.left : rect.top;
      const endCoordinate = isHorizontal ? rect.right : rect.bottom;
      if (offset <= 0 && startCoordinate < clientCoordinate) {
        return;
      }
      if (offset >= 0 && endCoordinate > clientCoordinate) {
        return;
      }
      this.dragOffset += offset;
      if (this.flyoutLocation) {
        this.constrainFlyoutResize();
      }
      else {
        this.constrainSplitPaneResize();
      }
    };
  }
  connectedCallback() {
    this.dragService = new IgcDragService(this.element);
    this.dragService.dragStart = this.dragStart;
    this.dragService.dragEnd = this.dragEnd;
    this.dragService.dragMove = this.dragMove;
  }
  disconnectedCallback() {
    this.dragService.destroy();
    document.documentElement.removeEventListener('mouseup', this.handleMouseUp, false);
  }
  calculateOffset(event) {
    if (this.isArrowUp(event) || this.isArrowLeft(event)) {
      return -IGC_DEFAULT_RESIZE;
    }
    else if (this.isArrowDown(event) || this.isArrowRight(event)) {
      return IGC_DEFAULT_RESIZE;
    }
  }
  isArrowUp(event) {
    return event.key === 'ArrowUp';
  }
  isArrowDown(event) {
    return event.key === 'ArrowDown';
  }
  isArrowLeft(event) {
    return event.key === 'ArrowLeft';
  }
  isArrowRight(event) {
    return event.key === 'ArrowRight';
  }
  handleKeydownEvent(event) {
    if (this.splitPaneOrientation === IgcSplitPaneOrientation.horizontal &&
      (!this.isArrowLeft(event) && !this.isArrowRight(event))) {
      return;
    }
    if (this.splitPaneOrientation === IgcSplitPaneOrientation.vertical &&
      (!this.isArrowUp(event) && !this.isArrowDown(event))) {
      return;
    }
    this.showDragGhost = false;
    this.dragStartHelper(this.calculateOffset(event));
    if (this.flyoutLocation) {
      this.constrainFlyoutResize();
    }
    else {
      this.constrainSplitPaneResize();
    }
    this.dragEndHelper();
  }
  handleMouseDown() {
    this.showDragGhost = true;
    document.documentElement.addEventListener('mouseup', this.handleMouseUp, false);
    this.resizeStart.emit();
  }
  dragStartHelper(dragOffset) {
    this.dragOffset = dragOffset;
    const parent = this.element.parentElement;
    const children = Array.from(parent.children);
    if (this.flyoutLocation) {
      const pane = children[0];
      this.paneSizes = [this.splitPaneOrientation === IgcSplitPaneOrientation.horizontal ?
          pane.offsetWidth : pane.offsetHeight];
      this.flyoutMaxSize = this.splitPaneOrientation === IgcSplitPaneOrientation.horizontal ?
        parent.offsetWidth - IGC_RESIZING_MIN_SIZE :
        parent.offsetHeight - IGC_RESIZING_MIN_SIZE;
    }
    else {
      const index = children.indexOf(this.element);
      const panes = [children[index - 1], children[index + 1]];
      this.paneSizes = panes.map(p => this.splitPaneOrientation === IgcSplitPaneOrientation.horizontal ?
        p.offsetWidth : p.offsetHeight);
    }
  }
  dragEndHelper() {
    const dragOffset = this.dragOffset;
    this.showDragGhost = false;
    this.dragOffset = 0;
    this.paneSizes = null;
    this.resizeEnd.emit(dragOffset);
  }
  constrainFlyoutResize() {
    const paneSize = this.paneSizes[0];
    const isStartLocation = this.flyoutLocation === IgcUnpinnedLocation.left || this.flyoutLocation === IgcUnpinnedLocation.top;
    const offset = isStartLocation ?
      this.dragOffset :
      -this.dragOffset;
    if (paneSize + offset < IGC_RESIZING_MIN_SIZE) {
      const minOffset = paneSize - IGC_RESIZING_MIN_SIZE;
      this.dragOffset = isStartLocation ? -minOffset : minOffset;
    }
    else if (paneSize + offset > this.flyoutMaxSize) {
      const maxOffset = this.flyoutMaxSize - paneSize;
      this.dragOffset = isStartLocation ? maxOffset : -maxOffset;
    }
  }
  constrainSplitPaneResize() {
    let rtl = false;
    const dockmanager = this.closestElement('ngx-flexlayout', this.element);
    if (dockmanager.dir !== '') {
      rtl = dockmanager.dir === 'rtl';
    }
    else {
      let parent = dockmanager.parentElement;
      while (parent) {
        if (parent.dir !== '') {
          rtl = parent.dir === 'rtl';
          break;
        }
        parent = parent.parentElement;
      }
    }
    const isVertical = this.splitPaneOrientation === IgcSplitPaneOrientation.vertical;
    if (this.dragOffset < 0) {
      const referencePaneSize = !rtl || isVertical ? this.paneSizes[0] : this.paneSizes[1];
      if (referencePaneSize > IGC_RESIZING_MIN_SIZE) {
        if (referencePaneSize + this.dragOffset < IGC_RESIZING_MIN_SIZE) {
          this.dragOffset = -(referencePaneSize - IGC_RESIZING_MIN_SIZE);
        }
      }
      else {
        this.dragOffset = 0;
      }
    }
    else {
      const referencePaneSize = !rtl || isVertical ? this.paneSizes[1] : this.paneSizes[0];
      if (referencePaneSize > IGC_RESIZING_MIN_SIZE) {
        if (referencePaneSize - this.dragOffset < IGC_RESIZING_MIN_SIZE) {
          this.dragOffset = referencePaneSize - IGC_RESIZING_MIN_SIZE;
        }
      }
      else {
        this.dragOffset = 0;
      }
    }
  }
  closestElement(selector, el) {
    return ((el && el.closest(selector)) ||
      this.closestElement(selector, el.getRootNode().host));
  }
  handleSlotChange() {
    const handleSlot = this.element.shadowRoot.querySelector('slot[name="splitterHandle"]');
    const isVertical = this.splitPaneOrientation === IgcSplitPaneOrientation.vertical;
    this.hasCustomSplitterHandle = handleSlot.assignedElements().length > 0;
    if (this.hasCustomSplitterHandle) {
      const handle = this.element.querySelector('[part="splitter-handle"]');
      const parts = Utils.partNameMap({
        'splitter-handle': true,
        'vertical': isVertical,
        'horizontal': !isVertical
      });
      handle.setAttribute('part', parts);
    }
  }
  render() {
    const isVertical = this.splitPaneOrientation === IgcSplitPaneOrientation.vertical;
    const splitterClasses = {
      'splitter': true,
      'splitter--vertical': isVertical,
      'splitter--custom-handle': this.hasCustomSplitterHandle
    };
    const ghostClasses = {
      'splitter-ghost': true,
      'splitter-ghost--vertical': isVertical
    };
    return (h(Host, { part: "splitter", exportparts: "splitter,\r\n        splitter-base,\r\n        splitter-ghost" }, h("div", { part: "splitter-base", class: splitterClasses, tabIndex: 0, role: "separator", "aria-orientation": this.splitPaneOrientation.toString() }, h("slot", { name: "splitterHandle", onSlotchange: this.handleSlotChange.bind(this) })), this.showDragGhost &&
      h("div", { part: "splitter-ghost", class: ghostClasses, style: {
          left: `${isVertical ? 0 : this.dragOffset}px`,
          top: `${isVertical ? this.dragOffset : 0}px`
        }, ref: el => this.ghostElement = el })));
  }
  get element() { return getElement(this); }
};
IgcSplitterComponent.style = splitterComponentCss;

const tabHeaderComponentCss = ":host([part~=hover-preview-close][part~=selected]) ::slotted(span),:host([part~=hover-preview-close]:hover) ::slotted(span){max-width:calc(100% - 18px);white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;height:100%;padding:0.5em;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:var(--igc-tab-text, var(--igc-text-color, rgba(0, 0, 0, 0.72)));background:var(--igc-tab-background, var(--igc-background-color, #E5E7E9));border-style:solid;border-color:var(--igc-tab-border-color, var(--igc-border-color, #F3F5F7));border-top-width:1px;border-left-width:1px;border-bottom-width:0;border-right-width:1px;font-size:0.75em;line-height:2;outline-style:none}:host igc-icon-component svg{width:17px;height:17px}:host *+igc-button-component{margin-left:0.5em}:host([part~=selected]){color:var(--igc-tab-text-active, var(--igc-text-color, rgba(0, 0, 0, 0.72)));background:var(--igc-tab-background-active, var(--igc-border-color, #F3F5F7));border-color:var(--igc-tab-border-color-active, var(--igc-border-color, #F3F5F7))}:host([part~=bottom]){border-top-width:0;border-bottom-width:1px}:host([part~=bottom]):first-of-type{border-left:none}:host([part~=active]){-webkit-box-shadow:inset 0 -2px 0 0 var(--igc-active-color, cornflowerblue);box-shadow:inset 0 -2px 0 0 var(--igc-active-color, cornflowerblue);color:var(--igc-active-color, cornflowerblue)}:host([part~=active]) igc-icon-component{color:var(--igc-icon-active-color, var(--igc-active-color, cornflowerblue))}:host([part~=disabled]){pointer-events:none;color:var(--igc-disabled-color, rgba(0, 0, 0, 0.38))}:host(:hover) [part*=floating]{opacity:1}[part*=floating]{position:absolute;inset-inline-end:0;background:inherit;opacity:0;-webkit-transition:opacity 0.1s ease-out;transition:opacity 0.1s ease-out}[part*=selected]{opacity:1}";

let IgcTabHeaderComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.dragStarted = createEvent(this, "dragStarted", 7);
    this.dragMoved = createEvent(this, "dragMoved", 7);
    this.dragEnded = createEvent(this, "dragEnded", 7);
    this.tabMouseDown = createEvent(this, "tabMouseDown", 7);
    this.iconClicked = createEvent(this, "iconClicked", 7);
    this.iconKeyDown = createEvent(this, "iconKeyDown", 7);
    this.elementConnected = createEvent(this, "elementConnected", 7);
    this.elementDisconnected = createEvent(this, "elementDisconnected", 7);
    this.selected = false;
    this.hovered = false;
    this.position = IgcTabHeadersPosition.top;
    this.disabled = false;
    this.iconClick = (ev) => {
      this.iconClicked.emit(ev);
    };
    this.keyDown = (ev) => {
      this.iconKeyDown.emit(ev);
    };
  }
  connectedCallback() {
    this.dragService = new IgcDragService(this.element);
    this.dragService.dragStart = args => {
      this.dragStarted.emit(args);
    };
    this.dragService.dragMove = args => {
      this.dragMoved.emit(args);
    };
    this.dragService.dragEnd = args => {
      this.dragEnded.emit(args);
    };
    this.forceDragging();
    this.elementConnected.emit(this.element);
  }
  disconnectedCallback() {
    if (this.dragService) {
      this.dragService.destroy();
    }
    this.elementDisconnected.emit(this.element);
  }
  handleMouseDown(ev) {
    const iconSlot = this.element.shadowRoot.querySelector('div[part*="tab-header-more-options"]');
    const isIconClicked = ev.composedPath().filter(p => p === iconSlot).length > 0;
    this.tabMouseDown.emit({ showHeaderIconOnHover: this.showHeaderIconOnHover, isIconClicked });
  }
  handleMouseEnter() {
    this.hovered = true;
  }
  handleMouseLeave() {
    this.hovered = false;
  }
  forcedDragChanged() {
    this.forceDragging();
  }
  forceDragging() {
    if (this.forcedDrag) {
      this.dragService.forceDragging();
    }
  }
  activeChanged() {
    const queryButton = 'tab-header-close-button';
    const button = this.element.querySelector(`[part^=${queryButton}]`);
    const parts = Utils.partNameMap({
      [queryButton]: true,
      active: this.isActive,
      selected: this.selected,
      hovered: this.hovered
    });
    button === null || button === void 0 ? void 0 : button.setAttribute('part', parts);
  }
  renderCloseButton() {
    const showHeaderIconOnHover = this.showHeaderIconOnHover && (this.showHeaderIconOnHover === 'closeOnly' || this.showHeaderIconOnHover === 'all');
    const shouldShowButton = this.selected || showHeaderIconOnHover;
    const pointerEvents = (this.selected && !this.disabled) || this.showHeaderIconOnHover ? 'all' : 'none';
    return (shouldShowButton && h("slot", { name: "tabHeaderCloseButton" }, h("igc-button-component", { part: "tab-header-close-button", style: {
        pointerEvents
      } }, h("igc-icon-component", { name: this.iconName, "aria-label": this.resourceStrings.close, title: this.resourceStrings.close }))));
  }
  renderMoreOptionsButton() {
    const showHeaderIconOnHover = this.showHeaderIconOnHover && (this.showHeaderIconOnHover === 'moreOptionsOnly' || this.showHeaderIconOnHover === 'all');
    const shouldShowButton = this.selected || showHeaderIconOnHover;
    const pointerEvents = (this.selected && !this.disabled) || this.showHeaderIconOnHover ? 'all' : 'none';
    return (shouldShowButton && h("slot", { name: "tabHeaderMoreOptionsButton" }, h("igc-button-component", { part: "tab-header-more-options-button", style: {
        pointerEvents
      } }, h("igc-icon-component", { name: this.iconName, "aria-label": this.resourceStrings.moreOptions, title: this.resourceStrings.moreOptions }))));
  }
  render() {
    const showCloseOnHover = this.iconName === 'close' && this.showHeaderIconOnHover && (this.showHeaderIconOnHover === 'closeOnly' || this.showHeaderIconOnHover === 'all');
    const showMoreOptionsOnHover = this.iconName !== 'close' && this.showHeaderIconOnHover && (this.showHeaderIconOnHover === 'moreOptionsOnly' || this.showHeaderIconOnHover === 'all');
    const parts = Utils.partNameMap({
      'tab-header': true,
      top: this.position === IgcTabHeadersPosition.top,
      active: this.isActive,
      selected: this.selected,
      disabled: this.disabled,
      'hover-preview-close': showCloseOnHover,
      'hover-preview-options': showMoreOptionsOnHover,
      bottom: this.position === IgcTabHeadersPosition.bottom,
    });
    const tabParts = Utils.partNameMap({
      'tab-header-more-options': true,
      'floating': !this.selected && (showCloseOnHover || showMoreOptionsOnHover),
      'selected': this.selected
    });
    const exportparts = Utils.partNameMap({
      'tab-header-close-button': true,
      'tab-header-more-options': true,
      'tab-header-more-options-button': true,
      'floating': true,
      'selected': true,
      'active': true
    }, ',');
    return (h(Host, { role: "tab", part: parts, exportparts: exportparts, "aria-label": this.header, "aria-selected": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : 'false', tabIndex: !this.selected || this.disabled ? -1 : 0 }, h("slot", null), this.iconName &&
      h("div", Object.assign({ part: tabParts, onClick: this.iconClick, onKeyDown: this.keyDown }, { [IGNORE_DRAG]: true }), this.iconName === 'close' ? this.renderCloseButton() : this.renderMoreOptionsButton())));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "forcedDrag": ["forcedDragChanged"],
    "isActive": ["activeChanged"],
    "selected": ["activeChanged"],
    "hovered": ["activeChanged"]
  }; }
};
IgcTabHeaderComponent.style = tabHeaderComponentCss;

const tabPanelComponentCss = ":host{display:block;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:auto;-ms-flex-positive:1;flex-grow:1;height:100%;color:var(--igc-pane-content-text, var(--igc-text-color, rgba(0, 0, 0, 0.72)));background-color:var(--igc-pane-content-background, var(--igc-border-color, #F3F5F7))}:host([part~=disabled]){pointer-events:none;color:var(--igc-disabled-color, rgba(0, 0, 0, 0.38))}";

let IgcTabPanelComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selectedChanged = createEvent(this, "selectedChanged", 7);
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
      } }, h("slot", null)));
  }
  get element() { return getElement(this); }
  static get watchers() { return {
    "selected": ["selectedPropChange"]
  }; }
};
IgcTabPanelComponent.style = tabPanelComponentCss;

const tabsComponentCss = ":host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:0px;min-height:0px}.tabs{display:-ms-flexbox;display:flex;overflow:hidden;min-height:32px;max-height:32px;background:var(--igc-dock-background, var(--igc-background-color, #E5E7E9))}.tabs--top{padding-top:8px}.tabs--top .tab-headers-container--wrapped{-ms-flex-wrap:wrap;flex-wrap:wrap}.tabs--bottom{padding-bottom:8px}.tabs--bottom .tab-headers-container--wrapped{-ms-flex-wrap:wrap-reverse;flex-wrap:wrap-reverse}.content{-ms-flex-positive:1;flex-grow:1;height:100%;overflow:auto}.tab-headers-container{width:100%;display:-ms-flexbox;display:flex;overflow:hidden}.tab-header-icon-container{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-pack:end;justify-content:flex-end;padding-left:8px;padding-right:8px}";

/**
 * @hidden
 */
let NEXT_TAB_ID = 0;
let IgcTabsComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.maximize = createEvent(this, "maximize", 7);
    this.maximizeMinimizeFocus = createEvent(this, "maximizeMinimizeFocus", 7);
    this.selectedIndexChanged = createEvent(this, "selectedIndexChanged", 3);
    this.hiddenTabSelected = createEvent(this, "hiddenTabSelected", 3);
    this.selectedTabOutOfView = createEvent(this, "selectedTabOutOfView", 3);
    this.rendered = createEvent(this, "rendered", 7);
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
      }, class: classes, onKeyDown: this.onTabKeyDown }, h("div", { class: {
        'tab-headers-container': true,
        'tab-headers-container--wrapped': this.showHiddenTabsMenu
      } }, h("slot", { name: "tabHeader" })), h("div", { part: tabStripActionsParts, class: "tab-header-icon-container" }, this.showHiddenTabsMenu && this.hasHiddenTabs &&
      h("div", { onClick: this.handleHiddenTabsMenuClick.bind(this) }, this.renderMoreTabsButton()), !(this.showHiddenTabsMenu && this.hasHiddenTabs) &&
      h("span", { style: { width: '25px' } }), this.allowMaximize &&
      h("div", { onClick: this.maximizeButtonClick, onFocusin: this.handleMaximizeMinimizeFocus }, this.maximized ? this.renderMinimizeButton() : this.renderMaximizeButton()))));
  }
  renderMoreTabsButton() {
    return (h("span", null, h("slot", { name: "tabsMoreButton" }, h("igc-button-component", { part: "tabs-more-button" }, h("igc-icon-component", { name: "more", "aria-label": this.resourceStrings.moreTabs, title: this.resourceStrings.moreTabs, style: {
        display: 'block'
      } })))));
  }
  renderMaximizeButton() {
    return (h("div", null, h("slot", { name: "tabsMaximizeButton" }, h("igc-button-component", { part: "tabs-maximize-button" }, h("igc-icon-component", { name: "maximize", "aria-label": this.resourceStrings.maximize, title: this.resourceStrings.maximize })))));
  }
  renderMinimizeButton() {
    return (h("slot", { name: "tabsMinimizeButton" }, h("igc-button-component", { part: "tabs-minimize-button" }, h("igc-icon-component", { name: "minimize", "aria-label": this.resourceStrings.minimize, title: this.resourceStrings.minimize }))));
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
      }, exportparts: exportParts, part: "tabs-container" }, top && this.renderTabHeaders(top), h("div", { part: tabsContentParts, class: "content" }, h("slot", { onSlotchange: this.slotChanged.bind(this) })), bottom && this.renderTabHeaders(top), this.renderHiddenTabsMenu()));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "selectedIndex": ["selectedIndexPropertyChanged"]
  }; }
};
IgcTabsComponent.style = tabsComponentCss;

const unpinnedPaneHeaderComponentCss = ":host{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:12px;padding:4px;margin-right:4px;color:var(--igc-pinned-header-text, var(--igc-text-color, rgba(0, 0, 0, 0.72)));background:var(--igc-pinned-header-background, var(--igc-accent-color, #fff));cursor:pointer;outline-style:none}:host([part~=vertical]){-webkit-writing-mode:tb-rl;-ms-writing-mode:tb-rl;writing-mode:tb-rl;margin-right:unset;margin-bottom:4px}:host([part~=active]){color:var(--igc-active-color, cornflowerblue);-webkit-box-shadow:inset 0 -2px 0 0 var(--igc-active-color, cornflowerblue);box-shadow:inset 0 -2px 0 0 var(--igc-active-color, cornflowerblue)}:host([part~=vertical][part~=active]){-webkit-box-shadow:inset 2px 0 0 0 var(--igc-active-color, cornflowerblue);box-shadow:inset 2px 0 0 0 var(--igc-active-color, cornflowerblue)}:host([part~=disabled]){pointer-events:none;color:var(--igc-disabled-color, rgba(0, 0, 0, 0.38))}";

let IgcUnpinnedPaneHeaderComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.disabled = false;
  }
  render() {
    const isHorizontal = this.location === IgcUnpinnedLocation.top || this.location === IgcUnpinnedLocation.bottom;
    const isLeft = this.location === IgcUnpinnedLocation.left;
    const isRight = this.location === IgcUnpinnedLocation.right;
    const isTop = this.location === IgcUnpinnedLocation.top;
    const isBottom = this.location === IgcUnpinnedLocation.bottom;
    const parts = Utils.partNameMap({
      'unpinned-pane-header': true,
      horizontal: isHorizontal,
      vertical: !isHorizontal,
      start: isLeft || isTop,
      end: isRight || isBottom,
      active: this.isActive,
      disabled: this.disabled,
    });
    return (h(Host, { part: parts, role: "tab", "aria-disabled": this.disabled ? 'true' : 'false', tabindex: this.disabled ? -1 : 0 }, h("slot", null)));
  }
};
IgcUnpinnedPaneHeaderComponent.style = unpinnedPaneHeaderComponentCss;

const sampleComponentCss = ".sc-sample-component-h{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:100%}";

/**
 * @hidden
 */
const customResourceStrings = {
  close: '[Custom]Close',
  pin: '[Custom]Pin',
  unpin: '[Custom]Unpin',
  maximize: '[Custom]Maximize',
  minimize: '[Custom]Minimize',
  moreOptions: '[Custom]More options'
};
addResourceStrings('custom', customResourceStrings);
let SampleComponent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hiddenPanes = [];
    this.teamExplorerPane = {
      type: IgcDockManagerPaneType.contentPane,
      header: 'Team Explorer',
      contentId: 'content7',
      allowMaximize: true
    };
    this.unpinnedToolboxPane = {
      type: IgcDockManagerPaneType.contentPane,
      header: 'Toolbox',
      contentId: 'content1',
      isPinned: false,
      unpinnedHeaderId: "toolboxHeader"
    };
    this.unpinnedTeamExplorerPane = {
      type: IgcDockManagerPaneType.contentPane,
      header: 'Team Explorer',
      contentId: 'content14',
      isPinned: false,
      unpinnedHeaderId: "teamExplorerHeader"
    };
    this.layout1 = {
      rootPane: {
        type: IgcDockManagerPaneType.splitPane,
        orientation: IgcSplitPaneOrientation.horizontal,
        panes: [
          this.unpinnedToolboxPane,
          this.unpinnedTeamExplorerPane,
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            size: 300,
            panes: [
              {
                type: IgcDockManagerPaneType.documentHost,
                size: 300,
                rootPane: {
                  type: IgcDockManagerPaneType.splitPane,
                  orientation: IgcSplitPaneOrientation.horizontal,
                  allowEmpty: true,
                  panes: [
                    {
                      type: IgcDockManagerPaneType.tabGroupPane,
                      panes: [
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: 'MainWindow.xaml',
                          contentId: 'content2',
                          documentOnly: true,
                          // allowMaximize: false,
                        },
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: 'MainWindow.xaml.cs',
                          contentId: 'content6',
                          documentOnly: true,
                          allowFloating: false
                        }
                      ]
                    },
                    {
                      type: IgcDockManagerPaneType.contentPane,
                      header: 'App.xaml',
                      contentId: 'content8',
                      allowMaximize: true
                    }
                  ]
                }
              },
              {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.horizontal,
                allowEmpty: true,
                panes: []
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                header: 'Error List',
                contentId: 'content3',
                allowDocking: false,
                allowFloating: false,
                allowMaximize: false
              }
            ]
          },
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            panes: [
              {
                type: IgcDockManagerPaneType.tabGroupPane,
                size: 200,
                allowEmpty: true,
                panes: [
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    header: 'Solution Explorer',
                    headerId: 'header1',
                    tabHeaderId: 'tabHeader1',
                    unpinnedHeaderId: 'unpinnedHeader1',
                    contentId: 'content4',
                    allowMaximize: false
                  },
                  this.teamExplorerPane
                ]
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                header: 'Properties',
                contentId: 'content5',
                unpinnedLocation: IgcUnpinnedLocation.top,
                allowFloating: false,
                allowMaximize: false
              }
            ]
          }
        ]
      },
      floatingPanes: [
        {
          type: IgcDockManagerPaneType.splitPane,
          orientation: IgcSplitPaneOrientation.horizontal,
          floatingLocation: { x: 50, y: 100 },
          floatingWidth: 200,
          floatingHeight: 100,
          panes: [
            {
              type: IgcDockManagerPaneType.contentPane,
              header: 'Notifications',
              contentId: 'content9',
              allowDocking: false
            }
          ],
          // floatingResizable: true
        },
        {
          type: IgcDockManagerPaneType.splitPane,
          allowEmpty: true,
          orientation: IgcSplitPaneOrientation.horizontal,
          floatingLocation: { x: 250, y: 350 },
          floatingWidth: 300,
          floatingHeight: 200,
          panes: [
            {
              type: IgcDockManagerPaneType.contentPane,
              header: 'Floating 1',
              contentId: 'content10'
            },
            {
              type: IgcDockManagerPaneType.contentPane,
              header: 'Floating 2',
              contentId: 'content11',
              allowMaximize: false
            }
          ]
        },
        {
          type: IgcDockManagerPaneType.splitPane,
          orientation: IgcSplitPaneOrientation.horizontal,
          floatingLocation: { x: 750, y: 200 },
          floatingWidth: 300,
          floatingHeight: 200,
          panes: [
            {
              type: IgcDockManagerPaneType.tabGroupPane,
              allowEmpty: true,
              panes: [
                {
                  type: IgcDockManagerPaneType.contentPane,
                  header: 'Floating Tab 1',
                  contentId: 'content12'
                },
                {
                  type: IgcDockManagerPaneType.contentPane,
                  header: 'Floating Tab 2',
                  contentId: 'content13'
                }
              ]
            }
          ]
        }
      ]
    };
    this.layout2 = {
      rootPane: {
        type: IgcDockManagerPaneType.splitPane,
        orientation: IgcSplitPaneOrientation.horizontal,
        panes: [
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            panes: [
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: 'content1',
                header: 'Content Pane 1'
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: 'content2',
                header: 'Unpinned Pane 1',
                isPinned: false
              }
            ]
          },
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            size: 200,
            panes: [
              {
                type: IgcDockManagerPaneType.documentHost,
                size: 200,
                rootPane: {
                  type: IgcDockManagerPaneType.splitPane,
                  orientation: IgcSplitPaneOrientation.horizontal,
                  panes: [
                    {
                      type: IgcDockManagerPaneType.tabGroupPane,
                      panes: [
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: 'Document 1',
                          contentId: 'content3'
                        },
                        {
                          type: IgcDockManagerPaneType.contentPane,
                          header: 'Document 2',
                          contentId: 'content4'
                        }
                      ]
                    }
                  ]
                }
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: 'content5',
                header: 'Unpinned Pane 2',
                isPinned: false
              }
            ]
          },
          {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            panes: [
              {
                type: IgcDockManagerPaneType.tabGroupPane,
                size: 200,
                // selectedIndex: 1,
                panes: [
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: 'content6',
                    header: 'Tab 1'
                  },
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: 'content7',
                    header: 'Tab 2'
                  },
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: 'content8',
                    header: 'Tab 3'
                  },
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: 'content9',
                    header: 'Tab 4'
                  },
                  {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: 'content10',
                    header: 'Tab 5'
                  }
                ]
              },
              {
                type: IgcDockManagerPaneType.contentPane,
                contentId: 'content11',
                header: 'Content Pane 2'
              }
            ]
          }
        ]
      },
      floatingPanes: [
        {
          type: IgcDockManagerPaneType.splitPane,
          orientation: IgcSplitPaneOrientation.horizontal,
          floatingHeight: 150,
          floatingWidth: 250,
          floatingLocation: { x: 300, y: 200 },
          panes: [
            {
              type: IgcDockManagerPaneType.contentPane,
              contentId: 'content12',
              header: 'Floating Pane'
            }
          ]
        }
      ]
    };
    this.layout = this.layout1;
    this.logEnabled = false;
    this.id = 100;
    this.foundElem = [];
  }
  saveLayout() {
    this.savedLayout = JSON.stringify(this.dockManager.layout);
  }
  loadLayout() {
    this.dockManager.layout = JSON.parse(this.savedLayout);
  }
  setActivePane() {
    // this.dockManager.activePane = this.teamExplorerPane;
    this.dockManager.activePane = this.unpinnedToolboxPane;
  }
  addPane() {
    this.newId = `content${this.id++}`;
    const newDiv = this.createElement(this.newId, 'input');
    this.dockManager.appendChild(newDiv);
    this.layout.floatingPanes[1].panes.push({
      type: IgcDockManagerPaneType.contentPane,
      header: 'NewPane',
      contentId: this.newId
    });
    this.dockManager.layout = Object.assign({}, this.layout);
  }
  addTab() {
    this.findElement(this.layout.rootPane, IgcDockManagerPaneType.tabGroupPane);
    this.newId = `content${this.id++}`;
    const newDiv = this.createElement(this.newId, 'button');
    this.dockManager.appendChild(newDiv);
    const tabGroupPane = this.foundElem[0];
    tabGroupPane.panes.push({
      type: IgcDockManagerPaneType.contentPane,
      header: 'NewTab',
      contentId: this.newId
    });
    this.dockManager.layout = Object.assign({}, this.layout);
  }
  disableContentPane() {
    this.findElement(this.layout.rootPane, IgcDockManagerPaneType.tabGroupPane);
    const tabGroupPane = this.foundElem[0];
    tabGroupPane.panes[0].disabled = true;
    this.dockManager.layout = Object.assign({}, this.layout);
  }
  findElement(pane, type) {
    if (!pane) {
      return;
    }
    if (pane.type === type) {
      this.foundElem.push(pane);
    }
    if (pane.type === IgcDockManagerPaneType.tabGroupPane || pane.type === IgcDockManagerPaneType.splitPane) {
      for (const c of pane.panes) {
        this.findElement(c, type);
      }
    }
    if (pane.type === IgcDockManagerPaneType.documentHost) {
      this.findElement(pane.rootPane, type);
    }
  }
  showPane() {
    const index = this.hiddenPanesSelect.selectedIndex;
    if (index >= 0) {
      this.hiddenPanes[index].hidden = false;
      this.hiddenPanes.splice(index, 1);
      this.hiddenPanes = [...this.hiddenPanes];
      this.dockManager.layout = Object.assign({}, this.dockManager.layout);
    }
  }
  showAllPanes() {
    if (this.hiddenPanes.length > 0) {
      for (const pane of this.hiddenPanes) {
        pane.hidden = false;
      }
      this.hiddenPanes = [];
      this.dockManager.layout = Object.assign({}, this.dockManager.layout);
    }
  }
  createElement(content, typeOfElement) {
    const someContent = document.createTextNode(content);
    let elem;
    switch (typeOfElement) {
      case ('button'):
        elem = document.createElement('button');
        elem.appendChild(someContent);
        break;
      case ('input'):
        elem = document.createElement('input');
        break;
    }
    const divContent = document.createElement('div');
    divContent.appendChild(elem ? elem : someContent);
    divContent.setAttribute('slot', content);
    divContent.setAttribute('style', 'width: 100%; height: 100%;');
    return divContent;
  }
  handlePaneClose(event) {
    this.log(event);
    if (this.hideOnCloseCheckbox.checked) {
      for (const pane of event.detail.panes) {
        pane.hidden = true;
        this.hiddenPanes.splice(0, 0, pane);
        this.hiddenPanes = [...this.hiddenPanes];
      }
      event.preventDefault();
    }
    // const panes = event.detail.panes;
    // const confirmed = confirm(`Are you sure you want to close panes '${panes.map(p => p.header).join(', ')}'?`);
    // // event.detail.panes = [panes[0]];
    // if (confirmed) {
    //   for (const pane of panes) {
    //     const contentChild = this.dockManager.querySelector(`[slot=${pane.contentId}]`);
    //     this.dockManager.removeChild(contentChild);
    //   }
    // } else {
    //   event.preventDefault();
    // }
  }
  handlePinnedToggle(event) {
    this.log(event);
    // if (event.detail.sourcePane.type === IgcDockManagerPaneType.contentPane) {
    //   event.detail.panes = [event.detail.sourcePane];
    // }
    // event.preventDefault();
  }
  handleActivePaneChanged(event) {
    this.log(event);
  }
  handleDragStart(event) {
    this.log(event);
    // event.preventDefault();
  }
  handleDragOver(event) {
    const args = event.detail;
    this.log(args.action);
  }
  handleDragEnd(event) {
    this.log(event);
  }
  handleSplitterResizeStart(event) {
    this.log(event, Object.assign({}, event.detail));
    // event.preventDefault();
  }
  handleSplitterResizeEnd(event) {
    this.log(event, Object.assign({}, event.detail));
  }
  handleFloatingPaneResizeStart(event) {
    this.log(event, Object.assign({}, event.detail));
    // event.preventDefault();
  }
  handleFloatingPaneResizeMove(event) {
    this.log(event, Object.assign({}, event.detail));
  }
  handleFloatingPaneResizeEnd(event) {
    this.log(event, Object.assign({}, event.detail));
  }
  handleLayoutChange(event) {
    this.log(event);
  }
  // private getCustomResourceStrings(): IgcDockManagerResourceStrings {
  //   const customResourceStrings: IgcDockManagerResourceStrings = {
  //     close: '[Custom]Close',
  //     pin: '[Custom]Pin',
  //     unpin: '[Custom]Unpin',
  //     maximize: '[Custom]Maximize',
  //     minimize: '[Custom]Minimize',
  //     moreOptions: '[Custom]More options'
  //   };
  //   return customResourceStrings;
  // }
  log(message, ...optionalParams) {
    if (this.logEnabled) {
      console.log(message, optionalParams);
    }
  }
  render() {
    return (h(Host, null, h("div", null, h("button", { onClick: () => this.saveLayout() }, "Save Layout"), h("button", { onClick: () => this.loadLayout() }, "Load Layout"), h("button", { onClick: () => this.setActivePane() }, "Set Active Pane"), h("button", { onClick: () => this.addPane() }, "Add Floating Pane"), h("button", { onClick: () => this.addTab() }, "Add Tab Pane"), h("button", { onClick: () => this.disableContentPane() }, "Disable Tab Pane"), h("input", { id: "hideOnClose", type: "checkbox", style: { marginLeft: '20px' }, ref: el => this.hideOnCloseCheckbox = el }), h("label", { htmlFor: "hideOnClose" }, "Hide on close"), h("span", { style: { marginLeft: '20px' } }, "Hidden Panes:"), h("select", { style: { width: '150px' }, ref: el => this.hiddenPanesSelect = el }, this.hiddenPanes.map(p => {
      return (h("option", { value: p.id }, p.header));
    })), h("button", { onClick: () => this.showPane() }, "Show Pane"), h("button", { onClick: () => this.showAllPanes() }, "Show All Panes")), h("ngx-flexlayout", { layout: this.layout, onPaneClose: this.handlePaneClose.bind(this), onPanePinnedToggle: this.handlePinnedToggle.bind(this), onActivePaneChanged: this.handleActivePaneChanged.bind(this), onPaneDragStart: this.handleDragStart.bind(this), onPaneDragOver: this.handleDragOver.bind(this), onPaneDragEnd: this.handleDragEnd.bind(this), onSplitterResizeStart: this.handleSplitterResizeStart.bind(this), onSplitterResizeEnd: this.handleSplitterResizeEnd.bind(this), onFloatingPaneResizeStart: this.handleFloatingPaneResizeStart.bind(this), onFloatingPaneResizeMove: this.handleFloatingPaneResizeMove.bind(this), onFloatingPaneResizeEnd: this.handleFloatingPaneResizeEnd.bind(this), onLayoutChange: this.handleLayoutChange.bind(this),
      // resourceStrings={this.getCustomResourceStrings()}
      ref: el => this.dockManager = el,
      // allowFloatingPanesResize={false}
      showHeaderIconOnHover: 'closeOnly' }, h("div", { slot: "header1" }, h("span", { style: { color: 'red' } }, "Solution Explorer"), h("button", null, "H")), h("div", { slot: "tabHeader1" }, h("span", { style: { color: 'orange' } }, "Solution Explorer"), h("button", null, "T")), h("div", { slot: "unpinnedHeader1" }, h("span", { style: { color: 'blue' } }, "Solution Explorer"), h("button", null, "U")), h("button", { style: { background: 'pink' }, slot: "tabHeaderCloseButton" }, "Y"), h("div", { slot: "content1", style: { width: '100%', height: '100%' } }, "Content 1"), h("div", { slot: "content2", style: { width: '100%', height: '100%' } }, h("button", null, "Tests")), h("div", { slot: "content3", style: { width: '100%', height: '100%' } }, "Content 3"), h("div", { slot: "content4" }, "Content 4"), h("div", { slot: "content5", style: { width: '100%', height: '100%' } }, "Content 5"), h("div", { slot: "content6", style: { width: '100%', height: '100%' } }, "Content 6"), h("div", { slot: "content7", style: { width: '100%', height: '100%' } }, "Content 7"), h("div", { slot: "content8" }, "Content 8"), h("div", { slot: "content9", style: { width: '100%', height: '100%' } }, "Content 9"), h("div", { slot: "content10", style: { width: '100%', height: '100%' } }, h("button", null, "Test")), h("div", { slot: "content11", style: { width: '100%', height: '100%' } }, h("input", null)), h("div", { slot: "content12", style: { width: '100%', height: '100%' } }, "Content 12"), h("div", { slot: "content13", style: { width: '100%', height: '100%' } }, "Content 13"), h("div", { slot: "content14", style: { width: '100%', height: '100%' } }, "Content 14"), h("div", { slot: "toolboxHeader" }, h("span", null, "[U] Toolbox")), h("div", { slot: "teamExplorerHeader" }, h("span", null, "[U] Team Explorer")))));
  }
};
SampleComponent.style = sampleComponentCss;

export { IgcButtonComponent as igc_button_component, IgcContentPaneComponent as igc_content_pane_component, IgcContextMenuComponent as igc_context_menu_component, IgcDockManager as ngx_flexlayout, IgcDocumentHostComponent as igc_document_host_component, IgcFloatingPaneComponent as igc_floating_pane_component, IgcIconComponent as igc_icon_component, IgcJoystickIconComponent as igc_joystick_icon_component, IgcJoystickIndicatorComponent as igc_joystick_indicator_component, IgcPaneHeaderComponent as igc_pane_header_component, IgcPaneNavigatorComponent as igc_pane_navigator_component, IgcResizerComponent as igc_resizer_component, IgcRootDockingIndicatorComponent as igc_root_docking_indicator_component, IgcSplitPaneComponent as igc_split_pane_component, IgcSplitterComponent as igc_splitter_component, IgcTabHeaderComponent as igc_tab_header_component, IgcTabPanelComponent as igc_tab_panel_component, IgcTabsComponent as igc_tabs_component, IgcUnpinnedPaneHeaderComponent as igc_unpinned_pane_header_component, SampleComponent as sample_component };
