import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {ItemsProvider} from '../../../providers/items-provider';

/*
  Generated class for the VirtualScroll page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-virtual-scroll',
  templateUrl: 'virtual-scroll.html',
  providers: [[ItemsProvider]]
})
export class VirtualScrollPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public itemsProvider: ItemsProvider) { }

  items: Array<any> = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad VirtualScrollPage');
    this.itemsProvider.loadItems().then(data => {
      this.items = data;
    });
  }

}
