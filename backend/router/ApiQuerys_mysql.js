"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pool = require('../mysql/mysql');

var _require = require('express'),
    Router = _require.Router;

var nodemailer = require('nodemailer');

var register = require('./mails');

var _require2 = require('path'),
    join = _require2.join;

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  // use SSL
  auth: {
    user: 'Pruebasvcointransfer@gmail.com',
    pass: '7878984654'
  }
};
var smtpTransport = nodemailer.createTransport(smtpConfig);
var router = Router();
router.get('/',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(rq, rs) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            rs.json({
              status: 'server is running'
            });

          case 1:
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
router.post('/loginUser',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(rq, rs) {
    var _rq$body, correo, password, success;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _rq$body = rq.body, correo = _rq$body.correo, password = _rq$body.password;
            _context2.prev = 1;
            _context2.next = 4;
            return pool.query('select * from usuarios where correo = ?', [correo]);

          case 4:
            success = _context2.sent;

            if (!(success[0].password !== password)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", rs.json('contraseña incorrecta'));

          case 9:
            if (success[0].userStatus === 'no confirmado') {
              rs.json('usuario no confirmado');
            } else {
              rs.json(success[0]);
            }

          case 10:
            return _context2.abrupt("return");

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](1);
            rs.json('fail');

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 13]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //paises

router.get('/paises',
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(rq, rs) {
    var pedido;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return pool.query('select * from paises  where id != 2');

          case 3:
            pedido = _context3.sent;
            rs.json(pedido);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            rs.json('error');

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //pedidos generales

router.get('/pedidosg',
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(rq, rs) {
    var rsPaises;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return pool.query('select * from pedidos limit 10');

          case 3:
            rsPaises = _context4.sent;
            rs.json(rsPaises);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //pedido unico

router.post('/pedido',
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(rq, rs) {
    var correo, rsPaises;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            correo = rq.body.correo;
            _context5.prev = 1;
            _context5.next = 4;
            return pool.query('select * from pedidos where correoRemitente = ?', [correo]);

          case 4:
            rsPaises = _context5.sent;
            rs.json(rsPaises);
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); //borrar pedido

router.post('/delete',
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(rq, rs) {
    var id, rsPaises;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = rq.body.id;
            _context6.prev = 1;
            _context6.next = 4;
            return pool.query('delete from pedidos where id = ?', [id]);

          case 4:
            rsPaises = _context6.sent;
            rs.json('borrado exitoso');
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);
            console.log(_context6.t0);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 8]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()); //registe user

router.post('/registerUser',
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(rq, rs) {
    var _rq$body2, nombre, apellido, correo, password, fechaIncripcion, userPaisOrigen, dni, newUser, mailOptions, regi;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _rq$body2 = rq.body, nombre = _rq$body2.nombre, apellido = _rq$body2.apellido, correo = _rq$body2.correo, password = _rq$body2.password, fechaIncripcion = _rq$body2.fechaIncripcion, userPaisOrigen = _rq$body2.userPaisOrigen, dni = _rq$body2.dni;
            newUser = {
              nombre: nombre,
              apellido: apellido,
              correo: correo,
              password: password,
              fechaIncripcion: fechaIncripcion,
              token: Date.now(),
              userPaisOrigen: userPaisOrigen,
              userPaisActual: '',
              dni: dni
            };
            mailOptions = {
              from: 'Pruebasvcointransfer@gmail.com',
              to: "".concat(correo),
              subject: 'Corfirmar registro',
              html: "\n        <div style=\"\n           background-color: white;\n           width: 80%;\n           height: 250px;\n           position: relative;\n           margin: 0 auto;\n           text-align: center;\n           border: 2px solid #eaeaea;\n           border-radius: 15px;\n           overflow: hidden\n           \">\n                <h1 style=\"\n            font-size:30px;\n            text-align: center;\n            font-weight: bold;\n            text-transform: uppercase;\n            font-family: sans-serif;\n            color: white;\n            background-color: rgb(16, 108, 160);\n            padding: 15px 0;\n            margin-top: -1px;\n            line-height: 2;\n            \">\xA1Bienvenido!</h1>\n                <p style=\"\n               color: rgb(122,122,122);\n               text-align: left;\n               font-size: 16px;\n               font-family: sans-serif;\n               padding: 0 20px;\n               margin-bottom: 50px;\n               \">\n                    Para contuniar con el registro de tu cuenta en VcoinTransfer verifica este correo usando el boton <strong style=\"\n                color: rgb(16, 108, 160);\n                font-family: sans-serif;\n                font-size: 14px;\n                \"> AZUL </strong>de alli abajo\n                </p>\n                <a style=\"\n                background-color: rgb(16, 108, 160);\n              \n                height: 45px;\n                width: 100px;\n                color: white;\n                text-decoration: none;\n                font-weight: bold;\n                font-family: sans-serif;\n                text-transform: uppercase;\n                padding: 10px 25px; \n                border-radius: 7px;\n                        \" href=\"https://backendvcoin.herokuapp.com/confirm/".concat(newUser.token, "/").concat(correo, "/confirmado\">Verificar cuenta</a>\n            </div>\n        ")
            };
            _context7.prev = 3;
            _context7.next = 6;
            return pool.query('insert into usuarios set ?', [newUser]);

          case 6:
            regi = _context7.sent;
            rs.send('ok');
            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
              } else {
                console.log('ok');
              }
            });
            _context7.next = 15;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](3);
            rs.json(_context7.t0);
            console.log(_context7.t0);

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[3, 11]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}()); //confirm new user

router.get('/confirm/:token?/:correo?/:status?',
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(rq, rs) {
    var _rq$params, correo, status;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _rq$params = rq.params, correo = _rq$params.correo, status = _rq$params.status;
            _context8.prev = 1;
            _context8.next = 4;
            return pool.query('update usuarios set ? where correo =?', [{
              userStatus: status
            }, correo]);

          case 4:
            rs.redirect('http://vcointransfer.erickoficial69.now.sh');
            _context8.next = 10;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](1);
            console.log(_context8.t0);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 7]]);
  }));

  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}()); //mail verify

