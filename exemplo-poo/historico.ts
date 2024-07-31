export class Historico {
    private data: Date;
    private operacao: string;
    private valor: number;
    constructor(data: Date, operacao: string, valor: number) {
        this.data = data;
        this.operacao = operacao;
        this.valor = valor;
    }
    getData(): Date {
        return this.data;
    }
    setData(data: Date): void {
        this.data = data;
    }
    getOperacao(): string {
        return this.operacao;
    }
    setOperacao(operacao: string): void {
        this.operacao = operacao;
    }
    getValor(): number {
        return this.valor;
    }
    setValor(valor: number): void {
        this.valor = valor;
    }  
}