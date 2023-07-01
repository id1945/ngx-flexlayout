import { EventEmitter } from '../../../stencil-public-runtime';
import { IgcDragEventArguments, IgcDragMoveEventArguments, IgcDragStartEventArguments } from '../../drag-drop/drag.service';
import { IgcResizerLocation } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare class IgcResizerComponent {
  private dragService;
  element: HTMLElement;
  dragOffsetX: number;
  dragOffsetY: number;
  orientation: IgcResizerLocation;
  resizerMoved: EventEmitter<IgcDragMoveEventArguments>;
  resizerDragStart: EventEmitter<IgcDragStartEventArguments>;
  resizerDragEnd: EventEmitter<IgcDragEventArguments>;
  private get isCornerResizer();
  connectedCallback(): void;
  disconnectedCallback(): void;
  private dragStart;
  private dragEnd;
  private dragMove;
  render(): any;
}
