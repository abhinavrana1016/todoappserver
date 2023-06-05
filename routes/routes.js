const express = require('express');
const router = express.Router({ caseSensitive: true });
//const controllers = require('./../controllers/controllers');
// const verifyJWT =
//   require('../utils/jwt-authentication.util').userAuthentication;
// const permit = require('../utils/permit.util');
router.use(
    '/users',
    require('./users.route')
  );
  module.exports = router;