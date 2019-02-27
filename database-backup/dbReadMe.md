# Instructions

This application relies on JSON-Server for it&#39;s database needs. Due to the ever changing nature of databasing, a blank database has not been included.

You will have to download and setup your own JSON database and server.

### Install JSON Server

`npm install -g json-server`

### Create the Database File

`cd api && touch db.json`

### Add the boilerplate to the db.json file

Go over to boilerplatedb.txt. Copy the entire thing into the db.json file.

_Save it._

### Launching the database server

_Make sure you are in the_ _api_ _directory of your project._

`json-server -p 8088 -w database.json`

For this application to launch correctly, json-server should always be running on port 8088 and the http-server on a different port.