import {Page} from 'ionic-framework/ionic';
import {TaskPage} from './task/task';
import {HistoryPage} from './history/history';

@Page({
  templateUrl: 'build/pages/main/main.html'
})

export class MainPage {
  constructor() {
    this.tabHome = TaskPage;
    this.tabHistory = HistoryPage;
  }

}
