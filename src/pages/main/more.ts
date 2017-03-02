
import { Component, ViewChild } from '@angular/core';
import { App, ViewController, NavController } from 'ionic-angular';

import { AmapPage } from '../map/amap';
import { NativePage } from '../native/native';
import { FormPage } from '../form/form';

//import {DirectivePage} from '../directive/directive';

import { DemoPage } from '../demo/demo';

@Component({
  templateUrl: 'more.html'
})

export class MorePage {

  //private morePage = MorePage;
  amapPage: any = AmapPage;
  nativePage: any = NativePage;
  directivePage: any = NativePage;
  formPage: any = FormPage;
  demoPage: any = DemoPage;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public appCtrl: App) {

  }

  openPage(page) {
    console.log('page ' + page);
    // this.viewCtrl.dismiss();
    // this.appCtrl.getRootNav().push(page);
    this.navCtrl.push(page, {});
  }
}
