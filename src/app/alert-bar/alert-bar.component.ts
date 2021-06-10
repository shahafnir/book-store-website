import { Component, OnInit } from '@angular/core';
import { AlertBarService } from './alert-bar.service';

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.scss'],
})
export class AlertBarComponent implements OnInit {
  message: string;
  alertAnimationRunning: boolean;

  constructor(private AlertBarService: AlertBarService) {}

  ngOnInit(): void {
    this.AlertBarService.alertBarMessage.subscribe((message) => {
      this.message = message;
      if (message && !this.alertAnimationRunning) {
        this.alertAnimationRunning = true;

        setTimeout(() => {
          this.alertAnimationRunning = false;
        }, 4000);
      }
    });
  }
}
