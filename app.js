var express = require('express.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var jing = require('./routes/jing'); //receiver
var jang = require('./routes/jang'); //emitter

var messages = [];
var messagesListLength = 10;
var currConnectedCnt = 0;

var app = express().http().io();
app.listen(7076);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', jing);
app.use('/jing', jing);
app.use('/jang', jang);
app.use(express.static('public'));

app.set('messages', messages);
app.set('messagesListLength', messagesListLength);

app.io.route('connect', function (req) {
    console.log('connect');
    currConnectedCnt++;
    app.set('currConnectedCnt', currConnectedCnt);
    req.io.broadcast('connected', {'message': currConnectedCnt});

    app.io.route('disconnect', function (req) {
        console.log('disconnect');
        if (currConnectedCnt) {
            currConnectedCnt--;
        }
        app.set('currConnectedCnt', currConnectedCnt);
        req.io.broadcast('connected', {'message': currConnectedCnt});
    });
});

app.io.route('msgsend', function (req) {
    messages.push(req.data);
    messages = messages.slice(-messagesListLength);
    app.set('messages', messages);
    req.io.broadcast('msgget', {
        message: req.data
    });
});

app.io.route('gongsend', function (req) {
    req.io.broadcast('gongget', {});
});

app.io.route('startDemoSend', function (req) {
    messages.push(req.data);
    messages = messages.slice(-messagesListLength);
    app.set('messages', messages);
    req.io.broadcast('startDemoGet', {
        message: req.data
    });
});

app.io.route('endDemoSend', function (req) {
    messages.push(req.data);
    messages = messages.slice(-messagesListLength);
    app.set('messages', messages);
    req.io.broadcast('endDemoGet', {
        message: req.data
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
