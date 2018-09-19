import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {Associate} from '../model/Associate';
import {AssociateSkills} from '../model/AssociateSkills';
import {AssociateService} from '../service/associate.service';
import {Skill} from '../model/Skill';

import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';


@Component({
  selector: 'app-add-edit-associate',
  templateUrl: './add-edit-associate.component.html',  
  styleUrls: ['./add-edit-associate.component.css']
  
})
export class AddEditAssociateComponent implements OnInit {
  
  
 /* associateForm = new FormGroup({
	associateStatus: new FormControl(),
	associateLevel: new FormControl()
  }); */

  pageTitle:string;
  associateId:string;
  associate=new Associate();
  associateSkills=new AssociateSkills();
  isEditAssociate:boolean;
  errorMsg:string;
  skillsArray:Skill[];
  localUrl: any[];  
  isReadonly:boolean;
  skill:Skill;  
  indexArr:number = 0;
  associateSkillsArray:AssociateSkills[];
  @ViewChild('fileInput') fileInput;
  successMsg:string;
  
  onFormSubmit() {        
		this.addEditAssociate();
	}

	constructor(private associateService:AssociateService, private router:Router,private route:	ActivatedRoute) {
		this.route.params.subscribe( params => console.log(params));		
	}
  
	ngOnInit() {
	    this.isEditAssociate=false;
		this.pageTitle="Add";
		this.associateId = this.route.snapshot.paramMap.get('id');				
		this.loadSkills();	
		
		if(this.associateId!=null){
			this.pageTitle="Edit";
			this.isEditAssociate=true;			
			this.getAssociateDetails(this.associateId);
		}		
	}	

