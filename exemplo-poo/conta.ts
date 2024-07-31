import { Cliente } from "./cliente";
import { Historico } from "./historico";

export class Conta {
    private numero: number;
    private titular: Cliente;
    private saldo: number;
    private limite: number;
    transactions: Array<Historico> = []
    
    // O construtor inicializa as propriedades
    constructor (numero: number , titular: Cliente , saldo: number, limite: number) {
        this.numero = numero;
        this.titular = titular;
        this.saldo = saldo;
        this.limite = limite;
        const historico = new Historico(new Date(), 'abertura', saldo)
        this.transactions.push(historico)
    }

    getNumero(): number {
        return this.numero
    }

    setNumero(numero: number): void {
        this.numero = numero
    }

    getTitular(): Cliente {
        return this.titular
    }

    setTitular(nome: Cliente): void {
        this.titular = nome
    }

    saca (valor: number) : void {
        this.saldo -= valor
        const historico = new Historico(new Date(), 'saque', valor)
        this.transactions.push(historico)
    }

    deposita (valor: number): void {
      this.saldo += valor
      const historico = new Historico(new Date(), 'deposito', valor)
      this.transactions.push(historico)
    }

    extrato(): void {
        console.log('Extrato da conta: ', this.numero)
        console.log('Titular: ', this.titular.getNome())
        console.log('Saldo Atual: ', this.saldo)
        console.log('Transações: ')
        this.transactions.forEach((transaction) => {
            console.log('Data: ', transaction.getData())
            console.log('Operação: ', transaction.getOperacao())
            console.log('Valor: ', transaction.getValor())
        })
    } 
}