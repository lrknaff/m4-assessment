const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const connect        = require('connect');
const sassMiddleware = require('node-sass-middleware');
const app            = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const environment   = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database      = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Grudge Box';

app.use(
     sassMiddleware({
         src: __dirname + '/lib/styles',
         dest: __dirname + '/public/styles',
         prefix:  '/styles',
         debug: true
     })
 );

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/grudges', (req, res) => {
  database('grudges').select().table('grudges')
          .then((grudges) => {
            res.status(200).json(grudges)
          })
          .catch((error) => {
            console.error(error)
          })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port 3000`)
})

module.exports = app;
