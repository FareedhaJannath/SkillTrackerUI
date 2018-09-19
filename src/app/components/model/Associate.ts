

import {AssociateSkills} from './AssociateSkills';

export class Associate {  
	_id:string;  
	associateId:number;
	name:string;
	email: string;
	mobile: number;
	gender:string;
	strength: string;
	weakness: string;
	remark: string;
	picture: string;
	statusGreen:string;
	statusBlue:string;
	statusRed:string;
	level1:string;
	level2:string;
	level3:string;
	associateStatus: string;	
	associateLevel: string;	
	assocSkills: string;	
	associateSkills:AssociateSkills[];
	createdDt:Date;
}