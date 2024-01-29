import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatInputModule } from '@angular/material/input';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
//--
// import { TrimPipe } from './pipes/trim.pipe.ts.pipe';

//Sin esto da error!
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);
// import { NgApexchartsModule } from 'ng-apexcharts';
// import { UserPrintAjaxService } from './service/user.print.ajax.service';
// import { TranslocoRootModule } from './transloco-root.module';
//
// import { NgxCaptchaModule } from 'ngx-captcha';
// import { ChangePasswordComponent } from './components/change-password/change-password.component';
// import { SendEmailComponent } from './components/send-email/send-email.component';

import { AutoCompleteModule } from 'primeng/autocomplete';


//--
@NgModule({
  declarations: [
  ],
  imports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }