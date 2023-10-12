import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoginComponent } from './login/login.component'
import {  FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HomeComponent} from './home.component';
import { DasboardComponent } from './dasboard/dasboard.component'
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { DatePipe } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { NavComponent } from './nav.component';
import { UserDetailComponent } from './user_detail/user_detail.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DialogComponent } from './dialog/dialog.component';
import { TokenInterceptor } from './Interceptor/token.interceptor';
import { ResgisterComponent } from './resgister/resgister.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DasboardComponent,
    NavComponent,
    UserDetailComponent,
    DialogComponent,
    ResgisterComponent,
    ForgotPasswordComponent,
    AboutComponent,
    ContactComponent,
    UserListComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatProgressBarModule,
    MatButtonModule,
    LoadingBarRouterModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatRadioModule,
    MatAutocompleteModule,
    AutocompleteLibModule,
    DatePipe,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatStepperModule
    
  ],
  providers: [DatePipe,
    {
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
