
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TaskPage } from './task';
import { HistoryPage } from './history';
import { MorePage } from './more';

@Component({
  templateUrl: 'main.html'
})

export class MainPage {

  // typescript
  tabHome: any = TaskPage;
  tabHistory: any = HistoryPage;
  tabMore: any = MorePage;

  title: string = 'Home';

  constructor(nav: NavController) {

  }

}
