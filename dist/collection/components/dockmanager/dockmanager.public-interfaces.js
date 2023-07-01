export var IgcDockManagerPaneType;
(function (IgcDockManagerPaneType) {
  IgcDockManagerPaneType["splitPane"] = "splitPane";
  IgcDockManagerPaneType["contentPane"] = "contentPane";
  IgcDockManagerPaneType["tabGroupPane"] = "tabGroupPane";
  IgcDockManagerPaneType["documentHost"] = "documentHost";
})(IgcDockManagerPaneType || (IgcDockManagerPaneType = {}));
export var IgcSplitPaneOrientation;
(function (IgcSplitPaneOrientation) {
  IgcSplitPaneOrientation["horizontal"] = "horizontal";
  IgcSplitPaneOrientation["vertical"] = "vertical";
})(IgcSplitPaneOrientation || (IgcSplitPaneOrientation = {}));
export var IgcUnpinnedLocation;
(function (IgcUnpinnedLocation) {
  IgcUnpinnedLocation["top"] = "top";
  IgcUnpinnedLocation["bottom"] = "bottom";
  IgcUnpinnedLocation["left"] = "left";
  IgcUnpinnedLocation["right"] = "right";
})(IgcUnpinnedLocation || (IgcUnpinnedLocation = {}));
export var IgcDockingIndicatorPosition;
(function (IgcDockingIndicatorPosition) {
  IgcDockingIndicatorPosition["left"] = "left";
  IgcDockingIndicatorPosition["outerLeft"] = "outerLeft";
  IgcDockingIndicatorPosition["right"] = "right";
  IgcDockingIndicatorPosition["outerRight"] = "outerRight";
  IgcDockingIndicatorPosition["top"] = "top";
  IgcDockingIndicatorPosition["outerTop"] = "outerTop";
  IgcDockingIndicatorPosition["bottom"] = "bottom";
  IgcDockingIndicatorPosition["outerBottom"] = "outerBottom";
  IgcDockingIndicatorPosition["center"] = "center";
})(IgcDockingIndicatorPosition || (IgcDockingIndicatorPosition = {}));
export var IgcPaneDragActionType;
(function (IgcPaneDragActionType) {
  IgcPaneDragActionType["floatPane"] = "floatPane";
  IgcPaneDragActionType["moveFloatingPane"] = "moveFloatingPane";
  IgcPaneDragActionType["dockPane"] = "dockPane";
  IgcPaneDragActionType["moveTab"] = "moveTab";
})(IgcPaneDragActionType || (IgcPaneDragActionType = {}));
/**
 * Describes a Dock Manager component.
 */
/* blazorSupportsVisualChildren */
export class IgcDockManagerComponent extends HTMLElement {
  /**
   * Performs drop of the `draggedPane` into the specified `dropPosition`.
   * Returns true if the pane has been docked otherwise returns false.
   */
  dropPane() {
    return null;
  }
  /**
   * Removes a pane from the layout.
   */
  removePane(pane) {
    pane = pane;
    return null;
  }
  addEventListener() { }
  removeEventListener() { }
}
export var IgcResizerLocation;
(function (IgcResizerLocation) {
  IgcResizerLocation["top"] = "top";
  IgcResizerLocation["bottom"] = "bottom";
  IgcResizerLocation["left"] = "left";
  IgcResizerLocation["right"] = "right";
  IgcResizerLocation["topLeft"] = "topLeft";
  IgcResizerLocation["topRight"] = "topRight";
  IgcResizerLocation["bottomLeft"] = "bottomLeft";
  IgcResizerLocation["bottomRight"] = "bottomRight";
})(IgcResizerLocation || (IgcResizerLocation = {}));
