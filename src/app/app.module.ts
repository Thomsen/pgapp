import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { PgApp } from './app.component';

import { MainPage } from '../pages/main/main';
import { HistoryPage } from '../pages/main/history';
import { MorePage } from '../pages/main/more';
import { TaskPage } from '../pages/main/task';

import { AmapPage } from '../pages/map/amap';

import { NativePage } from '../pages/native/native';

import { FormPage } from '../pages/form/form';

import { DemoPage } from '../pages/demo/demo';
import { BadgePage } from '../pages/demo/badges';
import { ScrollPage } from '../pages/scroll/scroll';
import { VirtualScrollPage } from '../pages/scroll/virtual-scroll/virtual-scroll';
import { WeatherPage } from '../pages/weather/weather';
import { ForecastDetailPage } from '../pages/weather/forecast-detail/forecast-detail';

import { GlobalIonicErrorHandler } from '../providers/global-ionic-error-handler';

@NgModule({
  declarations: [
    PgApp,
    HistoryPage,
    MorePage,
    MainPage,
    TaskPage,
    AmapPage,
    NativePage,
    FormPage,
    DemoPage,
    BadgePage,
    ScrollPage,
    VirtualScrollPage,
    WeatherPage,
    ForecastDetailPage
  ],
  imports: [
    IonicModule.forRoot(PgApp, {
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      backButtonText: 'go back',
      icoMode: 'ios',
      tabsPlacement: 'bottom',
      pageTransition: 'ios',
      platforms: {
        ios: {
          tabsPlacement: 'top'
        }
      },
      links: []
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
    FormPage,
    DemoPage,
    BadgePage,
    ScrollPage,
    VirtualScrollPage,
    WeatherPage,
    ForecastDetailPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: GlobalIonicErrorHandler }
  ]
})
export class AppModule { }
