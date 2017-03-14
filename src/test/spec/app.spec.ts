import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { PgApp } from '../../app/app.component';
import { MainPage } from '../../pages/main/main';

let comp: PgApp;
let fixture: ComponentFixture<PgApp>;

describe('Component: Root Component', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({

      declarations: [PgApp],

      providers: [

      ],

      imports: [
        IonicModule.forRoot(PgApp)
      ]

    }).compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(PgApp);
    comp = fixture.componentInstance;

  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it('is created', () => {

    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();

  });

  it('initialises with a root page of HomePage', () => {
    expect(comp['rootPage']).toBe(MainPage);
  });

});
