const express           = require('express');
const bodyParser        = require('body-parser');
const expressValidator  = require('express-validator');
const cors              = require('cors');
const consign           = require('consign');

const PORT				= 4000;
const HOST				= '0.0.0.0';

let app                 = express();

app.use(cors());
app.use(bodyParser.urlencoded({ 
	extended:   false, 
	limit:      '50mb'
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(expressValidator());

app.use(express.static('../serverClient'));

consign().include('routes').include('utils').into(app);

app.listen( PORT, HOST, () => {
	console.log('Server ON!');
});