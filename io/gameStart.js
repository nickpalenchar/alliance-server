var _ = require('lodash');


module.exports = function (options, players) {
  var info = {
    specialCharacters: options.specialCharacters || false,
    characters: [
      {alliance: "good", character: "", _id: null, player: null},
      {alliance: "good", character: "", _id: null, player: null},
      {alliance: "good", character: "", _id: null, player: null},
      {alliance: "evil", character: "", _id: null, player: null},
      {alliance: "evil", character: "", _id: null, player: null},
      {alliance: "good", character: "", _id: null, player: null},
      {alliance: "evil", character: "", _id: null, player: null},
      {alliance: "good", character: "", _id: null, player: null},
      {alliance: "good", character: "", _id: null, player: null},
      {alliance: "evil", character: "", _id: null, player: null},
    ]
  };

  for(var k in options) {
    if(!options.hasOwnProperty(k)) continue;
    if(k === "maxPlayers" || k === "specialPlayers") continue;

    if(options[k]) assignCharacter(info.characters, k);
  }

  info.characters = _.shuffle(info.characters.slice(0,players.length)).map((card, i) => Object.assign({},card, {_id: players[i]._id, name: players[i].name}));
  return info;

};

function assignCharacter(charactersArr, character) {
  console.log("assigning ", character);
  var alliance = (character === "merlin" || character === "percival") ? "good" : "evil";
  for(var i = 0; i < charactersArr.length; i++){
    var card = charactersArr[i];
    if(card.alliance === alliance && !card.character) return card.character = character;
  }
}