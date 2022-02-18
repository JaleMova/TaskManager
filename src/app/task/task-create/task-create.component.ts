import { UserService } from 'src/app/core/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskService } from 'src/app/core/service/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {


  isFormValidated: boolean = true;
  form: FormGroup;
  result: any;
  users: any[] = [];

  statuses: any[] = ['In Process', 'Assigned', 'Closed'];

  constructor(
    public taskService: TaskService,
    fb: FormBuilder,
    public ref: DynamicDialogRef,
    private userService: UserService) {

    this.form = fb.group({
      title: ['', Validators.required],
      deadline: ['', Validators.required],
      description: ['', Validators.required],
      assignTo: ['', Validators.required],
      status: ['', Validators.required]
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

  createTask() {
    this.isFormValidated = this.form.valid;
    if (this.isFormValidated) {
      let task = Object.assign({}, this.form.value);
      let assignedUserId = +this.form.value.assignTo;
      this.users.filter((user) => {
        if (user.id == assignedUserId) {
          task.name = user.firstName;
        }
      });

      this.taskService.create(task)
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


