import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PatientEventOrder, PatientEventOrderModel } from '../store/patient-event-order.state';
import {MatTableModule} from '@angular/material/table';
import { Patient } from '../store/patients.state';
import { Procedure } from '../store/procedures.state';
import { ServiceCategoryType } from '../store/service-category-types.state';

@Injectable()
@Input()

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
})

export class OrderListComponent implements OnInit{
  
  public patientEventOrder$: Observable<PatientEventOrderModel>;
  public patientEventOrder: PatientEventOrderModel | any;

  patients$: Observable<Patient[]>;
  patients: Patient[] = [];
  
  procedures$: Observable<Procedure[]>;
  procedures: Procedure[] = [];

  serviceCategoryTypes$: Observable<ServiceCategoryType[]>;
  serviceCategoryTypes: ServiceCategoryType[] = [];

  displayedColumns: string[] = ['patientId', 'patientName', 'procedureId', 'serviceCategoryType', 'comment', 'date'];

  dataSource!: Array<PatientEventOrder[]>;

  constructor(private store: Store) {
    this.patients$ = this.store.select(state => state.patients);
    this.procedures$ = this.store.select(state => state.procedures);
    this.serviceCategoryTypes$ = this.store.select(state => state.serviceCategoryTypes);
    this.patientEventOrder$ = this.store.select(state => state);
  }

  ngOnInit(){

    this.patients$.subscribe(state => { this.patients = state });
    this.procedures$.subscribe(state => { this.procedures = state });
    this.serviceCategoryTypes$.subscribe(state => { this.serviceCategoryTypes = state });

    this.patientEventOrder$.subscribe(state => { this.patientEventOrder = state });

    this.dataSource = this.patientEventOrder.patientEventOrder.orders;
  }
}
