import { EventEmitter } from '../../stencil-public-runtime';
import { IgcContextMenuItem, IgcContextMenuOrientation, IgcContextMenuPosition } from '../dockmanager/dockmanager.interfaces';
/**
 * @hidden
 */
export declare class IgcContextMenuComponent {
  private menuItemsDiv;
  elem: HTMLElement;
  orientation: IgcContextMenuOrientation;
  position: IgcContextMenuPosition;
  target: HTMLElement;
  items: IgcContextMenuItem[];
  menuClosed: EventEmitter;
  activeIndex: number;
  emitMenuClosed(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  handleDocumentResize: () => void;
  handleDocumentMouseDown: (ev: MouseEvent) => void;
  componentDidLoad(): void;
  private focusItemAndSetActiveIndex;
  private handleKeyboardEvents;
  private handleMenuItemClick;
  private renderItemIcon;
  private renderCloseButton;
  private renderUnpinButton;
  render(): any;
}
