import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PgApp } from '../../app/app.component';
import { TaskPage } from '../../pages/main/task';

let comp: TaskPage;
let fixture: ComponentFixture<TaskPage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Home Page', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [PgApp, TaskPage],

      providers: [

      ],

      imports: [
        IonicModule.forRoot(PgApp)
      ]

    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TaskPage);
      comp = fixture.componentInstance;
    });

  }));

  //beforeEach(() => {
  //  fixture = TestBed.createComponent(MainPage);
  //  comp = fixture.componentInstance;
  //});

  afterEach(() => {
    //fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();

  });

  it('initialises with a title of My Page', () => {
    expect(comp['title']).toEqual('Home');
  });

  it('can set the title to a supplied value', () => {

    de = fixture.debugElement.query(By.css('ion-title'));
    el = de.nativeElement;

    comp.changeTitle('Your Page');
    fixture.detectChanges();
    expect(comp['title']).toEqual('Your Page');
    expect(el.textContent).toContain('Your Page');

  });

});
