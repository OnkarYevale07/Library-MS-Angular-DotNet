import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    RegisterComponent,LoginComponent
  ],
  imports: [
    CommonModule,SharedModule
  ]
})
export class AuthModule { }
