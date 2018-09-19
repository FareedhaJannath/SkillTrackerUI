import { async, ComponentFixture, TestBed,inject} from '@angular/core/testing';

import { SkillsDashboardComponent } from './skills-dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AssociateFilterPipe } from '../pipe/associate-filter.pipe';
import { Observable, of } from 'rxjs';
import { Associate} from '../model/Associate';
import {Summary} from '../model/Summary';
import { Skill} from '../model/Skill';
import {AssociateSkills} from '../model/AssociateSkills';
import { AssociateService } from '../service/associate.service';

describe('SkillsDashboardComponent', () => {
  let component: SkillsDashboardComponent;
  let fixture: ComponentFixture<SkillsDashboardComponent>;

  let skillsArray:Skill[]=[
    {
    "skillId":"2",
    "skillName":"Java",
    "skillRating":5
  }];
	
	let summary:Summary = new Summary();

  let skill:Skill = new Skill();
  skill.skillId="1";
  skill.skillName="J2EE";
  skill.skillRating=10;
  let associateSkills:AssociateSkills[]=[{
      associateSkillId:2,
      associateId: "22",
      skill: skill,
      skillRating:10
    
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
      return of(skillsArray);
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
      declarations: [ SkillsDashboardComponent,AssociateFilterPipe ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule,HttpModule,FormsModule, ReactiveFormsModule,ChartsModule ],
       providers: [{provide: AssociateService, useValue: mockService}]
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

   it('it should get All associates', async(inject([AssociateService], (associateService: AssociateService) => {
    const element = fixture.nativeElement;
    let responseData:Associate[] ;
   /* associateService.getAllAssociates().subscribe(data => {
      responseData = data;
    }); */
    component.associateArray= associatesArray;
    component.loadAllAssociates();
    fixture.detectChanges();
  }))); 
});
