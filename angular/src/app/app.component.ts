import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SchedulingService } from './services/scheduling.service'; 
import { SchedulingFormComponent } from './scheduling-form/scheduling-form.component';
import { SchedulingListComponent } from './scheduling-list/scheduling-list.component';


@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CommonModule,
    SchedulingFormComponent,
    SchedulingListComponent,

    NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
   
    SchedulingService,
 
  ]

})
export class AppComponent { }
