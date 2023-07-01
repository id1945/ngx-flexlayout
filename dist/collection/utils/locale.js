import { IgcDockManagerResourceStringsEN } from '../i18n/resources.en';
import { IgcDockManagerResourceStringsES } from '../i18n/resources.es';
import { IgcDockManagerResourceStringsJP } from '../i18n/resources.jp';
import { IgcDockManagerResourceStringsKO } from '../i18n/resources.ko';
/**
 * @hidden
 */
export const resourceStringsMap = new Map();
resourceStringsMap.set('en', IgcDockManagerResourceStringsEN);
resourceStringsMap.set('jp', IgcDockManagerResourceStringsJP);
resourceStringsMap.set('es', IgcDockManagerResourceStringsES);
resourceStringsMap.set('ko', IgcDockManagerResourceStringsKO);
/**
 * Adds custom resource strings for a specified language.
 * @param language The name of the language that should match the `lang` attribute of the page.
 * @param resourceStrings The resource strings to be added.
 */
export function addResourceStrings(language, resourceStrings) {
  resourceStringsMap.set(language, resourceStrings);
}
