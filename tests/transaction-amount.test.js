const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const start = html.indexOf('    let txAmountDigits = null;');
const end = html.indexOf('    // --- TRANSACTION COMPARISON & FILTERING ---', start);
assert.ok(start !== -1 && end !== -1, 'Transaction amount handlers must exist');
const handlers = html.slice(start, end);

function createEditor(initialValue = '') {
  let updates = 0;
  let input;
  const context = vm.createContext({
    checkClearButtonVisibility() {},
    updateSplitRemainder() { updates++; },
    document: { getElementById: () => input },
    InputEvent: class {
      constructor(type, options) { Object.assign(this, { type }, options); }
    }
  });
  vm.runInContext(handlers, context);
  input = {
    value: initialValue,
    selectionStart: initialValue.length,
    selectionEnd: initialValue.length,
    focus() { this.focused = true; },
    setSelectionRange(start, end) {
      this.selectionStart = start;
      this.selectionEnd = end;
    },
    setRangeText(text, start, end) {
      this.value = this.value.slice(0, start) + text + this.value.slice(end);
      this.setSelectionRange(start + text.length, start + text.length);
    },
    dispatchEvent(event) {
      event.target = this;
      context.handleTxAmountInput(event);
    }
  };

  function edit(type, text = '', options = {}) {
    const event = {
      target: input,
      inputType: type,
      data: options.nullData ? null : (type.startsWith('insert') ? text : null),
      dataTransfer: options.transfer ? { getData: () => text } : null
    };
    context.captureTxAmountEdit(event);
    let { selectionStart: start, selectionEnd: end } = input;
    if (start === end && type === 'deleteContentBackward') start = Math.max(0, start - 1);
    if (start === end && type === 'deleteContentForward') end = Math.min(input.value.length, end + 1);
    input.value = input.value.slice(0, start) + text + input.value.slice(end);
    input.setSelectionRange(start + text.length, start + text.length);
    context.handleTxAmountInput(event);
    return input.value;
  }

  return { input, edit, context, getUpdates: () => updates };
}

test('formats each digit as dollars and cents', () => {
  const editor = createEditor();
  assert.deepEqual([...('4178')].map(digit => editor.edit('insertText', digit)),
    ['4.00', '4.10', '4.17', '41.78']);
  assert.equal(editor.getUpdates(), 4);
});

test('formats multiple inserted or pasted digits, even when input data is absent', () => {
  for (const options of [{}, { nullData: true }, { nullData: true, transfer: true }]) {
    const editor = createEditor();
    assert.equal(editor.edit('insertFromPaste', '3857268', options), '38572.68');
  }
});

test('backspace, selections, and replacement operate on entered digits', () => {
  const editor = createEditor();
  editor.edit('insertText', '4178');
  assert.equal(editor.edit('deleteContentBackward'), '4.17');
  assert.equal(editor.edit('deleteContentBackward'), '4.10');
  assert.equal(editor.edit('deleteContentBackward'), '4.00');
  assert.equal(editor.edit('deleteContentBackward'), '');
  editor.edit('insertText', '4178');
  editor.input.setSelectionRange(0, editor.input.value.length);
  assert.equal(editor.edit('insertText', '9'), '9.00');
});

test('supports explicit decimal amounts and calculator expressions', () => {
  const editor = createEditor();
  for (const char of '12.34+5') editor.edit('insertText', char);
  assert.equal(editor.input.value, '12.34+5');
  editor.input.setSelectionRange(0, editor.input.value.length);
  assert.equal(editor.edit('insertFromPaste', '7.25'), '7.25');
});

test('handles prefilled amounts and cursor edits', () => {
  const editor = createEditor('4.17');
  assert.equal(editor.edit('insertText', '8'), '41.78');
  editor.input.setSelectionRange(1, 2);
  assert.equal(editor.edit('insertText', '9'), '49.78');
  editor.context.resetTxAmountFormatting();
  editor.input.value = '';
  editor.input.setSelectionRange(0, 0);
  assert.equal(editor.edit('insertText', '3'), '3.00');
});

function createCalculator(initialValue = '') {
  let updates = 0;
  const element = () => ({
    value: '',
    textContent: '',
    attributes: {},
    selectionStart: 0,
    selectionEnd: 0,
    classList: {
      values: new Set(['hidden']),
      add(name) { this.values.add(name); },
      remove(...names) { names.forEach(name => this.values.delete(name)); },
      contains(name) { return this.values.has(name); }
    },
    focus() { this.focused = true; },
    setAttribute(name, value) { this.attributes[name] = value; },
    setSelectionRange(start, end) { this.selectionStart = start; this.selectionEnd = end; },
    setRangeText(text, start, end) {
      this.value = this.value.slice(0, start) + text + this.value.slice(end);
      this.setSelectionRange(start + text.length, start + text.length);
    }
  });
  const elements = Object.fromEntries(
    ['txAmount', 'txCalculator', 'txCalculatorToggle', 'txCalculatorDisplay', 'txCalculatorError']
      .map(id => [id, element()])
  );
  elements.txAmount.value = initialValue;
  const context = vm.createContext({
    document: { getElementById: id => elements[id] },
    checkClearButtonVisibility() {},
    updateSplitRemainder() { updates++; }
  });
  const currencyStart = html.indexOf('    function roundCurrency(');
  const currencyEnd = html.indexOf('    // --- RESTRICT TYPING', currencyStart);
  const evalStart = html.indexOf('    function evaluateExpression(');
  const evalEnd = html.indexOf('    // Format the field', evalStart);
  vm.runInContext(html.slice(currencyStart, currencyEnd) + html.slice(evalStart, evalEnd) + handlers, context);
  return { context, elements, getUpdates: () => updates };
}

test('calculator applies a result and updates the amount and splits', () => {
  const { context, elements, getUpdates } = createCalculator('4.00');
  context.openTxCalculator();
  assert.equal(elements.txCalculatorToggle.attributes['aria-expanded'], 'true');
  context.insertTxCalculatorText('+');
  context.insertTxCalculatorText('2');
  context.applyTxCalculator();
  assert.equal(elements.txAmount.value, '6.00');
  assert.equal(getUpdates(), 1);
  assert.equal(elements.txCalculator.classList.contains('hidden'), true);
  assert.equal(elements.txCalculatorToggle.focused, true);
});

test('calculator handles invalid expressions, cancellation and editing', () => {
  const { context, elements, getUpdates } = createCalculator('3.00');
  context.openTxCalculator();
  context.clearTxCalculator();
  context.insertTxCalculatorText('5');
  context.insertTxCalculatorText('/');
  context.insertTxCalculatorText('0');
  context.applyTxCalculator();
  assert.equal(elements.txAmount.value, '3.00');
  assert.equal(elements.txCalculatorError.classList.contains('hidden'), false);
  assert.equal(getUpdates(), 0);
  context.backspaceTxCalculator();
  context.insertTxCalculatorText('2');
  assert.equal(context.calculateTxCalculator(), true);
  assert.equal(elements.txCalculatorDisplay.value, '2.50');
  context.closeTxCalculator();
  assert.equal(elements.txAmount.value, '3.00');
  assert.equal(elements.txCalculatorToggle.attributes['aria-expanded'], 'false');
});
