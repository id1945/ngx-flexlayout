import { EventEmitter } from '../../stencil-public-runtime';
import { IgcTabHeadersPosition } from '../dockmanager/dockmanager.interfaces';
import { IgcDockManagerResourceStrings } from '../dockmanager/dockmanager.public-interfaces';
import { IgcDragEventArguments, IgcDragMoveEventArguments, IgcDragService, IgcDragStartEventArguments } from '../drag-drop/drag.service';
/**
 * @hidden
 */
export declare class IgcTabHeaderComponent {
  dragService: IgcDragService;
  element: HTMLIgcTabHeaderComponentElement;
  selected: boolean;
  hovered: boolean;
  position: IgcTabHeadersPosition;
  iconName: string;
  header: string;
  isActive: boolean;
  resourceStrings: IgcDockManagerResourceStrings;
  forcedDrag: boolean;
  disabled: boolean;
  showHeaderIconOnHover: 'closeOnly' | 'moreOptionsOnly' | 'all';
  dragStarted: EventEmitter<IgcDragStartEventArguments>;
  dragMoved: EventEmitter<IgcDragMoveEventArguments>;
  dragEnded: EventEmitter<IgcDragEventArguments>;
  tabMouseDown: EventEmitter;
  iconClicked: EventEmitter<any>;
  iconKeyDown: EventEmitter<KeyboardEvent>;
  elementConnected: EventEmitter<HTMLIgcTabHeaderComponentElement>;
  elementDisconnected: EventEmitter<HTMLIgcTabHeaderComponentElement>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  handleMouseDown(ev: MouseEvent): void;
  handleMouseEnter(): void;
  handleMouseLeave(): void;
  forcedDragChanged(): void;
  private forceDragging;
  activeChanged(): void;
  private iconClick;
  private keyDown;
  private renderCloseButton;
  private renderMoreOptionsButton;
  render(): any;
}
