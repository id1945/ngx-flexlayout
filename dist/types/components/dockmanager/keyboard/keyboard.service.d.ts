import { IgcDockManagerService } from './../dockmanager.service';
/**
 * @hidden
 */
export declare class IgcDockManagerKeyboardService {
  private service;
  constructor(service: IgcDockManagerService);
  handleKeydown(event: KeyboardEvent): void;
  private handleFocusPane;
  private handleDockPane;
  private handleRootDockPane;
  private handleInnerDockPane;
  private setPaneNavigatorMeta;
}
