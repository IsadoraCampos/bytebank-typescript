import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";
let elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (elementoDataAcesso != null) {
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.SEMANA_DIA_MES_ANO);
}
renderizarSaldo();
export function renderizarSaldo() {
    if (elementoSaldo != null) {
        elementoSaldo.innerHTML =
            `<span class="valor">${formatarMoeda(Conta.getSaldo())}</span>`;
    }
}
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
};
export default SaldoComponent;
