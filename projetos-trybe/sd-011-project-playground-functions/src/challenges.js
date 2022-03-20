// Desafio 1
function compareTrue(a, b) {
  return a && b;
}
let desafio1 = compareTrue(true, true);
console.log(desafio1);

// Desafio 2
function calcArea(base, height) {
  let step1 = base * height;
  let step2 = step1 / 2;
  return step2;
}
let desafio2 = calcArea(5, 10);
console.log(desafio2);

// Desafio 3
function splitSentence(string) {
  return string.split(' ');
}
let desafio3 = splitSentence('go trybe');
console.log(desafio3);

// Desafio 4
function concatName(listaDeNomes) {
  for (let i of listaDeNomes) {
    return listaDeNomes[listaDeNomes.length - 1] + ', ' + listaDeNomes[0];
  }
}
let desafio4 = concatName(['Lucas', 'Cassiano', 'Ferraz', 'Paolillo']);
console.log(desafio4);

// Desafio 5
function footballPoints(wins, ties) {
  let points = 0;
  if (wins > 0 && ties > 0) {
    points = wins * 3 + ties;
  }
  return points;
}
let desafio5 = footballPoints(0, 0);
console.log(desafio5);

// Desafio 6
function highestNumber(listOfNumbers) {
  let highNumber = 0;
  for (let i = 0; i < listOfNumbers.length; i += 1) {
    if (listOfNumbers[i] > highNumber) {
      highNumber = listOfNumbers[i];
    }
  }
  return highNumber;
}

function highestCount(listOfNumbers) {
  let highest = highestNumber(listOfNumbers);
  let count = 0;
  for (let i = 0; i < listOfNumbers.length; i += 1) {
    if (listOfNumbers[i] === highest) {
      count += 1;
    }
  }
  return count;
}
let teste6 = highestCount([0, 4, 4, 4, 9, 2, 1]);
console.log(teste6);

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let resultado = '';
  let distanceCat1 = Math.abs(cat1 - mouse);
  let distanceCat2 = Math.abs(cat2 - mouse);
  if (distanceCat1 < distanceCat2) {
    resultado += 'cat1';
  } else if (distanceCat2 < distanceCat1) {
    resultado += 'cat2';
  } else {
    resultado += 'os gatos trombam e o rato foge';
  }
  return resultado;
}
let desafio7 = catAndMouse(0, 6, 6);
console.log(desafio7);

// Desafio 8
function divideNumbers(arrayOfNumbers) {
  let total = '';
  for (let index = 0; index < arrayOfNumbers.length; index += 1) {
    if (arrayOfNumbers[index] % 15 === 0) {
      total += 'fizzBuzz';
    } else if (arrayOfNumbers[index] % 5 === 0) {
      total += 'buzz';
    } else if (arrayOfNumbers[index] % 3 === 0) {
      total += 'fizz';
    } else {
      total += 'bug!';
    }
    total += ' ';
  }
  return total.split(' ');
}
function fizzBuzz(arrayOfNumbers) {
  let resultado = divideNumbers(arrayOfNumbers);
  return resultado.filter((value) => (value !== ''));
}
console.log(fizzBuzz([9, 25]));

// Desafio 9
function soletrando(param1) {
  let soletrandol = param1.split('');
  return soletrandol;
}
function confereSoletrando(param1) {
  let string = '';
  let confere = soletrando(param1);
  for (let index = 0; index < confere.length; index += 1) {
    if (param1[index] === 'a') {
      string += 1;
    } else if (param1[index] === 'e') {
      string += 2;
    } else if (param1[index] === 'i') {
      string += 3;
    } else if (param1[index] === 'o') {
      string += 4;
    } else if (param1[index] === 'u') {
      string += 5;
    } else {
      string += param1[index];
    }
  }
  return string;
}

function encode(param1) {
  return confereSoletrando(param1);
}
console.log(encode('hi there!'));

function decode(param1) {
  let newString = '';
  for (let index = 0; index < param1.length; index += 1) {
    if (param1[index] === '1') {
      newString += 'a';
    } else if (param1[index] === '2') {
      newString += 'e';
    } else if (param1[index] === '3') {
      newString += 'i';
    } else if (param1[index] === '4') {
      newString += 'o';
    } else if (param1[index] === '5') {
      newString += 'u';
    } else {
      newString += param1[index];
    }
  }
  return newString;
}

console.log(decode('h3 th2r2!'));

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
