import { EventEmitter } from '../../../stencil-public-runtime';
/**
 * @hidden
 */
export declare class IgcContentPaneComponent {
  size: number;
  isFlyout: boolean;
  unpinnedSize: number;
  header: string;
  disabled: boolean;
  isSingleFloating: boolean;
  rendered: EventEmitter<HTMLIgcContentPaneComponentElement>;
  componentDidRender(): void;
  render(): any;
}
