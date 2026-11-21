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

test('calculator buttons insert operators and preserve normal input handling', () => {
  for (const operator of ['+', '-', '*', '/']) {
    const editor = createEditor();
    editor.edit('insertText', '4');
    editor.context.insertTxAmountOperator(operator);
    assert.equal(editor.input.value, `4.00${operator}`);
    assert.equal(editor.input.focused, true);
    assert.equal(editor.edit('insertText', '2'), `4.00${operator}2`);
    assert.equal(editor.getUpdates(), 3);
  }
});

test('calculator buttons replace the selected portion of the amount', () => {
  const editor = createEditor('12.34');
  editor.input.setSelectionRange(2, 5);
  editor.context.insertTxAmountOperator('+');
  assert.equal(editor.input.value, '12+');
  assert.equal(editor.input.selectionStart, 3);
  assert.equal(editor.edit('insertText', '5'), '12+5');
});
