import { IgcDragService } from '../drag-drop/drag.service';
export declare enum IgcDockManagerPaneType {
  splitPane = "splitPane",
  contentPane = "contentPane",
  tabGroupPane = "tabGroupPane",
  documentHost = "documentHost"
}
export declare enum IgcSplitPaneOrientation {
  horizontal = "horizontal",
  vertical = "vertical"
}
export declare enum IgcUnpinnedLocation {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right"
}
export interface IgcDockManagerPoint {
  x: number;
  y: number;
}
export interface IgcActivePaneEventArgs {
  /**
   * Gets the new active pane.
   */
  readonly newPane: IgcContentPane;
  /**
   * Gets the old active pane.
   */
  readonly oldPane: IgcContentPane;
}
export declare enum IgcDockingIndicatorPosition {
  left = "left",
  outerLeft = "outerLeft",
  right = "right",
  outerRight = "outerRight",
  top = "top",
  outerTop = "outerTop",
  bottom = "bottom",
  outerBottom = "outerBottom",
  center = "center"
}
export interface IgcDockingIndicator {
  /**
   * Gets the position of the docking indicator.
   */
  readonly position: IgcDockingIndicatorPosition;
  /**
   * Gets a value indicating whether the docking indicator is a root one.
   */
  readonly isRoot: boolean;
  /**
   * Gets a value indicating the direction of the docking indicator.
   */
  readonly direction?: string;
}
export interface IgcPaneHeaderConnectionEventArgs {
  /**
   * The pane whose header is being connected/disconnected.
   */
  readonly pane: IgcContentPane;
  /**
   * The header element that is being connected/disconnected.
   */
  readonly element: IgcPaneHeaderElement;
}
export interface IgcTabHeaderConnectionEventArgs {
  /**
   * The pane whose tab header is being connected/disconnected.
   */
  readonly pane: IgcContentPane;
  /**
   * The tab header element that is being connected/disconnected.
   */
  readonly element: IgcTabHeaderElement;
}
export interface IgcPaneCloseEventArgs {
  /**
   * Get the source pane that triggers the close.
   */
  readonly sourcePane: IgcDockManagerPane;
  /**
   * Gets/sets the panes that are about to close.
   */
  panes: IgcContentPane[];
}
export interface IgcPanePinnedEventArgs {
  /**
   * Gets the source pane that triggers the pinned state change.
   */
  readonly sourcePane: IgcContentPane;
  /**
   * Gets/sets the panes that are about to get pinned/unpinned.
   */
  panes: IgcContentPane[];
  /**
   * Gets the new pinned value.
   */
  readonly newValue: boolean;
  /**
   * Gets the unpinned location.
   */
  readonly location: IgcUnpinnedLocation;
}
export interface IgcPaneDragStartEventArgs {
  /**
   * Gets the source pane that triggers the drag start.
   */
  readonly sourcePane: IgcSplitPane | IgcContentPane;
  /**
   * Gets the panes that are about to get dragged.
   */
  readonly panes: IgcContentPane[];
}
export declare enum IgcPaneDragActionType {
  floatPane = "floatPane",
  moveFloatingPane = "moveFloatingPane",
  dockPane = "dockPane",
  moveTab = "moveTab"
}
export interface IgcFloatPaneAction {
  readonly type: IgcPaneDragActionType.floatPane;
  readonly location: IgcDockManagerPoint;
  width: number;
  height: number;
}
export interface IgcMoveFloatingPaneAction {
  readonly type: IgcPaneDragActionType.moveFloatingPane;
  readonly oldLocation: IgcDockManagerPoint;
  readonly newLocation: IgcDockManagerPoint;
}
export interface IgcDockPaneAction {
  readonly type: IgcPaneDragActionType.dockPane;
  readonly dockingIndicator: IgcDockingIndicator;
  readonly targetPane: IgcDockManagerPane;
}
export interface IgcMoveTabAction {
  readonly type: IgcPaneDragActionType.moveTab;
  readonly oldIndex: number;
  readonly newIndex: number;
}
export declare type IgcPaneDragAction = IgcFloatPaneAction | IgcMoveFloatingPaneAction | IgcDockPaneAction | IgcMoveTabAction;
export interface IgcPaneDragOverEventArgs {
  /**
   * Gets the source pane that triggers the drag over.
   */
  readonly sourcePane: IgcSplitPane | IgcTabGroupPane | IgcContentPane;
  /**
   * Gets the panes that are dragged over.
   */
  readonly panes: IgcContentPane[];
  /**
   * Gets information about the action being performed.
   */
  readonly action: IgcPaneDragAction;
  /**
   * Gets/sets whether the action is valid.
   */
  isValid: boolean;
}
export interface IgcPaneDragEndEventArgs {
  /**
   * Gets the source pane that ends dragging.
   */
  readonly sourcePane: IgcSplitPane | IgcTabGroupPane | IgcContentPane;
  /**
   * Gets the panes that end dragging.
   */
  readonly panes: IgcContentPane[];
}
export interface IgcContentPane {
  /**
   * The id of the pane. If not set the Dock Manager generates it automatically.
   */
  id?: string;
  /**
   * The type of the pane.
   */
  type: IgcDockManagerPaneType.contentPane;
  /**
   * The slot attribute's value of the content element.
   */
  contentId: string;
  /**
   * The text header of the content pane. Even if header slot templates are used, the text header is used for aria label.
   */
  header: string;
  /**
   * The slot attribute's value of the content pane header element. If not set, the `header` property value is used.
   */
  headerId?: string;
  /**
   * The slot attribute's value of the tab header element. If not set, the `header` property value is used.
   */
  tabHeaderId?: string;
  /**
   * The slot attribute's value of the unpinned header element. If not set, the `header` property value is used.
   */
  unpinnedHeaderId?: string;
  /**
   * The slot attribute's value of the floating header element. If not set, the `headerId` property value is used.
   */
  floatingHeaderId?: string;
  /**
   * The size of the pane relative to its sibling panes' sizes. Defaults to 100.
   */
  size?: number;
  /**
   * Determines whether the end user is allowed to close the pane. Defaults to true.
   */
  allowClose?: boolean;
  /**
   * Determines whether the end user is allowed to maximize the pane.
   */
  allowMaximize?: boolean;
  /**
   * Determines whether the end user is allowed to pin/unpin the pane. Defaults to true.
   */
  allowPinning?: boolean;
  /**
   * Determines whether the end user is allowed to dock the pane. Defaults to true.
   */
  allowDocking?: boolean;
  /**
   * Determines whether the end user is allowed to make the pane floating. Defaults to true.
   */
  allowFloating?: boolean;
  /**
   * The absolute size of the pane in an unpinned state. Defaults to 200.
   */
  unpinnedSize?: number;
  /**
   * Determines whether a content pane is pinned or not. Defaults to true.
   */
  isPinned?: boolean;
  /**
   * The desired unpinned location of the content pane.
   *
   * If not set the Dock Manager automatically calculates it based on the location of the pane relatively to the document host.
   * If more than one document host is presented, the closest one in the pane hierarchy will be used for the calculation.
   * If there is no document host, the default location is left.
   */
  unpinnedLocation?: IgcUnpinnedLocation;
  /**
   * Determines whether a pane is hidden in the UI. Defaults to false.
   */
  hidden?: boolean;
  /**
   * Determines whether a pane is disabled. Defaults to false.
   */
  disabled?: boolean;
  /**
   * Marks that a content pane can be docked only inside a document host.
   */
  documentOnly?: boolean;
}
export interface IgcSplitPane {
  /**
   * The id of the pane. If not set the Dock Manager generates it automatically.
   */
  id?: string;
  /**
   * The type of the pane.
   */
  type: IgcDockManagerPaneType.splitPane;
  /**
   * The orientation of the split pane.
   */
  orientation: IgcSplitPaneOrientation;
  /**
   * The child panes of the split pane.
   */
  panes: IgcDockManagerPane[];
  /**
   * The size of the pane relative to its sibling panes' sizes. Defaults to 100.
   */
  size?: number;
  /**
   * The absolute location point of the pane. Applies only for floating panes.
   */
  floatingLocation?: IgcDockManagerPoint;
  /**
   * The absolute width of the pane. Applies only for floating panes. Defaults to 100.
   */
  floatingWidth?: number;
  /**
   * The absolute height of the pane. Applies only for floating panes. Defaults to 100.
   */
  floatingHeight?: number;
  /**
   * Determines whether floating pane resizing is allowed. Applies only for floating panes.
   */
  floatingResizable?: boolean;
  /**
   * Determines whether the pane should present in the UI when empty.
   */
  allowEmpty?: boolean;
}
export interface IgcTabGroupPane {
  /**
   * The id of the pane. If not set the Dock Manager generates it automatically.
   */
  id?: string;
  /**
   * The type of the pane.
   */
  type: IgcDockManagerPaneType.tabGroupPane;
  /**
   * The child content panes of the tab group.
   */
  panes: IgcContentPane[];
  /**
   * The size of the pane relative to its sibling panes' sizes. Defaults to 100.
   */
  size?: number;
  /**
   * The index of the selected tab.
   */
  selectedIndex?: number;
  /**
   * Determines whether the pane should present in the UI when empty.
   */
  allowEmpty?: boolean;
}
export interface IgcDocumentHost {
  /**
   * The id of the pane. If not set the Dock Manager generates it automatically.
   */
  id?: string;
  /**
   * The type of the pane.
   */
  type: IgcDockManagerPaneType.documentHost;
  /**
   * The root split pane of the document host.
   */
  rootPane: IgcSplitPane;
  /**
   * The size of the pane relative to its sibling panes' sizes. Defaults to 100.
   */
  size?: number;
}
export declare type IgcDockManagerPane = IgcContentPane | IgcSplitPane | IgcTabGroupPane | IgcDocumentHost;
/**
 * Describes a Dock Manager layout.
 */
