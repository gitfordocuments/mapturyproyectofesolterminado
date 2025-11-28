import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';
import { addIcons } from 'ionicons';
import { airplaneOutline } from 'ionicons/icons';

@Component({
    selector: 'app-no-internet',
    templateUrl: './no-internet.component.html',
    styleUrls: ['./no-internet.component.scss'],
})
export class NoInternetComponent implements OnInit {
    isOnline: boolean = true;

    constructor(private networkService: NetworkService) {
        addIcons({ airplaneOutline });
    }

    ngOnInit() {
        this.networkService.isOnline$.subscribe(status => {
            this.isOnline = status;
        });
    }

}
