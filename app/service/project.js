import {Injectable} from 'angular2/core';

// var Project = (function() {
//   function Project(projects) {
//     if (projects === void 0) {
//       projects = [];
//     }

//     this._projects = projects;
//     this._readyPromise = new Promise(function(res) {
//       _this._readyResolve = res;
//     });
//   }

//   Project.prototype.newProject = function(title) {
//     alert(title);
//   };

//   return Project;
// })();
// exports.Project = Project;


@Injectable()
export class Project {
  constructor() {

  }

  newProject(title) {
    alert(title);
  }
};
