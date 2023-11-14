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
    console.log('patients from ', this.patients);
    this.procedures$.subscribe(state => { this.procedures = state });
    console.log('procedures from ', this.procedures);
    this.serviceCategoryTypes$.subscribe(state => { this.serviceCategoryTypes = state });
    console.log('serviceCategoryTypes from ', this.serviceCategoryTypes);
    this.patientEventOrder$.subscribe(state => {this.patientEventOrder = state});
    console.log('patientEventOrder from ', this.patientEventOrder);

    console.log('patientForm ', this.patientForm.value);
   }

  updatePatientForm() {
    this.patientEventOrder = this.patientForm.value;

    console.log('patientEventOrder from update', this.patientEventOrder);

    this.store.dispatch(new PatientEventOrderAction(this.patientEventOrder))

    console.warn(this.patientForm.value);
    console.log('patientForm from update', this.patientForm.value);
  }
}