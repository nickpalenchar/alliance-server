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
];
const NOUN = [
  "badlands",
  "road",
  "sword",
  "wall",
  "king's road"
];

function generateName(n) {
  n = n || "";
  return ADJ[Math.floor(Math.random() * ADJ.length)] + "-"
          + NOUN[Math.floor(Math.random() * NOUN.length)] + "-"
          + n;
}

module.exports = generateName;