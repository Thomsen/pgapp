import { Component, ViewChild } from '@angular/core';

import { App, ViewController, NavController } from 'ionic-angular';

import { AmapPage } from '../map/amap';

import { NativePage } from '../native/native';
import { FormPage } from '../form/form';

//import {DirectivePage} from '../directive/directive';

import { DemoPage } from '../demo/demo';
import { ScrollPage } from '../scroll/scroll';
import { VirtualScrollPage } from '../scroll/virtual-scroll/virtual-scroll';
import { WeatherPage } from '../weather/weather';

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
  scrollPage: any = ScrollPage;
  virtualScrollPage: any = VirtualScrollPage;
  weatherPage: any = WeatherPage;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public appCtrl: App) {
  }
  openPage(page) {
    console.log('page ' + page);
        // this.viewCtrl.dismiss();
        // this.appCtrl.getRootNav().push(page)
    this.navCtrl.push(page, {});
  }
}

