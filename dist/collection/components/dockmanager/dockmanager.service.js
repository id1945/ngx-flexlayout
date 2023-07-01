import { Utils } from '../../utils/utils';
import { IGC_DEFAULT_PANE_SIZE, IGC_DEFAULT_UNPIN_PANE_SIZE, IGC_DRAG_FLYOUT_THRESHOLD, IgcPinBehavior } from './dockmanager.interfaces';
import { IgcDockManagerPaneType, IgcDockingIndicatorPosition, IgcPaneDragActionType, IgcResizerLocation, IgcSplitPaneOrientation, IgcUnpinnedLocation } from './dockmanager.public-interfaces';
/**
 * @hidden
 */
export class IgcDockManagerService {
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
