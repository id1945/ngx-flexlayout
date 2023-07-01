import { Component, Element, Event, Host, Listen, Method, Prop, State, Watch, h } from '@stencil/core';
import 'igniteui-trial-watermark';
import { resourceStringsMap } from '../../utils/locale';
import { TwoWayMap } from '../../utils/two-way-map';
import { Utils } from '../../utils/utils';
import { IGC_DEFAULT_PANE_SIZE, IgcContextMenuOrientation, IgcTabHeadersPosition } from './dockmanager.interfaces';
import { IgcDockManagerPaneType, IgcDockingIndicatorPosition, IgcSplitPaneOrientation, IgcUnpinnedLocation } from './dockmanager.public-interfaces';
import { IgcDockManagerService } from './dockmanager.service';
import { IgcDockManagerKeyboardService } from './keyboard/keyboard.service';
var ActionReason;
(function (ActionReason) {
  ActionReason["click"] = "click";
  ActionReason["drop"] = "drop";
  ActionReason["maximizeOrMinimize"] = "maximizeOrMinimize";
})(ActionReason || (ActionReason = {}));
/**
 * @hidden
 */
export class IgcDockManager {
  constructor() {
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
    return (h("template", null,
      h("slot", { name: "paneHeaderCloseButton", onSlotchange: this.updateTemplates }),
      h("slot", { name: "tabHeaderCloseButton", onSlotchange: this.updateTemplates }),
      h("slot", { name: "closeButton", onSlotchange: this.updateTemplates }),
      h("slot", { name: "moreTabsButton", onSlotchange: this.updateTemplates }),
      h("slot", { name: "maximizeButton", onSlotchange: this.updateTemplates }),
      h("slot", { name: "minimizeButton", onSlotchange: this.updateTemplates }),
      h("slot", { name: "pinButton", onSlotchange: this.updateTemplates }),
      h("slot", { name: "unpinButton", onSlotchange: this.updateTemplates }),
      h("slot", { name: "moreOptionsButton", onSlotchange: this.updateTemplates }),
      h("slot", { name: "splitterHandle", onSlotchange: this.updateTemplates })));
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
      }, header: pane.header, onFocusin: this.handleContentPaneFocus.bind(this, pane) },
      h("igc-pane-header-component", { slot: "header", pane: pane, isActive: pane === this.activePane, disabled: pane.disabled && !isSingleFloatingContentPane, pinned: this.service.getActualIsPinned(pane), allowMaximize: this.resolveAllowMaximize(pane), maximized: maximized, allowClose: this.service.getActualAllowClose(pane), allowPinning: pane.allowPinning !== false, isFloating: isFloating, forcedDrag: forceDrag, resourceStrings: this.resourceStrings, onPinToggle: this.handlePinToggle.bind(this, pane), onMaximize: this.handleMaximize.bind(this, pane), onDragMoved: this.handlePaneDragMove.bind(this), onDragStarted: this.handlePaneDragStart.bind(this, isSingleFloatingContentPane ? floatingPane : pane), onDragEnded: this.handlePaneDragEnd.bind(this), onClose: this.handlePaneClose.bind(this, pane), onElementConnected: this.emitPaneHeaderConnected.bind(this, pane), onElementDisconnected: this.emitPaneHeaderDisconnected.bind(this, pane), onMouseDown: this.handlePaneHeaderMouseDown.bind(this, pane) }, (isFloating && pane.floatingHeaderId) ? h("slot", { name: pane.floatingHeaderId }) :
        pane.headerId ? h("slot", { name: pane.headerId }) :
          pane.header),
      h("div", { class: "content", onMouseDown: this.handlePaneContentMouseDown.bind(this, pane) },
        h("slot", { name: pane.contentId }))));
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
    return this.flyoutPane && (h("div", { class: flyoutClasses, style: { 'z-index': maximized ? '10002' : '2' } },
      this.renderContentPane(this.flyoutPane, false, true),
      h("igc-splitter-component", { flyoutLocation: location, splitPaneOrientation: splitPaneOrientation, onResizeStart: this.handleSplitterResizeStart.bind(this, this.flyoutPane), onResizeEnd: this.handleFlyoutSplitterResizeEnd.bind(this, this.flyoutPane, splitPaneOrientation) })));
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
        }, maximized: this.maximizedPane === p || containsMaximizedPane, allowResize: (_a = p.floatingResizable) !== null && _a !== void 0 ? _a : this.allowFloatingPanesResize },
        hasHeader ?
          h("igc-pane-header-component", { slot: "header", isFloating: true, isFloatingPaneHeader: true, forcedDrag: forceDrag, allowMaximize: this.resolveAllowMaximize(p), maximized: this.maximizedPane === p, resourceStrings: this.resourceStrings, onDragStarted: this.handlePaneDragStart.bind(this, p), onDragMoved: this.handlePaneDragMove.bind(this), onDragEnded: this.handlePaneDragEnd.bind(this), onClose: this.handleFloatingPaneClose.bind(this, p), onMaximize: this.handleMaximize.bind(this, p), onFocusin: (this.clearActivePane.bind(this)) }) : null,
        this.renderSplitPane(p, true, false)));
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
      } },
      !this.documentOnlyDrag && this.renderRootDockingIndicator(IgcDockingIndicatorPosition.top),
      h("div", { style: {
          flexGrow: '1',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        } },
        !this.documentOnlyDrag && this.renderRootDockingIndicator(startPosition),
        !this.documentOnlyDrag && this.renderRootDockingIndicator(endPosition)),
      !this.documentOnlyDrag && this.renderRootDockingIndicator(IgcDockingIndicatorPosition.bottom),
      this.dropTargetPaneInfo &&
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
    return (h(Host, { tabindex: "0", role: "group" },
      this.renderButtonsTemplates(),
      this.renderUnpinnedTabArea(IgcUnpinnedLocation.left),
      h("div", { class: "pane-container--vertical", style: { position: this.maximizedPane ? 'absolute' : 'relative' } },
        this.renderUnpinnedTabArea(IgcUnpinnedLocation.top),
        h("div", { ref: el => this.dockedPanesContainer = el, class: "pane-container--horizontal", style: { position: this.maximizedPane ? 'absolute' : 'relative' } },
          ((_a = this.layout) === null || _a === void 0 ? void 0 : _a.rootPane) && this.renderSplitPane(this.layout.rootPane, false, false),
          this.renderFlyoutPane(),
          this.renderDockingIndicators()),
        this.renderUnpinnedTabArea(IgcUnpinnedLocation.bottom)),
      this.renderUnpinnedTabArea(IgcUnpinnedLocation.right),
      this.renderFloatingPanes(),
      this.renderContextMenu(),
      this.renderPaneNavigator(),
      this.renderDropShadow()));
  }
  static get is() { return "ngx-flexlayout"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["dockmanager-component.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["dockmanager-component.css"]
  }; }
  static get properties() { return {
    "navigationPaneMeta": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "IgcPaneNavigatorMetadata",
        "resolved": "IgcPaneNavigatorMetadata",
        "references": {
          "IgcPaneNavigatorMetadata": {
            "location": "import",
            "path": "./dockmanager.interfaces"
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
    "showHeaderIconOnHover": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'closeOnly' | 'moreOptionsOnly' | 'all'",
        "resolved": "\"all\" | \"closeOnly\" | \"moreOptionsOnly\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "show-header-icon-on-hover",
      "reflect": false
    },
    "maximizedPane": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "IgcContentPane | IgcSplitPane | IgcTabGroupPane",
        "resolved": "IgcContentPane | IgcSplitPane | IgcTabGroupPane",
        "references": {
          "IgcContentPane": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          },
          "IgcSplitPane": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          },
          "IgcTabGroupPane": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
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
    "resourceStrings": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "IgcDockManagerResourceStrings",
        "resolved": "IgcDockManagerResourceStrings",
        "references": {
          "IgcDockManagerResourceStrings": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
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
    "allowFloatingPanesResize": {
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
      "attribute": "allow-floating-panes-resize",
      "reflect": false,
      "defaultValue": "true"
    },
    "disableKeyboardNavigation": {
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
      "attribute": "disable-keyboard-navigation",
      "reflect": false,
      "defaultValue": "false"
    },
    "contextMenuPosition": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "IgcContextMenuPosition",
        "resolved": "\"center\" | \"end\" | \"start\" | \"stretch\"",
        "references": {
          "IgcContextMenuPosition": {
            "location": "import",
            "path": "./dockmanager.interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "context-menu-position",
      "reflect": false
    },
    "layout": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "IgcDockManagerLayout",
        "resolved": "IgcDockManagerLayout",
        "references": {
          "IgcDockManagerLayout": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": "The layout configuration of the Dock Manager."
      }
    },
    "draggedPane": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "IgcContentPane | IgcSplitPane | IgcTabGroupPane",
        "resolved": "IgcContentPane | IgcSplitPane | IgcTabGroupPane",
        "references": {
          "IgcContentPane": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          },
          "IgcSplitPane": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          },
          "IgcTabGroupPane": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
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
    "dropPosition": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "IgcDockManagerPoint",
        "resolved": "IgcDockManagerPoint",
        "references": {
          "IgcDockManagerPoint": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
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
    "activePane": {
      "type": "unknown",
      "mutable": true,
      "complexType": {
        "original": "IgcContentPane",
        "resolved": "IgcContentPane",
        "references": {
          "IgcContentPane": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "defaultValue": "null"
    }
  }; }
  static get states() { return {
    "dropTargetPaneInfo": {},
    "flyoutPane": {},
    "floatingPaneZIndicesMap": {},
    "contextMenuMeta": {},
    "dropShadowRect": {},
    "templates": {},
    "hasCustomMaximizeButton": {},
    "hasCustomMinimizeButton": {}
  }; }
  static get events() { return [{
      "method": "paneHeaderConnected",
      "name": "paneHeaderConnected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcPaneHeaderConnectionEventArgs",
        "resolved": "IgcPaneHeaderConnectionEventArgs",
        "references": {
          "IgcPaneHeaderConnectionEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "paneHeaderDisconnected",
      "name": "paneHeaderDisconnected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcPaneHeaderConnectionEventArgs",
        "resolved": "IgcPaneHeaderConnectionEventArgs",
        "references": {
          "IgcPaneHeaderConnectionEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "tabHeaderConnected",
      "name": "tabHeaderConnected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcTabHeaderConnectionEventArgs",
        "resolved": "IgcTabHeaderConnectionEventArgs",
        "references": {
          "IgcTabHeaderConnectionEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "tabHeaderDisconnected",
      "name": "tabHeaderDisconnected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcTabHeaderConnectionEventArgs",
        "resolved": "IgcTabHeaderConnectionEventArgs",
        "references": {
          "IgcTabHeaderConnectionEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "splitterResizeStart",
      "name": "splitterResizeStart",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcSplitterResizeEventArgs",
        "resolved": "IgcSplitterResizeEventArgs",
        "references": {
          "IgcSplitterResizeEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "splitterResizeEnd",
      "name": "splitterResizeEnd",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcSplitterResizeEventArgs",
        "resolved": "IgcSplitterResizeEventArgs",
        "references": {
          "IgcSplitterResizeEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "paneClose",
      "name": "paneClose",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcPaneCloseEventArgs",
        "resolved": "IgcPaneCloseEventArgs",
        "references": {
          "IgcPaneCloseEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "panePinnedToggle",
      "name": "panePinnedToggle",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcPanePinnedEventArgs",
        "resolved": "IgcPanePinnedEventArgs",
        "references": {
          "IgcPanePinnedEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "activePaneChanged",
      "name": "activePaneChanged",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcActivePaneEventArgs",
        "resolved": "IgcActivePaneEventArgs",
        "references": {
          "IgcActivePaneEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "paneDragStart",
      "name": "paneDragStart",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcPaneDragStartEventArgs",
        "resolved": "IgcPaneDragStartEventArgs",
        "references": {
          "IgcPaneDragStartEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "paneDragOver",
      "name": "paneDragOver",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcPaneDragOverEventArgs",
        "resolved": "IgcPaneDragOverEventArgs",
        "references": {
          "IgcPaneDragOverEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "paneDragEnd",
      "name": "paneDragEnd",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcPaneDragEndEventArgs",
        "resolved": "IgcPaneDragEndEventArgs",
        "references": {
          "IgcPaneDragEndEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "floatingPaneResizeMove",
      "name": "floatingPaneResizeMove",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcFloatingPaneResizeMoveEventArgs",
        "resolved": "IgcFloatingPaneResizeMoveEventArgs",
        "references": {
          "IgcFloatingPaneResizeMoveEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "floatingPaneResizeEnd",
      "name": "floatingPaneResizeEnd",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcFloatingPaneResizeEventArgs",
        "resolved": "IgcFloatingPaneResizeEventArgs",
        "references": {
          "IgcFloatingPaneResizeEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "floatingPaneResizeStart",
      "name": "floatingPaneResizeStart",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "IgcFloatingPaneResizeEventArgs",
        "resolved": "IgcFloatingPaneResizeEventArgs",
        "references": {
          "IgcFloatingPaneResizeEventArgs": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        }
      }
    }, {
      "method": "layoutChange",
      "name": "layoutChange",
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
  static get methods() { return {
    "dropPane": {
      "complexType": {
        "signature": "() => Promise<boolean>",
        "parameters": [],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<boolean>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "removePane": {
      "complexType": {
        "signature": "(pane: IgcDockManagerPane) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "IgcDockManagerPane": {
            "location": "import",
            "path": "./dockmanager.public-interfaces"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "element"; }
  static get watchers() { return [{
      "propName": "flyoutPane",
      "methodName": "flyoutPaneChanged"
    }, {
      "propName": "layout",
      "methodName": "layoutChanged"
    }, {
      "propName": "draggedPane",
      "methodName": "draggedPaneChanged"
    }, {
      "propName": "dropPosition",
      "methodName": "dropPositionChanged"
    }, {
      "propName": "activePane",
      "methodName": "activePaneChange"
    }]; }
  static get listeners() { return [{
      "name": "focusout",
      "method": "handleFocusOut",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "keydown",
      "method": "handleKeyDown",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "pointerdown",
      "method": "handlePointerDown",
      "target": undefined,
      "capture": false,
      "passive": true
    }, {
      "name": "pointerup",
      "method": "handlePointerUp",
      "target": undefined,
      "capture": false,
      "passive": true
    }]; }
}
