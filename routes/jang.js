var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    var messages = req.app.get('messages') || [];
    console.log(messages);
    res.render('jang', {
        title: 'Emiter - Jing Jang'
        , 'currConnectedCnt': (req.app.get('currConnectedCnt') || 0)
        , 'lastMessage': (messages.length ? messages[messages.length - 1] : '')
        , 'teamList': [
            {
                name: "team1",
                selected: false
            }
            ,{
                name: "team2",
                selected: true
            }
            ,{
                name: "team3",
                selected: false
            }
        ]
    });
});

module.exports = router;
