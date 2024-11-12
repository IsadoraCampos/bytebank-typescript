import {Transacao} from "./Transacao.js";
import {GrupoTransacao} from "./GrupoTransacao.js";
import {TipoTransacao} from "./TipoTransacao.js";
import {Armazenador} from "./Armazenador.js";
import {ValidaDebito, ValidaDeposito} from "./Decorators.js";

export class Conta {
    nome: string = ''
    protected saldo: number = Armazenador.obter<number>("saldo") || 0
    private transacoes: Transacao[] = JSON.parse(localStorage.getItem('transacoes')!, (key: string, value: any) => {
        if (key === 'data') {
            return new Date(value)
        }
        return value
    }) || []

    constructor(nome: string) {
        this.nome = nome
    }

    public getSaldo(): number {
        return this.saldo
    }

    public getDataAcesso(): Date {
        return new Date()
    }

    public getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = []
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes) //cria uma cópia da lista original
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
    }

    @ValidaDebito
    private debitar(valor: number): void {
        this.saldo -= valor
        Armazenador.salvar('saldo', this.saldo.toString())
    }

    @ValidaDeposito
    private depositar(valor: number): void {
        this.saldo += valor
        Armazenador.salvar('saldo', this.saldo.toString())
    }


    public  registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor)
        } else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor)
            novaTransacao.valor *= -1
        } else {
            throw new Error('Tipo de pagamento não definido!')
        }

        this.transacoes.push(novaTransacao)
        console.log(this.getGruposTransacoes())
        Armazenador.salvar('transacoes', JSON.stringify(this.transacoes))
    }
}

const conta = new Conta('Joana da Silva Oliveira')

export default conta