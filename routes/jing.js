var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('jing', {
        title: 'Receivier - Jing Jang'
        , messages: req.app.get('messages') || []
        , messagesListLength: req.app.get('messagesListLength') || 10
    });
});

module.exports = router;
