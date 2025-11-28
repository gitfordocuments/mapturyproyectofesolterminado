import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private status = new BehaviorSubject<boolean>(true);
  public isOnline$: Observable<boolean> = this.status.asObservable();

  constructor() {
    this.initNetworkStatus();
  }

  private async initNetworkStatus() {
    const status = await Network.getStatus();
    this.status.next(status.connected);

    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed', status);
      this.status.next(status.connected);
    });
  }

  public getCurrentStatus(): boolean {
    return this.status.value;
  }
}
