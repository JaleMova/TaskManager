import { UserService } from 'src/app/core/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

  isFormValidated: boolean = true;
  form: FormGroup;
  result: any;

  constructor(
    public userService: UserService,
    fb: FormBuilder,
    public ref: DynamicDialogRef) {

    this.form = fb.group({
      firstName: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(15), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(15), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['Default123', Validators.compose([Validators.minLength(6), Validators.required])],
      isAdmin: [false]
    });
  }


  createUser() {
    this.isFormValidated = this.form.valid;
    if (this.isFormValidated) {
      let user = Object.assign({}, this.form.value);
      this.userService.create(user)
        .subscribe(
          (error) => {
            console.log(error);
          });
      this.ref.close("ok");
    }
    else {
      console.log('error')
    }
  }

  cancel() {
    this.ref.close("");
  };


}


