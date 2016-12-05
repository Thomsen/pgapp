
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'amap.html'
})


export class AmapPage {
  constructor(nav: NavController) {
    console.log(nav.id);

    var amapArea = document.getElementById('amap_container');
    if (amapArea) {
      console.log(JSON.stringify(amapArea.parentNode));
      //amapArea.parentNode.style.height = "100%";
    }

    // this.map = new AMap.Map('amap_container', {
    //   resizeEnable: true
    // });
  }

  // private map: AMap;
}


