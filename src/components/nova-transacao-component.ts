import {TipoTransacao} from "../types/TipoTransacao.js";
import {Transacao} from "../types/Transacao.js";
import ContaAntiga from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-component.js";

const form = document.querySelector('.block-nova-transacao form') as HTMLFormElement;
form.addEventListener('submit', event => {
    try {
        event.preventDefault();
        if (!form.checkValidity()) {
            alert('Preencha todos os campos da transação!')
        }

        const inputTipoTransacao = document.querySelector('#tipoTransacao') as HTMLSelectElement
        const inputValor = document.querySelector('#valor') as HTMLInputElement
        const inputData = document.querySelector('#data') as HTMLInputElement

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao
        let valor: number = inputValor.valueAsNumber
        let data: Date = new Date(inputData.value + "T00:00:00")

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        }

        ContaAntiga.registrarTransacao(novaTransacao)
        SaldoComponent.atualizar()
        ExtratoComponent.atualizar()
        form.reset()
    } catch (erro:any) {
        alert(erro.message)
    }

})
