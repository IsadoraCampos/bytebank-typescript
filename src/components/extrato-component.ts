import Conta from "../types/Conta.js";
import {formatarData, formatarMoeda} from "../utils/formatters.js";
import {FormatoData} from "../types/FormatoData.js";

let elementoRegistroTransacaoExtrato = document.querySelector('.extrato .registro-transacoes') as HTMLElement


renderizarExtrato()
function renderizarExtrato(): void {
    const gruposTransacoes = Conta.getGruposTransacoes()
    elementoRegistroTransacaoExtrato.innerHTML = ''
    let htmlRegistroTransacao = ''

    for (let grupoTransacao of gruposTransacoes) {
        let htmlTransacaoItem = ''
        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                    </div>
                    <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                </div>
            `
        }
        htmlRegistroTransacao += `
         <div class="transacoes-group">
           <strong class="mes-group">${grupoTransacao.label}</strong>
           ${htmlTransacaoItem}
         </div>
        `
    }
     if (htmlRegistroTransacao == '') {
         htmlRegistroTransacao = '<div>Não houve nenhuma transação!</div>'
     }

    elementoRegistroTransacaoExtrato.innerHTML = htmlRegistroTransacao
}

const ExtratoComponent = {
    atualizar(): void {
        renderizarExtrato()
    }
}

export default ExtratoComponent