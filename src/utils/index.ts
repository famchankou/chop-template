import { ResultDict, Config } from '../models';

/**
 * Checks if provided value is an Object, not null, Array, ot other object type
 * @param val 
 * @returns 
 */
export const isObject = (val: unknown = null): boolean => {
  return toString.call(val) === '[object Object]';
};

/**
 * Finds all mustache template variables
 * 
 * @param template 
 * @returns 
 */
export const parseMustache = (template = ''): string[] => {
  const mustacheRegex = /({{.*?}})/ig;
  return template.match(mustacheRegex) || [];
};

/**
 * Parses the provided config object to a map where the key is the dot separated full path to the property:
 * 
 * Example:
 * {
 *    prop1: value1,
 *    prop2: {
 *      prop3: value2,
 *      prop4: {
 *          prop5: value3,
 *          ...
 *      },
 *    }
 *    prop6: value4,
 * }
 * Output:
 *  'prop1' => value1
 *  'prop2.prop3' => value2
 *  'prop2.prop4.prop5' => value3
 *  'prop6' => value4
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
        const propPath = `${path}.${prop}`;

        if (value != null) {
          if (isObject(value)) {
            traverse(value as Config, propPath);
          } else {
            const fullPath = propPath.substring(1);
            if (typeof value === 'string' || typeof value === 'number') {
              result.set(fullPath, value);
            } else {
              throw new Error(`Invalid config value type: ${fullPath} - ${JSON.stringify(value)}`);
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
 * Finds all valid template variables for interpolation, throws an error on invalid template variable
 * 
 * @param template 
 * @returns 
 */
export const parseTemplateString = (template = ''): Map<string, string> => {
  const specialCharsRegex = /[ `!@#$%^&*()+=[\]{};':"\\|,<>/?~]/g;
  const matchResult = parseMustache(template);
  const tokensDict = new Map<string, string>();

  for (const token of matchResult) {
    const sanitizedToken = token.replace('{{', '').replace('}}', '').trim();
    if (specialCharsRegex.test(sanitizedToken)) {
      throw new Error(`Invalid template variable name: ${token}`);
    }

    tokensDict.set(sanitizedToken, token);
  }

  return tokensDict;
};

/**
 * Replaces all occurrences of the valid template variables just like String.prototype.replaceAll
 * 
 * @param template 
 * @param substr 
 * @returns 
 */
export const replaceAllOccurrences = (template: string, substr: string, value: string | number | undefined): string => {
  if (template && substr && value) {
    const len = substr.length;
    let start = template.indexOf(substr, 0);

    while (start >= 0) {
      const end = start + len;
      template = template.substring(0, start) + value + template.substring(end);
      start = template.indexOf(substr, start + end);
    }
  }

  return template;
};
