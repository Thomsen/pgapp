import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native'

import { Observable } from 'rxjs/Rx';

@Injectable()
export class Project {

  //private self: Project;

  constructor() {
    NativeStorage.setItem('didProject', true);
  }

  newProject(title) {
    let promise = new Promise(function (resolve, reject) {
      this.findProjects().then(function (res) {
        var projs;
        if (res) {
          //projs = res.parseJSON();
          projs = JSON.parse(res);
        } else {
          projs = [];
        }
        var p: any;
        p.title = title;
        projs.push(p);
        this.saveProjects(projs).then(function () {
          resolve(projs);
        });
      }, function (error) {
        console.log('save ' + error);
      }).catch(function onRejected(error) {
        console.log('catch ' + error);
      });
    });
    return promise;
  }

  findProjects() {
    return NativeStorage.getItem('project');
  }

  saveProjects(projs) {
    return NativeStorage.setItem('project', JSON.stringify(projs));
  }
};
