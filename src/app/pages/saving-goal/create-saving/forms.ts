import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { SavingGoal } from './model';

export function createSavingForm(formBuilder:FormBuilder, savingGoalInstance:SavingGoal){    
    return formBuilder.group(savingGoalInstance);
}