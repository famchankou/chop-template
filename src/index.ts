import { Config } from './models';
import { Parser } from './parser';
import { isObject } from './utils';

/**
 * 
 * @param template string to interpolate values into
 * @param dataset an object config for template values
 */
export const chop = (template: string, dataset: Config): string => {
  if (template == null || dataset == null) {
    throw new Error('Template and Dataset are mandatory parameters');
  }

  if (typeof template !== 'string') {
    throw new Error('Template must be a string');
  }

  if (!isObject(dataset)) {
    throw new Error('Dataset must be an object');
  }

  return Parser.parseTemplate(template, dataset);
}
