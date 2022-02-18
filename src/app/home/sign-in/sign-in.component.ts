import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { UserService } from "src/app/core/service/user.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [DynamicDialogRef, DialogService, MessageService]
})
export class SignInComponent implements OnInit {

  isFormValidated: boolean = true;
  result: any;
  form!: FormGroup;
  users: any[] = [];

  isFound!: boolean;

  constructor(
    public userService: UserService,
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public router: Router,
    private messageService: MessageService) {

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]

    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }



  signIn() {
    this.isFormValidated = this.form.valid;
    this.isFound = false;
    if (this.isFormValidated) {
      let email = this.form.value.email;
      let password = this.form.value.password;

      this.users.filter((user) => {
        if (user.email === email && user.password === password && user.isAdmin == true) {
          this.router.navigate(['/users']);
        }
        else if (user.email === email && user.password === password && user.isAdmin == false) {
          this.router.navigate(['/tasks']);
        }
        else {
          this.isFound = true;
        }
      })
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



