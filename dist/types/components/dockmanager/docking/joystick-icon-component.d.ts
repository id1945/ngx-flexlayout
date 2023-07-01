import { IgcDockingIndicatorPosition } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare class IgcJoystickIconComponent {
  isDocHost: boolean;
  position: IgcDockingIndicatorPosition;
  direction: string;
  empty: boolean;
  private resolveIconDivClass;
  private resolveMargin;
  private resolveGridRow;
  private resolveGridColumn;
  private renderIcon;
  render(): any;
}
