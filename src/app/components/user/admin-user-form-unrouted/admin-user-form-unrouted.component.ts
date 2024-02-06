import { Component, Input, OnInit } from '@angular/core';
import { IUser, formOperation } from '../../../model/model.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAjaxService } from '../../../service/user.ajax.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-user-form-unrouted',
  templateUrl: './admin-user-form-unrouted.component.html',
  styleUrls: ['./admin-user-form-unrouted.component.css']
})
export class AdminUserFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  oUserForm!: FormGroup;
  oUser: IUser = {} as IUser;
  oStatus: HttpErrorResponse | null = null;
  oIsFieldFocused: { [key: string]: boolean } = {};

  constructor(
    private oUserAjaxService: UserAjaxService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar
  ) {
    this.initializeForm(this.oUser);
  }

  initializeForm(user: IUser) {
    this.oUserForm = this.oFormBuilder.group({
      id: [user.id],
      name: [user.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      surname: [user.surname, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      last_name: [user.last_name, [Validators.minLength(3), Validators.maxLength(255)]],
      birth_date: [user.birth_date],
      phone_number: [user.phone_number, [Validators.required]],
      dni: [user.dni, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('\\d{8}[a-zA-Z]')]],
      city: [user.city, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      address: [user.address, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      postal_code: [user.postal_code, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      username: [user.username, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      tipo: [user.role, [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.operation === 'EDIT') {
      this.oUserAjaxService.getUserById(this.id).subscribe({
        next: (data: IUser) => {
          this.oUser = data;
          this.initializeForm(this.oUser);
        },
        error: (error: HttpErrorResponse) => {
          this.oStatus = error;
          this.oMatSnackBar.open("Error getting user data", "Accept", {duration: 3000});
        }
      })
    } else {
      this.initializeForm(this.oUser);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.oUserForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.oUserForm.valid) {
      if (this.operation === 'NEW') {
        this.oUserAjaxService.createUser(this.oUserForm.value).subscribe({
          next: (data: IUser) => {
            this.oUser = data;
            this.initializeForm(this.oUser);
            this.oMatSnackBar.open("User created", "Accept", {duration: 3000});
            this.oRouter.navigate(['/admin', 'user', 'view', this.oUser.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
            this.oMatSnackBar.open("Error creating user", "Accept", {duration: 3000});
          }
        })
      } else {
        this.oUserAjaxService.updateUser(this.oUserForm.value).subscribe({
          next: (data: IUser) => {
            this.oUser = data;
            this.initializeForm(this.oUser);
            this.oMatSnackBar.open("User updated", "Accept", {duration: 3000});
            this.oRouter.navigate(['/admin', 'user', 'view', this.oUser.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
            this.oMatSnackBar.open("Error updating user", "Accept", {duration: 3000});
          }
        })
      }
    }
  }

}
