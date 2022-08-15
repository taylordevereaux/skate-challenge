import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppStore } from '../app.store';
import { TimerService } from '../_services/timer.service';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.scss']
})
export class TimeEntryComponent implements OnInit {
    private day: number = 0;

  constructor(
    public timerService: TimerService, 
    private store: AppStore,
    route: ActivatedRoute
    ) { 
        this.day = new Number(route.snapshot.paramMap.get('day')).valueOf();
        let data = this.store.state.entries.filter(x => x.day == this.day)[0];
        
        this.timerService.setTime(data.time);
    }

  ngOnInit(): void {
  }

  start() {
    this.timerService.start();
  }

  stop() {
    this.timerService.stop();
    this.store.updateDay(
        this.day,
        this.timerService.time.totalMilliseconds
    );
    this.store.save();
  }

  reset() {
    this.timerService.reset();
    this.store.updateDay(
        this.day,
        0
    );
    this.store.save();
  }

}
