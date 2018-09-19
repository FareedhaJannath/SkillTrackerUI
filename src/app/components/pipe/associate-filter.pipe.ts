import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateFilter'
})
export class AssociateFilterPipe implements PipeTransform {

transform(items:any, nameSearch: string,associateIdSearch:string, emailSearch: string, mobileSearch: string,skillSearch:string){
    if (items && items.length){
        
        return items.filter(item =>{
            let nameResult: boolean = true;
            let idResult: boolean = true;
            let emailResult: boolean = true;
            let mobileResult: boolean = true;
            let skillResult: boolean = true;

            if (nameSearch){
              nameResult= item.name.toLowerCase().includes(nameSearch.toLowerCase());
             }
            if (associateIdSearch){  
              idResult= item.associateId.toString().includes(associateIdSearch);
            }
            if (emailSearch ){
             emailResult=   item.email.toLowerCase().includes(emailSearch.toLowerCase());
            }
            
            if (mobileSearch){
                 let text: string = item.mobile.toString();
               mobileResult=   text.includes(mobileSearch) ;
            }
			if (skillSearch){
               skillResult=     item.assocSkills.toLowerCase().indexOf(skillSearch);
            }
        if(nameResult && idResult && emailResult && mobileResult && skillResult){
            return true;
         }
         return false;
       })
    }
    else{
        return items;
    }
}

}
