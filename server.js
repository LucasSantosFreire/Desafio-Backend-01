const http = require('http');
const express = require('express');
var cors = require('cors');
const exploradores = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/explorers',exploradores);

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);