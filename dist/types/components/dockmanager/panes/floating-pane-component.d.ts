import { EventEmitter } from '../../../stencil-public-runtime';
import { IgcDragResizeEventArguments } from '../../drag-drop/drag.service';
import { IgcDockManagerPoint } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare class IgcFloatingPaneComponent {
  allowResize: boolean;
  floatingLocation: IgcDockManagerPoint;
  floatingWidth: number;
  floatingHeight: number;
  hasHeader: boolean;
  maximized: boolean;
  floatingMinHeight: number;
  floatingMinWidth: number;
  floatingId: string;
  wndResizeStart: EventEmitter<IgcDragResizeEventArguments>;
  wndResizeMove: EventEmitter<IgcDragResizeEventArguments>;
  wndResizeEnd: EventEmitter<IgcDragResizeEventArguments>;
  elem: HTMLElement;
  private handleResizerMove;
  private handleResizeStart;
  private handleResizeEnd;
  render(): any;
}
