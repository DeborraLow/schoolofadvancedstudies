var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', '/public/lectures.html'));
});

router.get('/post-truth', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', '/public/post_truth.html'));
});

module.exports = router;
