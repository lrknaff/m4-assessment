const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
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

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/:id', express.static(path.join(__dirname, 'public/unique')));

app.get('/api/grudges', (req, res) => {
  database('grudges').select().table('grudges')
          .then((grudges) => {
            res.status(200).json(grudges)
          })
          .catch((error) => {
            console.error('error', error)
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
            res.status(200).json(payload[0])
          })
          .catch((error) => {
            console.error('error', error)
          });
});

app.patch('/api/grudges', (req, res) => {
  const { id, forgiven } = req.body;

  database('grudges').where('id', id).first()
          .update({ forgiven: forgiven })
          .returning([ 'forgiven' ])
          .then(function(payload) {
            console.log(payload)
            response.status(200).json(payload[0])
          })
          .catch(function(error) {
            console.error('error', error)
          });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port 3000`)
})

module.exports = app;
