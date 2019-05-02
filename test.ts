import * as assert from 'assert';
import * as sassVar from '.';

describe('sassVar.generate(name: string, value: any): string', () => {
  it('should raise when the object includes undefined', () => {
    assert.throws(
      () => sassVar.generate('var', undefined),
      // NOTE: Hack for `TypeError [ERR_AMBIGUOUS_ARGUMENT]` raised in Node v10 or later
      process.version.match(/^v[0-9]\./)
        ? "undefined can't be used"
        : { message: "undefined can't be used" }
    );
  });

  it('should generate a Sass variable, which type of value is null', () => {
    assert.strictEqual(sassVar.generate('var', null), '$var:null;');
  });

  it('should generate a Sass variable, which type of value is bool', () => {
    assert.strictEqual(sassVar.generate('var', true), '$var:true;');
    assert.strictEqual(sassVar.generate('var', false), '$var:false;');
  });

  it('should generate a Sass variable, which type of value is number', () => {
    assert.strictEqual(sassVar.generate('var', 46), '$var:46;');
  });

  it('should generate a Sass variable, which type of value is string', () => {
    assert.strictEqual(sassVar.generate('var', 'nogizaka'), '$var:nogizaka;');
  });

  it('should generate a Sass variable, which type of value is list', () => {
    assert.strictEqual(sassVar.generate('var', ['foo', 'bar']), '$var:(foo,bar);');
  });

  it('should generate a Sass variable, which type of value is map', () => {
    assert.strictEqual(sassVar.generate('var', { foo: 'bar', baz: 'qux' }), '$var:(foo:bar,baz:qux);');
  });

  it('should fallback with toString()', () => {
    const func = () => {};
    assert.strictEqual(sassVar.generate('var', func), `$var:${func.toString()};`);
  });
});
