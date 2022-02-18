import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { HomePageComponent } from "./home-page/home-page.component";
import { HomeRoutingModule } from "./home-routing.service";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

@NgModule({
  declarations: [
    HomePageComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule
  ]
})
export class HomeModule { }
