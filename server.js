const compression = require('compression');
const cors = require('cors');
const express = require('express');

require('newrelic');

const app = express();
app.use(compression());
app.use(cors({ origin: '*' }));
app.use(express.static('public'));

const listener = app.listen(process.env.PORT, () => {
  /* eslint-disable no-console */
  console.info(`Node Version: ${process.version}`);
  console.log(`Pipefy app Server listening on port ${listener.address().port}`);
  /* eslint-enable no-console */
});
