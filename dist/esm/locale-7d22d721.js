var IgcDockManagerPaneType;
(function (IgcDockManagerPaneType) {
  IgcDockManagerPaneType["splitPane"] = "splitPane";
  IgcDockManagerPaneType["contentPane"] = "contentPane";
  IgcDockManagerPaneType["tabGroupPane"] = "tabGroupPane";
  IgcDockManagerPaneType["documentHost"] = "documentHost";
})(IgcDockManagerPaneType || (IgcDockManagerPaneType = {}));
var IgcSplitPaneOrientation;
(function (IgcSplitPaneOrientation) {
  IgcSplitPaneOrientation["horizontal"] = "horizontal";
  IgcSplitPaneOrientation["vertical"] = "vertical";
})(IgcSplitPaneOrientation || (IgcSplitPaneOrientation = {}));
var IgcUnpinnedLocation;
(function (IgcUnpinnedLocation) {
  IgcUnpinnedLocation["top"] = "top";
  IgcUnpinnedLocation["bottom"] = "bottom";
  IgcUnpinnedLocation["left"] = "left";
  IgcUnpinnedLocation["right"] = "right";
})(IgcUnpinnedLocation || (IgcUnpinnedLocation = {}));
var IgcDockingIndicatorPosition;
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
var IgcPaneDragActionType;
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
class IgcDockManagerComponent extends HTMLElement {
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
    return null;
  }
  addEventListener() { }
  removeEventListener() { }
}
var IgcResizerLocation;
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

/**
 * English resource strings for the Dock Manager
 */
const IgcDockManagerResourceStringsEN = {
  close: 'Close',
  pin: 'Pin',
  unpin: 'Unpin',
  maximize: 'Maximize',
  minimize: 'Minimize',
  moreOptions: 'More options',
  moreTabs: 'More tabs',
  panes: 'Panes',
  documents: 'Documents'
};

/**
 * Japanese resource strings for the Dock Manager
 */
const IgcDockManagerResourceStringsJP = {
  close: '閉じる',
  pin: '固定',
  unpin: '固定解除',
  maximize: '最大化',
  minimize: '最小化',
  moreOptions: 'その他のオプション',
  moreTabs: 'その他のタブ',
  panes: 'Panes',
  documents: 'Documents'
};

/**
 * Spanish resource strings for the Dock Manager
 */
const IgcDockManagerResourceStringsES = {
  close: 'Cerrar',
  pin: 'Anclar',
  unpin: 'Desanclar',
  maximize: 'Maximizar',
  minimize: 'Minimizar',
  moreOptions: 'Más opciones',
  moreTabs: 'Más fichas',
  panes: 'Panes',
  documents: 'Documents'
};

/**
 * Korean resource strings for the Dock Manager
 */
const IgcDockManagerResourceStringsKO = {
  close: '닫기',
  pin: '고정',
  unpin: '고정 해제',
  maximize: '최대화',
  minimize: '최소화',
  moreOptions: '더 많은 옵션',
  moreTabs: '탭 더 보기',
  panes: 'Panes',
  documents: 'Documents'
};

/**
 * @hidden
 */
const resourceStringsMap = new Map();
resourceStringsMap.set('en', IgcDockManagerResourceStringsEN);
resourceStringsMap.set('jp', IgcDockManagerResourceStringsJP);
resourceStringsMap.set('es', IgcDockManagerResourceStringsES);
resourceStringsMap.set('ko', IgcDockManagerResourceStringsKO);
/**
 * Adds custom resource strings for a specified language.
 * @param language The name of the language that should match the `lang` attribute of the page.
 * @param resourceStrings The resource strings to be added.
 */
function addResourceStrings(language, resourceStrings) {
  resourceStringsMap.set(language, resourceStrings);
}

export { IgcDockManagerResourceStringsEN as I, IgcDockManagerResourceStringsJP as a, IgcDockManagerResourceStringsES as b, IgcDockManagerResourceStringsKO as c, addResourceStrings as d, IgcDockManagerPaneType as e, IgcSplitPaneOrientation as f, IgcUnpinnedLocation as g, IgcDockingIndicatorPosition as h, IgcPaneDragActionType as i, IgcDockManagerComponent as j, IgcResizerLocation as k, resourceStringsMap as r };
