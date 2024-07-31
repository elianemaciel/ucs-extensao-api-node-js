"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Historico = void 0;
class Historico {
    constructor(data, operacao, valor) {
        this.data = data;
        this.operacao = operacao;
        this.valor = valor;
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
    }
    getOperacao() {
        return this.operacao;
    }
    setOperacao(operacao) {
        this.operacao = operacao;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
}
exports.Historico = Historico;
