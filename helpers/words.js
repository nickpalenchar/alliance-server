'use strict';

const ADJ = [
  "immense",
  // "epic",
  // "notorious",
  // "evil",
  // "vast",
  // "noble",
  // "holy",
  // "magestic",
  // "awesome",
  // "ye-old"
];
const NOUN = [
  "badlands",
  // "road",
  // "sword",
  // "wall",
  // "king's-road",
  // "camelot",
  // "resistance",
  // "knights",
  // "festival",
  // "ball"
];

function generateName(n) {
  console.log("N BEFORE", n);
  n = n === 0 ? "-" + n : "";
  console.log("N AFTER", n);
  var result = ADJ[Math.floor(Math.random() * ADJ.length)] + "-"
          + NOUN[Math.floor(Math.random() * NOUN.length)]
          + n;
  console.log("the resulttt ", result);
  return result;
}

module.exports = generateName;