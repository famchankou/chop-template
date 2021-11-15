import { ResultDict, Config } from '../models';

/**
 * 
 * @param val 
 * @returns 
 */
export const isObject = (val: unknown = null): boolean => {
  return toString.call(val) === '[object Object]';
};

/**
 * 
 * @param config 
 * @returns 
 */
export const objectPropsToMap = (config: Config): ResultDict => {
  const result = new Map<string, string | number>();

  const traverse = (config: Config, path = '') => {
    const props = Object.keys(config);

    if (props.length) {
      for (const prop of props) {
        const value = config[prop];
        path += '.' + prop;

        if (value != null) {
          if (isObject(value)) {
            traverse(value as Config, path);
          } else {
            const fullPath = path.substring(1);
            if (typeof value === 'string' || typeof value === 'number') {
              result.set(fullPath, value);
            } else {
              console.warn('Unsupported value type: ', fullPath, JSON.stringify(value));
            }
          }
        }
      }
    }
  }
  traverse(config, '');

  return result;
};

/**
 * 
 * @param template 
 * @returns 
 */
export const parseTemplateString = (template = ''): Map<string, number[][]> => {
  const mustacheRegex = /({{.*?}})/ig;
  const matchResult = template.match(mustacheRegex) || [];
  const tokensDict = new Map<string, number[][]>();

  for (const token of matchResult) {
    const sanitizedToken = token.replace('{{', '').replace('}}', '');
    const occurrences = findAllOccurences(template, token)
    tokensDict.set(sanitizedToken, occurrences);
  }

  return tokensDict;
}

/**
 * 
 * @param template 
 * @param substr 
 * @returns 
 */
export const findAllOccurences = (template: string, substr: string): number[][] => {
  const occurrences: number[][] = [];

  if (template && substr) {
    const len = substr.length;
    let index = template.indexOf(substr, 0);

    while (index >= 0) {
      occurrences.push([index, index + len]);
      index = template.indexOf(substr, index + len);
    }
  }

  return occurrences;
}
