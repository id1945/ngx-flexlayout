import { EventEmitter } from '../../stencil-public-runtime';
import { IgcContentPane, IgcDockManagerLayout, IgcDockManagerPane, IgcDockManagerResourceStrings, IgcDocumentHost, IgcFloatingPaneResizeEventArgs, IgcFloatingPaneResizeMoveEventArgs, IgcPaneCloseEventArgs, IgcPaneDragEndEventArgs, IgcPaneDragOverEventArgs, IgcPaneDragStartEventArgs, IgcPanePinnedEventArgs, IgcSplitPane, IgcTabGroupPane } from './dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare const IGC_DEFAULT_PANE_SIZE = 100;
/**
 * @hidden
 */
export declare const IGC_DEFAULT_UNPIN_PANE_SIZE = 200;
/**
 * @hidden
 */
export declare const IGC_RESIZING_MIN_SIZE = 42;
/**
 * @hidden
 */
export declare const IGC_DEFAULT_RESIZE = 10;
/**
 * @hidden
 */
export declare const IGC_DRAG_FLYOUT_THRESHOLD = 50;
/**
 * @hidden
 */
export declare enum IgcTabHeadersPosition {
  top = "top",
  bottom = "bottom"
}
/**
 * @hidden
 */
export declare enum IgcContextMenuOrientation {
  top = "top",
  bottom = "bottom"
}
/**
 * @hidden
 */
export declare type IgcContextMenuPosition = 'start' | 'center' | 'end' | 'stretch';
/**
 * @hidden
 */
export declare enum IgcPinBehavior {
  allPanes = "allPanes",
  selectedPane = "selectedPane"
}
/**
 * @hidden
 */
export interface IgcDropTargetPaneInfo {
  pane: IgcDockManagerPane;
  docHost: IgcDocumentHost;
  targetRect: DOMRect;
  floatingPaneWithoutDocHost?: boolean;
}
/**
 * @hidden
 */
export interface IgcDockManagerComponentBase {
  activePane: IgcContentPane;
  draggedPane: IgcContentPane | IgcSplitPane | IgcTabGroupPane;
  dropTargetPaneInfo: IgcDropTargetPaneInfo;
  documentOnlyDrag: boolean;
  dropShadowRect: DOMRect;
  isValidDrop: boolean;
  allowMaximize: boolean;
  flyoutPane: IgcContentPane;
  maximizedPane: IgcContentPane | IgcSplitPane | IgcTabGroupPane;
  layout: IgcDockManagerLayout;
  disableKeyboardNavigation: boolean;
  floatingPaneZIndicesMap: Map<IgcSplitPane, number>;
  paneClose: EventEmitter<IgcPaneCloseEventArgs>;
  panePinnedToggle: EventEmitter<IgcPanePinnedEventArgs>;
  paneDragStart: EventEmitter<IgcPaneDragStartEventArgs>;
  paneDragOver: EventEmitter<IgcPaneDragOverEventArgs>;
  paneDragEnd: EventEmitter<IgcPaneDragEndEventArgs>;
  resourceStrings: IgcDockManagerResourceStrings;
  focusElement: () => void;
  navigationPaneMeta?: IgcPaneNavigatorMetadata;
  floatingPaneResizeStart: EventEmitter<IgcFloatingPaneResizeEventArgs>;
  floatingPaneResizeMove: EventEmitter<IgcFloatingPaneResizeMoveEventArgs>;
  floatingPaneResizeEnd: EventEmitter<IgcFloatingPaneResizeEventArgs>;
  layoutChange: EventEmitter;
}
/**
 * @hidden
 */
export interface IgcContextMenuMetadata {
  menuItems: IgcContextMenuItem[];
  target: HTMLElement;
  position: IgcContextMenuPosition;
}
/**
 * @hidden
 */
export interface IgcContextMenuItem {
  iconName: string;
  displayText: string;
  disabled?: boolean;
  clickHandler: () => void;
}
/**
 * @hidden
 */
export interface IgcTabRectsInfo {
  headerRect: DOMRect;
  prevHeaderRect: DOMRect;
  nextHeaderRect: DOMRect;
  lastVisibleHeaderRect: DOMRect;
  tabsRect: DOMRect;
}
/**
 * @hidden
 */
export interface IgcPaneNavigatorMetadata {
  activePanes: IgcContentPane[];
  activeDocuments: IgcContentPane[];
  initialIndex: number;
  previousActivePaneIndex: number;
}
/**
 * @hidden
 */
export interface PartNameInfo {
  readonly [name: string]: string | boolean | number;
}
