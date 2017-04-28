
import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { Geolocation } from 'ionic-native';
import { Camera, CameraOptions } from '@ionic-native/camera'

@Component({
  templateUrl: 'native.html',
  providers: [[Camera]]
})

export class NativePage {

  coords: any = {
    longitude: 0,
    latitude: 0
  };
  coord: any;

  public base64Img: string;

  constructor(private camera: Camera) {

  }

  // Geolocation.getCurrentPosition().then(pos => {
  //   console.log("lat: " + pos.coords.latitude + " , lon: " + pos.coords.longitude);
  // })

  // coord() {
  //   Geolocation.getCurrentPosition().then(function (pos) {
  //     console.log("lat: " + pos.coords.latitude + " , lon: " + pos.coords.longitude);
  //   })
  // }



  capture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,  // DATA_URL FILE_URL NATIVE_URL
      //destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      targetHeight: 800,
      targetWidth: 600
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log("image64: " + base64Image);
      this.base64Img = base64Image;
    }, (err) => {
      // Handle error
    });
  }

}
