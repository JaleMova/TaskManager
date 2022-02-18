import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [DynamicDialogRef, DynamicDialogConfig, DialogService, MessageService]
})
export class SignUpComponent {

  isFormValidated: boolean = true;
  result: any;
  form!: FormGroup;
  users: any[] = [];

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public router: Router,
    private messageService: MessageService) {

    this.form = this.fb.group({
      organization: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      address: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]

    });
  }



  signUp() {
    this.isFormValidated = this.form.valid;
    if (this.isFormValidated) {

      let obj = Object.assign({}, this.form.value);
      obj.isAdmin = true;
      this.userService.create(obj).subscribe(() => {
        this.router.navigate(['/users']);
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

