import {formatarMoeda, formatarData} from "../utils/formatters.js";
import {FormatoData} from "../types/FormatoData.js";
import Conta from "../types/Conta.js";

let elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;
const elementoDataAcesso = document.querySelector('.block-saldo time') as HTMLElement;

if (elementoDataAcesso != null) {
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.SEMANA_DIA_MES_ANO);
}

renderizarSaldo()
export function renderizarSaldo(): void {
    if (elementoSaldo != null) {
        elementoSaldo.innerHTML =
            `<span class="valor">${formatarMoeda(Conta.getSaldo())}</span>`
    }
}

const SaldoComponent = {
    atualizar(): void {
        renderizarSaldo()
    }
}

export default SaldoComponent