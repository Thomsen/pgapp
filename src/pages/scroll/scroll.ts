import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemsProvider } from '../../providers/items-provider';

/*
  Generated class for the Scroll page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-scroll',
  templateUrl: 'scroll.html',
  providers: [[ItemsProvider]]
})
export class ScrollPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public itemsProvider: ItemsProvider) { }

  items: Array<any> = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScrollPage');
    this.itemsProvider.loadItems().then(data => {
      this.items = data;
    });
  }

}
