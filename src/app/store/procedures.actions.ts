import { Procedures } from "./procedures.state";

export class ProceduresSetDataAction {
  static readonly type = '[Procedures] Set data';
  constructor(public payload: Procedures[]) { }
}
