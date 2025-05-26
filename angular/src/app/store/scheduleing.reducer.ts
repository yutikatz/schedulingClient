import { createReducer, on } from '@ngrx/store';
 import { initialState } from './scheduling.state';
import { SchedulingsActions } from './scheduleing.actions';
 

export const SchedulingsReducer = createReducer(
  initialState,
   
  on(SchedulingsActions.schedulingsLoadedSuccess, (state, { Schedulings }) => ({
    ...state,
    Schedulings,
  })),
  on(SchedulingsActions.formStateChanged, (state, { isEdit }) => ({
    ...state,
    isEdit,
  })),

  on(SchedulingsActions.editScheduling, (state, { editScheduling }) => ({
    ...state,
    editScheduling,
  })),
  
);
