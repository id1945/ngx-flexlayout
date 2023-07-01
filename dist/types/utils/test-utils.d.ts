import { EventEmitter } from '../stencil-public-runtime';
import { IgcDockManagerComponentBase, IgcDropTargetPaneInfo, IgcPaneNavigatorMetadata } from '../components/dockmanager/dockmanager.interfaces';
import { IgcContentPane, IgcDockManagerLayout, IgcDockManagerResourceStrings, IgcFloatingPaneResizeEventArgs, IgcFloatingPaneResizeMoveEventArgs, IgcPaneCloseEventArgs, IgcPaneDragOverEventArgs, IgcPaneDragStartEventArgs, IgcPanePinnedEventArgs, IgcSplitPane, IgcTabGroupPane } from '../components/dockmanager/dockmanager.public-interfaces';
import { IgcDockManagerService } from '../components/dockmanager/dockmanager.service';
import { IgcDockManagerKeyboardService } from '../components/dockmanager/keyboard/keyboard.service';
/**
 * @hidden
 */
declare class EventEmitterMock<T = any> implements EventEmitter {
  private callback;
  addEventListener(callback: (event: CustomEvent<T>) => void): void;
  emit(data: T): CustomEvent<T>;
}
/**
 * @hidden
 */
export declare class IgcDockManagerComponentMock implements IgcDockManagerComponentBase {
  activePane: IgcContentPane;
  draggedPane: IgcContentPane | IgcSplitPane | IgcTabGroupPane;
  dropTargetPaneInfo: IgcDropTargetPaneInfo;
  dropShadowRect: DOMRect;
  documentOnlyDrag: boolean;
  isValidDrop: boolean;
  allowMaximize: boolean;
  disableKeyboardNavigation: boolean;
  flyoutPane: IgcContentPane;
  maximizedPane: IgcContentPane | IgcSplitPane | IgcTabGroupPane;
  navigationPaneMeta: IgcPaneNavigatorMetadata;
  dir: string;
  paneClose: EventEmitterMock<IgcPaneCloseEventArgs>;
  panePinnedToggle: EventEmitterMock<IgcPanePinnedEventArgs>;
  paneDragStart: EventEmitterMock<IgcPaneDragStartEventArgs>;
  paneDragOver: EventEmitterMock<IgcPaneDragOverEventArgs>;
  paneDragEnd: EventEmitterMock<any>;
  floatingPaneZIndicesMap: Map<IgcSplitPane, number>;
  resourceStrings: IgcDockManagerResourceStrings;
  floatingPaneResizeStart: EventEmitterMock<IgcFloatingPaneResizeEventArgs>;
  floatingPaneResizeMove: EventEmitterMock<IgcFloatingPaneResizeMoveEventArgs>;
  floatingPaneResizeEnd: EventEmitterMock<IgcFloatingPaneResizeEventArgs>;
  layoutChange: EventEmitterMock<any>;
  focusElement(): void;
  service: IgcDockManagerService;
  keyboardService: IgcDockManagerKeyboardService;
  private _layout;
  get layout(): IgcDockManagerLayout;
  set layout(value: IgcDockManagerLayout);
}
export {};
