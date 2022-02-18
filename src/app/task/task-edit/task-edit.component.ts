import { UserService } from 'src/app/core/service/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/service/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {


  form!: FormGroup;
  isFormValidated: boolean = true;
  result: any;

  users: any[] = [];

  statuses: any[] = ['In Process', 'Assigned', 'Closed'];

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private taskService: TaskService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.getInitForm();
    this.getUsers();
  }

  getInitForm() {

    let task = this.config.data.task;

    this.form = this.fb.group({
      id: [task.id],
      title: [task.title, Validators.required],
      deadline: [task.deadline, Validators.required],
      description: [task.description, Validators.required],
      assignTo: [task.assignTo, Validators.required],
      status: [task.status, [Validators.required]]

    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  async submit() {

    this.isFormValidated = this.form.valid;
    if (this.isFormValidated) {
      let task = Object.assign({}, this.form.value);
      let assignedUserId = +this.form.value.assignTo;
      this.users.filter((user) => {
        if (user.id == assignedUserId) {
          task.name = user.firstName;
        }
      });
      this.taskService.update(task.id, task).subscribe((res) => this.ngOnInit());
      this.ref.close('ok');
    }
  }

  cancel() {
    this.ref.close();
  };


}

