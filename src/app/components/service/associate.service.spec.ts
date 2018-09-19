import { TestBed, inject } from '@angular/core/testing';

import { AssociateService } from './associate.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppSettings} from '../shared/AppSettings';
import { Observable, of } from 'rxjs';
import { Associate } from '../model/associate';
import { Skill} from '../model/Skill';
import {AssociateSkills} from '../model/AssociateSkills';
import {Summary} from '../model/Summary';

describe('AssociateService', () => {

  const mockAssociateObj: Associate = new Associate();
 
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

	let mockSkillList:Skill[]= [
    {
      skillId: "1",
      skillName: "HTML 5",
      skillRating: 0
    },
    {
      skillId: "2",
      skillName: "CSS 3",
      skillRating: 10
    },
    {
      skillId: "3",
      skillName: "JAVA",
      skillRating: 20
    }
  ];
	 mockAssociateObj._id = "21";
	mockAssociateObj.associateId = 21;
	mockAssociateObj.name = "Fareedha";
	mockAssociateObj.email = "fareedha@test.com";
	mockAssociateObj.mobile = 2233322213;
	mockAssociateObj.remark = "Remark edit";
	mockAssociateObj.strength = "Strength edit";
	mockAssociateObj.weakness = "weakness edit";
	mockAssociateObj.gender = "F";
	mockAssociateObj.level1 = "N"
	mockAssociateObj.level2 = "Y"
	mockAssociateObj.level3 = "N"
	mockAssociateObj.associateLevel = "L2";    
	mockAssociateObj.associateStatus="Blue";
	mockAssociateObj.statusGreen="N";
	mockAssociateObj.statusBlue="Y";
	mockAssociateObj.statusRed="N";
  mockAssociateObj.associateSkills =associateSkills;

	let summary:Summary = new Summary();
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



	let associatesArray:Associate[]=[mockAssociateObj];

   let mockService = {
    getAllAssociates() : Observable<Associate[]>{
      //associatesArray.push(associateObj);
      return of(associatesArray);
    },
    getAllAssociateSummary() : Observable<Summary>{
      return of(summary);
    },
    getAssociateDetails(associateId: number) : Observable<Associate>{
      return of(mockAssociateObj);
    },
    getAllSkills() : Observable<Skill[]>{
      //skillsArray.push(skill);
      return of(mockSkillList);
    },
    saveAssociate(associate: Associate): Observable<Associate>{
      return of(mockAssociateObj);
    },
    updateAssociate(associate: Associate): Observable<any>{
      return of(mockAssociateObj);
    },
    deleteAssociate(associate:Associate): Observable<any>{
      return of(mockAssociateObj);
    }
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AssociateService,AppSettings],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([AssociateService], (service: AssociateService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all Associates', inject([AssociateService], (service: AssociateService) => {
    expect(service.getAllAssociates()).toBeTruthy();
  }));

  it('should get all skills of Associates', inject([AssociateService], (service: AssociateService) => {
    expect(service.getAllSkills()).toBeTruthy();
  }));
  
  it('should get specific Associate', inject([AssociateService], (service: AssociateService) => {
    expect(service.getAssociateDetails("21")).toBeTruthy();
  }));

  it('should save Associate', inject([AssociateService], (service: AssociateService) => {
    let associateData: Associate =  new Associate();
    associateData._id = "0";
    associateData.associateId = 0;
    associateData.name = "Fareedha";
    associateData.email = "fareedha@test.com";
    associateData.mobile = 344232222;
    associateData.remark = "Remark";
    associateData.strength = "Strength";
    associateData.weakness = "weakness";
    associateData.gender = "F";
    associateData.level1 = "Y"
		associateData.level2 = "N"
		associateData.level3 = "N"
    associateData.associateLevel = "L1";    
		associateData.associateStatus="Green";
		associateData.statusGreen="Y";
		associateData.statusBlue="N";
		associateData.statusRed="N";
    let responseData: Associate = new Associate();
    service.saveAssociate(associateData).subscribe(data => { 
      responseData = data;
    });
    expect(service.saveAssociate(associateData)).toBeTruthy();
  }));

  it('should update Associate', inject([AssociateService], (service: AssociateService) => {
    let associateData: Associate =  new Associate();
    associateData._id = "21";
    associateData.associateId = 21;
    associateData.name = "Fareedha";
    associateData.email = "fareedha@test.com";
    associateData.mobile = 2233322213;
    associateData.remark = "Remark edit";
    associateData.strength = "Strength edit";
    associateData.weakness = "weakness edit";
    associateData.gender = "F";
    associateData.level1 = "N"
		associateData.level2 = "Y"
		associateData.level3 = "N"
    associateData.associateLevel = "L2";    
		associateData.associateStatus="Blue";
		associateData.statusGreen="N";
		associateData.statusBlue="Y";
		associateData.statusRed="N";  
    let responseData: Associate = new Associate();
    service.updateAssociate(associateData).subscribe(data => { 
      responseData = data;
    });
    expect(service.updateAssociate(associateData)).toBeTruthy();
  }));

  it('should delete Associate', inject([AssociateService], (service: AssociateService) => {
    expect(service.deleteAssociate(mockAssociateObj)).toBeTruthy();
  }));
  
});
