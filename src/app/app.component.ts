import { Component, OnDestroy } from '@angular/core';
import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'Skate Challenge';

  /**
   *
   */
  constructor(private store: AppStore) {
    this.store.load();
  }
  ngOnDestroy(): void {
    this.store.save();
  }
}
