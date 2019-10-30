"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('express'),
    Router = _require.Router;

var webpush = require('web-push');

var pushRoutes = Router();
var pushKeys = {
  publicKey: 'BMHh0lPn4yFYftgHa_SsjPm5IzQK0aTotM1cMEP-6Q9dL3i8SJJKldguHGNCY-IT2wGs-oZCPCBTDglQuI9JK58',
  privateKey: 'veU435HQFdQiwhq6dCtMLCBts2Sy4qk2Aas67tsVVJg'
};
webpush.setVapidDetails('mailto:erickoficial69@gmail.com', pushKeys.publicKey, pushKeys.privateKey);
var not = {
  titulo: 'push of my server'
};
pushRoutes.post('/savepush',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(rq, rs) {
    var rsP;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            rsP = rq.body;
            console.log(rsP);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
pushRoutes.get('/sendpush',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(rq, rs) {
    var rsP, message;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            rsP = rq.body;
            console.log(rsP);
            message = JSON.stringify(rsP);
            webpush.sendNotification(rsP, message).catch(function (e) {
              return console.log(e);
            });
            rs.json({
              titulo: 'received'
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = pushRoutes;