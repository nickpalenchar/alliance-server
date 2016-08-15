'use strict';

const ADJ = [
  "immense",
  "epic",
  "notorious",
  "evil",
  "vast",
  "noble",
  "holy",
  "magestic",
  "awesome",
  "ye-old"
];
const NOUN = [
  "badlands",
  "road",
  "sword",
  "wall",
  "king's-road",
  "camelot",
  "resistance",
  "knights",
  "festival",
  "ball"
];

function generateName(rooms) {
  var result = ADJ[Math.floor(Math.random() * ADJ.length)] + "-"
          + NOUN[Math.floor(Math.random() * NOUN.length)];

  let first = true;
  while(rooms.some(room => room.name === result)) {
    if(first) {
      result += '-';
      first = !first;
    }
    result += Math.floor(Math.random() * 10);
  }
  console.log("the resulttt ", result);
  return result;
}

module.exports = generateName;