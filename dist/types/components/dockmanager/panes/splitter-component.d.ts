import { EventEmitter } from '../../../stencil-public-runtime';
import { IgcSplitPaneOrientation, IgcUnpinnedLocation } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare class IgcSplitterComponent {
  private dragService;
  private paneSizes;
  private ghostElement;
  private flyoutMaxSize;
  element: HTMLElement;
  dragOffset: number;
  hasCustomSplitterHandle: boolean;
  showDragGhost: boolean;
  splitPaneOrientation: IgcSplitPaneOrientation;
  flyoutLocation: IgcUnpinnedLocation;
  resizeStart: EventEmitter;
  resizeEnd: EventEmitter<number>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  calculateOffset(event: KeyboardEvent): number;
  isArrowUp(event: KeyboardEvent): boolean;
  isArrowDown(event: KeyboardEvent): boolean;
  isArrowLeft(event: KeyboardEvent): boolean;
  isArrowRight(event: KeyboardEvent): boolean;
  handleKeydownEvent(event: KeyboardEvent): void;
  handleMouseDown(): void;
  private handleMouseUp;
  private dragStartHelper;
  private dragStart;
  private dragEndHelper;
  private dragEnd;
  private dragMove;
  private constrainFlyoutResize;
  private constrainSplitPaneResize;
  private closestElement;
  handleSlotChange(): void;
  render(): any;
}
