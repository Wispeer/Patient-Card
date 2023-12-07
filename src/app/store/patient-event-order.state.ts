import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { PatientEventOrderAction } from './patient-event-order.actions';
import { Patient } from './patients.state';
import { Procedure } from './procedures.state';
import { ServiceCategoryType } from './service-category-types.state';

export interface PatientEventOrder {
  patientId?: number | any,
  procedureId?: number | any,
  serviceCategoryType?: string | any,
  comment?: string | any,
  date?: Date 
}

export interface PatientEventOrderModel{
  orders: PatientEventOrder[]
}

const defaults: PatientEventOrderModel = { 
  orders: []
}

@State<PatientEventOrderModel>({
  name: 'patientEventOrder',
  defaults: defaults
})

@Injectable()
export class PatientEventOrderState {
  
  @Action(PatientEventOrderAction)
  Add(
    { getState, setState }: StateContext<any>, 
    { payload }: PatientEventOrderAction) {
      const state = getState();
      setState(
        {...state, orders: [...state.orders, payload]});
  }
}
