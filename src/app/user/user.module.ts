import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    UserRoutingModule,
    AutoCompleteModule,
    ToastModule
  ]

})
export class UserModule { }
