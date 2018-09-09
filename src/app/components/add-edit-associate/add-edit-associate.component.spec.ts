import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAssociateComponent } from './add-edit-associate.component';

describe('AddEditAssociateComponent', () => {
  let component: AddEditAssociateComponent;
  let fixture: ComponentFixture<AddEditAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
