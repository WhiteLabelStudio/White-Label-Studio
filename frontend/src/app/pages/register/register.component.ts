import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TrailstudioService } from '../../trailstudio.service'

@Component({
    selector: 'az-register',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    public router: Router;
    public form: FormGroup;
    public firstname: AbstractControl;
    public lastname: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public confirmPassword: AbstractControl;
    allUsers: any;

    constructor(router: Router, fb: FormBuilder, private trailstudio: TrailstudioService) {
        this.router = router;

        this.form = fb.group({
            firstname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            lastname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, { validator: matchingPasswords('password', 'confirmPassword') });

        this.firstname = this.form.controls['firstname'];
        this.lastname = this.form.controls['lastname'];
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.confirmPassword = this.form.controls['confirmPassword'];
        this.authenticate();
    }

    public onSubmit(values: Object): void {
        const userExisted = this.allUsers.filter(function(student){
            return student.user_email == '';//values.email;
          })
         // if(userExisted.length <= 0 ){
          this.router.navigate(['/login'])
            if (this.form.valid) {
                this.trailstudio
                .registerUser(values)
                .subscribe(data => {
                    console.log("HIiiiiiii");
                      this.router.navigate(['/login'])
                });
            }  
       /* }else{
            alert("Email Aready regitered");
        }*/
    }





    //Get All users
    authenticate() {
        this.trailstudio
            .getAllUsers()
            .subscribe((data) => {
                this.getUsers();
            });
    }


    getUsers() {
        this.trailstudio
            .getUser2()
            .subscribe((data) => {
                this.allUsers = data;
                console.log(data);
            });
    }



}

export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password = group.controls[passwordKey];
        let passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true })
        }
    }
}