export interface IgcDockManagerLayout {
  /**
   * The root split pane of the layout.
   */
  rootPane: IgcSplitPane;
  /**
   * The floating panes of the layout.
   */
  floatingPanes?: IgcSplitPane[];
}
export interface IgcDockManagerEventMap extends HTMLElementEventMap {
  /**
   * An event raised when a splitter resizing starts.
   */
  'splitterResizeStart': CustomEvent;
  /**
   * An event raised when a splitter resizing ends.
   */
  'splitterResizeEnd': CustomEvent;
  /**
   * An event raised when a pane header element is connected.
   */
  'paneHeaderConnected': CustomEvent<IgcPaneHeaderConnectionEventArgs>;
  /**
   * An event raised when a pane header element is disconnected.
   */
  'paneHeaderDisconnected': CustomEvent<IgcPaneHeaderConnectionEventArgs>;
  /**
   * An event raised when a tab header element is connected.
   */
  'tabHeaderConnected': CustomEvent<IgcTabHeaderConnectionEventArgs>;
  /**
   * An event raised when a tab header element is disconnected.
   */
  'tabHeaderDisconnected': CustomEvent<IgcTabHeaderConnectionEventArgs>;
  /**
   * An event raised when panes are about to close.
   */
  'paneClose': CustomEvent<IgcPaneCloseEventArgs>;
  /**
   * An event raised when panes are about to get pinned/unpinned.
   */
  'panePinnedToggle': CustomEvent<IgcPanePinnedEventArgs>;
  /**
   * An event raised when a pane drag starts.
   */
  'paneDragStart': CustomEvent<IgcPaneDragStartEventArgs>;
  /**
   * An event raised when a pane is dragged over.
   */
  'paneDragOver': CustomEvent<IgcPaneDragOverEventArgs>;
  /**
   * An event raised when a pane drag ends.
   */
  'paneDragEnd': CustomEvent<IgcPaneDragEndEventArgs>;
  /**
   * An event raised when a pane is selected/activated
   */
  'activePaneChanged': CustomEvent<IgcActivePaneEventArgs>;
  /**
   * An event raised when a floating pane resize operation ends.
   */
  'floatingPaneResizeEnd': CustomEvent<IgcFloatingPaneResizeEventArgs>;
  /**
   * An event raised when a floating pane resizing operation starts.
   */
  'floatingPaneResizeStart': CustomEvent<IgcFloatingPaneResizeEventArgs>;
  /**
   * An event raised when a floating pane resizing operation is in progress.
   */
  'floatingPaneResizeMove': CustomEvent<IgcFloatingPaneResizeMoveEventArgs>;
  /**
   * An event raised when the layout changes.
   */
  'layoutChange': CustomEvent;
}
/**
 * Describes a Dock Manager component.
 */
