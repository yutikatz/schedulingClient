import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSchedulings } from '../store/scheduling.selectors';
import { SchedulingsActions } from '../store/scheduleing.actions';
import { Scheduling } from '../modal/scheduleing.modal';


@Component({
  selector: 'app-scheduling-list',
  imports: [CommonModule],
  templateUrl: './scheduling-list.component.html',
  styleUrl: './scheduling-list.component.scss'

})
export class SchedulingListComponent implements OnInit {

  store = inject(Store);
  schedulings$ = this.store.select(selectSchedulings);

  ngOnInit(): void {
    this.store.dispatch(SchedulingsActions.schedulingsLoad());
   
  }


  editscheduling(editScheduling: Scheduling) {
    this.store.dispatch(SchedulingsActions.formStateChanged({ isEdit: true }));
    this.store.dispatch(SchedulingsActions.editScheduling({ editScheduling }));

  }

  deletescheduling(userId: string) {
   
    this.store.dispatch(SchedulingsActions.schedulingDelete({ userId }));
  }
}
