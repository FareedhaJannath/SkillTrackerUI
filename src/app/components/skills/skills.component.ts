import { Component, OnInit } from '@angular/core';
import { Skill} from '../model/Skill';
import {SkillsService } from '../service/skills.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  providers: [ SkillsService],  
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  error: any;
  headers: string[];   
  newSkillName:string;
  skill:Skill;
  srchSkillsTxt:string;
  skillsArray:Skill[];
  
  constructor(private skillsService: SkillsService,private router: Router) { }
  
  ngOnInit() { 
	this.getAllSkills();		
  }
  
  getAllSkills(): void {
	  this.skillsService.getAllSkills()
      .subscribe(skillsArray => this.skillsArray = skillsArray);
  }
  //call service to update Skill
  updateSkill(skill:Skill): void {
	console.log(skill.skillName);
	this.skillsService.updateSkill(skill)
     .subscribe(() => console.log("skill Updated"));
 }
 //call service to save new Skill
  addSkill(): void {
	  if (!this.newSkillName) { 
			this.error="Skill Name is Mandatory";
			return; 
	   }	  
	  this.error=null;
      this.skill=new Skill();	  
	  this.skill.skillName=this.newSkillName;
	  console.log("this.skill   "+this.skill);
	  this.skillsService.saveSkill(this.skill)
      .subscribe(skill => {
		  //this.newSkillName="";
		  this.skillsArray.push(skill);
		  console.log("skill saved");        
      });
  } 
  
  deleteSkill(skill:Skill): void {
	console.log("skill ID Name To delete "+skill.skillId+" "+skill.skillName);
	this.skillsArray = this.skillsArray.filter(h => h !== skill);
    this.skillsService.deleteSkill(skill).subscribe();
  } 
}
