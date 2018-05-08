const router = require('express').Router()

const PIPEFY_CLIENT_PROD_URL = 'https://d1ukdhoxof1oxs.cloudfront.net/pipefy-app.js'

router.get('/', (req, res) => {
  res.render('../public/views/index', {
    pipefyClientUrl: process.env.PIPEFY_CLIENT_URL || PIPEFY_CLIENT_PROD_URL
  });
});

router.get('/calendar', (req, res) => {
  res.render('../public/views/calendar', {
    pipefyClientUrl: process.env.PIPEFY_CLIENT_URL || PIPEFY_CLIENT_PROD_URL
  });
});

module.exports = router;
