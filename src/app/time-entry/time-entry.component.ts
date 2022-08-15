import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Subscribable, Subscription } from 'rxjs';
import { Entry } from '../app.state';
import { AppStore } from '../app.store';
import { TimerService } from '../_services/timer.service';
import { ManualEntryDialogComponent } from './manual-entry-dialog/manual-entry-dialog.component';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.scss']
})
export class TimeEntryComponent implements OnInit, OnDestroy {
    private day: number = 0;
    public entry: Entry;
    private subscription: Subscription;

  constructor(
    public timerService: TimerService, 
    private store: AppStore,
    route: ActivatedRoute,
    public dialog: MatDialog
    ) { 
      this.day = new Number(route.snapshot.paramMap.get('day')).valueOf();
      this.subscription = this.store.getEntry$(this.day).subscribe(entry => {
        this.entry = entry;
        this.timerService.setTime(this.entry.time);
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  start() {
    this.timerService.start();
  }

  stop() {
    this.timerService.stop();
    this.store.updateEntry({
      ...this.entry,
      time: this.timerService.time.totalMilliseconds
    });
    this.store.save();
  }

  reset() {
    this.timerService.reset();
    this.store.updateEntry({
      ...this.entry,
      time: 0
  });
    this.store.save();
  }

  timeClicked() {
    this.stop();

    const dialogRef = this.dialog.open(ManualEntryDialogComponent, {
      width: '250px',
      data: {day: this.day, time: this.entry.time },
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      console.log('The dialog was closed: ', result);
      if (result != null && result != undefined && !Number.isNaN(result)) {
        this.store.updateEntry({
            ...this.entry,
            time: result
        });

        this.store.save();
      }
    });

  }

}
