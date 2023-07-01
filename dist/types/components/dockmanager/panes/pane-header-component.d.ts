import { EventEmitter } from '../../../stencil-public-runtime';
import { IgcDragEventArguments, IgcDragMoveEventArguments, IgcDragService, IgcDragStartEventArguments } from '../../drag-drop/drag.service';
import { IgcContentPane, IgcDockManagerResourceStrings } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare class IgcPaneHeaderComponent {
  dragService: IgcDragService;
  element: HTMLIgcPaneHeaderComponentElement;
  pinned: boolean;
  maximized: boolean;
  isFloating: boolean;
  forcedDrag: boolean;
  isFloatingPaneHeader: boolean;
  allowClose: boolean;
  allowMaximize: boolean;
  allowPinning: boolean;
  pane: IgcContentPane;
  isActive: boolean;
  disabled: boolean;
  resourceStrings: IgcDockManagerResourceStrings;
  pinToggle: EventEmitter;
  maximize: EventEmitter;
  close: EventEmitter;
  dragStarted: EventEmitter<IgcDragStartEventArguments>;
  dragEnded: EventEmitter<IgcDragEventArguments>;
  dragMoved: EventEmitter<IgcDragMoveEventArguments>;
  elementConnected: EventEmitter<HTMLIgcPaneHeaderComponentElement>;
  elementDisconnected: EventEmitter<HTMLIgcPaneHeaderComponentElement>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  forcedDragChanged(): void;
  private forceDragging;
  private pinButtonClick;
  private maximizeButtonClick;
  private closeButtonClick;
  private renderCloseButton;
  private renderMaximizeButton;
  private renderMinimizeButton;
  private renderPinButton;
  private renderUnpinButton;
  render(): any;
}