router.post('/mailVerify',
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee9(rq, rs) {
    var correo, success;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            correo = rq.body.correo;
            _context9.prev = 1;
            _context9.next = 4;
            return pool.query('select * from usuarios where correo = ?', correo);

          case 4:
            success = _context9.sent;
            success[0] === undefined ? rs.json('si') : rs.json('no');
            _context9.next = 11;
            break;

          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](1);
            return _context9.abrupt("return", rs.json('error'));

          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 8]]);
  }));

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}()); //add bankAcount

router.post('/newBankAcount',
/*#__PURE__*/
function () {
  var _ref10 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee10(rq, rs) {
    var _rq$body3, paisBanco, banco, numeroCuenta, tipoCuenta, idUsuario, titular, dniTitular, nacional, datos;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _rq$body3 = rq.body, paisBanco = _rq$body3.paisBanco, banco = _rq$body3.banco, numeroCuenta = _rq$body3.numeroCuenta, tipoCuenta = _rq$body3.tipoCuenta, idUsuario = _rq$body3.idUsuario, titular = _rq$body3.titular, dniTitular = _rq$body3.dniTitular, nacional = _rq$body3.nacional;
            datos = {
              paisBanco: paisBanco,
              banco: banco,
              numeroCuenta: numeroCuenta,
              tipoCuenta: tipoCuenta,
              idUsuario: idUsuario,
              titular: titular,
              dniTitular: dniTitular,
              nacional: nacional
            };
            _context10.prev = 2;
            _context10.next = 5;
            return pool.query('insert into cuentasbancarias set ?', [datos]);

          case 5:
            rs.json({
              status: 'ok'
            });
            return _context10.abrupt("return");

          case 9:
            _context10.prev = 9;
            _context10.t0 = _context10["catch"](2);
            rs.json(_context10.t0);

          case 12:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[2, 9]]);
  }));

  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}()); // get bank unique

router.get('/bankAcounts/:usuario',
/*#__PURE__*/
function () {
  var _ref11 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee11(rq, rs) {
    var idUsuario, success;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            idUsuario = rq.params.usuario;
            console.log(idUsuario);
            _context11.prev = 2;
            _context11.next = 5;
            return pool.query('select * from cuentasbancarias where idUsuario = ?', idUsuario);

          case 5:
            success = _context11.sent;
            return _context11.abrupt("return", rs.json(success));

          case 9:
            _context11.prev = 9;
            _context11.t0 = _context11["catch"](2);
            rs.json(_context11.t0);

          case 12:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[2, 9]]);
  }));

  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}()); //borrar banco

router.get('/deletebank/:id?',
/*#__PURE__*/
function () {
  var _ref12 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee12(rq, rs) {
    var id;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            id = rq.params.id;
            console.log(rq.params);
            _context12.prev = 2;
            _context12.next = 5;
            return pool.query('delete from cuentasbancarias where id = ?', [id]);

          case 5:
            rs.json('borrado exitoso');
            _context12.next = 11;
            break;

          case 8:
            _context12.prev = 8;
            _context12.t0 = _context12["catch"](2);
            console.log(_context12.t0);

          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[2, 8]]);
  }));

  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}()); // get img Paises

router.get('/imgpaises',
/*#__PURE__*/
function () {
  var _ref13 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee13(rq, rs) {
    var img;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return pool.query('select * from imgpaises');

          case 3:
            img = _context13.sent;
            rs.json(img);
            _context13.next = 11;
            break;

          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);
            console.log(_context13.t0);
            rs.json('error');

          case 11:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 7]]);
  }));

  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}()); // get dataPais

router.get('/datapais/:name?',
/*#__PURE__*/
function () {
  var _ref14 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee14(rq, rs) {
    var name, img;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            name = rq.params.name;
            _context14.prev = 1;
            _context14.next = 4;
            return pool.query('select * from imgpaises where nombre =?', name);

          case 4:
            img = _context14.sent;
            console.log(img[0]);
            rs.json(img);
            _context14.next = 13;
            break;

          case 9:
            _context14.prev = 9;
            _context14.t0 = _context14["catch"](1);
            console.log(_context14.t0);
            rs.json('error');

          case 13:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[1, 9]]);
  }));

  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
router.get('/test',
/*#__PURE__*/
function () {
  var _ref15 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee15(rq, rs) {
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            rs.sendFile(join(__dirname, './test.js'));
            console.log(__dirname, './test.js');

          case 2:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15);
  }));

  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
module.exports = router;