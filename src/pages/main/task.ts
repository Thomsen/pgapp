import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'task.html',
  // config: {
  //   tabSubPages: false
  // }
})

export class TaskPage {
  @ViewChild(Nav) nav: Nav;

  title: string = 'Home';

  constructor() {
  };

  changeTitle(title) {
    this.title = title;
  }
}
