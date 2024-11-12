export function ValidaDebito(target, propertyKey, descriptor) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (valorDoDebito) {
        if (valorDoDebito <= 0) {
            throw new Error('O valor a ser debitado deve ser maior que zero!');
        }
        if (valorDoDebito > this.getSaldo()) {
            throw new Error('Saldo insuficiente!');
        }
        return metodoOriginal.apply(this, [valorDoDebito]);
    };
    return descriptor;
}
export function ValidaDeposito(target, propertyKey, descriptor) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (valorDoDebito) {
        if (valorDoDebito <= 0) {
            throw new Error('O valor a ser debitado deve ser maior que zero!');
        }
        return metodoOriginal.apply(this, [valorDoDebito]);
    };
    return descriptor;
}
