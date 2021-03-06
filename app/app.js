import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {Project} from './service/service';
import {MainPage} from './pages/main/main';

@App({
  templateUrl: 'build/app.html',
  providers: [Project],
  config: {
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
class PgApp {
  pgApp: PaApp;  // self not repeat define
  constructor(@Inject(IonicApp) app, @Inject(Platform) platform, @Inject(Project) project) {

    pgApp = this;

    // set up our app
    this.app = app;
    this.platform = platform;
    this.project = project;

    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Main', component: MainPage}
    ];

    // make *Page the root (or first) page
    this.rootPage = MainPage;

    this.project.findProjects().then((res) =>
                                     if (res) {
                                       pgApp.projects = JSON.parse(res);
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
      if (window.StatusBar) {
        window.StatusBar.styleDefault();
      }

      // html5 native storage
      if (!window.indexedDB) {
        window.alert("doesn't support indexeddb");
      } else {
        console.log("support indexedDB");
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
    //console.log(this.platform.versions());

    this.project.newProject(title).then(function(res) {
      pgApp.projects = res;
    }, function(error) {
      console.log('create project ' + error);
    });
  }

  openProject(project) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(project.component);
  }
}
