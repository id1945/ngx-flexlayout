import { IgcDockManagerResourceStrings } from '../components/dockmanager/dockmanager.public-interfaces';
/**
 * @hidden
 */
export declare const resourceStringsMap: Map<string, IgcDockManagerResourceStrings>;
/**
 * Adds custom resource strings for a specified language.
 * @param language The name of the language that should match the `lang` attribute of the page.
 * @param resourceStrings The resource strings to be added.
 */
export declare function addResourceStrings(language: string, resourceStrings: IgcDockManagerResourceStrings): void;
