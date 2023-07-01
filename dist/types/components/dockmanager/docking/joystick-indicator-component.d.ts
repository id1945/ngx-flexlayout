import { IgcDropTargetPaneInfo } from '../dockmanager.interfaces';
/**
 * @hidden
 */
export declare class IgcJoystickIndicatorComponent {
  private isDocHost;
  element: HTMLElement;
  dropTargetPaneInfo: IgcDropTargetPaneInfo;
  documentOnlyDrag: boolean;
  private isEmptyCenter;
  private isEmptyEdge;
  private closestElement;
  private renderIndicator;
  render(): any;
}
