import {Page, NavController} from 'ionic-framework/ionic';

@Page({
  templateUrl: 'build/pages/main/task/task.html',
  config: {
    tabSubPages: false
  }
})

export class TaskPage {
  constructor(nav: NavController) {
    console.log(nav.id);
  };
}
