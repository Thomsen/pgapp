import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native';  // cordova-plugin-nativestorage
import { SQLite } from 'ionic-native';         // cordova-sqlite-storage

import { Observable } from 'rxjs/Rx';


@Injectable()
export class Project {

  title = 'main';

  //private self: Project;

  //dbProject: SQLite = null;

  //this.dbProject = new SQLite();
  //this.dbProject.openDatabase({
  //  name: 'project.db',
  //  location: 'default'
  //}).then(() => {
  //  this.dbProject.executeSql('create table t_project(title varchar(32), items text);', []).then(() => {

  //  }, (err) => {
  //    console.error('unable to execute sql: ', err);
  //  })
  //}, (err) => {
  //  console.error('unable to open database: ', err);
  //});

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
        //this.dbProject.executeSql("insert into t_project(title, items) values(?, ?);", [title, JSON.stringify(projs)]);
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
          //this.dbProject.executeSql("insert into t_project(title, items) values(?, ?);", [title, JSON.stringify(projs)]);
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
