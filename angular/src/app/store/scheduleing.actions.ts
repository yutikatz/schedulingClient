import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Scheduling } from '../modal/scheduleing.modal';
  
export const SchedulingsActions = createActionGroup({
  source: 'Schedulings',
  events: {
    'Schedulings Load': emptyProps(),
    'Schedulings Loaded Success': props<{ Schedulings: Array<Scheduling> }>(),
    'Schedulings Load Failure': props<{ message: string }>(),
    'Scheduling Delete': props<{ userId: string }>(), 
    'Delete Failure': props<{ message: string }>(),
    'Scheduling Add': props<{ Scheduling: Scheduling }>(), 
    'Add Failure': props<{ message: string }>(),
    'form state changed': props<{ isEdit: boolean }>(),
    'edit Scheduling': props<{ editScheduling: Scheduling }>(),
    'update Scheduling': props<{ Scheduling: Scheduling }>(),
    'Update Failure': props<{ message: string }>(),


  },
});
