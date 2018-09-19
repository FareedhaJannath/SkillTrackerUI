import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';

import { SkillsComponent } from './skills.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { Skill} from '../model/Skill';
import { Observable, of } from 'rxjs';
import {SkillsService } from '../service/skills.service';
import { By } from '@angular/platform-browser';
 

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

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

  const mockSkillData: Skill = new Skill();

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ RouterTestingModule,HttpModule,FormsModule, ReactiveFormsModule,HttpClientModule],
      providers: [{provide: SkillsService, useValue: mockSkillService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    component.skillsArray = mockSkillList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('it should get all the skills', () => {
    //component.ngOnInit();
    
    expect(component.skillsArray.length).toEqual(mockSkillList.length);
  });

   it('it should render the skill list', () => { 
    const element = fixture.nativeElement;
    fixture.detectChanges();
    expect(component.skillsArray.length).toBe(3);
  });

   it('it should throw error for empty add new skill', async(inject([SkillsService], (skillService: SkillsService) => {
     component.skill = new Skill();
    const element = fixture.nativeElement;
   component.newSkillName =null;
    component.addSkill();
    fixture.detectChanges();
    })));

  it('it should add new skill', async(inject([SkillsService], (skillService: SkillsService) => {
    component.skill = new Skill();
    const element = fixture.nativeElement;
    element.querySelector('#skillNm').value = "Skill 4";
    fixture.detectChanges();
    expect(element.querySelector('#skillNm').value).toEqual("Skill 4");
    let buttonClick = fixture.debugElement.query(By.css('#addButton')).nativeElement.click();
    fixture.detectChanges(); 
    let newSkill: Skill = {
      skillId: "0",
      skillName: "Skill 4",
      skillRating:9
    };
    let responseData: Skill = new Skill();
    fixture.detectChanges();
    skillService.saveSkill(newSkill).subscribe(data => { 
      responseData = data;
    }); 
    component.newSkillName ="Skill 4";
    component.addSkill();
    fixture.detectChanges();
    expect(component.skillsArray).toEqual(mockSkillList);
    expect(component.skillsArray.length  - 1).toBe(3);
  })));
});