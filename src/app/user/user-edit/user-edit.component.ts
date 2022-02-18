import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  form!: FormGroup;
  isFormValidated: boolean = true;
  result: any;
  emailAlreadyExist!: boolean;

  constructor(
    public fb: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private userService: UserService) { }



  ngOnInit() {
    this.getInitForm();
  }


  getInitForm() {
    let user = this.config.data.user;

    this.form = this.fb.group({
      id: [user.id],
      firstName: [user.firstName, Validators.compose([Validators.minLength(2), Validators.maxLength(15), Validators.required])],
      lastName: [user.lastName, Validators.compose([Validators.minLength(2), Validators.maxLength(15), Validators.required])],
      email: [user.email, Validators.compose([Validators.email, Validators.required])]
    });
  }


  async submit() {
    this.isFormValidated = this.form.valid;
    if (this.isFormValidated) {
      let user = Object.assign({}, this.form.value);
      this.userService.update(user.id, user).subscribe(res => this.ngOnInit());
      this.ref.close('ok');
    }
  }

  cancel() {
    this.ref.close();
  };


}
