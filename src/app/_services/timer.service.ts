import { Injectable } from '@angular/core';
import { _MAT_HINT } from '@angular/material/form-field';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TimeSpan } from '../_utilities/time-span';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
    private timeInterval: any;
    private currentInterval: number = 0;
    private currentTime: number = 0;
    private lastTime: number = 0;
    private currentDateTime: number = Date.now();
    private isStopped: boolean = true;

    private timeSubject: BehaviorSubject<TimeSpan> = new BehaviorSubject(TimeSpan.fromSeconds(0));
    public time$: Observable<TimeSpan>;
    private _time: TimeSpan;

    constructor() { 
        this.time$ = this.timeSubject.asObservable();
    }
    
    get isRunning() {
        return !this.isStopped;
    }

    get time() {
        return this._time;
    }

    setTime(time) {
        this.reset();
        this._time = TimeSpan.fromMilliseconds(time);
        this.timeSubject.next(this._time);
    }

    start () {
        this.isStopped = false;
        const interval = 10;
        if (!!this.timeInterval)
            clearInterval(this.timeInterval);

        this.currentDateTime = Date.now();

        this.timeInterval = setInterval(() => {
            this.currentInterval += interval;

            if (!this.isStopped) {
                var ticker = this.currentTime > (1000 * 60 * 60) ? 1000 : 10;
                if ((this.currentInterval % ticker) == 0) {
                    this.currentTime = this.lastTime + (new Date().getTime() - this.currentDateTime);

                    this._time = TimeSpan.fromMilliseconds(this.currentTime);
                    
                    this.timeSubject.next(this._time);
                }
            }

        }, interval);
    }

    stop () {
        this.lastTime = this.currentTime;
        this.isStopped = true;
    }


    reset() {
        if (!this.isStopped) {
            this.isStopped = true;
            console.log(TimeSpan.fromMilliseconds(this.currentTime).totalSeconds);
        }
        clearInterval(this.timeInterval);
        this.currentInterval = 0;
        this.currentTime = 0;
        this.lastTime = 0;
        this._time = TimeSpan.fromMilliseconds(0);
        this.timeSubject.next(this._time);
    }

    // private getTimeSpan(currentTime) {
    //     return {
    //         hour: (currentTime / (1000 * 60 * 60)) | 0,
    //         minute: (currentTime % (1000 * 60 * 60) / (1000 * 60)) | 0,
    //         second: (currentTime % (1000 * 60) / 1000) | 0,
    //         millisecond: (currentTime % 1000 / 1) / 10 | 0
    //     }
    // }
}
