import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SchedulingsState } from './scheduling.state';
 
export const selectSchedulingsState = createFeatureSelector<SchedulingsState>('Schedulings');

 
export const selectSchedulings = createSelector(
  selectSchedulingsState,
  (SchedulingsState) => SchedulingsState.Schedulings,
);

export const getScheduling =  createSelector(
  selectSchedulingsState,
  ({editScheduling}) => editScheduling
);

export const isEditScheduling = createSelector(
  selectSchedulingsState,
  ({isEdit}) => isEdit,
);

 
 
 
