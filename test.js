const assert = require('assert');
const SassVar = require('.');

describe('SassVar.generate(name, value)', () => {
  it('should raise when the object includes undefined', () => {
    assert.throws(() => SassVar.generate('var', undefined), "undefined can't be used");
  });

  it('should generate a Sass variable, which type of value is null', () => {
    assert.strictEqual(SassVar.generate('var', null), '$var:null;');
  });

  it('should generate a Sass variable, which type of value is bool', () => {
    assert.strictEqual(SassVar.generate('var', true), '$var:true;');
    assert.strictEqual(SassVar.generate('var', false), '$var:false;');
  });

  it('should generate a Sass variable, which type of value is number', () => {
    assert.strictEqual(SassVar.generate('var', 46), '$var:46;');
  });

  it('should generate a Sass variable, which type of value is string', () => {
    assert.strictEqual(SassVar.generate('var', 'nogizaka'), '$var:nogizaka;');
  });

  it('should generate a Sass variable, which type of value is list', () => {
    assert.strictEqual(SassVar.generate('var', ['foo', 'bar']), '$var:(foo,bar);');
  });

  it('should generate a Sass variable, which type of value is map', () => {
    assert.strictEqual(SassVar.generate('var', { foo: 'bar', baz: 'qux' }), '$var:(foo:bar,baz:qux);');
  });

  it('should fallback with toString()', () => {
    const func = () => {};
    assert.strictEqual(SassVar.generate('var', func), `$var:${func.toString()};`);
  });
});
