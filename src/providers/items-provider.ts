import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ItemsProvider {

  data: Array<any> = [];

  constructor() { }

  loadItems() {
    for (let i = 0; i < 3000; i++) {
      this.data.push({
        title: `Item${i}`,
        content: `Item${i} content`,
        avatar: 'https://avatars.io/facebook/random' + i
      });
    }

    return Promise.resolve(this.data);
  }
}
