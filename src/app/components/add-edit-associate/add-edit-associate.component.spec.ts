import { async, ComponentFixture, TestBed,inject ,fakeAsync,tick} from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing'
import { Router, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Associate} from '../model/Associate';
import {Summary} from '../model/Summary';
import { Skill} from '../model/Skill';
import {AssociateSkills} from '../model/AssociateSkills';
import { AddEditAssociateComponent } from './add-edit-associate.component';
import { AssociateService } from '../service/associate.service';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

describe('AddEditAssociateComponent', () => {
  let component: AddEditAssociateComponent;
  let fixture: ComponentFixture<AddEditAssociateComponent>;
  let   associateForm = new FormGroup({
	associateStatus: new FormControl(),
	associateLevel: new FormControl()
  }); 

  let ngform:NgForm = new NgForm([],[]);

  ngform = <NgForm>{
    value: {
          associateStatus:"Green",
          gender: "M",
          associateLevel:"L1"
     }
  };


  
  /*
  
   ngform = <NgForm>{
    value: {
          green:"Green",
          optiongender: "M",
          assLevel1:"L1"
     }
  };
  
  ngform.setValue({
          associateStatus:"Green",
          gender: "M",
          associateLevel:"L1"
      });*/
	
	let summary:Summary = new Summary();
 
  let skill:Skill = new Skill();
  skill.skillId="1";
  skill.skillName="J2EE";
  skill.skillRating=10;

 let associateSkills:AssociateSkills[]=[{
      associateSkillId:2,
      associateId: "22",
      skill: skill,
      skillRating:0
    
  }];
  let associateObj: Associate = new Associate();
  associateObj._id = "21";
  associateObj.associateId = 21;
  associateObj.name = "Fareedha";
  associateObj.email = "fareedha@test.com";
  associateObj.mobile = 9972232322;
  associateObj.remark = "Remark";
  associateObj.strength = "Strength";
  associateObj.weakness = "weakness";
  associateObj.gender = "F";
  associateObj.level1 = "L1"
  associateObj.associateLevel="L1"
  associateObj.statusGreen = "Y";
  associateObj.statusBlue = "N";
  associateObj.statusRed="N";
  associateObj.associateStatus="Green";
  associateObj.associateSkills=associateSkills;

  let associateObj1: Associate = new Associate();
  associateObj1._id = "22";
  associateObj1.associateId = 22;
  associateObj1.name = "Ilyas";
  associateObj1.email = "ilyas@test.com";
  associateObj1.mobile = 99722322;
  associateObj1.remark = "Remark1";
  associateObj1.strength = "Strength1";
  associateObj1.weakness = "weakness1";
  associateObj1.gender = "M";
  associateObj1.level1 = "L2"
   associateObj.associateLevel="L2"
  associateObj1.statusGreen = "N";
  associateObj1.statusBlue = "Y";
  associateObj1.statusRed="N";
  associateObj1.associateStatus="Blue";
    associateObj1.associateSkills=associateSkills;

  let associateObj2: Associate = new Associate();
  associateObj2._id = "23";
  associateObj2.associateId = 23;
  associateObj2.name = "Irfan";
  associateObj2.email = "irfan@test.com";
  associateObj2.mobile = 32434322;
  associateObj2.remark = "Remark2";
  associateObj2.strength = "Strength2";
  associateObj2.weakness = "weakness2";
  associateObj2.gender = "M";
  associateObj2.level1 = "L3"
   associateObj.associateLevel="L3"
  associateObj2.statusGreen = "N";
  associateObj2.statusBlue = "N";
  associateObj2.statusRed="Y";
  associateObj2.associateStatus="Red";
    associateObj2.associateSkills=associateSkills;
 

  let associatesArray:Associate[]=[associateObj,associateObj1,associateObj2];

  summary.associatesCount=1;
  summary.femalePercentage=100.0;
  summary.malePercentage=0.0;
  summary.freshersPercentage=0.0;
  summary.level1Percentage=100.0;
  summary.level2Percentage=0.0;
  summary.level3Percentage=0.0;
  summary.ratedAssociatesCount=1;
  summary.maleRatedPercentage=0.0;
  summary.femaleRatedPercentage=100.0;

    const mockSkillList: Skill[] = [
    {
      skillId: "1",
      skillName: "J2EE",
      skillRating:10
    },
    {
      skillId: "2",
      skillName: "Skill 2",
      skillRating:0
    },
    {
      skillId: "3",
      skillName: "Skill 3",
      skillRating:0
    }
  ];

  
  
   let mockService = {
    getAllAssociates() : Observable<Associate[]>{
      //associatesArray.push(associateObj);
      return of(associatesArray);
    },
    getAllAssociateSummary() : Observable<Summary>{
      return of(summary);
    },
    getAssociateDetails(associateId: number) : Observable<Associate>{
      return of(associateObj);
    },
    getAllSkills() : Observable<Skill[]>{
      //skillsArray.push(skill);
      return of(mockSkillList);
    },
    saveAssociate(associate: Associate): Observable<Associate>{
      return of(associateObj);
    },
    updateAssociate(associate: Associate): Observable<any>{
      return of(associateObj);
    },
    deleteAssociate(associate:Associate): Observable<any>{
      return of(associateObj);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditAssociateComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule,HttpModule,FormsModule, ReactiveFormsModule ],
      providers: [{provide: AssociateService, useValue: mockService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAssociateComponent);
    component = fixture.componentInstance;
    component.skillsArray = mockSkillList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all skills', () => {
     const element = fixture.nativeElement;
     component.loadSkills();
    fixture.detectChanges();
    expect(component.skillsArray.length).toBe(3);
  });

  it('should get associate by id',async(inject([AssociateService], (associateService: AssociateService) => {
    let associate: Associate = new Associate();
     /* associateService.getAssociateDetails("22").subscribe(data => {
      associate = data;
     }); */
    component.getAssociateDetails("22"); 
    associate= component.associate;
    fixture.detectChanges();
    expect(associate.name).toEqual(associateObj.name);
  })));

  it('should add new associate',fakeAsync(inject([AssociateService], (associateService: AssociateService) => {
    let associate: Associate = new Associate();
    fixture.detectChanges();
    const element = fixture.nativeElement;
    element.querySelector('#associateName').value = "Ifthikhar";
    element.querySelector('#associateId').value = "0";
    element.querySelector('#assEmail').value = "ifthi@gmail.com";
    element.querySelector('#mobile').value = "8999022223";
    element.querySelector('#remarks').value = "Remark";
    element.querySelector('#green').value = "Green";
    element.querySelector('#assLevel1').value = "L1";
    element.querySelector('#optiongender').value = "M";
    component.isEditAssociate=false;
  
     /*component.associateForm.controls['associateStatus'].value('Green');
     component.associateForm.controls['gender'].value('M'); 
     component.isEditAssociate=false;
       ngform.controls['associateStatus'].setValue('Green');
     ngform.controls['gender'].setValue('M');
     ngform.controls['associateLevel'].setValue('L1'); */
  
 
    const associateData: Associate = new Associate();
    associateData._id = "0";
    associateData.associateId = 0;
    associateData.name = "Ifthikhar";
    associateData.email = "ifthi@gmail.com";
    associateData.mobile = 9870654321;
    associateData.remark = "Remark";
    associateData.strength = "Strength";
    associateData.weakness = "weakness";
    associateData.gender = "M";
    associateData.level1 = "L1"
    associateData.associateStatus="Blue";
    associateData.associateLevel="L1";
    associateData.statusBlue = "Y";    
    associateData.statusGreen="N";
    associateData.statusRed="N";
    associateData.associateSkills=associateSkills;

    associateService.saveAssociate(associateData).subscribe(data => { 
      associate = data;
    });
     component.associate = associateData;
 
     
    // associateForm.controls['associateStatus'].setValue('Green');
     
       
     tick();
     component.onFormSubmit();
    // let buttonClick = fixture.debugElement.query(By.css('.addButton')).nativeElement.click();
    fixture.detectChanges();
    
     
  })));

     it('should update associate',async(inject([AssociateService], (associateService: AssociateService) => {
    let associate: Associate = new Associate();
    fixture.detectChanges();
    const element = fixture.nativeElement;
    element.querySelector('#associateName').value = "Ifthikhar";
    element.querySelector('#associateId').value = "1245";
    element.querySelector('#assEmail').value = "ifthi@gmail.com";
    element.querySelector('#mobile').value = "8999022223";
    element.querySelector('#remarks').value = "Remark";
    element.querySelector("#green").value="Green";
    component.isEditAssociate=true;
    let buttonClick = fixture.debugElement.query(By.css('#addButton')).nativeElement.click();
    fixture.detectChanges();
 
 
    const associateData: Associate = new Associate();
    associateData._id = "14";
    associateData.associateId = 14;
    associateData.name = "Ifthikhar";
    associateData.email = "ifthi@gmail.com";
    associateData.mobile = 9870654321;
    associateData.remark = "Remark";
    associateData.strength = "Strength";
    associateData.weakness = "weakness";
    associateData.gender = "M";
    associateData.level2 = "L2"
    associateData.associateLevel="L2";
    associateData.associateStatus="Green";
    associateData.statusBlue = "N";    
    associateData.statusGreen="Y";
    associateData.statusRed="N";
    associateData.associateSkills=associateSkills;
    fixture.detectChanges();
    associateService.updateAssociate(associateData).subscribe(data => { 
      associate = data;
    });
      
    fixture.detectChanges();
  })));

   it('it should delete associate', async(inject([AssociateService], (associateService: AssociateService) => {
    const element = fixture.nativeElement;
    let responseData: boolean;
    associateService.deleteAssociate(associateObj).subscribe(data => {
      responseData = data;
    });
    fixture.detectChanges();
  }))); 

  
});
