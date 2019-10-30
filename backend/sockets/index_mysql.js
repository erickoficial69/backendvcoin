"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pool = require('../mysql/mysql');

var nodemailer = require('nodemailer');

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

module.exports = function (ws) {
  ws.on('connection', function (ws) {
    ws.on('pedidos', function (data) {
      pedidos_clientes(data);
    });
    ws.on('pedidosGenerales', function (dataLimit) {
      pedidosGenerales(dataLimit);
    });
    dolarPaises();
    dolarVzla();
    ws.on('newPedido', function (pedido) {
      newOrder(pedido);
    });
    ws.on('newPais', function (data) {
      newPais(data);
    });
    ws.on('updatePais', function (data) {
      updatePais(data);
    });
    ws.on('updatePedidoAdm', function (data) {
      updatePedidoAdm(data);
    });
    ws.on('deletePais', function (data) {
      deletePais(data);
    });
    ws.on('updatePedido', function (pedido) {
      updatePedido(pedido);
    });
  });

  var dolarPaises =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var rsPaises;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return pool.query('select * from paises where id != 2');

            case 3:
              rsPaises = _context.sent;
              ws.emit('paises', rsPaises);
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function dolarPaises() {
      return _ref.apply(this, arguments);
    };
  }();

  var dolarVzla =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _dolarVzla;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return pool.query('select * from paises where id = 2');

            case 3:
              _dolarVzla = _context2.sent;
              ws.emit('dolarVzla', _dolarVzla[0]);
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              ws.emit('dolarVzla', [{
                nombre: 'hubo un error',
                codArea: 'error',
                ico: 'error'
              }]);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    return function dolarVzla() {
      return _ref2.apply(this, arguments);
    };
  }();

  var pedidos_clientes =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(data) {
      var limit, rsPedidos, rows;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return data.limit;

            case 2:
              if (!_context3.sent) {
                _context3.next = 6;
                break;
              }

              _context3.t0 = data.limit;
              _context3.next = 7;
              break;

            case 6:
              _context3.t0 = 20;

            case 7:
              limit = _context3.t0;
              _context3.prev = 8;
              _context3.next = 11;
              return pool.query("select pedidos.*, usuarios.*, cuentasbancarias.* from pedidos inner join usuarios on usuarios.idUsuario = pedidos.idUsuario inner join cuentasbancarias on cuentasbancarias.id = pedidos.idBanco where pedidos.idUsuario = ".concat(data.idUsuario, " order by idPedido desc limit ").concat(limit));

            case 11:
              rsPedidos = _context3.sent;
              rows = rsPedidos.map(function (items, i) {
                return i;
              });
              ws.emit(data.idUsuario, rsPedidos);
              _context3.next = 20;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t1 = _context3["catch"](8);
              console.log(_context3.t1);
              ws.emit(data.id, [{
                nombre: 'hubo un error',
                codArea: _context3.t1,
                ico: 'error'
              }]);

            case 20:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[8, 16]]);
    }));

    return function pedidos_clientes(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var pedidosGenerales =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(dataLimit) {
      var limit, pedido;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return dataLimit;

            case 2:
              if (!_context4.sent) {
                _context4.next = 6;
                break;
              }

              _context4.t0 = dataLimit;
              _context4.next = 7;
              break;

            case 6:
              _context4.t0 = 10;

            case 7:
              limit = _context4.t0;
              _context4.prev = 8;
              _context4.next = 11;
              return pool.query("select pedidos.*, usuarios.*, cuentasbancarias.* from pedidos inner join usuarios on usuarios.idUsuario = pedidos.idUsuario inner join cuentasbancarias on cuentasbancarias.id = pedidos.idBanco order by idPedido desc limit ".concat(limit));

            case 11:
              pedido = _context4.sent;
              ws.emit('pedidosGenerales', pedido);
              _context4.next = 18;
              break;

            case 15:
              _context4.prev = 15;
              _context4.t1 = _context4["catch"](8);
              ws.emit('pedidosGenerales', 'error');

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[8, 15]]);
    }));

    return function pedidosGenerales(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

  var newOrder =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(pedido) {
      var datosPedido, mailCliente, mailVcoin;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              datosPedido = {
                montoDeposito: pedido.montoDeposito,
                monedaDeposito: pedido.monedaDeposito,
                referenciaDeposito: pedido.referenciaDeposito,
                montoRetiro: pedido.montoRetiro,
                monedaRetiro: pedido.monedaRetiro,
                tazaCambio: pedido.tazaCambio,
                idBanco: pedido.idBanco,
                idUsuario: pedido.idUsuario,
                fechaPedido: pedido.fechaPedido,
                fechaCompletada: pedido.fechaCompletada
              };
              _context5.prev = 1;
              mailCliente = {
                from: 'Pruebasvcointransfer@gmail.com',
                to: "".concat(pedido.correoUsuario),
                subject: 'Nuevo pedido',
                html: "\n                    <div>\n                        <h1>Saludos ".concat(pedido.nombreUsuario, "</h1>\n                        <p>Tu solicitud fue enviada a red Vcoin Transfer</p>\n                        <strong>Deposito:</strong>").concat(pedido.montoDeposito, " ").concat(pedido.monedaRetiro, "\n                        <strong>Retiro:</strong>").concat(pedido.montoRetiro, " ").concat(pedido.monedaDeposito, "\n                    </div>\n                ")
              };
              mailVcoin = {
                from: 'Pruebasvcointransfer@gmail.com',
                to: "Pruebasvcointransfer@gmail.com",
                subject: 'Nuevo encargo',
                html: "\n                    <div>\n                        <h1>Saludos, tienes un nuevo encargo</h1>\n                        <p>Cliente: ".concat(pedido.nombreUsuario, " ").concat(pedido.correoUsuario, "</p>\n                        <strong>Deposito:</strong>").concat(pedido.montoDeposito, " ").concat(pedido.monedaRetiro, "\n                        <strong>Retiro:</strong>").concat(pedido.montoRetiro, " ").concat(pedido.monedaDeposito, "\n                    </div>\n                ")
              };
              _context5.next = 6;
              return pool.query('insert into pedidos set ?', [datosPedido]);

            case 6:
              pedidos_clientes(pedido);
              ws.emit('newPedido', 'Tienes un nuevo encargo');
              pedidosGenerales();
              smtpTransport.sendMail(mailCliente, function (error, response) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('ok');
                }
              });
              smtpTransport.sendMail(mailVcoin, function (error, response) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('ok');
                }
              });
              _context5.next = 17;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](1);
              console.log(_context5.t0);
              ws.emit('newPedido', 'hubo un error');

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 13]]);
    }));

    return function newOrder(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var updatePedido =
  /*#__PURE__*/
  function () {
    var _ref6 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(data) {
      var datos, mensaje, mailCliente, _datos, _mensaje, _datos2, _mensaje2;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(data.referenciaDeposito === undefined && data.referenciaRetiro === undefined)) {
                _context6.next = 16;
                break;
              }

              datos = {
                idOperador: data.idOperador,
                nombreOperador: data.nombreOperador,
                correoOperador: data.correoOperador,
                status: data.status
              };
              mensaje = {
                titulo: "".concat(data.nombreUsuario, " Pedido actualizado"),
                body: "Pedido id: ".concat(data.idPedido, " Status actualizado: ").concat(data.status),
                usuario: data.idUsuario
              };
              _context6.prev = 3;
              mailCliente = {
                from: 'Pruebasvcointransfer@gmail.com',
                to: "".concat(data.correoUsuario),
                subject: 'Nuevo data',
                html: "\n                <div>\n                    <h1>Saludos ".concat(data.nombreUsuario, "</h1>\n                    <p>Tu solicitud fue:").concat(data.status, " por: ").concat(data.nombreOperador, "</p>\n                </div>\n            ")
              };
              _context6.next = 7;
              return pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos, data.idPedido]);

            case 7:
              ws.emit('notificacionPedido', mensaje);
              pedidosGenerales();
              pedidos_clientes(data);
              smtpTransport.sendMail(mailCliente, function (error, response) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('ok');
                }
              });
              _context6.next = 16;
              break;

            case 13:
              _context6.prev = 13;
              _context6.t0 = _context6["catch"](3);
              console.log(_context6.t0);

            case 16:
              if (!(data.referenciaDeposito !== undefined)) {
                _context6.next = 33;
                break;
              }

              _datos = {
                referenciaDeposito: data.referenciaDeposito,
                status: data.status
              };
              _mensaje = {
                titulo: "".concat(data.nombreUsuario, " Pedido actualizado"),
                body: "Pedido id: ".concat(data.idPedido, " status: ").concat(data.status),
                usuario: data.idUsuario
              };
              _context6.prev = 19;
              _context6.next = 22;
              return pool.query('UPDATE pedidos SET ? where idPedido = ?', [_datos, data.idPedido]);

            case 22:
              ws.emit('updatePedido', data.status);
              ws.emit('notificacionPedido', _mensaje);
              pedidosGenerales();
              pedidos_clientes(data);
              _context6.next = 32;
              break;

            case 28:
              _context6.prev = 28;
              _context6.t1 = _context6["catch"](19);
              console.log(_context6.t1);
              ws.emit('updatePedido', 'hubo un error');

            case 32:
              return _context6.abrupt("return");

            case 33:
              if (!(data.referenciaRetiro !== undefined)) {
                _context6.next = 48;
                break;
              }

              _datos2 = {
                referenciaDeposito: data.referenciaDeposito,
                status: data.status
              };
              _mensaje2 = {
                titulo: "".concat(data.nombreUsuario, " Pedido actualizado"),
                body: "Pedido id: ".concat(data.idPedido, " status: ").concat(data.status),
                usuario: data.idUsuario
              };
              _context6.prev = 36;
              _context6.next = 39;
              return pool.query('UPDATE pedidos SET ? where idPedido = ?', [_datos2, data.idPedido]);

            case 39:
              ws.emit('notificacionPedido', _mensaje2);
              pedidosGenerales();
              pedidos_clientes(data);
              _context6.next = 48;
              break;

            case 44:
              _context6.prev = 44;
              _context6.t2 = _context6["catch"](36);
              console.log(_context6.t2);
              ws.emit('updatePedido', 'hubo un error');

            case 48:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[3, 13], [19, 28], [36, 44]]);
    }));

    return function updatePedido(_x4) {
      return _ref6.apply(this, arguments);
    };
  }();

  var updatePedidoAdm =
  /*#__PURE__*/
  function () {
    var _ref7 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(data) {
      var datos, mensaje, re;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              console.log(data);

              if (!(data.referenciaRetiro !== undefined)) {
                _context7.next = 18;
                break;
              }

              datos = {
                referenciaRetiro: data.referenciaRetiro,
                status: data.status
              };
              mensaje = {
                titulo: "".concat(data.nombreUsuario, " Pedido actualizado"),
                body: "Pedido id: ".concat(data.idPedido, " status: ").concat(data.status),
                usuario: data.idUsuario
              };
              _context7.prev = 4;
              _context7.next = 7;
              return pool.query('UPDATE pedidos SET ? where idPedido = ?', [datos, data.idPedido]);

            case 7:
              re = _context7.sent;
              ws.emit('updatePedidoAdm', data.status);
              ws.emit('notificacionPedido', mensaje);
              pedidosGenerales();
              pedidos_clientes(data);
              _context7.next = 18;
              break;

            case 14:
              _context7.prev = 14;
              _context7.t0 = _context7["catch"](4);
              console.log(_context7.t0);
              ws.emit('updatePedido', 'hubo un error');

            case 18:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[4, 14]]);
    }));

    return function updatePedidoAdm(_x5) {
      return _ref7.apply(this, arguments);
    };
  }();

  var newPais =
  /*#__PURE__*/
  function () {
    var _ref8 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(data) {
      var mensaje, verifyPais, _mensaje3, _mensaje4, _mensaje5;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              mensaje = {
                titulo: "VcoinTransfer dice:",
                body: "La moneda ya existe",
                usuario: data.idUsuario
              };
              _context8.prev = 1;
              _context8.next = 4;
              return pool.query("select * from paises where nombre = ?", data.nombre);

            case 4:
              verifyPais = _context8.sent;
              console.log(verifyPais);

              if (!(verifyPais[0] === undefined)) {
                _context8.next = 21;
                break;
              }

              _mensaje3 = {
                titulo: "VcoinTransfer dice:",
                body: "Operaciones en ".concat(data.moneda, " agregada"),
                usuario: data.idUsuario
              };
              _context8.prev = 8;
              _context8.next = 11;
              return pool.query("insert into paises set ?", [data]);

            case 11:
              dolarPaises();
              ws.emit('notificacionNoticias', _mensaje3);
              _context8.next = 19;
              break;

            case 15:
              _context8.prev = 15;
              _context8.t0 = _context8["catch"](8);
              _mensaje4 = {
                titulo: "VcoinTransfer dice:",
                body: "Hubo un error agregando la moneda",
                usuario: data.idUsuario
              };
              ws.emit('notificacionNoticias', _mensaje4);

            case 19:
              _context8.next = 23;
              break;

            case 21:
              _mensaje5 = {
                titulo: "VcoinTransfer dice:",
                body: "La moneda ya existe",
                usuario: data.idUsuario
              };
              ws.emit('notificacionNoticias', _mensaje5);

            case 23:
              _context8.next = 28;
              break;

            case 25:
              _context8.prev = 25;
              _context8.t1 = _context8["catch"](1);
              console.log('estoy vacio');

            case 28:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[1, 25], [8, 15]]);
    }));

    return function newPais(_x6) {
      return _ref8.apply(this, arguments);
    };
  }();

  var updatePais =
  /*#__PURE__*/
  function () {
    var _ref9 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(data) {
      var id, tazaCambio, mensaje;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              id = data.id, tazaCambio = data.tazaCambio;
              mensaje = {
                titulo: "VcoinTransfer dice:",
                body: "La taza a Variado",
                usuario: data.idUsuario
              };
              _context9.prev = 2;
              _context9.next = 5;
              return pool.query('UPDATE paises SET ? WHERE id = ?', [{
                tazaCambio: tazaCambio
              }, id]);

            case 5:
              dolarPaises();
              ws.emit('notificacionNoticias', mensaje);
              _context9.next = 12;
              break;

            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](2);
              console.log(_context9.t0);

            case 12:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[2, 9]]);
    }));

    return function updatePais(_x7) {
      return _ref9.apply(this, arguments);
    };
  }();

  var deletePais =
  /*#__PURE__*/
  function () {
    var _ref10 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(data) {
      var mensaje;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              mensaje = {
                titulo: "VcoinTransfer dice:",
                body: "Elemendo id: ".concat(data, " eliminado"),
                usuario: data.idUsuario
              };
              _context10.prev = 1;
              _context10.next = 4;
              return pool.query("delete from paises where id = ".concat(data));

            case 4:
              dolarPaises();
              ws.emit('deletePais', mensaje);
              _context10.next = 11;
              break;

            case 8:
              _context10.prev = 8;
              _context10.t0 = _context10["catch"](1);
              ws.emit('deletePais', data);

            case 11:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[1, 8]]);
    }));

    return function deletePais(_x8) {
      return _ref10.apply(this, arguments);
    };
  }();
};