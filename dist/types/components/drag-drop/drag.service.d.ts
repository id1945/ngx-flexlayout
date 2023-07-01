import { IgcResizerLocation } from '../dockmanager/dockmanager.public-interfaces';
/**
 * @hidden
 */
export interface IgcDragStartEventArguments {
  cancel?: boolean;
  clientX: number;
  clientY: number;
}
/**
 * @hidden
 */
export interface IgcDragEventArguments {
  offsetX: number;
  offsetY: number;
  clientX: number;
  clientY: number;
}
/**
 * @hidden
 */
export interface IgcDragResizeEventArguments {
  dragMoveArgs: IgcDragMoveEventArguments;
  resizerLocation: IgcResizerLocation;
}
/**
 * @hidden
 */
export interface IgcDragMoveEventArguments extends IgcDragEventArguments {
  totalOffsetX?: number;
  totalOffsetY?: number;
  cancel?: boolean;
}
export declare const IGNORE_DRAG = "data-ignore-drag";
/**
 * @hidden
 */
export declare class IgcDragService {
  private element;
  private startX;
  private startY;
  private lastX;
  private lastY;
  private currentX;
  private currentY;
  private dragStarted;
  private forcedDrag;
  private _capturedElement;
  private get captureTarget();
  private set captureTarget(value);
  dragTolerance: number;
  dragEdgeTolerance: number;
  dragStart: (eventArgs: IgcDragStartEventArguments) => void;
  dragEnd: (eventArgs: IgcDragEventArguments) => void;
  dragMove: (eventArgs: IgcDragMoveEventArguments) => void;
  constructor(element: HTMLElement);
  private triggerDragStart;
  private subscribeDragEvents;
  private unsubscribeDragEvents;
  private handleWheel;
  private handlePointerDown;
  private handlePointerMove;
  private handlePointerUp;
  destroy(): void;
  forceDragging(): void;
}
