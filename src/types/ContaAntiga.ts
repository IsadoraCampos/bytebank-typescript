import {Transacao} from "./Transacao.js";
import {TipoTransacao} from "./TipoTransacao.js";
import {GrupoTransacao} from "./GrupoTransacao.js";

let saldoJSON  = localStorage.getItem('saldo');
let saldo: number = 0
const transacoesJSON = localStorage.getItem('transacoes')
let transacoes:Transacao[] = []

if (saldoJSON !== null) {
    saldo = JSON.parse(saldoJSON)
}

if (transacoesJSON !== null) {
    transacoes = JSON.parse(transacoesJSON, (key: string, value: string) => {
        if (key === 'data') {
            return new Date(value);
        }
        return value;
    });
}

function debitar(valor: number): void {
    if (valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!')
    }

    if (valor > saldo) {
        throw new Error('Saldo insuficiente!')
    }
    saldo -= valor
    localStorage.setItem('saldo', saldo.toString())
}

function depositar(valor: number): void {
    if (valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!')
    }

    saldo += valor
    localStorage.setItem('saldo', saldo.toString())
}

const ContaAntiga = {
    getSaldo(): number{
        return saldo
    },

    getDataAcesso(): Date {
        return new Date()
    },

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = []
        const listaTransacoes: Transacao[] = structuredClone(transacoes) //cria uma cópia da lista original
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort(
            (t1: Transacao, t2: Transacao) => t2.data.getTime() - t1.data.getTime())
        let labelAtualGrupoTransacao: string = ""

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao:string = transacao.data.toLocaleDateString("pt-br", {month: "long", year: "numeric"})
            if (labelAtualGrupoTransacao != labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                })
            }
            gruposTransacoes.at(-1)!.transacoes.push(transacao)
        }
        return gruposTransacoes
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor)
        } else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor)
            novaTransacao.valor *= -1
        } else {
            throw new Error('Tipo de pagamento não definido!')
        }

        transacoes.push(novaTransacao)
        console.log(this.getGruposTransacoes())
        localStorage.setItem('transacoes', JSON.stringify(transacoes))
    }
}

