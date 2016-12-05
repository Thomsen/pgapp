
import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';

import { Geolocation } from 'ionic-native';

@Component({
  templateUrl: 'native.html'
})

export class NativePage {

  coords: any;
  coord: any;

  // Geolocation.getCurrentPosition().then(pos => {
  //   console.log("lat: " + pos.coords.latitude + " , lon: " + pos.coords.longitude);
  // })

  // coord() {
  //   Geolocation.getCurrentPosition().then(function (pos) {
  //     console.log("lat: " + pos.coords.latitude + " , lon: " + pos.coords.longitude);
  //   })
  // }

}
