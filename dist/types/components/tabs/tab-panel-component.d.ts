import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @hidden
 */
export declare class IgcTabPanelComponent {
  private emitSelectedChanged;
  element: HTMLElement;
  selected: boolean;
  disabled: boolean;
  selectedPropChange(): void;
  selectedChanged: EventEmitter<boolean>;
  componentDidUpdate(): void;
  render(): any;
}
