import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaskService } from 'src/app/core/service/task.service';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class TaskListComponent implements OnInit {

  tasks: any;

  constructor(private taskService: TaskService,
    private userService: UserService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  editTask(task: any) {
    const ref = this.dialogService.open(TaskEditComponent, {
      header: "Edit User",
      showHeader: false,
      closable: true,
      dismissableMask: false,
      baseZIndex: 11100,
      width: '400px',
      data: {
        task: task
      }
    });

    ref.onClose.subscribe((response: any) => {
      if (response && response === 'ok') {
        this.ngOnInit();

      }
    });
  }

  deleteTask(task: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: async () => {
        try {
          this.taskService.delete(task.id).subscribe(res => {
            this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Record was deleted.' });
            this.ngOnInit();
          });

        } catch (e) {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Record was not deleted.' });
        }
      },
      key: "positionDialog"
    });
  }

  createTask() {
    {
      const ref = this.dialogService.open(TaskCreateComponent, {
        header: "Create User",
        showHeader: false,
        closable: true,
        dismissableMask: false,
        baseZIndex: 11100,
        width: '600px'
      });

      ref.onClose.subscribe((response: any) => {
        if (response && response === 'ok') {
          this.ngOnInit();
        }
      });
    }

  }
}

