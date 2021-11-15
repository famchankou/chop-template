import { chop } from '../index';

describe('chop template parser', () => {
  const testConfig = {
    bread: {
      white: 'white bread',
      grain: 'whole grain bread',
      rye: 'rye bread',
    },
    cheese: 'brie cheese',
    vegetables: 'Lovely vegetables',
    drink: {
      softDrinks: {
        cola: 'CocaCola',
        fanta: 'Fanta',
        juice: {
          orange: 'Orange juice',
        }
      },
      alkoDrinks: {
        beer: 'Bear',
        whiskey: 'Whiskey',
        vodka: 'Vodka',
      }
    }
  };

  it('Should throw an error if template string or config are not provided', () => {
    const wrap = () => chop('', null as any);
    expect(wrap).toThrow('Template and Dataset are mandatory parameters');
  });

  it('Should throw an error if template is not a string', () => {
    const wrap = () => chop(100 as any, testConfig);
    expect(wrap).toThrow('Template must be a string');
  });

  it('Should throw an error if config is not an object', () => {
    const testTemplate = 'I like to eat {{bread.white}} and {{cheese}}';
    const wrap = () => chop(testTemplate, null as any);
    expect(wrap).toThrow('Template and Dataset are mandatory parameters');
  });
  
  it('Should parse base template case without nested properties', () => {
    const testTemplate = 'I like to eat {{vegetables}} and {{cheese}}';
    const resultedTemplate = 'I like to eat Lovely vegetables and brie cheese';
    const result = chop(testTemplate, testConfig);
    expect(result).toBeDefined();
    expect(result).toBe(resultedTemplate);
  });

  it('Should parse base template case with nested config properties', () => {
    const testTemplate = 'I like to eat {{bread.white}} and {{bread.rye}} and drink {{drink.softDrinks.juice.orange}}';
    const resultedTemplate = 'I like to eat white bread and rye bread and drink Orange juice';
    const result = chop(testTemplate, testConfig);
    expect(result).toBeDefined();
    expect(result).toBe(resultedTemplate);
  });

  it('Should parse template with nested config properties and spaces around the template variables', () => {
    const testTemplate = 'I like to eat {{  bread.white}} and {{bread.rye  }} and drink {{    drink.softDrinks.juice.orange    }}';
    const resultedTemplate = 'I like to eat white bread and rye bread and drink Orange juice';
    const result = chop(testTemplate, testConfig);
    expect(result).toBeDefined();
    expect(result).toBe(resultedTemplate);
  });

  it('Should throw an error if template variable contains several properties separated with spaces', () => {
    const testTemplate = 'I like to eat {{  bread.white}} and {{bread.rye  }} and drink {{  cheese  drink.softDrinks.juice.orange    }}';
    const wrap = () => chop(testTemplate, testConfig);
    expect(wrap).toThrow('Invalid template variable name: {{  cheese  drink.softDrinks.juice.orange    }}');
  });

  it('Should throw an error if template variable has extra braces or other special sharacters', () => {
    const testTemplate = 'I like to eat {{test{{bread.rye  }}';
    const wrap = () => chop(testTemplate, testConfig);
    expect(wrap).toThrow('Invalid template variable name: {{test{{bread.rye  }}');
  });

  it('Should throw an error if invalid config value type provided', () => {
    const testTemplate = 'I like to eat {{bread.white}} and {{cheese}}';
    const testConfig = {
      bread: {
        white: [],
      },
      cheese: true,
    }
    const wrap = () => chop(testTemplate, testConfig as any);
    expect(wrap).toThrow('Invalid config value type: bread.white - []');
  });

  it('Should throw an error if the template has valid variable name but no config for it', () => {
    const testTemplate = 'I like to eat {{unknown.property}} and drink {{drink.softDrinks.juice.orange}}';
    const wrap = () => chop(testTemplate, testConfig);
    expect(wrap).toThrow('Unresolved template variable: {{unknown.property}}');
  });

  it('Should throw an error if template variable has only braces', () => {
    const testTemplate = 'I like to eat {{ bread.white }} and {{}}';
    const wrap = () => chop(testTemplate, testConfig);
    expect(wrap).toThrow('Unresolved template variable: {{}}');
  });
});