	 formatLabel(value: number | null) {
			if (!value) {
			return 0;
			}
			if (value >= 1000) {
			return Math.round(value / 1000);
			}
			return value;
  	}
	loadSkills():void{	  
	  this.associateService.getAllSkills().subscribe(data => { 
		 this.skillsArray=data;
		 console.log("this.skillsArray>>>>"+JSON.stringify(this.skillsArray));	  
	  });	  
	}		
	upload() {
		let fileBrowser = this.fileInput.nativeElement;
		if (fileBrowser.files && fileBrowser.files[0]) {
		  const formData = new FormData();
		  formData.append("image", fileBrowser.files[0]);
		  /*this.projectService.upload(formData, this.project.id).subscribe(res => {
			// do stuff w/my uploaded file
		  });*/
		}
	}    
	showPreviewImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
	}		
	/** GET getAssociateDetails by id. Will 404 if id not found */
	getAssociateDetails(id: string){		  
	   this.associateService.getAssociateDetails(id).subscribe(data => { 
		 this.associate=data;
		 this.populateSkillRating();
		 if(this.associate.level1=="L1"){
			 this.associate.associateLevel="L1";
		 }
		  if(this.associate.level2=="L2"){
			 this.associate.associateLevel="L2";
		 }
		 if(this.associate.level3=="L3"){
			 this.associate.associateLevel="L3";
		 }
		 if(this.associate.statusBlue=="Y"){
			 this.associate.associateStatus="Blue";
		 }
		 if(this.associate.statusRed=="Y"){
			 this.associate.associateStatus="Red";
		 }
		  if(this.associate.statusGreen=="Y"){
			 this.associate.associateStatus="Green";
		 }
		 console.log("Skill Rating:>>>>>"+JSON.stringify(this.skillsArray));		 
	  });  
	  
	} 
	populateSkillRating(){
		let id:string;		
		this.associateSkillsArray=this.associate.associateSkills;
		for(var cnt=0;cnt<this.skillsArray.length;cnt++){
			id=this.skillsArray[cnt].skillId;			
			this.skillsArray[cnt].skillRating=0;
			for(var count=0;count<this.associate.associateSkills.length;count++){
				var skilId=this.associate.associateSkills[count].skill.skillId;				
				if(skilId==id &&  this.associate.associateSkills[count].skillRating>0){
					this.skillsArray[cnt].skillRating=this.associate.associateSkills[count].skillRating;						
					break;		
				}
				
			}			  			
		}		
	}
	
	//call service to save Associate
    addEditAssociate(): void {	
		//console.log("this.isEditAssociate:"+this.isEditAssociate);
		/*if(this.associate.associateId==null || this.associate.associateId==null){
				this.errorMsg="Associate Id is mandatory";
				return;
		}	*/
		if(this.associate.name==null || this.associate.name==null){
				this.errorMsg="Associate Name is mandatory";
				return;
		}
			
		if(this.associate!=null){
			//this.associate.associateStatus=associateForm.controls['associateStatus'].value;
			//console.log('associateStatus..'+this.associate.associateStatus);
			if(this.associate.associateStatus=="Green"){
				this.associate.statusGreen="Y";
				this.associate.statusBlue="N";
				this.associate.statusRed="N";
			}
			if(this.associate.associateStatus=="Blue"){
				this.associate.statusGreen="N";
				this.associate.statusBlue="Y";
				this.associate.statusRed="N";
			}
			if(this.associate.associateStatus=="Red"){
				this.associate.statusGreen="N";
				this.associate.statusBlue="N";
				this.associate.statusRed="Y";
			}
		    console.log('this.associate.statusGreen..'+this.associate.statusGreen);
			//this.associate.associateLevel=associateForm.controls['associateLevel'].value	
			if(this.associate.associateLevel=="L1"){
				this.associate.level1=this.associate.associateLevel;
			}
			if(this.associate.associateLevel=="L2"){
				this.associate.level2=this.associate.associateLevel;
			}
			if(this.associate.associateLevel=="L3"){
				this.associate.level3=this.associate.associateLevel;
			}
			//this.associate.gender= associateForm.controls['gender'].value;	
		}
		
	    if(this.skillsArray!=null){			
			let associateSkills:AssociateSkills;			
			this.indexArr= 0;
			this.associateSkillsArray=new Array();
			for (let sk of this.skillsArray) {				
				this.associateSkills=new AssociateSkills();
				this.skill=new Skill();
				this.skill.skillId=sk.skillId;
				this.skill.skillName=sk.skillName;				
				this.associateSkills.skill=this.skill;
				this.associateSkills.skillRating=sk.skillRating;
                if(!this.isEditAssociate){
					this.associateSkills.associateSkillId=0;
				}else{
					if(this.associate.associateSkills[this.indexArr]!=null){
						this.associateSkills.associateSkillId
						=this.associate.associateSkills[this.indexArr].associateSkillId;
				  	 }else{
					   this.associateSkills.associateSkillId=0;
					  //console.log("rating.."+this.associateSkills.skillRating);
				   	}
				}
				if(this.associateSkills.skillRating>0){
				   this.associateSkillsArray[this.indexArr]=this.associateSkills;
				   this.indexArr=this.indexArr+1;	
				}
					
			}
			if(this.associate!=null)
				this.associate.associateSkills=this.associateSkillsArray;
			    console.log("associateSkillsArray:"+this.associateSkillsArray);			
		}
		//console.log('Associate data'+JSON.stringify(this.associate));
		
		this.errorMsg=null;
		if(!this.isEditAssociate){	
			this.associate.associateId=0;		 									
			this.associateService.saveAssociate(this.associate)
				  .subscribe(associate => {				   
					  console.log("Associate Saved"+this.associate.associateId);
					   this.successMsg="Associate details Added successfully";	
					 //this.router.navigate(['/skillsDashboard/']);
			 });
			 
			 //this.successMsg="Associate details Saved successfully";			  
	    }else{
		  this.associateService.updateAssociate(this.associate)
			  .subscribe(associate => {				   
				  console.log("Associate Updated");
				  this.successMsg="Associate details Updated successfully";				  
		 });		  		 
	  }
    }
	
	cancelAddEdit() {		
		this.router.navigate(['/skillsDashboard']);
    }
	resetAddEdit(associateForm: NgForm) {
		this.associate=new Associate();
		associateForm.resetForm({
			associateStatus:"",
			associateLevel:""			
		});
    }	
}

