'use strict';

const soundFon = new Audio("mp3/chipAndDeil.mp3");


// выдать вопрос по сложению до 10в зависимости от уровня
// и варианты ответов из четырех, один тлько верный
// если strict=true - то втором слагаемым долно быть определеннное число
function randomQuection(level = 1, strict = false) {
   var
      level = parseInt(level),
      number1 = parseInt(Math.random() * 10),
      number2 = (!strict) ? parseInt(Math.random() * (level + 1)) : level,
      sum = number1 + number2,
      randomArea = parseInt(Math.random() * 4),
      randomCount = 0,
      boxNumbers = [];

   console.log(" n1, n2, sum = ", number1, number2, sum);

   while (boxNumbers.length < 3) {
      randomCount = parseInt(Math.random() * (sum+5));
      if (randomCount != sum && boxNumbers.indexOf(randomCount) == -1)boxNumbers.push(randomCount)
   }
   boxNumbers.splice(randomArea, 0, sum);

   return {
      'number1': number1,
      'number2': number2,
      'sum': sum,
      'boxNumers': boxNumbers
   };

}


