import { PatientEventOrder } from "./patient-event-order.state";

export class PatientEventOrderAction {
  static readonly type = '[PatientEventOrder] Add item';
  constructor(public payload: PatientEventOrder) { }
}
