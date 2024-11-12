import ContaAntiga from "../types/Conta.js";
import SaldoComponent from "./saldo-component.js";
import ExtratoComponent from "./extrato-component.js";
const form = document.querySelector('.block-nova-transacao form');
form.addEventListener('submit', event => {
    try {
        event.preventDefault();
        if (!form.checkValidity()) {
            alert('Preencha todos os campos da transação!');
        }
        const inputTipoTransacao = document.querySelector('#tipoTransacao');
        const inputValor = document.querySelector('#valor');
        const inputData = document.querySelector('#data');
        let tipoTransacao = inputTipoTransacao.value;
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value + "T00:00:00");
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };
        ContaAntiga.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        form.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
