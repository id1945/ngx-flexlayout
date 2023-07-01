import { IgcSplitPane } from '..';
import { PartNameInfo } from '../components/dockmanager/dockmanager.interfaces';
import { IgcDockingIndicatorPosition } from '../components/dockmanager/dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare class Utils {
  static isDockingIndicatorVertical(position: IgcDockingIndicatorPosition): boolean;
  static isDockingIndicatorBefore(position: IgcDockingIndicatorPosition): boolean;
  static isDockingIndicatorBeforeRTL(position: IgcDockingIndicatorPosition): boolean;
  static isDockingIndicatorOuter(position: IgcDockingIndicatorPosition): boolean;
  static isSplitPaneVertical(splitPane: IgcSplitPane): boolean;
  static isAltPressed(event: KeyboardEvent): boolean;
  static isControlOrMetaPressed(event: KeyboardEvent): boolean;
  static partNameMap(partNameInfo: PartNameInfo, delimiter?: string): string;
  static getDirection(element: any): string;
}
