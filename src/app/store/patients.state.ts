import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PatientsSetData } from 'src/app/store/patients.actions';
import postJson from 'src/assets/patients.json'

export class PatientsStateModel {
}

export interface Patient {
  id: number,
  name: string,
  gender: string
}    

@State<PatientsStateModel>({
  name: 'patients',
  defaults: postJson.data.flat()
})
@Injectable()
export class PatientsState {
  @Selector()
    static patients(state: any) {
      return state;
    }

  @Action(PatientsSetData)
  add(
    { getState, setState }: StateContext<PatientsStateModel>, 
    { payload }: PatientsSetData) {
      const state = getState();
      setState(
        { ...state, payload  });
  }
}
