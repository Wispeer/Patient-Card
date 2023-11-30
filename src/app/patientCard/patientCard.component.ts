import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Patient } from '../store/patients.state';
import { Procedure } from '../store/procedures.state';
import { ServiceCategoryType } from '../store/service-category-types.state';
import { PatientEventOrder, PatientEventOrderState } from '../store/patient-event-order.state';
import { FormControl, FormGroup } from '@angular/forms';
import { PatientEventOrderAction } from '../store/patient-event-order.actions';

@Injectable()
@Input()

@Component({
  selector: 'app-patientCard',
  templateUrl: './patientCard.component.html',
})

export class PatientCardComponent implements OnInit, OnDestroy{
  selected = 'none';
  selectedValue: string | undefined;

  patients$: Observable<Patient[]>;
  patients: Patient[] = [];
  
  procedures$: Observable<Procedure[]>;
  procedures: Procedure[] = [];
  
  serviceCategoryTypes$: Observable<ServiceCategoryType[]>;
  serviceCategoryTypes: ServiceCategoryType[] = [];

  patientEventOrder$: Observable<PatientEventOrder>;
  patientEventOrder!: PatientEventOrder;
  
  patientForm = new FormGroup ({
    patientId: new FormControl(0),
    procedureId: new FormControl(0),
    serviceCategoryType: new FormControl(''),
    comment: new FormControl(''),
    date: new FormControl()
  })

  private ngUnsubscribe = new Subject<void>();

  constructor(private store: Store) {
    this.patients$ = this.store.select(state => state.patients);
    this.procedures$ = this.store.select(state => state.procedures);
    this.serviceCategoryTypes$ = this.store.select(state => state.serviceCategoryTypes);
    this.patientEventOrder$ = this.store.select(state => state.order);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(){
    
  
    this.patients$.subscribe(state => { this.patients = state });
    this.procedures$.subscribe(state => { this.procedures = state });
    this.serviceCategoryTypes$.subscribe(state => { this.serviceCategoryTypes = state });
    this.patientEventOrder$.subscribe(state => {this.patientEventOrder = state});
   }

  updatePatientForm() {
    this.patientEventOrder = this.patientForm.value;

    this.store.dispatch(new PatientEventOrderAction(this.patientEventOrder))

    console.warn(this.patientForm.value);
  }
}