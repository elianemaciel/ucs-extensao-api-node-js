A conta deve ter os atributos, numero, titular, saldo e limite. Devemos manipular os dados
através das funcionalidades saca() e deposita() e proteger os dados da conta. Pensando no
mundo real, ninguém pode modificar o saldo de sua conta quando quiser, a n ̃ao ser quando
vamos fazer um saque ou um depósito. A mesma coisa deve acontecer aqui.
1 - Criar uma classe para o a conta
2 - Crie o método construtor para inicializar numero, titular, saldo, limite
3 - Crie um método deposita() que recebe como argumento uma conta e um valor.
4 - Crie um método saca() que recebe como argumento um valor. Dentro da função subtraia
o valor do saldo da conta
5 Crie um método extrato(), que imprime o numero e o saldo da conta
6 Crie uma classe para representar um cliente do nosso banco que deve ter nome,
sobrenome e cpf.

--------------------------------------------------------------------------------------------------------------------------------------------------------------
Instancie uma Conta e passe um cliente como titular da conta.
2 Modifique o método extrato() da classe Conta para imprimir, além do número e o saldo,
os dados do cliente.
Podemos criar uma Conta sem um Cliente? E um Cliente sem uma Conta?
1 Crie uma classe que represente uma data, com dia, mˆes e ano.
2 Crie um atributo dataAbertura na classe Conta.
3 Crie uma nova conta e faça testes no console.
4 Crie uma classe Histórico que represente o histórico de uma Conta. Ex: Saques, depositos.
Faça testes no console criando algumas contas, fazendo operações e por ́ultimo mostrando o
histórico de transações de uma Conta.