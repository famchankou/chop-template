import { Config, ResultDict } from '../models';
import {
  replaceAllOccurrences,
  parseTemplateString,
  objectPropsToMap,
  parseMustache,
} from '../utils';

/**
 * Template parser
 * 
 * - Interpolates config values into the provided template string
 * - Validates config values to parse only numbers and strings
 * - Throws error on invalid template variable, invalid value type or if there is no config for a cretain template variable
 */
export class Parser {
  public static parseTemplate(template: string, dataset: Config): string {
    const propsMap: ResultDict = objectPropsToMap(dataset);
    const tokens: Map<string, string> = parseTemplateString(template);

    tokens.forEach((match: string, token: string) => {
      if (propsMap.has(token)) {
        const value = propsMap.get(token);
        template = replaceAllOccurrences(template, match, value);
      }
    });

    const unresolvedVariables = parseMustache(template);
    if (unresolvedVariables.length) {
      const value = unresolvedVariables.pop();
      throw new Error(`Unresolved template variable: ${value}`);
    }

    return template;
  }
}
