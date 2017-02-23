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
          });
});

app.post('/api/grudges', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { name, offense } = req.body;
  const grudge = { name, offense, forgiven: false, created_at: new Date };

  database('grudges')
          .insert(grudge)
          .returning(['id', 'name', 'forgiven'])
          .then((payload) => {
            console.log(payload)
            res.status(200).json(payload[0])
          })
          .catch((error) => {
            console.log(error)
          });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port 3000`)
})

module.exports = app;
