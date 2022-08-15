import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeSpan } from 'src/app/_utilities/time-span';

export class DialogData {
  day: number
  time: number
}

@Component({
  selector: 'app-manual-entry-dialog',
  templateUrl: './manual-entry-dialog.component.html',
  styleUrls: ['./manual-entry-dialog.component.scss']
})
export class ManualEntryDialogComponent implements OnInit {
  @ViewChild('timeModel') timeModel: NgModel;
  public timeString: string = '';
  

  constructor(
    public dialogRef: MatDialogRef<ManualEntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { 

    let timeSpan = TimeSpan.fromMilliseconds(data.time);
    this.timeString = `${timeSpan.minutes.toString().padStart(2, '0')}${timeSpan.seconds.toString().padStart(2, '0')}${timeSpan.milliseconds.toString().padStart(3, '0')}`

  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  done() {
    if (this.timeModel.valid) {
      this.dialogRef.close(this.getTime());
    }
  }


  getTime() {
    let minutes = new Number(this.timeString.substring(0, 2)).valueOf();
    let seconds = new Number(this.timeString.substring(2, 4)).valueOf();
    if (seconds > 60) {
      minutes += Math.floor(seconds / 60);
      seconds = seconds % 60;
    }
    let milliseconds = new Number(this.timeString.substring(4, 7)).valueOf();
    let timeSpan = TimeSpan.fromTime(0, 0, minutes, seconds, milliseconds);
    return timeSpan.totalMilliseconds;
  }

}
