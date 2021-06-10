import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertBarService {
  alertBarMessage = new BehaviorSubject<string>('');

  constructor() {}
}
