

/// URL: /api/rooms/findOrCreate/:id
// gets all rooms of the same id (from ip address) for user to join. Or creates the first one.
module.exports.findOrCreate = function(req, res){
  console.log("hellooooo youve hit this route!!!");
  res.status(200).send();
}