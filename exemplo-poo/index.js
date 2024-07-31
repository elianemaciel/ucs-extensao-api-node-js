"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_1 = require("./cliente");
const conta_1 = require("./conta");
let clienteVitor = new cliente_1.Cliente('Victor', 'Santos', '123.456.789-00');
let conta = new conta_1.Conta(1, clienteVitor, 100, 1000);
conta.saca(50);
conta.deposita(100);
conta.extrato();
