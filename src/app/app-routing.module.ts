import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientCardComponent } from './patientCard/patientCard.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  {path: 'patientCard', component: PatientCardComponent},
  {path: 'orderList', component: OrderListComponent},
  {path: '', redirectTo: '/patientCard', pathMatch: 'full'}
];

@NgModule({
  declarations: [PatientCardComponent],
  imports: [ReactiveFormsModule, CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
