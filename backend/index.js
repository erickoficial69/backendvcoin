"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//import express server with http module
var cors = require('cors');

var express = require('express');

var _require = require('path'),
    join = _require.join;

var morgan = require('morgan');

var app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.set('port', process.env.PORT || 4000);

var io = require('socket.io');

var pushEvents = require('./router/push-events');

var apiQuerys = require('./router/ApiQuerys_mysql'); //router


app.use(pushEvents);
app.use(apiQuerys); //static files 

app.use(express.static(join(__dirname, './build/')));

var http = require('http').createServer(app); //save socket conection


var ws = io(http); //const sockets functions

var socket = require('./sockets/index_mysql');

var os = require('os').networkInterfaces();

var ip = function ip() {
  for (var _i = 0, _Object$keys = Object.keys(os); _i < _Object$keys.length; _i++) {
    var net = _Object$keys[_i];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = os[net][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;
        var family = key.family,
            internal = key.internal,
            address = key.address;

        if (family === 'IPv4' & !internal) {
          return address;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return http.listen(app.get('port'), '0.0.0.0');

        case 2:
          console.log(ip(), 'puerto', app.get('port'));
          _context.next = 5;
          return socket(ws);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();