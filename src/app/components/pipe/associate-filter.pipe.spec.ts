import { AssociateFilterPipe } from './associate-filter.pipe';
import { async, ComponentFixture, TestBed,inject ,fakeAsync,tick} from '@angular/core/testing';
import {AssociateSkills} from '../model/AssociateSkills';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Skill} from '../model/Skill';
describe('AssociateFilterPipe', () => {
let associatePipe: AssociateFilterPipe;
let fixture: ComponentFixture<AssociateFilterPipe>;

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
 let mockData =[
    {
      associateId: 100,
      name: "Fareedha",
      email: "fareedha@test.com",
      mobile: 443343434,
      assocSkills: "Java, J2EE, HTML 5"
    },
    {
      associateId: 101,
      name: "Ilyas",
      email: "ilyas@test.com",
      mobile: 5545343434,
       assocSkills: "HTML 5,CSS 3"
    },
  ];

  beforeEach(() => {
    associatePipe = new AssociateFilterPipe();
  });

  it('create an instance', () => {
    const pipe = new AssociateFilterPipe();
    expect(pipe).toBeTruthy();
  });

   it('should filter by associate ID', () => {
    expect(associatePipe.transform(mockData,null,"100",null,null,null)).toContain(mockData[0]);
  });

  it('should filter by associate name', () => {
    expect(associatePipe.transform(mockData,"Fa",null,null,null,null)).toContain(mockData[0]);
  });

  it('should filter by associate email', () => {
    expect(associatePipe.transform(mockData,null,null,"fa",null,null)).toContain(mockData[0]);
  });

  it('should filter by associate mobile', () => {
    expect(associatePipe.transform(mockData,null,null,null,"44",null)).toContain(mockData[0]);
  });

  it('should filter by associate skills', () => {
    expect(associatePipe.transform(mockData,null,null,null,null,"HT")).toContain(mockData[0]);
  });
});
