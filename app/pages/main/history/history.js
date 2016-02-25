import {Page, NavController} from 'ionic-framework/ionic';

@Page({
  templateUrl: 'build/pages/main/history/history.html'
})

export class HistoryPage {
  constructor(nav: NavController) {
    console.log(nav.id);
  };
}
