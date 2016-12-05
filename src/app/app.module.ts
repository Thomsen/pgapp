import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { PgApp } from './app.component';

import { MainPage } from '../pages/main/main';
import { HistoryPage } from '../pages/main/history';
import { MorePage } from '../pages/main/more';
import { TaskPage } from '../pages/main/task';

import { AmapPage } from '../pages/map/amap';

import { NativePage } from '../pages/native/native';

import { FormPage } from '../pages/form/form';

@NgModule({
  declarations: [
    PgApp,
    HistoryPage,
    MorePage,
    MainPage,
    TaskPage,
    AmapPage,
    NativePage,
    FormPage
  ],
  imports: [
    IonicModule.forRoot(PgApp, {
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out'
    }, {})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PgApp,
    HistoryPage,
    MorePage,
    MainPage,
    TaskPage,
    AmapPage,
    NativePage,
    FormPage
  ],
  providers: []
})
export class AppModule { }
