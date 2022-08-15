import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'Skate Challenge';
  routerSubscription: Subscription;

  /**
   *
   */
  constructor(public store: AppStore, private router: Router, public location: Location) {
    this.store.load();
    this.routerSubscription = this.router.events.subscribe((nav) => {
      if (nav instanceof NavigationEnd) {
        console.log(nav);
        if (nav.url !== '/' && nav.url !== '/dashboard') {
            this.store.showBack = true;
        } else {
            this.store.showBack = false;
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.store.save();
  }
}
