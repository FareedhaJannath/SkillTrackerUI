import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core';
 

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
 // const appRoutes: Routes = [
 //   {path:'Home', component: MenuComponent}
 // ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
         imports: [ RouterTestingModule ],
          schemas: [NO_ERRORS_SCHEMA]
     //   providers: [{provide: APP_BASE_HREF, useValue : '/' }]
     //,RouterModule.forRoot(appRoutes)
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   /* it('should create', () => {
    expect(component).toBeTruthy();
  });   */
});
