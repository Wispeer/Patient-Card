import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ProceduresSetDataAction } from './procedures.actions';
import postJson from 'src/assets/procedures.json'

export class ProceduresStateModel {
}

export interface Procedures {
  procedures: Procedure[]
}

export interface Procedure {
  id: number,
  name: string,
  category: string
}

@State<ProceduresStateModel>({
  name: 'procedures',
  defaults: postJson.data.flat()
})
@Injectable()
export class ProceduresState {
  @Selector()
    static procedures(state: any) {
      return state;
    }
    
  @Action(ProceduresSetDataAction)
  add(
    { getState, setState }: StateContext<ProceduresStateModel>, 
    { payload }: ProceduresSetDataAction) {
      const state = getState();
      setState(
        {...state, payload });
  }
}
