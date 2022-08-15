import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, Point, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, LinearScaleOptions, Title, CategoryScale, CategoryScaleOptions, Scale } from 'chart.js';
import { filter } from 'rxjs/operators';
import { AppStore } from '../app.store';
import { TimeSpan } from '../_utilities/time-span';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('chart')
  private chartRef: ElementRef;
  private chart: Chart;
  private data: Point[];

  
  displayedColumns: string[] = ['day', 'time'];

  constructor(public store: AppStore) {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, LinearScale);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {

  }

  getTimeSpan(time: number) {
    return TimeSpan.fromMilliseconds(time);
  }

}

