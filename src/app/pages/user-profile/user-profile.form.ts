import { FormBuilder, FormGroup } from "@angular/forms";
import { UserProfileModel } from './user-profile.model';

export function createUserProfileForm(){    
    const userProfileInstance = new UserProfileModel({}).initializeFormControl();
    return (new FormGroup(userProfileInstance));
}