var express = require('express');
var auth = require('../middlewares/UserAuth')
var router = express.Router();

/* GET hotel listing. Require user auth */
router.get('/',auth ,  function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
