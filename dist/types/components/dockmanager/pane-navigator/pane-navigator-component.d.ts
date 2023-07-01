import { EventEmitter } from '../../../stencil-public-runtime';
import { IgcContentPane, IgcDockManagerResourceStrings } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare class IgcPaneNavigatorComponent {
  activeDocuments: IgcContentPane[];
  activePanes: IgcContentPane[];
  selectedIndex: number;
  previousActivePaneIndex: number;
  resourceStrings: IgcDockManagerResourceStrings;
  closed: EventEmitter<IgcContentPane>;
  private allItems;
  private allItemsElement;
  private paneNav;
  scrollItemToView(): void;
  handleKeyUp(event: KeyboardEvent): void;
  handleKeydown(event: KeyboardEvent): void;
  private navigateToIndex;
  private increaseSelectedIndex;
  private decreaseSelectedIndex;
  connectedCallback(): void;
  componentDidLoad(): void;
  resolveItemPart(item: IgcContentPane, index: number, isDocHost: boolean): string;
  selectItem(index: number, isDocHost: boolean): void;
  renderItems(title: string, items: IgcContentPane[], isDocHost: boolean): any;
  render(): any;
}
