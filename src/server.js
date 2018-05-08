const compression = require('compression');
const cors = require('cors');
const express = require('express');
const exphbs  = require('express-handlebars');
const routes = require('./routes');
const app = express();
const hbs = exphbs.create();

require('dotenv').config();
require('newrelic');

app.use(compression());
app.use(cors({ origin: '*' }));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);
app.use(express.static('public'));

const listener = app.listen(process.env.PORT, () => {
  /* eslint-disable no-console */
  console.info(`Node Version: ${process.version}`);
  console.log(`Pipefy app Server listening on port ${listener.address().port}`);
  /* eslint-enable no-console */
});
