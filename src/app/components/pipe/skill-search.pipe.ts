import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'skillSearch'})
export class SkillSearchPipe implements PipeTransform {

  /*
   transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
  }*/
   transform(value: any, searchTxt: any): any {
    if(!value) return [];
    if(!searchTxt) return value;

    return value.filter(skillObj => {
      return skillObj.skillName.toLowerCase().includes(searchTxt.toLowerCase());
    });
  }

}
