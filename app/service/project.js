import {Injectable} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-framework/ionic';

@Injectable()
export class Project {

  private self: Project;

  constructor() {
    self = this;
    self.local = new Storage(LocalStorage);
    self.local.set('didProject', true);
  }

  newProject(title) {
    let promise = new Promise(function (resolve, reject) {
      self.findProjects().then(function(res) {
        var projs;
        if (res) {
          //projs = res.parseJSON();
          projs = JSON.parse(res);
        } else {
          projs = [];
        }
        var p = {};
        p.title = title;
        projs.push(p);
        self.saveProjects(projs).then(function() {
          resolve(projs);
        });
      }, function(error) {
        console.log('save ' + error);
      }).catch(function onRejected(error) {
        console.log('catch ' + error);
      });
    });
    return promise;
  }

  findProjects() {
    return self.local.get('project');
  }

  saveProjects(projs) {
    return self.local.set('project', JSON.stringify(projs));
  }
};
