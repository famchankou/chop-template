import { Config, ResultDict } from '../models';
import { objectPropsToMap, parseTemplateString } from '../utils';

/**
 * Template parser
 */
export class Parser {
  public static parseTemplate(template: string, dataset: Config): string {
    const propsMap: ResultDict = objectPropsToMap(dataset);
    const tokens: Map<string, number[][]> = parseTemplateString(template);

    tokens.forEach((occurrences: number[][], token: string) => {
      if (propsMap.has(token)) {
        const value = propsMap.get(token);

        for (const [start, end] of occurrences) {
          template = template.substring(0, start) + value + template.substring(end);
        }
      }
    });

    return template;
  }
}
