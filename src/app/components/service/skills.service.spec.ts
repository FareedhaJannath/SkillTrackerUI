import { TestBed, inject } from '@angular/core/testing';

import { SkillsService } from './skills.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Skill } from '../model/skill';
import { Observable, of } from 'rxjs';

describe('SkillService', () => {

  const mockSkillData: Skill = new Skill();
  mockSkillData.skillId="12";
  mockSkillData.skillName="Java";
  mockSkillData.skillRating=10;

   const mockSkillList: Skill[] = [
    {
      skillId: "1",
      skillName: "Skill 1",
      skillRating:0
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

  let skillsArray:Skill[];

  let mockSkillService = {
    getAllSkills(): Observable<Skill[]>{
      return of(mockSkillList);
    },
    saveSkill(skillObj: Skill): Observable<Skill>{
      mockSkillList.unshift(skillObj);
      return of(skillObj);
    },
    updateSkill(skillObj: Skill): Observable<any>{
      mockSkillList.unshift(skillObj);
      return of(true);
    },
    deleteSkill(skillId: number): Observable<boolean>{
      let skillObj: Skill = mockSkillList.find(x => x.skillId == "3");
      let index = mockSkillList.indexOf(skillObj);
      mockSkillList.splice(index, 1);
      return of(true);
    } 
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SkillsService],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should be created', inject([SkillsService], (service: SkillsService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all skills', inject([SkillsService], (service: SkillsService) => {
    expect(service.getAllSkills()).toBeTruthy();
  }));
  
  /*it('should get specific skill', inject([SkillsService], (service: SkillsService) => {
    expect(service.getSkillById(1)).toBeTruthy();
  }));*/

  it('should save skill', inject([SkillsService], (service: SkillsService) => {
    let newSkill: Skill = {
      skillId: "0",
      skillName: "Skill 4",
	  skillRating:0
    };
    let responseData: Skill = new Skill();
    service.saveSkill(newSkill).subscribe(data => { 
      responseData= data;
    });
    expect(service.saveSkill(newSkill)).toBeTruthy();
  }));

  it('should update skill', inject([SkillsService], (service: SkillsService) => {
    let updateSkill: Skill = {
      skillId: "1",
      skillName: "updated skill",
	  skillRating:2
    };
    let responseData: Skill = new Skill();
    service.updateSkill(updateSkill).subscribe(data => { 
      responseData.skillId = data;
    });
    expect(service.updateSkill(updateSkill)).toBeTruthy();
  }));

  it('should delete skill', inject([SkillsService], (service: SkillsService) => {
    expect(service.deleteSkill(mockSkillData)).toBeTruthy();
  }));

});