import { IgcSplitPaneOrientation } from '..';
import { IgcDockingIndicatorPosition } from '../components/dockmanager/dockmanager.public-interfaces';
/**
 * @hidden
 */
export class Utils {
  static isDockingIndicatorVertical(position) {
    return position === IgcDockingIndicatorPosition.top ||
      position === IgcDockingIndicatorPosition.bottom ||
      position === IgcDockingIndicatorPosition.outerTop ||
      position === IgcDockingIndicatorPosition.outerBottom;
  }
  static isDockingIndicatorBefore(position) {
    return position === IgcDockingIndicatorPosition.top ||
      position === IgcDockingIndicatorPosition.left ||
      position === IgcDockingIndicatorPosition.outerTop ||
      position === IgcDockingIndicatorPosition.outerLeft;
  }
  static isDockingIndicatorBeforeRTL(position) {
    return position === IgcDockingIndicatorPosition.top ||
      position === IgcDockingIndicatorPosition.right ||
      position === IgcDockingIndicatorPosition.outerTop ||
      position === IgcDockingIndicatorPosition.outerRight;
  }
  static isDockingIndicatorOuter(position) {
    return position === IgcDockingIndicatorPosition.outerLeft ||
      position === IgcDockingIndicatorPosition.outerRight ||
      position === IgcDockingIndicatorPosition.outerTop ||
      position === IgcDockingIndicatorPosition.outerBottom;
  }
  static isSplitPaneVertical(splitPane) {
    return splitPane.orientation === IgcSplitPaneOrientation.vertical;
  }
  static isAltPressed(event) {
    return event.altKey || event.getModifierState('Alt') || event.getModifierState('AltGraph');
  }
  static isControlOrMetaPressed(event) {
    return event.ctrlKey || event.metaKey || event.getModifierState('Meta') || event.getModifierState('OS');
  }
  static partNameMap(partNameInfo, delimiter = ' ') {
    return Object.keys(partNameInfo)
      .filter(key => partNameInfo[key])
      .join(delimiter);
  }
  static getDirection(element) {
    let direction = '';
    if (element.dir !== '') {
      direction = element.dir;
    }
    else {
      let parent = element.parentElement;
      while (parent) {
        if (parent.dir !== '') {
          direction = parent.dir;
          break;
        }
        parent = parent.parentElement;
      }
    }
    return direction;
  }
}
