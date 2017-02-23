const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Grudge Box';

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port 3000`)
})

module.exports = app;
