import { EventEmitter } from '../../stencil-public-runtime';
import { IgcContextMenuMetadata, IgcTabHeadersPosition } from '../dockmanager/dockmanager.interfaces';
import { IgcDockManagerResourceStrings } from '../dockmanager/dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare class IgcTabsComponent {
  private forcedUpdate;
  el: HTMLIgcTabsComponentElement;
  hiddenTabsMenuMeta: IgcContextMenuMetadata;
  hasHiddenTabs: boolean;
  size: number;
  maximized: boolean;
  allowMaximize: boolean;
  tabHeadersPosition: IgcTabHeadersPosition;
  selectedIndex: number;
  hasHeaders: boolean;
  showHiddenTabsMenu: boolean;
  resourceStrings: IgcDockManagerResourceStrings;
  maximize: EventEmitter;
  maximizeMinimizeFocus: EventEmitter;
  selectedIndexPropertyChanged(newValue: number): void;
  selectedIndexChanged: EventEmitter<number>;
  hiddenTabSelected: EventEmitter<number>;
  selectedTabOutOfView: EventEmitter<number>;
  rendered: EventEmitter<HTMLIgcTabsComponentElement>;
  componentWillLoad(): void;
  componentDidRender(): void;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  private setTabsAttributes;
  disconnectedCallback(): void;
  private tabHeadersDiv;
  private resizeObserver;
  private slotChanged;
  private forceUpdate;
  private updateSelectedIndex;
  private get tabPanels();
  private get tabHeaders();
  private get hiddenTabHeaders();
  private handleSelectedIndexChanged;
  handleTabMouseDown(ev: CustomEvent): void;
  private onTabKeyDown;
  private tabHeadersDivResized;
  private setHasHiddenTabs;
  private checkForActivePane;
  private handleHiddenTabsMenuClick;
  private handleContextMenuClosed;
  private maximizeButtonClick;
  private handleMaximizeMinimizeFocus;
  private renderHiddenTabsMenu;
  private renderTabHeaders;
  private renderMoreTabsButton;
  private renderMaximizeButton;
  private renderMinimizeButton;
  render(): any;
}
