//import {Page, NavController} from 'ionic-angular';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'history.html'
})

export class HistoryPage {
  constructor(public nav: NavController) {
    console.log(nav.id);
  };
}
