var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TipoTransacao } from "./TipoTransacao.js";
import { Armazenador } from "./Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "./Decorators.js";
export class Conta {
    nome = '';
    saldo = Armazenador.obter("saldo") || 0;
    transacoes = JSON.parse(localStorage.getItem('transacoes'), (key, value) => {
        if (key === 'data') {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(nome) {
        this.nome = nome;
    }
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(this.transacoes); //cria uma cópia da lista original
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao != labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    }
    debitar(valor) {
        this.saldo -= valor;
        Armazenador.salvar('saldo', this.saldo.toString());
    }
    depositar(valor) {
        this.saldo += valor;
        Armazenador.salvar('saldo', this.saldo.toString());
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error('Tipo de pagamento não definido!');
        }
        this.transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        Armazenador.salvar('transacoes', JSON.stringify(this.transacoes));
    }
}
__decorate([
    ValidaDebito
], Conta.prototype, "debitar", null);
__decorate([
    ValidaDeposito
], Conta.prototype, "depositar", null);
const conta = new Conta('Joana da Silva Oliveira');
export default conta;
