import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsDashboardComponent } from './skills-dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AssociateFilterPipe } from '../pipe/associate-filter.pipe';

describe('SkillsDashboardComponent', () => {
  let component: SkillsDashboardComponent;
  let fixture: ComponentFixture<SkillsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsDashboardComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule,HttpModule,FormsModule, ReactiveFormsModule,ChartsModule,AssociateFilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
