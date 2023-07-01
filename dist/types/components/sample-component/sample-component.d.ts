import { IgcContentPane, IgcDockManagerComponent, IgcDockManagerLayout } from '../dockmanager/dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare class SampleComponent {
  hiddenPanes: IgcContentPane[];
  dockManager: IgcDockManagerComponent;
  private teamExplorerPane;
  private unpinnedToolboxPane;
  private unpinnedTeamExplorerPane;
  layout1: IgcDockManagerLayout;
  layout2: IgcDockManagerLayout;
  layout: IgcDockManagerLayout;
  private hiddenPanesSelect;
  private hideOnCloseCheckbox;
  private savedLayout;
  private logEnabled;
  private saveLayout;
  private loadLayout;
  private setActivePane;
  private id;
  private newId;
  private addPane;
  private addTab;
  private disableContentPane;
  private foundElem;
  private findElement;
  private showPane;
  private showAllPanes;
  private createElement;
  private handlePaneClose;
  private handlePinnedToggle;
  private handleActivePaneChanged;
  private handleDragStart;
  private handleDragOver;
  private handleDragEnd;
  private handleSplitterResizeStart;
  private handleSplitterResizeEnd;
  private handleFloatingPaneResizeStart;
  private handleFloatingPaneResizeMove;
  private handleFloatingPaneResizeEnd;
  private handleLayoutChange;
  private log;
  render(): any;
}
