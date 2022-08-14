import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Chart,
  Point,
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  LinearScaleOptions,
  Title,
  CategoryScale,
  CategoryScaleOptions,
  Scale,
} from 'chart.js';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart')
  private chartRef: ElementRef;
  private chart: Chart;

  @Input()
  public dataSource: Observable<Point[]>;
  private readonly data: Point[] = [];
  private dataSourceSubscription: Subscription;

  constructor() {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale,
      LinearScale
    );
  }

  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Interesting Data',
            data: this.data,
            fill: false,
            backgroundColor: '#fff',
            borderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        color: '#fff',
        scales: {
          x: {
            type: 'linear',
          },
        },
      },
    });

    this.dataSourceSubscription = this.dataSource.subscribe((points) => {
      points.forEach((p) => this.data.push(p));
      this.chart.update();
    });
  }

  ngOnDestroy() {
    this.dataSourceSubscription.unsubscribe();
  }
}
