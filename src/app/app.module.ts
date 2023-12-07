import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PatientsState } from './store/patients.state';
import { ProceduresState } from './store/procedures.state';
import { ServiceCategoryTypesState } from './store/service-category-types.state';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { PatientEventOrderState } from './store/patient-event-order.state';
import { OrderListComponent } from './order-list/order-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    NgxsModule.forRoot([PatientsState, ProceduresState, ServiceCategoryTypesState,PatientEventOrderState,], {}), 
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NoopAnimationsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
