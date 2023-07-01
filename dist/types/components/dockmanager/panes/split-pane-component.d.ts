import { EventEmitter } from '../../../stencil-public-runtime';
import { IgcSplitPaneOrientation } from '../dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare class IgcSplitPaneComponent {
  orientation: IgcSplitPaneOrientation;
  size: number;
  rendered: EventEmitter<HTMLIgcSplitPaneComponentElement>;
  componentDidRender(): void;
  render(): any;
}