export declare class IgcDockManagerComponent extends HTMLElement {
  /**
   * Gets/sets the layout configuration of the Dock Manager.
   */
  layout: IgcDockManagerLayout;
  /**
   * Gets/sets the currently dragged pane.
   */
  draggedPane: IgcContentPane | IgcSplitPane | IgcTabGroupPane;
  /**
   * Gets/sets the current drop position when performing custom drag/drop.
   */
  dropPosition: IgcDockManagerPoint;
  /**
   * Gets/sets the active pane of the Dock Manager.
   */
  activePane: IgcContentPane;
  /**
   * Determines whether the end user is allowed to maximize panes. Defaults to true.
   */
  allowMaximize: boolean;
  /**
   * Determines which tab header icons should show when hovering over the tab with the mouse. Defaults to undefined.
   */
  showHeaderIconOnHover: 'closeOnly' | 'moreOptionsOnly' | 'all';
  /**
   * Gets/sets the maximized pane.
   */
  maximizedPane: IgcContentPane | IgcSplitPane | IgcTabGroupPane;
  /**
   * Gets/sets the resource strings.
   */
  resourceStrings: IgcDockManagerResourceStrings;
  /**
   * Determines whether the end user is allowed to resize floating panes. Defaults to true.
   */
  allowFloatingPanesResize: boolean;
  /**
   * Disables the built-in keyboard shortcuts for pane navigation. Defaults to false.
   */
  disableKeyboardNavigation: boolean;
  /**
   * Performs drop of the `draggedPane` into the specified `dropPosition`.
   * Returns true if the pane has been docked otherwise returns false.
   */
  dropPane(): Promise<boolean>;
  /**
   * Removes a pane from the layout.
   */
  removePane(pane: IgcDockManagerPane): Promise<void>;
  addEventListener<K extends keyof IgcDockManagerEventMap>(type: K, listener: (this: HTMLElement, ev: IgcDockManagerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof IgcDockManagerEventMap>(type: K, listener: (this: HTMLElement, ev: IgcDockManagerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
/**
 * Describes a pane header element.
 */
export interface IgcPaneHeaderElement extends HTMLElement {
  /**
   * Gets/sets the drag service.
   */
  dragService: IgcDragService;
}
/**
 * Describes a tab header element.
 */
export interface IgcTabHeaderElement extends HTMLElement {
  /**
   * Gets/sets the drag service.
   */
  dragService: IgcDragService;
}
/**
 * Describes dock manager resource strings.
 */
export interface IgcDockManagerResourceStrings {
  close?: string;
  pin?: string;
  unpin?: string;
  maximize?: string;
  minimize?: string;
  moreOptions?: string;
  moreTabs?: string;
  panes?: string;
  documents?: string;
}
export declare enum IgcResizerLocation {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight"
}
export interface IgcSplitterResizeEventArgs {
  /**
   * Gets the pane being resized with the splitter.
   */
  readonly pane: IgcDockManagerPane;
  /**
   * Gets the pane's orientation.
   */
  readonly orientation: IgcSplitPaneOrientation;
  /**
   * Gets the pane's width.
   */
  readonly paneWidth: number;
  /**
   * Gets the pane's height.
   */
  readonly paneHeight: number;
}
export interface IgcFloatingPaneResizeEventArgs {
  /**
   * Gets the source pane that triggers the resize operation.
   */
  readonly sourcePane: IgcSplitPane;
  /**
   * Gets the edge/corner that is being dragged.
   */
  readonly resizerLocation: IgcResizerLocation;
}
export interface IgcFloatingPaneResizeMoveEventArgs extends IgcFloatingPaneResizeEventArgs {
  /**
   * Gets the pane's width before the resizing operation.
   */
  readonly oldWidth: number;
  /**
   * Gets the pane's width after the resizing operation.
   */
  newWidth: number;
  /**
   * Gets the pane's height before the resizing operation.
   */
  readonly oldHeight: number;
  /**
   * Gets the pane's height after the resizing operation.
   */
  newHeight: number;
  /**
   * Gets the pane's floating location before the resizing operation.
   */
  readonly oldLocation: IgcDockManagerPoint;
  /**
   * Gets the pane's floating location after the resizing operation.
   */
  newLocation: IgcDockManagerPoint;
}
