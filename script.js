const display = document.getElementById('display');
let current = '';
let operator = '';
let previous = '';
let resultDisplayed = false;

function updateDisplay(val) {
  display.textContent = val;
}

function clearAll() {
  current = '';
  operator = '';
  previous = '';
  resultDisplayed = false;
  updateDisplay('0');
}

function inputNumber(num) {
  if (resultDisplayed) {
    current = '';
    resultDisplayed = false;
  }
  if (num === '.' && current.includes('.')) return;
  current += num;
  updateDisplay(current);
}

function setOperator(op) {
  if (current === '' && previous === '') return;
  if (previous !== '' && current !== '') {
    compute();
  }
  operator = op;
  if (current !== '') {
    previous = current;
    current = '';
  }
}

function compute() {
  let prev = parseFloat(previous);
  let curr = parseFloat(current);
  if (isNaN(prev) || isNaN(curr)) return;
  let res = 0;
  switch (operator) {
    case '+': res = prev + curr; break;
    case '-': res = prev - curr; break;
    case '*': res = prev * curr; break;
    case '/': res = curr === 0 ? 'Error' : prev / curr; break;
    default: return;
  }
  updateDisplay(res);
  previous = res.toString();
  current = '';
  operator = '';
  resultDisplayed = true;
}

function backspace() {
  if (!resultDisplayed && current.length > 0) {
    current = current.slice(0, -1);
    updateDisplay(current || '0');
  }
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.hasAttribute('data-num')) {
      inputNumber(btn.getAttribute('data-num'));
    } else if (btn.hasAttribute('data-action')) {
      const action = btn.getAttribute('data-action');
      if (action === 'clear') clearAll();
      else if (action === 'add') setOperator('+');
      else if (action === 'subtract') setOperator('-');
      else if (action === 'multiply') setOperator('*');
      else if (action === 'divide') setOperator('/');
      else if (action === 'equal') compute();
      else if (action === 'backspace') backspace();
    }
  });
});

// Initialize display
clearAll();