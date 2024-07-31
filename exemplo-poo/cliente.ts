export class Cliente {
    private nome: string;
    private sobrenome: string;
    private cpf: string;

    constructor(nome: string, sobrenome: string, cpf: string) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
    }

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    getCpf(): string {
        return this.cpf;
    }

    setCpf(cpf: string): void {
        this.cpf = cpf;
    }
    
    getSobrenome(): string {
      return this.sobrenome;
    }

    setSobrenome(sobrenome: string): void {
      this.sobrenome = sobrenome;
    }
}