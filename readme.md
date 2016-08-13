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

