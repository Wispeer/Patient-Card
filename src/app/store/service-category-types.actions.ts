import { ServiceCategoryTypes } from "./service-category-types.state";

export class ServiceCategoryTypesAction {
  static readonly type = '[ServiceCategoryTypes] Set data';
  constructor(public payload: ServiceCategoryTypes[]) { }
}
