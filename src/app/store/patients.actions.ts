import { Patient } from "./patients.state";

export class PatientsSetData {
    static readonly type = '[Patients] Set data';
    constructor(public payload: Patient[]) {}
}