
import { Component, ViewChild, Inject, enableProdMode } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { MainPage } from '../pages/main/main';

import { Project } from '../providers/project';

@Component({
  templateUrl: 'app.html',
  providers: [Project]
})

export class PgApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;

  projects: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, private project: Project) {

    //pgApp = this;

    // set up our app
    this.platform = platform;
    this.project = project;
    this.project.title = "component";

    // if (this.platform.is('ios') || this.platform.is('android')) {
    //enableProdMode();  //  Cannot enable prod mode after platform setup.
    // }

    this.initializeApp();

    // set our app's pages
    this.projects = [
      { title: 'Main', component: MainPage }
    ];

    // make *Page the root (or first) page
    this.rootPage = MainPage;

    this.project.findProjects().then((res) => {
      if (res) {
        this.projects = JSON.parse(res);
        //alert(JSON.stringify(this.projects));
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (StatusBar) {
        StatusBar.styleDefault();
      }

      // html5 native storage
      if (!window.indexedDB) {
        window.alert("doesn't support IndexedDB");
      } else {
        console.log("support IndexedDB");
      }

    });
  }

  newProject() {
    var projectTitle = prompt('Project Name');
    if (projectTitle) {
      this.createProject(projectTitle);
    }
  }

  createProject(title) {
    var self = this;
    this.project.newProject(title).then(function (res: Array<any>) {
      self.projects = res;  // this is null
      //alert(JSON.stringify(self.projects));
    }, function (error) {
      console.log('create project error ' + JSON.stringify(error));
    }).catch(function (error) {
      console.log('create project catch: ' + JSON.stringify(error));
    });
  }

  openProject(project) {
    // // close the menu when clicking a link from the menu
    // this.app.getComponent('leftMenu').close();
    // // navigate to the new page if it is not the current page
    // let nav = this.app.getComponent('nav');

    this.nav.setRoot(project.component);
  }
}
