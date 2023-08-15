import { FormBuilder } from '@angular/forms';
import { Withdraw, BankAccount } from './withdraw.model';

export function createBankAccountForm(formBuilder:FormBuilder, bankAccounInstance:BankAccount){
    return formBuilder.group(bankAccounInstance);
}

export function createWithdrawForm(formBuilder:FormBuilder, withdrawInstance:Withdraw){
    return formBuilder.group(withdrawInstance);
}