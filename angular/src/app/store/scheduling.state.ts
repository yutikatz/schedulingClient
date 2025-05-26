import { Scheduling } from "../modal/scheduleing.modal";

 
 

 

export interface SchedulingsState {
  Schedulings: Array<Scheduling>,
  isEdit:boolean,
  editScheduling:Scheduling
}

export const initialState: SchedulingsState = {
  Schedulings: [], 
  isEdit:false,
  editScheduling:{} as Scheduling
};