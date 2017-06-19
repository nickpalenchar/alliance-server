# Alliance-server
_This server does great things for [www.github.com/nickpalenchar/truealliance](truealliance)_

## General API

### GET api/rooms/find/:id

Returns all rooms of the `:id`. **And** if there are no rooms of the ID, automatically creates one and returns it (as an array of the single document).

**Returns:** \<Array\>Documents found, or newly created document.
**Status:** 304 or 201, respectively.


## Config

### Cross-Origin-Requests
Set cross origins on `env/` and import into `server.js` to set headers globally.

NEXT THING:
- socket emmission when a new player is added to a room.

## guests (things to do)
Before a player is a player, they are a guest, when they join a game, they are a player.

No more than one guest with the same name can exist.

But multiple players with the same name can exist if they are in different rooms.

When guests join a room and it begins, they are removed from the guest room, automatically freeing up namespace for new guests.

If a guest doesnt join a room in 30 minutes, the next poll to the db will remove them. (do this in the shcema hook)

Conclusion: no workers or cron jobs needed to keep the database neat!
