import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, last, map, tap } from 'rxjs';

import { CommonModule } from '@angular/common';
import { getScheduling, isEditScheduling } from '../store/scheduling.selectors';
import { SchedulingsActions } from '../store/scheduleing.actions';
import { Scheduling } from '../modal/scheduleing.modal';
import { Frequency, SchedulingTypes } from '../modal/enums';

@Component({
  selector: 'app-scheduling-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './scheduling-form.component.html',
  styleUrls: ['./scheduling-form.component.scss']
})
export class SchedulingFormComponent implements OnInit {
  SchedulingTypes = SchedulingTypes;

  store = inject(Store);
  SchedulingForm: FormGroup;
  isEdit$ = this.store.select(isEditScheduling);
  editScheduling$ = this.store.select(getScheduling);
  frequency = Frequency
  constructor(private fb: FormBuilder) {
    this.SchedulingForm = this.fb.group({
      userName:  ['', Validators.required],
      email: ['', Validators.required],
      schedulingType: ['', Validators.required],
      frequency: ['', Validators.required],
      time: ['', Validators.required],
      userId: ''


    });
  }

  ngOnInit(): void {
    this.editScheduling$.pipe(
      filter((Scheduling) => !!Scheduling && !!Scheduling.email),
      tap(Scheduling => console.log(Scheduling)),

      tap(Scheduling => this.SchedulingForm.setValue(Scheduling)),
    ).subscribe();

  }

  getDateFormat(date: any) {
    date = new Date(date)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    if (this.SchedulingForm.valid) {
      console.log(this.SchedulingForm.value);
      
      if (this.SchedulingForm.value.userId) {
        this.store.dispatch(SchedulingsActions.updateScheduling({ Scheduling: this.SchedulingForm.value }));
        this.clearForm();
      } else {
        const newScheduling = { ...this.SchedulingForm.value, };
        console.log(this.SchedulingForm.value);
        
        this.store.dispatch(SchedulingsActions.schedulingAdd({ Scheduling: newScheduling }));
        this.clearForm();
      }
    }
  }

  clearForm() {
    this.store.dispatch(SchedulingsActions.formStateChanged({ isEdit: false }));
    this.store.dispatch(SchedulingsActions.editScheduling({ editScheduling: {} as Scheduling }));
    this.SchedulingForm.reset({
      userName: '',
      email: '',
      schedulingType: SchedulingTypes.Bitcoine,
      frequency: Frequency.daily,
      time: ''
    });
  }
}
