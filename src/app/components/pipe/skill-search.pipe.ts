import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'skillSearch'})
export class SkillSearchPipe implements PipeTransform {

  /*transform(items: Array, associateNm:string, associateId:number, email:string, mobile:number, skills:string): any {
    if (items && items.length){
            return items.filter(item =>{
                if (associateNm && item.name.toLowerCase().indexOf(associateNm.toLowerCase()) == -1){
                    return false;
                }
                if (email && item.email.toLowerCase().indexOf(email.toLowerCase()) == -1){
                    return false;
                }	
                if (skills && item.company.toLowerCase().indexOf(skills.toLowerCase()) == -1){
                    return false;
                }
                return true;
           })
        }
        else{
            return items;
        }
  }*/
   transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
  }

}
