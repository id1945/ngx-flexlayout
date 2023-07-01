import { Utils } from '../../../utils/utils';
import { IgcDockManagerPaneType, IgcDockingIndicatorPosition } from './../dockmanager.public-interfaces';
/**
 * @hidden
 */
export class IgcDockManagerKeyboardService {
  constructor(service) {
    this.service = service;
  }
  handleKeydown(event) {
    if (this.service.dockManager.disableKeyboardNavigation) {
      return;
    }
    const activePane = this.service.dockManager.activePane;
    const ctrlOrMetaKey = Utils.isControlOrMetaPressed(event);
    const altKey = Utils.isAltPressed(event);
    const shiftKey = event.shiftKey;
    if (event.key === 'Control' || event.key === 'Meta' || event.key === 'OS') {
      this.service.cacheDocumentsOrder();
    }
    else if (event.key === 'Alt' || event.key === 'AltGraph') {
      this.service.cacheContentPanesOrder();
    }
    else if (event.key === 'F6' || (event.key.startsWith('Arrow') && !shiftKey && ctrlOrMetaKey)) {
      this.handleFocusPane(event);
      event.stopPropagation();
    }
    else if (event.key === 'F3' && altKey && activePane) {
      this.service.dockManager.focusElement();
      this.service.closePane(activePane);
      event.stopPropagation();
    }
    else if (event.key.startsWith('Arrow') && shiftKey && activePane) {
      this.service.dockManager.focusElement();
      this.handleDockPane(event);
      event.stopPropagation();
    }
    else if ((event.key === 'F7' || event.key === 'F8') && (altKey || ctrlOrMetaKey)) {
      this.setPaneNavigatorMeta(altKey, ctrlOrMetaKey, shiftKey);
      event.stopPropagation();
    }
    else {
      return;
    }
  }
  handleFocusPane(event) {
    const altKey = Utils.isAltPressed(event);
    const ctrlOrMetaKey = Utils.isControlOrMetaPressed(event);
    const shiftKey = event.shiftKey;
    const f6 = event.key === 'F6';
    const arrowLeft = event.key === 'ArrowLeft';
    const arrowRight = event.key === 'ArrowRight';
    if (altKey && shiftKey && f6) {
      this.service.focusPrevContentPane(false);
    }
    else if (altKey && f6) {
      this.service.focusNextContentPane(false);
    }
    else if ((ctrlOrMetaKey && shiftKey && f6) || (ctrlOrMetaKey && arrowLeft)) {
      this.service.focusPrevContentPane(true);
    }
    else if ((ctrlOrMetaKey && f6) || (ctrlOrMetaKey && arrowRight)) {
      this.service.focusNextContentPane(true);
    }
  }
  handleDockPane(event) {
    const key = event.key;
    const ctrlOrMetaKey = Utils.isControlOrMetaPressed(event);
    const shiftKey = event.shiftKey;
    if (ctrlOrMetaKey && shiftKey) {
      this.handleRootDockPane(key);
    }
    else if (shiftKey) {
      const activePane = this.service.dockManager.activePane;
      const activePaneParent = this.service.getParent(activePane);
      if (activePaneParent.type === IgcDockManagerPaneType.tabGroupPane && activePaneParent.panes.length > 1) {
        this.handleInnerDockPane(key);
      }
    }
  }
  handleRootDockPane(key) {
    switch (key) {
      case 'ArrowUp':
        this.service.rootDockPane(IgcDockingIndicatorPosition.top);
        break;
      case 'ArrowDown':
        this.service.rootDockPane(IgcDockingIndicatorPosition.bottom);
        break;
      case 'ArrowLeft':
        this.service.rootDockPane(IgcDockingIndicatorPosition.left);
        break;
      case 'ArrowRight':
        this.service.rootDockPane(IgcDockingIndicatorPosition.right);
        break;
      default:
        break;
    }
  }
  handleInnerDockPane(key) {
    switch (key) {
      case 'ArrowUp':
        this.service.dockPane(IgcDockingIndicatorPosition.top);
        break;
      case 'ArrowDown':
        this.service.dockPane(IgcDockingIndicatorPosition.bottom);
        break;
      case 'ArrowLeft':
        this.service.dockPane(IgcDockingIndicatorPosition.left);
        break;
      case 'ArrowRight':
        this.service.dockPane(IgcDockingIndicatorPosition.right);
        break;
      default:
        break;
    }
  }
  setPaneNavigatorMeta(altKey, ctrlOrMetaKey, shiftKey) {
    let initIndex = 0;
    const allItems = this.service.visibleContentPanes.concat(this.service.visibleDocuments);
    if (allItems.length > 0) {
      if (ctrlOrMetaKey) {
        if (this.service.visibleDocuments.length > 0) {
          initIndex = shiftKey ?
            this.service.visibleContentPanes.length + this.service.visibleDocuments.length - 1 :
            this.service.visibleContentPanes.length;
        }
        else {
          initIndex = shiftKey ? this.service.visibleContentPanes.length - 1 : 0;
        }
      }
      else if (altKey) {
        initIndex = shiftKey ?
          this.service.visibleContentPanes.length > 0 ?
            this.service.visibleContentPanes.length - 1 :
            this.service.visibleDocuments.length - 1 :
          0;
      }
      const metadata = {
        activePanes: this.service.visibleContentPanes,
        activeDocuments: this.service.visibleDocuments,
        initialIndex: initIndex,
        previousActivePaneIndex: allItems.indexOf(this.service.dockManager.activePane)
      };
      this.service.dockManager.activePane = null;
      this.service.dockManager.navigationPaneMeta = metadata;
    }
  }
}
