import {Conta} from "./Conta.js";

export function ValidaDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value

    descriptor.value = function (valorDoDebito: number) {
        if (valorDoDebito <= 0) {
            throw new Error('O valor a ser debitado deve ser maior que zero!')
        }

        if (valorDoDebito > (this as Conta).getSaldo()) {
            throw new Error('Saldo insuficiente!')
        }

        return metodoOriginal.apply(this, [valorDoDebito])
    }

    return descriptor
}

export function ValidaDeposito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value

    descriptor.value = function (valorDoDebito: number) {
        if (valorDoDebito <= 0) {
            throw new Error('O valor a ser debitado deve ser maior que zero!')
        }

        return metodoOriginal.apply(this, [valorDoDebito])
    }
    return descriptor;
}