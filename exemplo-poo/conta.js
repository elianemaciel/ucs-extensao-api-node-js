"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
const historico_1 = require("./historico");
class Conta {
    // O construtor inicializa as propriedades
    constructor(numero, titular, saldo, limite) {
        this.transactions = [];
        this.numero = numero;
        this.titular = titular;
        this.saldo = saldo;
        this.limite = limite;
        const historico = new historico_1.Historico(new Date(), 'abertura', saldo);
        this.transactions.push(historico);
    }
    getNumero() {
        return this.numero;
    }
    setNumero(numero) {
        this.numero = numero;
    }
    getTitular() {
        return this.titular;
    }
    setTitular(nome) {
        this.titular = nome;
    }
    saca(valor) {
        this.saldo -= valor;
        const historico = new historico_1.Historico(new Date(), 'saque', valor);
        this.transactions.push(historico);
    }
    deposita(valor) {
        this.saldo += valor;
        const historico = new historico_1.Historico(new Date(), 'deposito', valor);
        this.transactions.push(historico);
    }
    extrato() {
        console.log('Extrato da conta: ', this.numero);
        console.log('Titular: ', this.titular.getNome());
        console.log('Saldo Atual: ', this.saldo);
        console.log('Transações: ');
        this.transactions.forEach((transaction) => {
            console.log('Data: ', transaction.getData());
            console.log('Operação: ', transaction.getOperacao());
            console.log('Valor: ', transaction.getValor());
        });
    }
}
exports.Conta = Conta;
