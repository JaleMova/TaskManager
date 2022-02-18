
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserService } from 'src/app/core/service/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class UserListComponent implements OnInit {

  users: any[] = [];


  constructor(private userService: UserService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }


  editUser(user: any) {
    const ref = this.dialogService.open(UserEditComponent, {
      header: "Edit User",
      showHeader: false,
      closable: true,
      dismissableMask: false,
      baseZIndex: 11100,
      width: '400px',
      data: {
        user: user
      }
    });

    ref.onClose.subscribe((response: any) => {
      if (response && response === 'ok') {
        this.ngOnInit();

      }
    });
  }

  deleteUser(user: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        try {
          this.userService.delete(user.id).subscribe(res => {
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

  createUser() {
    {
      const ref = this.dialogService.open(UserCreateComponent, {
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
