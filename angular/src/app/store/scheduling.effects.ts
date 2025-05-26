import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'; 
import { catchError, concatMap, map, mergeMap, of, tap } from 'rxjs';
import { SchedulingService } from '../services/scheduling.service';
import { SchedulingsActions } from './scheduleing.actions';

export const loadSchedulingsEffect = createEffect(
  (actions$ = inject(Actions), SchedulingsService = inject(SchedulingService)) => {
    return actions$.pipe(
      ofType(SchedulingsActions.schedulingsLoad),
      concatMap(() =>
        SchedulingsService.getSchedulings$().pipe(
          tap((Schedulings)=>console.log(Schedulings)),
           
          map((Schedulings) => SchedulingsActions.schedulingsLoadedSuccess({ Schedulings })),
          catchError((error: { message: string }) =>
            of(SchedulingsActions.schedulingsLoadFailure({ message: error.message })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);


export const deleteSchedulingEffect$ = createEffect(
  (actions$ = inject(Actions), SchedulingsService = inject(SchedulingService)) => {
      return actions$.pipe(
          ofType(SchedulingsActions.schedulingDelete),
          mergeMap(({ userId }) =>
            SchedulingsService.deleteScheduling$(userId).pipe(
                  map(() =>SchedulingsActions.schedulingsLoad()),
                  catchError((error) =>
                      of(SchedulingsActions.deleteFailure({ message: error.message })),
                  ),
              ),
          ),
      );
  },
  { functional: true },
);

export const addSchedulingEffect$ = createEffect(
  (actions$ = inject(Actions),  SchedulingsService = inject(SchedulingService)) => {
      return actions$.pipe(
          ofType(SchedulingsActions.schedulingAdd),
          mergeMap(({ Scheduling }) =>
            SchedulingsService.addScheduling$(Scheduling).pipe(
              map(() =>  SchedulingsActions.schedulingsLoad()),
                  catchError((error) =>
                      of(SchedulingsActions.addFailure({ message: error.message })),
                  ),
              ),
          ),
      );
  },
  { functional: true },
);
export const updateSchedulingEffect$ = createEffect(
  (actions$ = inject(Actions),  SchedulingsService = inject(SchedulingService)) => {
      return actions$.pipe(
          ofType(SchedulingsActions.updateScheduling),
          mergeMap(({ Scheduling }) =>
            SchedulingsService.updateScheduling$(Scheduling).pipe(
              map(() =>SchedulingsActions.schedulingsLoad()),
                  catchError((error) =>
                      of(SchedulingsActions.updateFailure({ message: error.message })),
                  ),
              ),
          ),
      );
  },
  { functional: true },
);




 