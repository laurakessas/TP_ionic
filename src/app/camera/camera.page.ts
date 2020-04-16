import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LocalData } from '../services/localdata';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit, OnDestroy {

  imgData: string;

  constructor(private cameraPreview: CameraPreview) { }

  ngOnInit() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      alpha: 1,
      toBack: true
    }

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });



  }
  ngOnDestroy() {
    this.cameraPreview.stopCamera();
  }


}
