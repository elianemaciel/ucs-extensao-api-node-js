import { Cliente } from './cliente'
import { Conta } from './conta'


let clienteVitor = new Cliente('Victor', 'Santos', '123.456.789-00')
let conta = new Conta(1, clienteVitor, 100, 1000)
conta.saca(50)
conta.deposita(100)
conta.extrato()
