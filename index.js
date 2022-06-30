/*
'🐉','🐥','🐊','💩','🦍','🐢','🐩','🦀','🐝',
'🤖','🐘','🐸','🕷','🐆','🦕','🦁',
'🍎', '🍊',
*/

const charactersObject = {
  chars: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ],
  numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  symbols: [
    '~',
    '`',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '_',
    '-',
    '+',
    '=',
    '{',
    '[',
    '}',
    ']',
    ',',
    '|',
    ':',
    ';',
    '<',
    '>',
    '.',
    '?',
    '/',
  ],
};

// DOM elements
const formEl = document.getElementById('form');
const passwordScreenOne = document.getElementById('password-screen-1');
const passwordScreenTwo = document.getElementById('password-screen-2');
const passwordLengthInput = document.getElementById('password-length');
const screensBoxEl = document.querySelectorAll('#screens-box>div');
const symbolsCheckbox = document.getElementById('symbols');
const numbersCheckbox = document.getElementById('numbers');

// console.log(symbolsCheckbox.checked);

// Get Random Number
function generatePasswordString(arr, passwordLenght = 15) {
  let result = '';
  for (let i = 0; i < passwordLenght; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    result += arr[randomIndex];
  }
  return result;
}

// Function for populate text to DOM element
function populatePass(target, passwordString) {
  return (target.textContent = passwordString);
}

// Password generation function trigered by form submit
function passwordGenerateSubmit(e) {
  e.preventDefault();

  let arrayOfCharacters = [];
  let isIncludeSymbols = true;
  let isIncludeNumbers = true;

  let inputedPasswordLength = passwordLengthInput.value;

  symbolsCheckbox.checked
    ? (isIncludeSymbols = true)
    : (isIncludeSymbols = false);

  numbersCheckbox.checked
    ? (isIncludeNumbers = true)
    : (isIncludeNumbers = false);

  arrayOfCharacters.push(...charactersObject.chars);
  isIncludeSymbols && arrayOfCharacters.push(...charactersObject.symbols);
  isIncludeNumbers && arrayOfCharacters.push(...charactersObject.numbers);

  let firstPassword = generatePasswordString(
    arrayOfCharacters,
    inputedPasswordLength,
  );
  let secondPassword = generatePasswordString(
    arrayOfCharacters,
    inputedPasswordLength,
  );

  populatePass(passwordScreenOne, firstPassword);
  passwordScreenOne.style.cursor = 'pointer';
  passwordScreenOne.setAttribute('title', 'Click to copy');

  populatePass(passwordScreenTwo, secondPassword);
  passwordScreenTwo.style.cursor = 'pointer';
  passwordScreenTwo.setAttribute('title', 'Click to copy');
}

formEl.addEventListener('submit', passwordGenerateSubmit);

// Function to get copy of generated password
function copying() {
  if (!this.textContent) return;
  navigator.clipboard.writeText(this.textContent);
  this.style.opacity = 1;
  this.style.border = '3px solid #10b981';
  setTimeout(() => {
    this.style.opacity = 0.3;
    this.style.border = '3px solid transparent';
  }, 250);
}

screensBoxEl.forEach(e => e.addEventListener('click', copying));
