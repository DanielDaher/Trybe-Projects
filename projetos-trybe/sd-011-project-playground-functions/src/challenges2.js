// Desafio 10
function tech(a, name) {
  a = a.sort();
  let resultado = [];
  for (let index = 0; index < a.length; index += 1) {
    resultado.push({ tech: a[index], name: name });
  }
  return resultado;
}

function techList(a, name) {
  if (a.length !== 5) {
    return 'Vazio!';
  }
  return tech(a, name);
}
console.log(techList(['React', 'CSS', 'JavaScript', 'Node', 'HTML'], 'Daniel'));

// Desafio 11
function generatePhoneNumber() {
  // seu código aqui
}

// Desafio 12
function triangleCheck() {
  // seu código aqui
}

// Desafio 13
function hydrate() {
  // seu código aqui
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
