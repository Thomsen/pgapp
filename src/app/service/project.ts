import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native'  // cordova-plugin-nativesttorage

import { Observable } from 'rxjs/Rx';

@Injectable()
export class Project {

  //private self: Project;

  constructor() {
    NativeStorage.setItem('didProject', true);
  }

  newProject(title) {
    let promise = new Promise(function (resolve, reject) {
      NativeStorage.getItem('project').then(function (res) {  // invoke findProjects() undefined
        var projs;
        if (res) {
          //projs = res.parseJSON();
          projs = JSON.parse(res);
        } else {
          projs = [];
        }
        var p: any = {};
        p.title = title;
        projs.push(p);
        NativeStorage.setItem('project', JSON.stringify(projs)).then(function () {
          resolve(projs);
        });
      }, function (error) {
        console.log('save error ' + JSON.stringify(error));
        if (error.code === 2) {
          var projs: Array<any> = [];
          var p: any = {};  // undefined, need = {}
          p.title = title;
          projs.push(p);
          NativeStorage.setItem('project', JSON.stringify(projs)).then(function () {
            resolve(p);
          });
        }
      }).catch(function(error) {
        console.log('catch error ' + JSON.stringify(error));
      });
    });
    return promise;
  }

  public findProjects(): Promise<any> {
    return NativeStorage.getItem('project');
  }

  saveProjects(projs) {
    return NativeStorage.setItem('project', JSON.stringify(projs));
  }
};
