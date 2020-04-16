import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LocalData } from '../services/localdata';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: string;
  imgData: string;
  geolocArray: { lat: number, lng: number }[] = [];

  constructor(
    private alertController: AlertController,
    private camera: Camera,
    private geolocation: Geolocation,
    private localNotifications: LocalNotifications,
    private router: Router,
  ) { }

  updateTitle() {
    this.title = 'Mon Nouveau Titre';
  }

  /**
   * https://ionicframework.com/docs/api/alert
   */
  async fireAlert() {
    // creation de l alerte
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    // quand l alerte sera masquée
    alert.onDidDismiss().then(() => console.log('alerte masquée'))

    // affichage de l alerte
    await alert.present();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      console.log(imageData);
      LocalData.imgData = 'data:image/jpeg;base64,' + imageData;
      this.router.navigateByUrl('/camera');
    }, (err) => {
      // Handle error
    });
  }

  startGeolocation() {
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.geolocArray.push({ lat: data.coords.latitude, lng: data.coords.longitude });
    });
  }

  notification() {
    this.localNotifications.schedule({
      title: 'salut',
      text: 'ma notif',
    })
  }
}
