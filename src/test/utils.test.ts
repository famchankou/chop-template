import {
  parseTemplateString,
  replaceAllOccurrences,
  objectPropsToMap,
  isObject,
} from '../utils';

describe('isObject', () => {
  it('Should check valid object type', () => {
    expect(isObject(null)).toBeFalsy();
    expect(isObject({})).toBeTruthy();
  });
});

describe('parseTemplateString', () => {
  const testString = 'I like to eat {{  bread.white}} and {{bread.rye  }} and drink {{  drink.softDrinks.juice.orange    }}';

  it('Should parse template string', () => {
    const result = parseTemplateString(testString);
    expect(result).toBeDefined();
    expect(result.size).toBe(3);
    expect(result.get('bread.white')).toBe('{{  bread.white}}');
    expect(result.get('bread.rye')).toBe('{{bread.rye  }}');
    expect(result.get('drink.softDrinks.juice.orange')).toBe('{{  drink.softDrinks.juice.orange    }}');
  });
});

describe('objectPropsToMap', () => {
  const testConfig = {
    bread: {
      white: 'white bread',
    },
    cheese: 'brie cheese',
    drink: {
      softDrinks: {
        juice: {
          orange: 'Orange juice',
        }
      },
      alkoDrinks: {
        beer: 'Bear',
      }
    }
  };

  it('Should parse object props', () => {
    const result = objectPropsToMap(testConfig);
    expect(result).toBeDefined();
    expect(result.size).toBe(4);
    expect(result.get('bread.white')).toBe('white bread');
    expect(result.get('cheese')).toBe('brie cheese');
    expect(result.get('drink.softDrinks.juice.orange')).toBe('Orange juice');
    expect(result.get('drink.alkoDrinks.beer')).toBe('Bear');
  });
});

describe('replaceAllOccurrences', () => {
  const testString = 'I like to eat {{bread.white}} and {{bread.rye}} and {{bread.white}} ....';

  it('Should replace all occurrences of template variable', () => {
    const result = replaceAllOccurrences(testString, '{{bread.white}}', 'REPLACED_WITH');
    expect(result).toBeDefined();
    expect(result).toBe('I like to eat REPLACED_WITH and {{bread.rye}} and REPLACED_WITH ....');
  });
});
