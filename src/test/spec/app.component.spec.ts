
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { IonicMoudle } from 'ionic-angular';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { PgApp } from '../../app/app.component';
import { Project } from '../../providers/project';
import { MainPage } from '../../pages/main/main';


describe('PgApp Component', () => {

  let debugElement: DebugElement;

  let fixture: ComponentFixture<PgApp>;
  let pgApp: PgApp;

  let project: Project;
  let componentProject: Project;

  let projectStub: Project;

  beforeEach(() => {

    projectStub = new Project();
    projectStub.title = "testbed";

    TestBed.configureTestingModule({
      declarations: [PgApp],
      providers: [
        { provide: Project, useValue: projectStub }  // don't provide the real service. provide a test-double instead
      ],
      schemas: [NO_ERRORS_SCHEMA] // Can't bind to 'content' since it isn't a known property of 'ion-menu
    });

    fixture = TestBed.createComponent(PgApp);
    pgApp = fixture.componentInstance;

    // actually injected into the component  (the safest way)
    project = fixture.debugElement.injector.get(Project);
    componentProject = project;

    // from the root injector created by the TestBed down through the component tree.
    // it only works when Angular injects the component with the service instance in the test's root injector
    project = TestBed.get(Project);
  });

  //afterEach(() => {
  //  fixture.destroy();
  //  pgApp = null;
  //});

  it('initialises with a root page of MainPage', () => {
    expect(pgApp['rootPage']).toBe(MainPage);
  });

  it('testbed get project is defined', () => {
    //expect(project).not.toBeDefined();  // if beforeEach is not projectStub = {};
    expect(project).toBeDefined();
  });

  it('debugElement injector project is created', () => {
    expect(componentProject).toBeTruthy();
  });

  it('component project title equal \'component\'', () => {
    expect(componentProject.title).toEqual('component');
  })

  it('component project title not equal \'testbed\'', () => {
    expect(componentProject.title).not.toEqual('testbed');
  })

  it('project title equal \'testbed\'', () => {
    expect(project.title).toEqual('testbed');
  })

  it('sub project title equal \'testbed\'', () => {
    expect(projectStub.title).toEqual('testbed');
  })

  it('should inject the component\'s Project instance',
    inject([Project], (p: Project) => {
      // inject utility function is another way to get one or more services from the test root injector
      expect(p).toBe(project);
    })
  );

  it('TestBed root injector and Component Project should not be the same', () => {
    expect(project === componentProject).toBe(false);
  });

  it('stub object and injected Project should be the same', () => {
    expect(projectStub === project).toBe(true);

    projectStub.title = 'itstub';
    expect(projectStub.title).toEqual('itstub');

    expect(project.title).toEqual('itstub');
  });


});
