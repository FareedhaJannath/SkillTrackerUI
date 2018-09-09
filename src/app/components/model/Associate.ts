

import {AssociateSkills} from './AssociateSkills';

export class Associate {  
	_id:string;  
	associateId:number;
	name:string;
	email: string;
	mobile: number;
	strength: string;
	weakness: string;
	remarks: string;
	picture: string;
	associateStatus: string;	
	associateLevel: string;	
	assocSkills: string;	
	associateSkills:AssociateSkills[];
	createdDt:Date;
}