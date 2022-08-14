import { Injectable } from '@angular/core';
import { Point } from 'chart.js';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from 'rxjs-observable-store';
import { AppState, Entry } from './app.state';

@Injectable({
  providedIn: 'root',
})
export class AppStore extends Store<AppState> {
  constructor() {
    super({
      entries: [],
    } as AppState);
  }

  get dataPoints$(): Observable<Point[]> {
    return this.state$.pipe(
      map((state) =>
        state.entries.map((entry) => {
          return {
            x: entry.day,
            y: entry.time,
          } as Point;
        })
      )
    );
  }

  get entries$(): Observable<Entry[]> {
    return this.state$.pipe(map((state) => state.entries));
  }

  load() {
    let dataString = localStorage.getItem('skate-data');
    if (!dataString) {
      this.preloadData();
    }

    let entries = JSON.parse(dataString);
    if (entries && entries.length == 30) {
      this.setState({
        entries,
      });
    } else {
      this.preloadData();
    }
  }

  save() {
    let entriesString = JSON.stringify(this.state.entries);
    localStorage.setItem('skate-data', entriesString);
  }

  private preloadData() {
    let entries: Entry[] = [];
    for (let i: number = 1; i <= 30; ++i) {
      entries.push({
        day: i,
        time: 0,
      });
    }
    this.setState({
      entries,
    });
  }
}
