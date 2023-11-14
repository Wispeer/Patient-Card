import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ServiceCategoryTypesAction } from './service-category-types.actions';
import postJson from 'src/assets/service-category-types.json'

export class ServiceCategoryTypesStateModel {
}

export interface ServiceCategoryTypes{
  serviceCategoryType: ServiceCategoryType[]
}

export interface ServiceCategoryType {
  name: string,
  type: string
}

@State<ServiceCategoryTypesStateModel>({
  name: 'serviceCategoryTypes',
  defaults: postJson.data.flat()
})
@Injectable()
export class ServiceCategoryTypesState {
  @Selector()
    static serviceCategoryTypes(state: any) {
      return state;
    }
    
  @Action(ServiceCategoryTypesAction)
  add(
    { getState, setState }: StateContext<ServiceCategoryTypesStateModel>, 
    { payload }: ServiceCategoryTypesAction) {
      const state = getState();
      setState(
        { ...state, payload });
  }
}
