import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LocalData } from '../services/localdata';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  imgData: string;

  constructor() { }

  ngOnInit() {
    this.imgData = LocalData.imgData;
  }

  goBack() {
    window.history.back();
  }
}
